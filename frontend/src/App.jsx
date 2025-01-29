import React, { useState, useEffect } from "react";
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
import NewLinkModal from "./components/NewLinkModal/NewLinkModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("https://url-link-shortner-backend.onrender.com/api/links") // Ensure this is the correct backend URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched Data:", data);
        setLinks(data); // Update the state
      })
      .catch(error => console.error("Error fetching links:", error));
  }, []);

  const onLinkCreated = (newLink) => {
    setLinks(prevLinks => {
      if (Array.isArray(prevLinks)) {
        return [newLink, ...prevLinks]; // Add new link at the top
      } else {
        return [newLink]; // Ensure it's an array
      }
    });
  };
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar openModal={openModal} />
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
                    <Links links={links} />
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

      <button onClick={openModal}>Create New Link</button>
      {isModalOpen && <NewLinkModal onClose={closeModal} onLinkCreated={onLinkCreated} />}
    </>
  );
}

export default App;
