import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UploadPhoto from "./components/UploadPhoto";
import Questionnaire from "./components/Questionnaire";
import "./App.css";
import Recommendation from "./components/recommendation/Recommendation";
import FoodDetails from "./components/recommendation/FoodDetail";
import PermissionRequest from "./components/PermissionRequest";
import Result from "./components/Result";

function App() {
  const [predictionResult, setPredictionResult] = useState("TWF");

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/permission-request" element={<PermissionRequest />} />
          <Route
            path="/upload-photo"
            element={<UploadPhoto setPredictionResult={setPredictionResult} />}
          />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route
            path="/result"
            element={<Result predictionResult={predictionResult} />}
          />
          <Route
            path="/recommendations"
            element={<Recommendation predictionResult={predictionResult} />}
          />
          <Route path="/food-details/:type/:id" element={<FoodDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
