import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard"; // Import the Dashboard component
import Sidebar from "./components/Sidebar/Sidebar"; // Import the Sidebar component
import Navbar from "./components/Navbar/Navbar"; // Import the Navbar component
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function App() {
  return (
    <>
      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
      <Router>
        <Routes>
          {/* Routes without Navbar and Sidebar */}
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Routes with both Navbar and Sidebar */}
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar /> {/* Add Navbar */}
                <div style={{ display: "flex" }}>
                  <Sidebar /> {/* Add Sidebar */}
                  <div style={{ flex: 1, padding: "20px" }}>
                    <Dashboard /> {/* Dashboard Content */}
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/some-other-page"
            element={
              <>
                <Navbar /> {/* Add Navbar */}
                <div style={{ display: "flex" }}>
                  <Sidebar /> {/* Add Sidebar */}
                  <div style={{ flex: 1, padding: "20px" }}>
                    {/* Replace with the respective component */}
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
