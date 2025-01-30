import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CropYield = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Crop: "",
    Season: "",
    State: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
  });
  const [result, setResult] = useState(null);

  const crops = [
       'Arecanut', 'Arhar/Tur', 'Castor seed', 'Coconut ', 'Cotton(lint)',
       'Dry chillies', 'Gram', 'Jute', 'Linseed', 'Maize', 'Mesta',
       'Niger seed', 'Onion', 'Other  Rabi pulses', 'Potato',
       'Rapeseed &Mustard', 'Rice', 'Sesamum', 'Small millets',
       'Sugarcane', 'Sweet potato', 'Tapioca', 'Tobacco', 'Turmeric',
       'Wheat', 'Bajra', 'Black pepper', 'Cardamom', 'Coriander',
       'Garlic', 'Ginger', 'Groundnut', 'Horse-gram', 'Jowar', 'Ragi',
       'Cashewnut', 'Banana', 'Soyabean', 'Barley', 'Khesari', 'Masoor',
       'Moong(Green Gram)', 'Other Kharif pulses', 'Safflower',
       'Sannhamp', 'Sunflower', 'Urad', 'Peas & beans (Pulses)',
       'other oilseeds', 'Other Cereals', 'Cowpea(Lobia)',
       'Oilseeds total', 'Guar seed', 'Other Summer Pulses', 'Moth'
  ];

  const seasons = ['Whole Year ', 'Kharif     ', 'Rabi       ', 'Autumn     ',
       'Summer     ', 'Winter     '];

  const states = [
    'Assam', 'Karnataka', 'Kerala', 'Meghalaya', 'West Bengal',
       'Puducherry', 'Goa', 'Andhra Pradesh', 'Tamil Nadu', 'Odisha',
       'Bihar', 'Gujarat', 'Madhya Pradesh', 'Maharashtra', 'Mizoram',
       'Punjab', 'Uttar Pradesh', 'Haryana', 'Himachal Pradesh',
       'Tripura', 'Nagaland', 'Chhattisgarh', 'Uttarakhand', 'Jharkhand',
       'Delhi', 'Manipur', 'Jammu and Kashmir', 'Telangana',
       'Arunachal Pradesh', 'Sikkim'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/yield", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction", error);
      setResult({ error: "Failed to get recommendation." });
    }
  };
  const handleReset = () => {
    setFormData({
    Crop: "",
    Season: "",
    State: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
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
            Crop Yield Prediction System 🌱
          </h1>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div className="mb-5" key={key}>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {key} {getUnit(key)}:
                </label>
                {key === "Crop" ? (
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Select</option>
                    {crops.map((crop, index) => (
                      <option key={index} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                ) : key === "Season" ? (
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Select</option>
                    {seasons.map((season, index) => (
                      <option key={index} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                ) : key === "State" ? (
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Select</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={key === "Area" || key === "Annual_Rainfall" ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  />
                )}
              </div>
            ))}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white text-lg px-6 py-3 rounded-2xl hover:bg-green-700 focus:outline-none transition duration-200"
              >
                Get Prediction
              </button>
            </div>
          </form>

          {result && (
            <div className="card mt-6 bg-green-400 text-black-bold rounded-2xl p-4">
              <div className="card-body text-center">
                <p className="card-text">{result.prediction ? `${result.prediction} tons` : result.error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-green-600 text-white text-center py-4 mt-10">
        copy right&copy; {new Date().getFullYear()} KrishiMitra. All rights reserved.
      </footer>
    </div>
  );

  function getUnit(key) {
    const units = {
      Crop: "",
      Season: "",
      State: "",
      Area: "(hectare)",
      Annual_Rainfall: "(mm)",
      Fertilizer: "(Kg)",
      Pesticide: "(Liters)",
    };
    return units[key];
  }
};

export default CropYield;
