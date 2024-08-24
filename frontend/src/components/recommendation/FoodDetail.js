import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FoodDetail.css";

const FoodDetails = () => {
  const { type, id } = useParams();
  console.log(type, "immm tt");
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === "food") {
          console.log(type, "immm tt");
          response = await fetch(`http://localhost:5000/food-items/${id}`);
        } else if (type === "tea") {
          response = await fetch(
            `http://localhost:5000/herbal-tea-recommendation/${id}`
          );
        } else {
          throw new Error("Invalid type");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const item = await response.json();
        setItemData(item);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!itemData) return <p>No data available</p>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div onClick={handleBack} className="cursor-pointer p-2">
          <img
            src="/assets/images/icons8-back-50.png"
            alt="Back"
            className="w-8 h-8"
          />
        </div>
        <h1 className="text-2xl font-bold ml-4">{itemData.header}</h1>
      </div>

      <img
        src={itemData.image}
        alt={itemData.header}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <div className="mb-4">
        <p className="custom-title">{itemData.title}</p>
      </div>

      {itemData.ingredients && (
        <div className="mb-4">
          <h3 className="sub-title">Ingredients</h3>
          <ul>
            <p className="sub-details ">
              {" "}
              {itemData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </p>
          </ul>
        </div>
      )}

      {itemData.steps && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">
            {" "}
            {/* Spacing below the heading */}
            Steps
          </h3>

          {itemData.steps.map((step, index) => (
            <div key={index} className="mb-4">
              {" "}
              {/* Spacing between each step */}
              <h4 className="font-semibold text-md mb-2">
                {" "}
                {/* Spacing below each step title */}
                Step {step.step}:
              </h4>
              <h3 className="text-lg font-semibold mb-2">
                {" "}
                {/* Styling for the step title */}
                {step.title}
              </h3>
              <ul className="list-disc pl-5 step-detail ">
                {" "}
                {/* Bullet points and padding */}
                {step.details.map((detail, subIndex) => (
                  <li key={subIndex} className="mb-1">
                    {" "}
                    {/* Spacing between list items */}
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {itemData.notes && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            {" "}
            {/* Spacing below the heading */}
            Notes
          </h3>
          <ul className="list-disc pl-5">
            {" "}
            {/* Bullet points and padding */}
            {itemData.notes.map((note, index) => (
              <li key={index} className="mb-1">
                {" "}
                {/* Spacing between list items */}
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {itemData.funFact && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Fun Fact</h3>
          <p>{itemData.funFact}</p>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
