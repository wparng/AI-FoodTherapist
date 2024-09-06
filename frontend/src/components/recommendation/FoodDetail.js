import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FoodDetail.css";

import { food_data } from "./FoodRecommendations";
// import { food_data } from "./db";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const FoodDetails = ({ predictionResult }) => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const itemData = food_data[predictionResult]?.[type]?.[id];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let response;
  //       if (type === "food") {
  //         console.log(type, "immm tt");
  //         response = await fetch(`http://localhost:5000/food-items/${id}`);
  //       } else if (type === "tea") {
  //         response = await fetch(
  //           `http://localhost:5000/herbal-tea-recommendation/${id}`
  //         );
  //       } else {
  //         throw new Error("Invalid type");
  //       }

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const item = await response.json();
  //       setItemData(item);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [type, id]);

  const capturePage = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fullPageHeight = document.body.scrollHeight;
    let scrollPosition = 0;
    const viewportHeight = window.innerHeight;

    // Helper function to capture the content
    const captureScreenshot = async (startY) => {
      window.scrollTo(0, startY);

      // Ensure the content is fully rendered
      const waitForRender = () =>
        new Promise((resolve) => setTimeout(resolve, 1000));
      await waitForRender();

      // Capture the content into a canvas
      const content = document.querySelector(".r"); // Ensure this selector targets the full content you want to capture

      const canvas = await html2canvas(content, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        background: "#ffffff",

        width: document.documentElement.scrollWidth,
        height: viewportHeight,
      });

      return canvas.toDataURL("image/png");
    };

    while (scrollPosition < fullPageHeight) {
      const dataUrl = await captureScreenshot(scrollPosition);
      const imgProps = doc.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

      if (doc.internal.getNumberOfPages() > 0) {
        doc.addPage();
      }
      doc.addImage(dataUrl, "PNG", 0, 0, pageWidth, imgHeight);

      scrollPosition += viewportHeight;

      // If the next scroll position is beyond the document height, stop
      if (scrollPosition >= fullPageHeight) {
        break;
      }
    }

    // Save the PDF
    doc.save("screenshot.pdf");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // if (!itemData) return <p>No data available</p>;

  return (
    <div className="r">
      <div className="app p-4">
        <div className="flex items-center mb-4">
          <div onClick={handleBack} className="cursor-pointer p-2">
            <img
              src="/assets/images/icons8-back-50.png"
              alt="Back"
              className="w-8 h-8"
            />
          </div>
          <h2 className="text-4xl font-bold ml-2">{itemData.header}</h2>
        </div>

        <img
          src={itemData.image}
          alt={itemData.header}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="relative mb-4 pb-4 ">
          <div
            onClick={capturePage}
            className="absolute top-0 right-0 cursor-pointer "
          >
            <img src="/assets/images/download.svg" alt="Download Screenshot" />
          </div>
        </div>
        <div className="mb-3 capture-section">
          <p className="custom-title">{itemData.title}</p>
        </div>

        {itemData.ingredients && (
          <div className="relative border-dashed border-2 border-gray-400 p-4 bg-[#ffffff] mb-6">
            {/* Custom border class for the yellow upper border */}
            <div className="absolute top-0 left-0 right-0 h-[8px] rounded-lg bg-[#FFEEA0]"></div>
            <h3 className="sub-title text-xl font-semibold mb-1">
              Ingredients
            </h3>
            <div className="absolute top-0 right-1  ">
              <img
                src="/assets/images/icon_ingredients.svg"
                alt="Download Screenshot"
              />
            </div>
            <ul className="list-disc pl-5">
              {itemData.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-1">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative border-dashed border-2 border-gray-400 p-4 bg-[#ffffff] mb-6">
          {itemData.steps && (
            <div className="">
              <div>
                <div>
                  {" "}
                  <div className="absolute top-0 left-0 right-0 h-[8px] rounded-lg bg-[#FF912C]"></div>
                  <h3 className="text-lg font-semibold mb-4">Steps</h3>
                  {itemData.steps.map((step, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold text-md mb-2">
                        Step {step.step}:
                      </h4>
                      <div className="absolute top-0 right-1  ">
                        <img
                          src="/assets/images/icon_Steps.svg"
                          alt="Download Screenshot"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {step.title}
                      </h3>
                      <ul className="list-disc pl-5 step-detail">
                        {step.details.map((detail, subIndex) => (
                          <li key={subIndex} className="mb-1">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {itemData.notes && (
            <div className="mb-4 capture-section">
              <h3 className="text-lg font-semibold mb-2">Notes</h3>
              <ul className="list-disc pl-5">
                {itemData.notes.map((note, index) => (
                  <li key={index} className="mb-1">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {itemData.funFact && (
          <div className="mb-4 capture-section relative border-dashed border-2 border-gray-400 p-4 bg-[#ffffff]">
            <div className="absolute top-0 left-0 right-0 h-[8px] rounded-lg bg-[#FFEEA0] "></div>
            <h3 className="text-lg font-semibold ">Fun Fact</h3>
            <div className="mt-6 "></div>
            <div className="absolute top-0 right-1 ">
              <img
                src="/assets/images/icon_FunFact.svg"
                alt="Download Screenshot"
              />
            </div>
            <p>{itemData.funFact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
