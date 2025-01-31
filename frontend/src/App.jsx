import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
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

  const [lastFetchedAt, setLastFetchedAt] = useState(null); 

useEffect(() => {
  const fetchLinks = async () => {
    try {
      const response = await axios.get("/links", {
        params: { lastFetchedAt },
      });

      if (response.data.success && response.data.links.length > 0) {
        setLinks((prevLinks) => [...response.data.links, ...prevLinks]);
        setLastFetchedAt(new Date().toISOString()); 
      }
    } catch (error) {
      console.error("Error fetching links:", error.message);
    }
  };

  fetchLinks();
  const interval = setInterval(fetchLinks, 3000);

  return () => clearInterval(interval);
}, [lastFetchedAt]);


  const onLinkCreated = (newLink) => {
    setLinks(prevLinks => {
      if (Array.isArray(prevLinks)) {
        return [newLink, ...prevLinks]; 
      } else {
        return [newLink];
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

      {isModalOpen && <NewLinkModal onClose={closeModal} onLinkCreated={onLinkCreated} />}
    </>
  );
}

export default App;
