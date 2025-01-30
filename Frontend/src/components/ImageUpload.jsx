import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [analysis, setAnalysis] = useState(null);

  const languages = {
    en: "Give response in English",
    kn: "ಕನ್ನಡದಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ",
    hi: "हिंदी में प्रतिक्रिया दें",
    te: "తెలుగులో ప్రతిస్పందన ఇవ్వండి",
    ta: "தமிழில் பதிலளிக்கவும்",
    mr: "मराठीत प्रत्युत्तर द्या",
    ml: "മലയാളത്തിൽ പ്രതികരിക്കുക",
  };

  const handleFileChange = (e) => {
    setResults(null);
    setAnalysis(null);
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return alert("Please upload an image first!");
    setLoading(true);
    setResults(null);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResults({ title: "Error", description: "Failed to analyze image. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const getDetailedAnalysis = async () => {
    if (!results) return;
    const data = {
      disease_name: results.title,
      language: selectedLanguage,
    };
    try {
      setAnalysisLoading(true);
      setAnalysis(null);
      const response = await axios.post("http://localhost:5000/analysis", data, {
        headers: { "Content-Type": "application/json" },
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error("Error fetching detailed analysis:", error);
      setAnalysis({ error: "Failed to fetch analysis. Try again." });
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center">
      <header className="w-full bg-green-600 text-white text-center py-4 text-2xl font-bold flex justify-between px-8 shadow-md">
        <button className="text-white text-lg cursor-pointer" onClick={() => navigate("/")}>Home</button>
        <span>KrishiMitra</span>
        <button className="text-white text-lg cursor-pointer" onClick={() => setImage(null)}>Reset</button>
      </header>
      <div className="flex justify-center mt-10 px-4 w-full max-w-3xl">
        <div className="bg-white rounded-3xl shadow-lg p-6 w-full">
          <h1 className="text-center text-green-600 text-2xl font-semibold mb-6">
            Crop Disease Detector 🌱
          </h1>
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload Crop Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {image && (
            <div className="mt-4 flex flex-col items-center">
              <img src={image} alt="Uploaded crop" className="rounded-lg shadow-lg w-60 h-60 object-cover" />
              <button
                onClick={analyzeImage}
                className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Image"}
              </button>
            </div>
          )}
          {results && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">{results.title}</h2>
              <p className="text-sm text-gray-700">{results.description}</p>
              <h3 className="mt-4 text-md font-semibold text-gray-800">Recommended Supplement:</h3>
              <p className="text-sm text-gray-600">{results.supplement.name}</p>
              <img src={results.supplement.image_url} alt="Supplement" className="mt-2 rounded-lg shadow-lg w-40 h-40 object-cover" />
              <a href={results.supplement.buy_link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 hover:underline">Buy Here</a>
              <label className="block mt-4 text-sm font-medium text-gray-700">Select Language for Analysis</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                {Object.keys(languages).map((lang) => (
                  <option key={lang} value={lang}>{languages[lang]}</option>
                ))}
              </select>
              <button
                onClick={getDetailedAnalysis}
                className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                {analysisLoading ? "Analyzing..." : "Get Detailed Analysis"}
              </button>
            </div>
          )}
          {analysis && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h3 className="text-md font-semibold text-gray-900">Detailed Analysis:</h3>
              <p className="mt-1 text-sm text-gray-700">{analysis.description || analysis.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;