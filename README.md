<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Attendify Banner" width="100%" />

  <br />
  <br />

  <h1>🚀 Attendify</h1>
  <p>
    <b>The Ultimate Academic Attendance Ledger & Cognitive Analytics Engine.</b>
  </p>

  <p>
    <a href="#features"><strong>Explore Features</strong></a> ·
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#roadmap"><strong>Roadmap</strong></a>
  </p>

  <br />
</div>

---

## ✨ Overview

**Attendify** is a master-crafted, modern web application designed to solve the age-old problem of attendance tracking for students. It acts as a comprehensive academic ledger, meticulously logging daily lectures while providing predictive analytics on your attendance trajectory. With an embedded **"Bunk Calculator"**, predictive forecasting, and streak tracking, Attendify gives you absolute control over your academic journey.

---

## 💎 Elite Features

- **📊 Comprehensive Dashboard:** Get a bird's-eye view of your current standing, total lectures, and immediate academic health.
- **📅 Interactive Calendar Ledger:** Effortlessly log your daily lectures as `present`, `absent`, or `cancelled` via an intuitive, slide-over day panel.
- **📈 Advanced Analytics & Streaks:** Visualize your attendance trends with rich charts (powered by Recharts), calculate exact percentages, and track your consecutive presentation streaks.
- **🧮 Bunk Calculator:** The ultimate student tool. Dynamically calculate exactly how many lectures you can skip while maintaining your target attendance threshold.
- **⚡ Real-time Firebase Sync:** Secure, instant synchronization of your data across all devices utilizing Firebase Authentication and Cloud Storage.
- **🔮 Forecast & Achievements:** Predictive insights on where your attendance is headed, gamified with un-lockable milestones.

---

## 🛠 Tech Stack

Built with an uncompromising standard for performance and developer experience:

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Database & Auth:** Google Firebase 12
- **Data Visualization:** Recharts
- **Styling & Iconography:** Tailwind CSS + Lucide React
- **Date Manipulation:** Date-fns

---

## 🚀 Getting Started

Follow these instructions to spin up your local instance of Attendify.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/attendify.git
   cd attendify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` to explore the app!

---

## 🧱 Architecture Highlights

Attendify is architected using a feature-based structure to ensure high maintainability:

```
src/
├── components/       # Reusable UI widgets & modular page sections (Dashboard, Calendar, BunkCalculator)
├── services/         # Firebase initialization, Storage APIs, Authentication Logic
├── types.ts          # Centralized TypeScript interfaces (DailyRecord, StatsData, UserProfile)
├── App.tsx           # Global state router and authentication gateway
└── index.tsx         # React DOM bootstrapper
```

---

## 🗺 Roadmap

- [x] Initial Authentication & Dashboard
- [x] Interactive Calendar Logging
- [x] Bunk Calculator implementation
- [ ] Push Notifications for upcoming lectures
- [ ] Timetable Integration (Auto-populate weekly subjects)
- [ ] Dark/Light Mode Advanced Theming
- [ ] Offline PWA Support

---

## 📄 License & Copyright

Designed and engineered for perfection. 

Copyright &copy; 2026. All Rights Reserved. This project requires explicit permission for commercial reproduction. Please contact the repository owner.

---

<div align="center">
  <i>"Never worry about your attendance again. Let Attendify calculate it for you."</i>
</div>
