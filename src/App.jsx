import { Route, Routes, useLocation } from "react-router-dom";

import { Layout } from "antd";

// COMMON COMPONENTS

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// PUBLIC PAGES

import Home from "./pages/home/Home";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Services from "./pages/services/Services";

import TestListing from "./pages/tests/TestListing";
import TestDetails from "./pages/tests/TestDetails";
import TestBooking from "./pages/tests/TestBooking";

import BookingHistory from "./pages/appointments/BookingHistory";
import BookingDetails from "./pages/appointments/BookingDetails";

// AUTHENTICATION

import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword";

// PATIENT PAGES

import PatientDashboard from "./pages/patient/PatientDashboard";
import MedicalReport from "./pages/patient/MedicalReports";

// ADMIN COMPONENTS

import AdminLogin from "./pages/admin/authentication/AdminLogin";

import AdminLayout from "./components/layout/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

import ManagePatients from "./pages/admin/ManagePatients";
import ManageTests from "./pages/admin/ManageTests";
import ManageBookings from "./pages/admin/ManageBookings";

import AdminMedicalReports from "./pages/admin/AdminMedicalReports";

import AdminCreateMedicalReport from "./pages/admin/AdminCreateMedicalReport";

const { Content } = Layout;

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#ffffff",
      }}
    >
      {/* PUBLIC HEADER */}

      {!isAdminRoute && <Header />}

      <Content>
        <Routes>
          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/services" element={<Services />} />

          {/* TEST ROUTES */}

          <Route path="/tests" element={<TestListing />} />

          <Route path="/tests/:id" element={<TestDetails />} />

          <Route path="/tests/:id/book" element={<TestBooking />} />

          {/* APPOINTMENTS */}

          <Route path="/booking-history" element={<BookingHistory />} />

          <Route path="/booking-details/:id" element={<BookingDetails />} />

          {/* AUTHENTICATION */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* PATIENT ROUTES */}

          <Route path="/patient-dashboard" element={<PatientDashboard />} />

          <Route path="/medical-reports" element={<MedicalReport />} />

          {/* ADMIN LOGIN */}

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN DASHBOARD */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />

          {/* ADMIN ANALYTICS */}

          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            }
          />

          {/* MANAGE PATIENTS */}

          <Route
            path="/admin/patients"
            element={
              <AdminLayout>
                <ManagePatients />
              </AdminLayout>
            }
          />

          {/* MANAGE TESTS */}

          <Route
            path="/admin/tests"
            element={
              <AdminLayout>
                <ManageTests />
              </AdminLayout>
            }
          />

          {/* MANAGE BOOKINGS */}

          <Route
            path="/admin/bookings"
            element={
              <AdminLayout>
                <ManageBookings />
              </AdminLayout>
            }
          />

          {/* MEDICAL REPORTS */}

          <Route
            path="/admin/medical-reports"
            element={
              <AdminLayout>
                <AdminMedicalReports />
              </AdminLayout>
            }
          />

          {/* CREATE MEDICAL REPORT */}

          <Route
            path="/admin/create-medical-report"
            element={
              <AdminLayout>
                <AdminCreateMedicalReport />
              </AdminLayout>
            }
          />
        </Routes>
      </Content>

      {/* PUBLIC FOOTER */}

      {!isAdminRoute && <Footer />}
    </Layout>
  );
}

export default App;
