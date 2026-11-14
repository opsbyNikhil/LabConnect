<div align="center">

# 🧪 LabConnect

### Smart Diagnostic Laboratory Management System

**Book Tests. Manage Appointments. Access Medical Reports.**

A modern, responsive diagnostic laboratory management platform built with React and Ant Design.

<br />

![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Fast%20Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-UI-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Project Objectives](#-project-objectives)
3. [Features](#-features)
4. [Technology Stack](#-technology-stack)
5. [Project Architecture](#-project-architecture)
6. [Installation and Setup](#-installation-and-setup)
7. [Running the Application](#-running-the-application)
8. [Application Routes](#-application-routes)
9. [Data Storage](#-data-storage)
10. [Medical Report Workflow](#-medical-report-workflow)
11. [Admin Module](#-admin-module)
12. [Patient Module](#-patient-module)
13. [Production Build](#-production-build)
14. [Future Enhancements](#-future-enhancements)
15. [Disclaimer](#-disclaimer)

---

## 🚀 Project Overview

**LabConnect** is a web-based Diagnostic Laboratory Management System designed to simplify laboratory operations and improve the patient experience.

The application provides two major interfaces:

- **Patient Portal:** Allows patients to register, log in, browse diagnostic tests, book appointments, manage bookings, and access medical reports.
- **Admin Dashboard:** Allows administrators to manage patients, diagnostic tests, appointments, medical reports, and analytics.

The application focuses on providing a clean, user-friendly interface with organized workflows and centralized management.

---

## 🎯 Project Objectives

- Simplify diagnostic test booking.
- Provide a centralized patient dashboard.
- Support bookings for family members and other individuals through one account.
- Allow administrators to manage diagnostic tests and appointments.
- Enable administrators to create and release structured medical reports.
- Allow patients to view and download released medical reports.
- Provide analytics and booking statistics.
- Maintain application data using browser-based storage.

---

## ✨ Features

### 👤 Patient Portal

| Feature | Description |
|---|---|
| Registration | Create a new patient account. |
| Login | Securely access the patient interface. |
| Forgot Password | Access the password recovery interface. |
| Dashboard | View patient dashboard information. |
| Browse Tests | Explore available diagnostic tests. |
| Test Details | View test descriptions and pricing. |
| Test Booking | Schedule diagnostic appointments. |
| Family Booking | Book tests for family members and other individuals. |
| Booking History | View previous and upcoming bookings. |
| Booking Details | View individual appointment information. |
| Medical Reports | View released medical reports. |
| Download Reports | Download medical reports as PDF or original files. |
| Patient Profile | View and manage profile information. |

### 🛡️ Admin Dashboard

| Feature | Description |
|---|---|
| Admin Login | Access the administration portal. |
| Dashboard | View overall laboratory statistics. |
| Manage Patients | Search and view registered patients. |
| Manage Tests | Manage diagnostic tests and pricing. |
| Manage Bookings | View and manage patient appointments. |
| Create Medical Reports | Generate structured medical reports. |
| Manage Medical Reports | View and manage uploaded and created reports. |
| Release Reports | Make completed medical reports available to patients. |
| Analytics | View booking and laboratory statistics. |
| Charts | Visualize application data. |

### 🧾 Medical Report Management

- Create structured medical reports.
- Upload existing medical report files.
- Associate reports with the correct patient account.
- Support multiple patients under one registered account.
- Maintain report details and test parameters.
- Store uploaded report files in IndexedDB.
- Generate downloadable PDF reports.
- Release reports to patients after administrative confirmation.

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based frontend development |
| Vite | Development server and build tool |
| JavaScript (ES6+) | Application logic |
| Ant Design | UI components |
| React Router DOM | Client-side routing |
| Day.js | Date formatting and management |
| Recharts | Data visualization |
| Sonner / Ant Design Messages | User notifications |

### Browser Storage

| Technology | Purpose |
|---|---|
| LocalStorage | Store application data and user information |
| IndexedDB | Store uploaded medical report files |

### Additional Libraries

- jsPDF
- jspdf-autotable
- ESLint

---

## 📂 Project Architecture

```text
LabConnect/
│
├── public/
│   ├── icons/
│   ├── images/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminFooter.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── PageNotFound.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── MainLayout.jsx
│   │   │
│   │   └── shared/
│   │       ├── SearchBar.jsx
│   │       ├── StatusBadge.jsx
│   │       └── TestCard.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── BookingContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   ├── bookings.js
│   │   ├── doctors.js
│   │   ├── patients.js
│   │   ├── testParameters.js
│   │   └── tests.js
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── about/
│   │   │   ├── about.css
│   │   │   └── about.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── authentication/
│   │   │   │   └── AdminLogin.jsx
│   │   │   ├── AdminAnalytics.jsx
│   │   │   ├── AdminCreateMedicalReport.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminMedicalReports.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── ManageBookings.jsx
│   │   │   ├── ManagePatients.jsx
│   │   │   └── ManageTests.jsx
│   │   │
│   │   ├── appointments/
│   │   │   ├── Appointments.jsx
│   │   │   ├── BookingDetails.jsx
│   │   │   └── BookingHistory.jsx
│   │   │
│   │   ├── authentication/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── contact/
│   │   │   └── contact.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── Home.css
│   │   │   └── Home.jsx
│   │   │
│   │   ├── patient/
│   │   │   ├── MedicalReports.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   └── PatientProfile.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── Services.css
│   │   │   └── Services.jsx
│   │   │
│   │   └── tests/
│   │       ├── TestBooking.jsx
│   │       ├── TestDetails.jsx
│   │       └── TestListing.jsx
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── generateMedicalReportPDF.js
│   │   └── helpers.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── project-structure.txt
├── README.md
└── vite.config.js
```

---

## ⚙️ Installation and Setup

### Prerequisites

Make sure the following software is installed:

- Node.js
- npm
- Visual Studio Code (recommended)
- Modern web browser

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the Project Directory

```bash
cd LabConnect
```

### Step 3: Install Dependencies

```bash
npm install
```

This command installs all dependencies specified in `package.json`.

---

## ▶️ Running the Application

Start the Vite development server:

```bash
npm run dev
```

After starting successfully, Vite will display a local development URL.

```text
http://localhost:5173/
```

Open the URL in your browser to access LabConnect.

### Available npm Commands

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Generate production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## 🌐 Application Routes

### Public Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/contact` | Contact |
| `/tests` | Test Listing |
| `/tests/:id` | Test Details |
| `/login` | Patient Login |
| `/register` | Patient Registration |
| `/forgot-password` | Forgot Password |

### Patient Routes

| Route | Page |
|---|---|
| `/dashboard` | Patient Dashboard |
| `/appointments` | Appointments |
| `/booking-history` | Booking History |
| `/booking-details/:id` | Booking Details |
| `/medical-reports` | Medical Reports |
| `/profile` | Patient Profile |

### Admin Routes

| Route | Page |
|---|---|
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Admin Dashboard |
| `/admin/patients` | Manage Patients |
| `/admin/tests` | Manage Tests |
| `/admin/bookings` | Manage Bookings |
| `/admin/create-medical-report` | Create Medical Report |
| `/admin/medical-reports` | Manage Medical Reports |
| `/admin/analytics` | Admin Analytics |

*Note: Routes are documented according to the application's intended pages. Refer to `App.jsx` for the currently configured route definitions.*

---

## 💾 Data Storage

LabConnect currently uses browser-based storage instead of a backend database.

### LocalStorage

The application uses LocalStorage to maintain information such as:

| Storage Key | Purpose |
|---|---|
| `labconnect_users` | Registered user information |
| `labconnect_current_user` | Currently logged-in user |
| `labconnect_bookings` | Patient booking information |
| `labconnect_medical_reports` | Uploaded report metadata |
| `labconnect_created_reports` | Structured medical report information |

### IndexedDB

Database name:

```text
LabConnectMedicalReports
```

Object Store:

```text
reportFiles
```

IndexedDB stores uploaded medical report files separately from their metadata.

---

## 🔄 Medical Report Workflow

The application supports the following report management process:

```text
        Patient Books Test
                │
                ▼
       Admin Views Booking
                │
                ▼
       Admin Creates Report
                │
                ▼
          Report Saved
            as Draft
                │
                ▼
       Admin Reviews Report
                │
                ▼
       Release to Patient
                │
                ▼
       Report Status: Available
                │
                ▼
       Patient Opens Dashboard
                │
                ▼
        Medical Reports Page
                │
                ▼
        View / Download Report
```

### Report Status

| Status | Description |
|---|---|
| Draft | Report created but not released |
| Available | Report released and accessible to the patient |

### Report Information

Structured reports can contain:

- Patient information
- Age and gender
- Test name
- Sample ID and sample type
- Collection date
- Report date
- Test parameters and results
- Methodology
- Observations
- Clinical interpretation
- Clinical remarks
- Technician details
- Pathologist details

---

## 🛡️ Admin Module

The Admin Dashboard provides centralized laboratory management.

### Admin Responsibilities

1. Monitor laboratory statistics.
2. Manage registered patients.
3. Maintain diagnostic test information.
4. View and manage appointments.
5. Create structured medical reports.
6. Upload existing medical report documents.
7. Release completed reports.
8. Monitor laboratory analytics.

---

## 👨‍⚕️ Patient Module

The Patient Portal provides access to diagnostic services.

### Patient Responsibilities

1. Register and log in.
2. Browse diagnostic tests.
3. Select a suitable test.
4. Book an appointment.
5. Book tests for family members or other individuals.
6. Track appointment information.
7. View available medical reports.
8. Download medical reports.
9. Manage profile information.

### Account Ownership

LabConnect distinguishes between the registered account owner and the person receiving the diagnostic test.

- `accountUserId` identifies the registered account owner.
- `patientName` identifies the actual person undergoing the test.

This allows one registered user to manage bookings and reports for multiple individuals.

---

## 🏗️ Production Build

To create an optimized production build:

```bash
npm run build
```

The generated production files will be available inside:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🔮 Future Enhancements

The following enhancements can be considered for future versions:

- Backend integration using Node.js and Express.js.
- Database integration using MongoDB or PostgreSQL.
- JWT-based authentication and authorization.
- Role-based access control.
- Online payment integration.
- Email and SMS notifications.
- Appointment reminders.
- Real-time booking updates.
- Cloud-based medical report storage.
- Deployment using AWS or another cloud platform.
- Automated testing and CI/CD integration.

---

## ⚠️ Disclaimer

LabConnect is a software development project demonstrating diagnostic laboratory management workflows.

The medical reports and test information displayed by the application should not be treated as a substitute for professional medical advice, diagnosis, or treatment.

The current version uses browser-based storage and is intended for demonstration and development purposes. It is not a production-ready medical records platform.

---

## 👨‍💻 Author

**Developed as a Diagnostic Laboratory Management System project.**

<div align="center">

### 🧪 LabConnect

**Connecting Patients with Diagnostic Services**

*Simplifying Healthcare. Organizing Diagnostics. Improving Access.*

---

⭐ If you find this project useful, consider giving it a star on GitHub!

</div>