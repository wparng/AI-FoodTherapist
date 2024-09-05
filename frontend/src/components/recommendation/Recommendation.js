import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";

const Recommendation = ({ predictionResult = "TYF" }) => {
  const [foodData, setFoodData] = useState([]);
  const [herbalTeaData, setHerbalTeaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let foodUrl = "";
      let herbalTeaUrl = "";

      switch (predictionResult) {
        case "TYF":
          foodUrl = "http://localhost:5000/TYF";
          herbalTeaUrl = "http://localhost:5000/TYF";
          break;
        case "TWF":
          foodUrl = "http://localhost:5000/TWF";
          herbalTeaUrl = "http://localhost:5000/TWF";
          break;
        case "YGF":
          foodUrl = "http://localhost:5000/YGF";
          herbalTeaUrl = "http://localhost:5000/YGF";
          break;
        case "WGF":
          foodUrl = "http://localhost:5000/WGF";
          herbalTeaUrl = "http://localhost:5000/WGF";
          break;
        default:
          setError(new Error("Invalid recommendation type"));
          setLoading(false);
          return;
      }

      try {
        const [foodResponse, herbalTeaResponse] = await Promise.all([
          fetch(foodUrl),
          fetch(herbalTeaUrl),
        ]);

        if (!foodResponse.ok || !herbalTeaResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [foodItems, herbalTeas] = await Promise.all([
          foodResponse.json(),
          herbalTeaResponse.json(),
        ]);

        setFoodData(foodItems["food-items"] || []);
        setHerbalTeaData(herbalTeas["herbal-tea-recommendation"] || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [predictionResult]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleItemClick = (itemId, type) => {
    navigate(`/${predictionResult}/${type}/${itemId}`);
  };
  const handleScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      // Create a download link and trigger download
      const link = document.createElement("a");
      link.href = img;
      link.download = "Recommendations.png";
      link.click();
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
        <h1 className="text-2xl font-bold ml-4">Recommendations</h1>
      </div>

      <div className="relative mb-8">
        <div
          onClick={handleScreenshot}
          className="absolute top-0 right-0 cursor-pointer p-2"
        >
          <img
            src="/assets/images/download.svg"
            alt="Back"
            className="w-5 h-5"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Recommended Foods</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {foodData.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleItemClick(food.id, "food")}
          >
            <img
              src={food.image}
              alt={food.header}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="mt-2 p-2">
              <h3 className="text-lg font-semibold">{food.header}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 mt-8">
        <h3 className="text-xl font-semibold">Herbal Tea Recommendations</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {herbalTeaData.map((tea) => (
          <div
            key={tea.id}
            className="bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleItemClick(tea.id, "tea")}
          >
            <img
              src={tea.image}
              alt={tea.header}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="mt-2 p-2">
              <h3 className="text-lg font-semibold">{tea.header}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
