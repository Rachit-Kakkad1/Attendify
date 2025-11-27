🌌 Attendify – Smart Attendance Portal
Your all-in-one attendance tracking, forecasting, analytics & student productivity hub.
<p align="center"> <img src="https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Firebase-Backend-DD2C00?style=for-the-badge&logo=firebase&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/TailwindCSS-Design-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" /> </p>
<p align="center"> <img src="/screenshots/attendify-banner.png" width="100%" alt="Attendify Banner"/> </p>
🚀 What is Attendify?

Attendify is a next-gen, elegant Attendance Management Portal for students who want more control and insights over their academics.
Built with React + TypeScript, powered by Firebase Authentication & Firestore, and enhanced with Neon Tailwind UI.

🎬 Live Demo
<p align="center"> <img src="/screenshots/demo.gif" width="700" alt="Attendify Demo"/> </p>

Replace with your GIF demo for maximum impact.

✨ Why Attendify? (Key Features)
🔐 Authentication

Login with Email + Password

Firebase-secured user sessions

Dedicated Registration Page

Auto-loaded User Profiles

📅 Attendance Management

Daily lecture tracking

Present / Absent / Cancelled / None

Add lecture notes

Slide-over Day Panel

Calendar view with heat levels

📊 Analytics & Stats

Auto-calculated percentage

Present/Absent totals

Attendance streak

Historical graph (optional extension)

🔮 Forecasting

Predict future attendance

See whether you’ll drop below 75%

Smart advice on managing attendance

🧮 Bunk Calculator

Current percentage

Safe bunks remaining

Required classes to reach 75%

🎨 Neon Glassmorphism UI

TailwindCSS

Neon gradients

Blur effects

Smooth animations

Fully responsive

🧱 Tech Stack Overview
<p align="center"> <img src="https://skillicons.dev/icons?i=react,ts,firebase,vite,tailwind" height="50"/> </p>
📁 Directory Structure
<details> <summary><strong>Click to expand</strong></summary>
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
│   ├── Layout.tsx
│   └── Sidebar.tsx
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
├── tsconfig.json
└── README.md

</details>
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/attendify.git
cd attendify

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev


Local Preview →

http://localhost:3000

🔥 Firebase Configuration
<details> <summary><strong>Click to expand Firebase Setup</strong></summary>
1. Create Firebase Project

https://console.firebase.google.com

2. Create Web App

Copy your firebaseConfig:

apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: ""

3. Add environment variables

Create .env.local:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

4. Enable Firebase Auth

Activate Email/Password.

5. Set Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;

      match /attendance/{date} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }

    match /holidays/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

</details>
🌐 Multi-Page Vite (for /register)

Make sure vite.config.ts includes:

build: {
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, "index.html"),
      register: path.resolve(__dirname, "register.html"),
    }
  }
}


This ensures /register works on Vercel.

🚀 Build for Production
npm run build


Generates production build in:

dist/

☁️ Deploying on Vercel
vercel --prod

🔑 Make sure to add Firebase ENV variables in:

Vercel → Project Settings → Environment Variables

🖼 Screenshots

Add your real screenshots for a premium README.

<p align="center"> <img src="/screenshots/login.png" width="300" /> <img src="/screenshots/dashboard.png" width="300" /> <img src="/screenshots/calendar.png" width="300" /> </p>
🛣️ Future Improvements

Google Sign-In

Attendance prediction using ML

Dark/Light Auto Mode

Export attendance to CSV

Push notifications

Admin panel for teachers

🤝 Contributing

Pull requests are always welcome.
Please open an issue to discuss major changes.

📄 License

MIT © 2025
