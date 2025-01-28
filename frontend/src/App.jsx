import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Links from "./components/Links/Links";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewLinkModal from "./components/NewLinkModal/NewLinkModal"; // Import modal

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
                <Navbar openModal={openModal} /> {/* Pass modal control */}
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
                <Navbar openModal={openModal} />
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
                <Navbar openModal={openModal} />
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
                <Navbar openModal={openModal} />
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

      {/* Render Modal */}
      {isModalOpen && <NewLinkModal onClose={closeModal} />}
    </>
  );
}

export default App;
