import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Links from "./components/Links/Links"; // New Links component
import Analytics from "./components/Analytics/Analytics"; // New Analytics component
import Settings from "./components/Settings/Settings"; // New Settings component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
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
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flex: 1, padding: "20px" }}>
                    <Dashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/links"
            element={
              <>
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flex: 1, padding: "20px" }}>
                    <Links />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/analytics"
            element={
              <>
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flex: 1, padding: "20px" }}>
                    <Analytics />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Navbar />
                <div style={{ display: "flex" }}>
                  <Sidebar />
                  <div style={{ flex: 1, padding: "20px" }}>
                    <Settings />
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
