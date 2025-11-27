📘 Attendify – Smart Attendance Tracking Portal

Attendify is a modern, student-friendly attendance management portal built with React + TypeScript, Firebase Authentication, and Firestore.
It helps students track attendance, forecast shortages, calculate bunks, and manage daily lecture records with ease.

🚀 Features
🎫 Authentication

Login with Email & Password

Register new user accounts

User profile stored in Firestore

Session persistence

🗓 Calendar & Attendance

Mark attendance: Present / Absent / Cancelled / None

Daily lecture tracking

Notes per lecture

Slide-over day panel

Full calendar with color-coded status

📊 Dashboard

Today’s attendance summary

Attendance statistics

Percentage overview

Present/Absent counts

Streak (consecutive present days)

📈 Stats Page

Full analytics

Attendance trends

Overall performance

🧮 Bunk Calculator

Calculate allowed bunks

How many classes needed to reach 75%

Smart prediction

📅 Forecast

Predict upcoming attendance scenarios

Helps plan bunks ahead

🎨 Modern UI

Tailwind-based glassmorphism UI

Neon gradients & animations

Fully responsive

Clean + smooth UX

🛠 Tech Stack
Frontend

React

TypeScript

Vite

TailwindCSS

date-fns

Backend

Firebase Authentication

Firebase Firestore

Firebase Storage (optional for profile photos)

Deployment

Vercel (Multi-page support)

📁 Project Structure
attendify/
├── components/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Calendar.tsx
│   ├── DayPanel.tsx
│   ├── Stats.tsx
│   ├── Forecast.tsx
│   ├── BunkCalculator.tsx
│   └── Layout.tsx
│
├── services/
│   ├── firebase.ts
│   └── storage.ts
│
├── index.tsx
├── App.tsx
├── index.html
├── register.html
├── src/
│   └── register.tsx
│
├── vite.config.ts
└── tsconfig.json

🔧 Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/attendify.git
cd attendify

2️⃣ Install dependencies
npm install

🔥 Firebase Configuration
1. Go to Firebase Console

https://console.firebase.google.com/

2. Create a Web App

Copy the Firebase SDK config:

apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: ""

3. Add environment variables

Create .env.local:

VITE_FIREBASE_API_KEY=xxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxx
VITE_FIREBASE_PROJECT_ID=xxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
VITE_FIREBASE_APP_ID=xxxxx

4. Firebase Auth

Enable Email/Password login.

5. Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;

      match /attendance/{date} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }

    match /holidays/{holidayId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

🧩 Multi-Page Vite Configuration

Your vite.config.ts must include:

build: {
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, 'index.html'),
      register: path.resolve(__dirname, 'register.html')
    }
  }
}


This ensures /register works on Vercel.

▶️ Run Development Server
npm run dev


App runs at:

http://localhost:3000

📦 Build for Production
npm run build

☁️ Deploy to Vercel
vercel --prod

📸 Screenshots (Add your images)
![Login](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Calendar](screenshots/calendar.png)

🧑‍💻 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss the changes.

📄 License

MIT License © 2025
