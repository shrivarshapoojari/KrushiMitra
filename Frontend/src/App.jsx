import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ImageUpload from "./components/ImageUpload"
import HomePage from "./components/homePage"
import CropRecommendation from "./components/croprec"
import CropYield from "./components/cropyield"
import IrrigationForm from "./components/irrigation"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/detect-disease" element={<ImageUpload />} />
        <Route path="/predict-yield" element={< CropYield/>} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/smart-irrigation" element={<IrrigationForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
