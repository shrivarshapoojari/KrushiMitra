import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CropRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    Ph: "",
    Rainfall: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/recommend", formData, {
        headers: { "Content-Type": "application/json" }, // Send data as JSON
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction", error);
      setResult({ error: "Failed to get recommendation." });
    }
  };
  const handleReset = () => {
    setFormData({
      Nitrogen: "",
      Phosphorus: "",
      Potassium: "",
      Temperature: "",
      Humidity: "",
      Ph: "",
      Rainfall: "",
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-green-600 text-white text-center py-4 text-2xl font-bold flex justify-between px-8 shadow-md">
        <button className="text-white text-lg cursor-pointer" onClick={() => navigate("/")}>Home</button>
        <span>KrishiMitra</span>
        <button className="text-white text-lg cursor-pointer" onClick={handleReset}>Reset</button>
      </header>

      {/* Form Card */}
      <div className="flex justify-center mt-10 px-4 w-full max-w-3xl">
        <div className="bg-white rounded-3xl shadow-lg p-6 w-full">
          <h1 className="text-center text-green-600 text-2xl font-semibold mb-6">
            Crop Recommendation System 🌱
          </h1>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div className="mb-5" key={key}>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {key} {getUnit(key)}:
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            ))}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white text-lg px-6 py-3 rounded-2xl hover:bg-green-700 focus:outline-none transition duration-200"
              >
                Get Recommendation
              </button>
            </div>
          </form>

          {result && (
            <div className="card mt-6 bg-green-400 text-black-bold rounded-2xl p-4">
              <div className="card-body text-center">
                <p className="card-text">{result.message || result.error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-green-600 text-white text-center py-4 mt-10">
        &copy; {new Date().getFullYear()} KrishiMitra. All rights reserved.
      </footer>
    </div>
  );

  function getUnit(key) {
    const units = {
      Nitrogen: "(mg/kg)",
      Phosphorus: "(mg/kg)",
      Potassium: "(mg/kg)",
      Temperature: "(°C)",
      Humidity: "(%)",
      Ph: "",
      Rainfall: "(mm)",
    };
    return units[key];
  }
};

export default CropRecommendation;
