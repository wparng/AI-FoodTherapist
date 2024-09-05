import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FoodDetail.css";

const FoodDetails = () => {
  const { type, id } = useParams();

  const [itemData, setItemData] = useState(null);
  const [filteredItem, setfilteredItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const pathAfterLocalhost = window.location.pathname.split("/")[1]; // Get 'TYF' or 'TWF'

    const fetchData = async () => {
      try {
        let response;
        const baseURL = `http://localhost:5000/${pathAfterLocalhost}`;

        if (type === "food") {
          response = await fetch(baseURL);
        } else if (type === "tea") {
          response = await fetch(baseURL);
        } else {
          throw new Error("Invalid type");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const item = await response.json();
        let data = item;
        setItemData(item);
        setLoading(false);

        // Filter the data based on the type and id
        let filteredItem;
        if (type === "food") {
          filteredItem = data["food-items"].find(
            (item) => item.id === parseInt(id)
          );
        } else if (type === "tea") {
          filteredItem = data["herbal-tea-recommendation"].find(
            (item) => item.id === parseInt(id)
          );
        }
        setfilteredItem(filteredItem);
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
    <div className="app p-4">
      <div className="flex items-center mb-4">
        <div onClick={handleBack} className="cursor-pointer p-2">
          <img
            src="/assets/images/icons8-back-50.png"
            alt="Back"
            className="w-8 h-8"
          />
        </div>
        <h1 className="text-2xl font-bold ml-4">{filteredItem.header}</h1>
      </div>

      <img
        src={filteredItem.image}
        alt={filteredItem.header}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <div className="mb-4">
        <p className="custom-title">{filteredItem.title}</p>
      </div>

      {filteredItem.ingredients && (
        <div className="mb-4">
          <h3 className="sub-title">Ingredients</h3>
          <ul>
            <p className="sub-details ">
              {" "}
              {filteredItem.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </p>
          </ul>
        </div>
      )}

      {filteredItem.steps && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4"> Steps</h3>

          {filteredItem.steps.map((step, index) => (
            <div key={index} className="mb-4">
              {" "}
              <h4 className="font-semibold text-md mb-2"> Step {step.step}:</h4>
              <h3 className="text-lg font-semibold mb-2"> {step.title}</h3>
              <ul className="list-disc pl-5 step-detail ">
                {" "}
                {step.details.map((detail, subIndex) => (
                  <li key={subIndex} className="mb-1">
                    {" "}
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {filteredItem.notes && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2"> Notes</h3>
          <ul className="list-disc pl-5">
            {" "}
            {filteredItem.notes.map((note, index) => (
              <li key={index} className="mb-1">
                {" "}
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredItem.funFact && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Fun Fact</h3>
          <p>{filteredItem.funFact}</p>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
