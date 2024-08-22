import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

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
  const options = useMemo(() => countryList().getData(), []);

  const handleHealthIssuesChange = (selectedOptions) => {
    setHealthIssues(selectedOptions.map((option) => option.value));
  };

  const handleHealthGoalsChange = (selectedOptions) => {
    setHealthGoals(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the values
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Country:", country);
    console.log("Energy Level:", energyLevel);
    console.log("Health Issues:", healthIssues);
    console.log("Health Goals:", healthGoals);
    console.log("Email:", email);
    console.log("Receive Updates:", receiveUpdates);
    setSubmitted(true);
  };

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
    <div className="questionnaire">
      <h2>Questionnaire</h2>
      {submitted ? (
        <p>Thank you for completing the questionnaire!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            1. Please select your age:
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="18-25">18 - 25</option>
              <option value="26-35">26 - 35</option>
              <option value="36-45">36 - 45</option>
              <option value="46-55">46 - 55</option>
              <option value="56-65">56 - 65</option>
              <option value="66-above">66 and above</option>
            </select>
          </label>

          <label>
            2. Please select your gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </label>

          <label>
            3. What is your country?
            <Select
              options={options}
              value={country}
              onChange={(value) => setCountry(value)}
            />
          </label>

          <label>
            4. How would you describe your current energy levels? (1-5)
            <select
              value={energyLevel}
              onChange={(e) => setEnergyLevel(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="very_high">Very High</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
              <option value="very_low">Very Low</option>
            </select>
          </label>

          <label>
            5. Do you often experience any of the following? (Select all that
            apply)
            <Select
              options={healthIssuesOptions}
              isMulti
              onChange={handleHealthIssuesChange}
              placeholder="Select health issues..."
            />
          </label>

          <label>
            6. What are your primary health goals? (Select up to three)
            <Select
              options={healthGoalsOptions}
              isMulti
              onChange={handleHealthGoalsChange}
              placeholder="Select health goals..."
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
    </div>
  );
};

export default Questionnaire;
