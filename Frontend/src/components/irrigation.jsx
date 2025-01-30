import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IrrigationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Crop: "",
    N: "",
    P: "",
    K: "",
    Moisture: "",
    Temperature: "",
    pH: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const cropDict = {
    Cotton: 1,
    Sugarcane: 2,
    Maize: 3,
    Wheat: 4,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!formData.Crop) {
      setError("Please select a crop");
      return;
    }

    const modifiedData = {
      ...formData,
      Crop: cropDict[formData.Crop], // Convert crop name to number
    };

    try {
      const response = await axios.post("http://localhost:5000/irrigation", modifiedData);
      setResult(response.data.state);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleReset = () => {
    setFormData({
      Crop: "",
      N: "",
      P: "",
      K: "",
      Moisture: "",
      Temperature: "",
      pH: "",
    });
    setResult(null);
    setError(null);
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
      <div className="flex justify-center mt-5 px-2 w-full max-w-2xl">
  <div className="bg-white rounded-2xl shadow-lg p-4 w-full">
    <h1 className="text-center text-green-600 text-2xl font-semibold mb-4">
      Irrigation Prediction System 💧
    </h1>
    <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Crop:
              </label>
              <select
                name="Crop"
                value={formData.Crop}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                required
              >
                <option value="">Select Crop</option>
                {Object.keys(cropDict).map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
            {[
              { label: "Nitrogen (N)", name: "N", unit: "mg/kg" },
              { label: "Phosphorus (P)", name: "P", unit: "mg/kg" },
              { label: "Potassium (K)", name: "K", unit: "mg/kg" },
              { label: "Moisture", name: "Moisture", unit: "%" },
              { label: "Temperature", name: "Temperature", unit: "°C" },
              { label: "pH", name: "pH", unit: "" },
            ].map(({ label, name, unit }) => (
              <div key={name} className="mb-5">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {label} ({unit}):
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
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
                Predict
              </button>
            </div>
          </form>

          {result && (
            <div
              className={`card mt-6 text-center p-4 rounded-lg ${
                result === "On" ? "bg-red-500" : "bg-green-500"
              } text-white`}
            >
              <p className="card-text">Turn {result} the Pump</p>
            </div>
          )}

          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-green-600 text-white text-center py-4 mt-10">
       copyright &copy; {new Date().getFullYear()} KrishiMitra. All rights reserved.
      </footer>
    </div>
  );
};

export default IrrigationForm;
