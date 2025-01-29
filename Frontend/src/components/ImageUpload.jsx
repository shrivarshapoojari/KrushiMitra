// import React, { useState } from "react"
// import axios from "axios"

// function ImageUpload()
//  {
//   const [image, setImage] = useState(null)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [results, setResults] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [selectedLanguage, setSelectedLanguage] = useState("kn")
//   const[ analysis,setAnalysis]=useState(null)
//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setSelectedFile(file)
//       setResults(null)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImage(reader.result)
//         setResults(null)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const analyzeImage = async () => {
//     if (!selectedFile) return alert("Please upload an image first!")
//     setLoading(true)
//     setResults(null)
//     const formData = new FormData()
//     formData.append("image", selectedFile)

//     try {
//       const response = await axios.post("http://localhost:5000/predict", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })

//       setResults(response.data)
//     } catch (error) {
//       console.error("Error analyzing image:", error)
//       setResults({ title: "Error", description: "Failed to analyze image. Try again." })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getDetailedAnalysis = () =>
//      {
//     if (!results) return
   
//     const data={
//       disease: results.title,
//       language:selectedLanguage
//     }
//     setLoading(true)
//     try {
//       const response = await axios.post("http://localhost:5000/analysis", formData, {
//         headers: { "Content-Type": "application/json" },
//       })

//       setResults(response.data)
//     } catch (error) {
//       console.error("Error analyzing image:", error)
//       setResults({ title: "Error", description: "Failed to analyze image. Try again." })
//     } finally {
//       setLoading(false)
//     }
//   }
    
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
//         <div className="md:flex">
//           <div className="p-8">
//             <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-3">
//               Crop Disease Detector
//             </h2>

//             <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
//               Upload Crop Image
//             </label>
//             <input
//               type="file"
//               id="image-upload"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                          file:rounded-full file:border-0 file:text-sm file:font-semibold
//                          file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             />

//             {image && (
//               <div className="mt-4">
//                 <img src={image} alt="Uploaded crop" className="rounded-lg shadow-lg" />
//                 <button
//                   onClick={analyzeImage}
//                   className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md
//                              text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
//                              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   disabled={loading}
//                 >
//                   {loading ? "Analyzing..." : "Analyze Image"}
//                 </button>
//               </div>
//             )}

//             {results && (
//               <div className="mt-4">
//                 <h2 className="text-lg font-semibold text-gray-900">{results.title}</h2>
//                 <p className="mt-1 text-sm text-gray-600">{results.description}</p>

                

//                 <button
//                   onClick={getDetailedAnalysis}
//                   className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md
//                              text-white bg-green-600 hover:bg-green-700 focus:outline-none 
//                              focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                 >
//                   Get Detailed Analysis
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ImageUpload



import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [analysis, setAnalysis] = useState(null);

  const languages = {
    en: "Give response in English",
    kn: "ಕನ್ನಡದಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ", // Kannada
    hi: "हिंदी में प्रतिक्रिया दें", // Hindi
    te: "తెలుగులో ప్రతిస్పందన ఇవ్వండి", // Telugu
    ta: "தமிழில் பதிலளிக்கவும்", // Tamil
    mr: "मराठीत प्रत्युत्तर द्या", // Marathi
    ml: "മലയാളത്തിൽ പ്രതികരിക്കുക", // Malayalam
  };
  
  

  // const languages = {
  //   en: "English",
  //   kn: "Kannada",
  //   hi: "Hindi",
  //   te: "Telugu",
  //   ta: "Tamil",
  //   mr: "Marathi",
  // };
  

  const handleFileChange = (e) => {
    setResults(null);
    setAnalysis(null);
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResults(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () =>
     {
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

  const getDetailedAnalysis = async () => 
    {
    if (!results) return;
     
     
    const data = {
      disease_name: results.title,
      language: selectedLanguage,
    };
     
       console.log(selectedLanguage)
    try {
      setAnalysisLoading(true)
      setAnalysis(null)
      const response = await axios.post("http://localhost:5000/analysis", data, {
        headers: { "Content-Type": "application/json" },
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error("Error fetching detailed analysis:", error);
      setAnalysis({ error: "Failed to fetch analysis. Try again." });
    } finally {
         setAnalysisLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-3">
              Crop Disease Detector
            </h2>

            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
              Upload Crop Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />

            {image && (
              <div className="mt-4">
                <img src={image} alt="Uploaded crop" className="rounded-lg shadow-lg" />
                <button
                  onClick={analyzeImage}
                  className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md
                             text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                             focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze Image"}
                </button>
              </div>
            )}

            {results && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">{results.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{results.description}</p>
                <h3 className="mt-4 text-md font-semibold text-gray-800">Recommended Supplement:</h3>
                <p className="text-sm text-gray-600">{results.supplement.name}</p>
                <img src={results.supplement.image_url} alt="Supplement" className="mt-2 rounded-lg shadow-lg" />
                
                <a
                  href={results.supplement.buy_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-600 hover:underline"
                >
                  Buy Here
                </a>

                
                <label htmlFor="language" className="block mt-4 text-sm font-medium text-gray-700">
                  Select Language for Analysis
                </label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {Object.keys(languages).map((lang) => (
                    <option key={lang} value={lang}>{languages[lang]}</option>
                  ))}
                </select>
                
                <button
                  onClick={getDetailedAnalysis}
                  className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md
                             text-white bg-green-600 hover:bg-green-700 focus:outline-none 
                             focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                   {analysisLoading? "Analyzing...":"Get Detailed Analysis"}
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
    </div>
  );
}

export default ImageUpload;
