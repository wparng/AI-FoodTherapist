import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [healthIssues, setHealthIssues] = useState([]);
  const [healthGoals, setHealthGoals] = useState([]);
  const [otherHealthGoal, setOtherHealthGoal] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [modalHeading, setModalHeading] = useState("Warning");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    navigate("/result");
  };

  const handleSelect = (setter) => (value) => {
    setter(value);
  };

  const handleHealthIssuesChange = (issue) => {
    if (healthIssues.includes(issue)) {
      setHealthIssues(healthIssues.filter((item) => item !== issue));
    } else {
      setHealthIssues([...healthIssues, issue]);
    }
  };

  const handleHealthGoalsChange = (goal) => {
    if (goal === "other") {
      if (!healthGoals.includes("other")) {
        setHealthGoals([...healthGoals, "other"]);
      }
    } else {
      if (healthGoals.includes(goal)) {
        setHealthGoals(healthGoals.filter((g) => g !== goal));
      } else {
        if (healthGoals.length < 3) {
          setHealthGoals([...healthGoals, goal]);
        } else {
          setModalMessage("You can only select up to three health goals.");
          setShowModal(true);
        }
      }
    }
  };

  const handleSubmit = () => {
    if (!age || !gender || !country || !energyLevel || !email) {
      setModalMessage("Please fill in all required fields.");
      setShowModal(true);
      return;
    }

    if (healthGoals.includes("other") && !otherHealthGoal) {
      setModalMessage("Please specify your other health goal.");
      setShowModal(true);
      return;
    }

    const submissionData = {
      age: age,
      gender: gender,
      country: country,
      energyLevel: energyLevel,
      healthIssues: healthIssues,
      healthGoals: healthGoals,
      otherHealthGoal: otherHealthGoal,
      // .map((goal) => (goal === "other" ? otherHealthGoal : goal))
      // .join(", ")}
      email: email,
      newsletter: newsletter,
    };

    const sendSubmitRequest = async (submissionData) => {
      try {
        const response = await fetch(process.env.REACT_APP_APIURLSUBMISSION, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: JSON.stringify(submissionData) }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    sendSubmitRequest(submissionData);

    // setModalMessage(submissionData);
    // console.log(submissionData);

    setModalHeading("Submission Info");
    setShowModal(true);
    setSubmitted(true);
    navigate("/result");

    // navigate("/result");
  };

  const ageOptions = [
    { value: "18-25", label: "18 - 25" },
    { value: "26-35", label: "26 - 35" },
    { value: "36-45", label: "36 - 45" },
    { value: "46-55", label: "46 - 55" },
    { value: "56-65", label: "56 - 65" },
    { value: "66-above", label: "66 and above" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ];

  const energyLevelOptions = [
    { value: "very_high", label: "Very High" },
    { value: "high", label: "High" },
    { value: "moderate", label: "Moderate" },
    { value: "low", label: "Low" },
    { value: "very_low", label: "Very Low" },
  ];

  const healthIssuesOptions = [
    { value: "fatigue", label: "Fatigue" },
    { value: "inflammation", label: "Inflammation" },
    { value: "digestive_issues", label: "Digestive Issues" },
    { value: "stress", label: "Stress" },
    { value: "sleep_problems", label: "Sleep Problems" },
    { value: "none", label: "None of the above" },
  ];

  const healthGoalsOptions = [
    { value: "increase_energy", label: "Increase Energy Levels" },
    { value: "reduce_inflammation", label: "Reduce Inflammation" },
    { value: "improve_digiton", label: "Improve Digestion" },
    { value: "manage_weight", label: "Manage Weight" },
    { value: "enhance_sleep", label: "Enhance Sleep Quality" },
    { value: "reduce_stress", label: "Reduce Stress" },
    { value: "other", label: "Other (please specify)" },
  ];

  const steps = [
    {
      label: "1. Please select your age:",
      options: ageOptions,
      setter: setAge,
    },
    {
      label: "2. Please select your gender:",
      options: genderOptions,
      setter: setGender,
    },
    {
      label: "3. What is your country?",
      options: options,
      setter: setCountry,
    },
    {
      label: "4. How would you describe your current energy levels? (1-5)",
      options: energyLevelOptions,
      setter: setEnergyLevel,
    },
    {
      label:
        "5. Do you often experience any of the following? (Select all that apply)",
      options: healthIssuesOptions,
      setter: handleHealthIssuesChange,
      isMulti: true,
    },
    {
      label: "6. What are your primary health goals? (Select up to three)",
      options: healthGoalsOptions,
      setter: handleHealthGoalsChange,
      isMulti: true,
    },
    {
      label: "7. Email:",
      input: true,
      setter: setEmail,
    },
    {
      label: "I’d like to receive new feature updates!",
      checkbox: true,
      setter: setNewsletter,
    },
  ];

  return (
    <div className="app questionnaire">
      <h1>Questionnaire</h1>
      {submitted ? (
        <p>Thank you for completing the questionnaire!</p>
      ) : (
        <div>
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="back-button"
            >
              <FaChevronLeft />
            </button>
          )}
          <div className="questionnaire-step">
            <p>{steps[currentStep].label}</p>
            {currentStep === 2 && (
              <div className="country-list">
                <div className="country-options">
                  {steps[currentStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleSelect(steps[currentStep].setter)(option.value)
                      }
                      className={option.value === country ? "selected" : ""}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentStep !== 2 &&
              currentStep < 4 &&
              steps[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    handleSelect(steps[currentStep].setter)(option.value)
                  }
                  className={
                    option.value ===
                    (currentStep === 0
                      ? age
                      : currentStep === 1
                      ? gender
                      : currentStep === 2
                      ? country
                      : energyLevel)
                      ? "selected"
                      : ""
                  }
                >
                  {option.label}
                </button>
              ))}
            {currentStep === 4 && (
              <div>
                {healthIssuesOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleHealthIssuesChange(option.value)}
                    className={
                      healthIssues.includes(option.value) ? "selected" : ""
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            {currentStep === 5 && (
              <div>
                {healthGoalsOptions.map((goal) => (
                  <div key={goal.value}>
                    <button
                      onClick={() => handleHealthGoalsChange(goal.value)}
                      className={
                        healthGoals.includes(goal.value) ? "selected" : ""
                      }
                    >
                      {goal.label}
                    </button>
                    {goal.value === "other" &&
                      healthGoals.includes("other") && (
                        <input
                          type="text"
                          value={otherHealthGoal}
                          onChange={(e) => setOtherHealthGoal(e.target.value)}
                          placeholder="Please specify"
                          style={{ marginLeft: "10px" }}
                        />
                      )}
                  </div>
                ))}
              </div>
            )}
            {currentStep === 6 && (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            )}
          </div>

          <div className="questionnaire-navigation">
            {currentStep === 0 && (
              <p onClick={handleSkip} className="skip">
                I would like to skip it
              </p>
            )}
            {currentStep === 6 && (
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
                I’d like to receive new feature updates!
              </label>
            )}
            <button onClick={handleNext} className="next">
              {currentStep < 6 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          heading={modalHeading}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Questionnaire;
