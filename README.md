# KrushiMitra
 

This project is a web-based  Farmer assistant system. The system comprises a **Backend** (Flask API) and a **Frontend** (React.js).

---

## Features

- Upload crop images to detect diseases.
- Get detailed analyses, including disease overview, symptoms, treatments, and preventive measures.
- Language support for English, Kannada, Hindi, Telugu, Tamil, and Marathi, Malayalam,
- predict crop yield
- get crop recommendation
- get fertilizer recommendation
 
---

## Prerequisites

1. Python 3.x
2. Node.js (v14 or higher recommended)
3. npm (Node Package Manager)

---

## Getting Started

### 1. Backend Setup
   Download the model from below link and keep it inside Backend folder.
     
     https://drive.google.com/file/d/1Gam6zYAPXq7jpTRhfWzIOLgGWjcMUGSO/view?usp=drive_link
    
1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
2. Create a virtual environment:
   ```bash
   py -3 -m venv .venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the backend server:
   ```bash
   python app.py
   ```
   The server will start at `http://localhost:5000`.

### 2. Frontend Setup

1. Open a new terminal window.
2. Navigate to the `Frontend` folder:
   ```bash
   cd Frontend
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:3000`.

---

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Upload an image of a crop with visible disease symptoms.
3. Select your preferred language for detailed analysis.
4. View the results and follow the provided recommendations.

---

## File Structure

```
KrushiMitra/
├── Backend/
│   ├── app.py
│   ├── requirements.txt
└── Frontend/
    ├── src/
    ├── package.json
    └── ...
```

---

## Troubleshooting

- If you encounter issues during dependency installation, ensure you are using the correct versions of Python and Node.js.
- Ensure the backend server is running before interacting with the frontend.

---

 
 

