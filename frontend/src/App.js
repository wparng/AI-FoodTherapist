import React from "react";
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
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/permission-request" element={<PermissionRequest />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/result" element={<Result />} />
          <Route path="/recommendation/:id" element={<Recommendation />} />

          {/* <Route
            path="/recommendations"
            element={<Recommendation predictionResult={predictionResult} />}
          /> */}
          <Route path="TYF/:type/:id" element={<FoodDetails />} />
          <Route path="TWF/:type/:id" element={<FoodDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
