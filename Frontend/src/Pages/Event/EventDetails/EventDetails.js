//Author: Dhruvin Dankhara

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css";
import { getEventDetailById } from "../../../services/eventApi";
import { Rating } from "../../../Components/Rate/Rating";

function EventDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([
    "Default comment 1",
    "Default comment 2",
    "Default comment 3",
    "Default comment 4",
    "Default comment 5",
  ]);

  const getEventDetailByIdApiCall = async () => {
    setLoading(true);
    const apiResponse = await getEventDetailById(id);
    if (apiResponse) {
      setEventDetails(apiResponse.data?.data);
    }
    setLoading(false);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setCommentsList([...commentsList, comment]);
      setComment("");
    }
  };

  useEffect(() => {
    getEventDetailByIdApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="container event-details-container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={eventDetails.imageUrl}
                alt="Event"
                className="img-fluid event-image"
              />
            </div>
            <div className="col-md-6">
              <div className="event-details">
                <h2>{eventDetails.name}</h2>
                <p>
                  <b>Date & Time: </b>
                  {new Date(eventDetails.dateAndTime).toUTCString()}
                </p>
                <p>
                  <b>Location: </b>
                  {eventDetails.location}
                </p>
                <p>
                  <b>Category: </b>
                  {eventDetails.category}
                </p>
                <p>
                  <b>Description: </b>
                  {eventDetails.description}
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            {/* <div className="col-md-2"> */}
            <div className="comment-form">
              <div className="comment-rating-header">
                <h3>Add a Comment</h3>
                <Rating />
              </div>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="btn btn-secondary mt-2"
                onClick={handleCommentSubmit}
              >
                Submit Comment
              </button>
              {/* </div> */}
            </div>
            <div className="col-md-6">
              <div className="comments-section">
                <h3>Comments</h3>
                <ul className="comment-list">
                  {commentsList.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EventDetails;
