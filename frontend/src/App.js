import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UploadPhoto from "./components/UploadPhoto";
import Questionnaire from "./components/Questionnaire";
import "./App.css";
import Recommendation from "./components/recommendation/Recommendation";
import FoodDetails from "./components/recommendation/FoodDetail";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/food-details/:type/:id" element={<FoodDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
