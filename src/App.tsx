// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import PatientDashboard from "./pages/PatientDashboard"
import PatientProfile from "./pages/PatientProfile"
import PatientBookings from "./pages/PatientBookings"
import PatientBookingForm from "./pages/PatientBookingForm"
import PatientTripHistory from "./pages/PatientTripHistory"
import PatientTripDetails from "./pages/PatientTripDetails"
import "./App.css"

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/patient/dashboard" 
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute>
              <PatientBookings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking/new" 
          element={
            <ProtectedRoute>
              <PatientBookingForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trips" 
          element={
            <ProtectedRoute>
              <PatientTripHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trips/:id" 
          element={
            <ProtectedRoute>
              <PatientTripDetails />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App