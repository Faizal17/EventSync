/* author: Mehulkumar Bhunsadiya */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import image from "../../../Images/Landing-page-background.jpg";

function Onboarding() {
  const staticInterests = [
    { categoryId: 1, categoryName: "Art & Design" },
    { categoryId: 2, categoryName: "Technology" },
    { categoryId: 3, categoryName: "Music" },
    { categoryId: 4, categoryName: "Photography" },
    { categoryId: 5, categoryName: "Fitness" },
    { categoryId: 6, categoryName: "Cooking" },
    { categoryId: 7, categoryName: "Travel" },
    { categoryId: 8, categoryName: "Fashion" },
    { categoryId: 9, categoryName: "Gaming" },
    { categoryId: 10, categoryName: "Reading" },
    { categoryId: 11, categoryName: "Nature" },
    { categoryId: 12, categoryName: "Sports" },
    { categoryId: 13, categoryName: "Dance" },
    { categoryId: 14, categoryName: "DIY & Crafts" },
    { categoryId: 15, categoryName: "Movies & TV Shows" },
    { categoryId: 16, categoryName: "Science & Technology" },
    { categoryId: 17, categoryName: "Business & Finance" },
    { categoryId: 18, categoryName: "Health & Wellness" },
    { categoryId: 19, categoryName: "Pets" },
    { categoryId: 20, categoryName: "Food & Drinks" },
  ];

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState(staticInterests);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const initialCheckedCategories = {};
    staticInterests.forEach((category) => {
      initialCheckedCategories[category.categoryId] = false;
    });
    setCheckedCategories(initialCheckedCategories);
  }, []);

  // Function to handle checkbox changes
  const handleCheckboxChange = (categoryId) => {
    setCheckedCategories((prevCheckedCategories) => ({
      ...prevCheckedCategories,
      [categoryId]: !prevCheckedCategories[categoryId],
    }));
  };

  // Function to handle the Save button click
  const handleSaveButtonClick = () => {
    const selectedCategoryIds = Object.keys(checkedCategories).filter(
      (categoryId) => checkedCategories[categoryId]
    );

    if (selectedCategoryIds.length < 3) {
      setSuccessMessage("Please select at least 3 categories.");
      return;
    }

    // Create a new array with category names based on selectedCategoryIds
    const selectedCategories = selectedCategoryIds.map(
      (categoryId) =>
        categoryList.find(
          (category) => category.categoryId === parseInt(categoryId)
        ).categoryName
    );

    const userId = localStorage.getItem("userId");
    const postData = {
      interests: selectedCategories,
    };
    // Make the POST API call with the postData
    fetch(process.env.REACT_APP_BASE_URL + `/user/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setSuccessMessage("Categories added successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <div className="onboarding">
        <header className="bg-dark header-text p-2">
          <h3>Select at least 3 categories.</h3>
        </header>
        <div className="container d-flex justify-content-start flex-wrap mt-2">
          {categoryList.map((category) => (
            <div
              className="card mb-3 me-2"
              key={category.categoryId}
              style={{ width: "24%" }}
            >
              <img src={image} alt={category.categoryName} />
              <div className="card-body">
                <div className="form-check">
                  <label className="form-check-label">
                    {category.categoryName}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    checked={checkedCategories[category.categoryId]}
                    onChange={() => handleCheckboxChange(category.categoryId)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {successMessage && <p className="text-success">{successMessage}</p>}
        <button
          className="btn save-secondary position-fixed bottom-0 end-0 m-4"
          onClick={handleSaveButtonClick}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default Onboarding;
