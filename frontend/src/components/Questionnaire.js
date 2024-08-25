import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Modal from "./Modal";

const Questionnaire = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [healthIssues, setHealthIssues] = useState([]);
  const [healthGoals, setHealthGoals] = useState([]);
  const [email, setEmail] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleHealthIssuesChange = (selectedOptions) => {
    setHealthIssues(selectedOptions.map((option) => option.value));
  };

  const handleHealthGoalsChange = (selectedOptions) => {
    if (selectedOptions.length > 3) {
      selectedOptions = selectedOptions.slice(0, 3);
    }
    setHealthGoals(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!age || !gender || !energyLevel || !email) {
      setModalMessage("Please fill in all required fields.");
      setShowModal(true);
      return;
    }

    const submissionData = `
      Age: ${age}
      Gender: ${gender}
      Country: ${country}
      Energy Level: ${energyLevel}
      Health Issues: ${healthIssues.join(", ")}
      Health Goals: ${healthGoals.join(", ")}
      Email: ${email}
    `;

    setModalMessage(
      `Thank you for completing the questionnaire!\n\n${submissionData}`
    );
    setShowModal(true);
    setSubmitted(true);
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

  return (
    <div className="app questionnaire">
      <h1>Questionnaire</h1>
      {submitted ? (
        <p>Thank you for completing the questionnaire!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            1. Please select your age:
            <Select
              options={ageOptions}
              value={ageOptions.find((option) => option.value === age)}
              onChange={(selectedOption) => setAge(selectedOption.value)}
              classNamePrefix="react-select"
            />
          </label>

          <label>
            2. Please select your gender:
            <Select
              options={genderOptions}
              value={genderOptions.find((option) => option.value === gender)}
              onChange={(selectedOption) => setGender(selectedOption.value)}
              classNamePrefix="react-select"
            />
          </label>

          <label>
            3. What is your country?
            <Select
              options={options}
              value={country}
              onChange={(value) => setCountry(value)}
              classNamePrefix="react-select"
            />
          </label>

          <label>
            4. How would you describe your current energy levels? (1-5)
            <Select
              options={energyLevelOptions}
              value={energyLevelOptions.find(
                (option) => option.value === energyLevel
              )}
              onChange={(selectedOption) =>
                setEnergyLevel(selectedOption.value)
              }
              classNamePrefix="react-select"
            />
          </label>

          <label>
            5. Do you often experience any of the following? (Select all that
            apply)
            <Select
              options={healthIssuesOptions}
              isMulti
              onChange={handleHealthIssuesChange}
              placeholder="Select health issues..."
              classNamePrefix="react-select"
            />
          </label>

          <label>
            6. What are your primary health goals? (Select up to three)
            <Select
              options={healthGoalsOptions}
              isMulti
              onChange={handleHealthGoalsChange}
              placeholder="Select health goals..."
              value={healthGoalsOptions.filter((option) =>
                healthGoals.includes(option.value)
              )}
              classNamePrefix="react-select"
            />
          </label>
          <label>
            If you selected "Other", please specify:
            <input
              type="text"
              value={healthGoals.includes("other") ? "" : ""}
              onChange={(e) => {
                if (healthGoals.includes("other")) {
                  setHealthGoals([
                    ...healthGoals.filter((goal) => goal !== "other"),
                    e.target.value,
                  ]);
                }
              }}
              placeholder="Please specify"
            />
          </label>
          <label>
            7. Email:
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <input
              type="checkbox"
              checked={receiveUpdates}
              onChange={() => setReceiveUpdates(!receiveUpdates)}
            />
            I’d like to receive new feature updates!
          </label>

          <button type="submit">Submit</button>
        </form>
      )}
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Questionnaire;
