import React, { useState, useEffect } from "react";
// import EventCardWishlist from "./eventCardWishlist";
import {Table, Navbar, Nav} from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import "./Wishlist.css";
// import Header from '../../Components/Header/Header'
// import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const base_url = "http://localhost:3000";
// const base_url = "https://web-group-project-backend-server.onrender.com";

function Approvals() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [allRequests, setAllRequests] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);

  const getAllApprovalRequests = async () => {
    // Function to fetch data from the API
    // const fetchData = async () => {
    try {
      const requestOptions = {
        method: "POST", // Set the request method to POST (you can use 'GET', 'POST', 'PUT', 'DELETE', etc.)
        headers: {
          "Content-Type": "application/json", // Specify the content type of the payload
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // localStorage.getItem("userId");
        body: JSON.stringify({}), // Replace { key: 'value' } with your actual payload
      };
      const response = await fetch(base_url + "/admin/get-approval-requests", requestOptions);
      const data = await response.json();
      console.log(data.data);
      setAllRequests(data.data);
      // setEvents(data.data.events, () => {
      //   console.log("Updated events:", events);
      // });
      console.log("All Request", allRequests);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getAllApprovalRequests();
  }, []);

  const updateApprovalRequest = async (requestID, status) => {
    const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            request_id: requestID,
            approval_status: status
          }),
        };
        const response = await fetch(base_url + "/admin/update-approval-request", requestOptions); // Replace with your API endpoint URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          getAllApprovalRequests()
          // setSelectedEventId("");
          // getAllEvents();
        }
  }

  // const handleRemoveEventFromWishlist = async () => {
  //   console.log("eventID in remvoeEvent", selectedEventId);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify({
  //       userId: "64b896f0f55db1aa14e51ff5",
  //       eventId: selectedEventId,
  //     }),
  //   };
  //   const response = await fetch(base_url + "/wishlist/remove", requestOptions); // Replace with your API endpoint URL
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   } else {
  //     setSelectedEventId("");
  //     getAllEvents();
  //   }
  //   closeRemoveEventFromWishlistConfirmationModal();
  // };

  // const openRemoveEventFromWishlistConfirmationModal = (eventId) => {
  //   setSelectedEventId(eventId);
  //   setShowModal(true);
  // };

  // const closeRemoveEventFromWishlistConfirmationModal = () => {
  //   setSelectedEventId(null);
  //   setShowModal(false);
  // };

  // const handleEventDetail = (eventId) => {
  //   // navigate('')
  // };

  // const [searchQuery, setSearchQuery] = useState("");
  // // const [searchResults, setSearchResults] = useState(events)

  // const handleSearch = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);

  //   if (query.length > 0) {
  //     const filteredData = allevents.filter((item) =>
  //       item.name.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setEvents(filteredData);
  //   } else {
  //     setEvents(allevents);
  //   }
  // };

  // const handleFilter = async (filter) => {
  //   setFilter(filter);

  //   // Function to fetch data from the API
  //   // const fetchData = async () => {
  //   try {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({
  //         userId: "64b896f0f55db1aa14e51ff5",
  //         filterBy: filter,
  //         sortBy: sortBy,
  //       }),
  //     };
  //     const response = await fetch(base_url + "/wishlist", requestOptions);
  //     const data = await response.json();
  //     console.log(data.data.events);
  //     setEvents(data.data.events, () => {
  //       console.log("Updated events:", events);
  //     });
  //     console.log("wishlist events", events);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  //   // }
  // };

  // const handleSort = async (sortBy) => {
  //   setSortBy(sortBy);

  //   // Function to fetch data from the API
  //   // const fetchData = async () => {
  //   try {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({
  //         userId: "64b896f0f55db1aa14e51ff5",
  //         filterBy: filter,
  //         sortBy: sortBy,
  //       }),
  //     };
  //     const response = await fetch(base_url + "/wishlist", requestOptions);
  //     const data = await response.json();
  //     console.log(data.data.events);
  //     setEvents(data.data.events, () => {
  //       console.log("Updated events:", events);
  //     });
  //     console.log("wishlist events", events);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }

  //   // }
  // };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        data-bs-theme="dark"
        className="mb-4"
        id="header"
      >
        <Navbar.Brand className="ms-3">
          <span>
            <img
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png"
              style={{ width: "7%" }}
              alt="No image available"
            />
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="me-3">
          <Nav className="ms-3 ms-md-auto">
            <li className="nav-item me-5">
              <span
                onClick={(e) => {
                  navigate("/admin/queries");
                }}
                className="nav-link px-2"
              >
                Pending Queries
              </span>
            </li>
            <li className="nav-item me-3">
              <span
                onClick={(e) => {
                  navigate("/admin/queries");
                }}
                className="nav-link px-2"
              >
                Logout
              </span>
            </li>
            {/* <li className="EventDropdown nav-item">
              <Dropdown>
                <Dropdown.Toggle className="dropdown-title px-2 ">
                  Events
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleGetRoutes("/my-events", e);
                    }}
                  >
                    My Events
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleGetRoutes("/event-list", e);
                    }}
                  >
                    Event List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> */}
            {/* <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/wishlist", e);
                }}
                className="nav-link px-2"
              >
                Wishlist
              </span>
            </li> */}
            {/* <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes("/analytics/64b625a5b2eea9fde57bf21c", e);
                }}
                className="nav-link px-2"
              >
                Analytics
              </span>
            </li> */}
            {/* author: Mehulkumar Bhunsadiya */}
            {/* <li className="nav-item">
              <span
                onClick={(e) => {
                  handleGetRoutes(`/edit-profile/${userId}`, e);
                }}
                className="nav-link px-2"
              >
                <img className="user-profile" src={userProfileImage} alt="User Profile"/>
              </span>
            </li> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container text-center">
        <h2 className="mb-4">Approval Requests</h2>
        <Table responsive>
          <thead>
            <tr className="">
              <th>User Email</th>
              <th>View Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRequests?.map((item) => (
              <tr key={item._id}>
                <td>{item.user_email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => window.open(item.certificate, '_blank')}
                  >
                    View Certificate
                  </Button>
                </td>
                <td>
                  <Button className="me-2" variant="success" onClick={() => updateApprovalRequest(item._id, 'approved')}>Approve</Button>
                  <Button variant="danger" onClick={() => updateApprovalRequest(item._id, 'declined')}>Decline</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  </>
  );
}

export default Approvals;
