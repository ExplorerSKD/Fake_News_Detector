📰 Fake News Detector

The Fake News Detector is a full-stack web app that identifies and flags misleading or false information in real time. Built with Next.js (React) and Node.js (Express), and powered by Firebase, it leverages AI/NLP models and fact-checking APIs to classify text, URLs, and images as True, Fake, or Suspicious.

🚀 Features

🔍 Text & URL Analysis – Detects misinformation with NLP + fact-checking APIs.

🧠 Fact Verification – Cross-checks claims against reliable fact-checking sources.

🖼️ Image Analysis – Detects manipulated/misleading images.

⚡ Real-Time Detection – Provides instant credibility results.

📊 Dashboard – View scores, reports, and trends.

🔐 Firebase Auth – Secure login & user management.

☁️ Firebase Firestore & Storage – Store detection history & uploaded images.

🛠️ Tech Stack

Frontend: Next.js (React), Tailwind CSS

Backend: Node.js, Express.js

Database: Firebase Firestore

Storage: Firebase Storage

Auth: Firebase Authentication

AI/NLP: Hugging Face Transformers / Gemini API / OpenAI API

Image Analysis: TensorFlow / OpenCV

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/fake-news-detector.git
cd fake-news-detector

2. Install Dependencies
Frontend (Next.js)
cd frontend
npm install

Backend (Node.js)
cd backend
npm install

3. Firebase Setup

Go to Firebase Console

Create a Firebase Project

Enable:

Firestore Database

Firebase Authentication (Email/Password or Google Sign-in)

Firebase Storage

Get your Firebase SDK Config (for frontend) and Service Account Key (for backend).

4. Environment Variables
Backend (/backend/.env)
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
FACT_CHECK_API_KEY=your_api_key
GEMINI_API_KEY=your_gemini_key

Frontend (/frontend/.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

5. Run the Application
Backend
cd backend
npm run dev

Frontend
cd frontend
npm run dev


App runs on:

Frontend: http://localhost:3000

Backend: http://localhost:5000

📊 Usage

🔹 Enter a headline, article, or URL → system analyzes and verifies.

🔹 Upload an image → system checks for manipulation.

🔹 Results shown as True / Fake / Suspicious with explanation + confidence score.

🔹 Users can save results to Firebase (Firestore) and view history.

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch

Commit changes

Submit a pull request
