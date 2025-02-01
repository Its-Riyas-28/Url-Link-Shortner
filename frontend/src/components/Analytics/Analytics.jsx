import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance"; 
import { IoCopyOutline } from "react-icons/io5";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./analytics.css";

const Links = ({ lastUpdated }) => {
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visitorData, setVisitorData] = useState({ ip: "Loading...", device: "Unknown" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks(currentPage);
  }, [currentPage, lastUpdated]);

  useEffect(() => {
    fetchVisitorData();
  }, []);

  const fetchLinks = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/links?page=${page}`);
      if (response.data.success) {
        setLinks(response.data.links || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setLinks([]);
      }
    } catch (error) {
      toast.error("Error fetching links! ❌");
      console.error("Error fetching links:", error.response?.data || error.message);
    }
    setLoading(false);
  };

  const fetchVisitorData = async () => {
    try {
      const screenWidth = window.innerWidth;
      const response = await axios.get("https://url-link-shortner-backend.onrender.com/api/v1/logs/fetch-location")
      .then(response => console.log("Fetched Data:", response.data))
      .catch(error => console.error("API Error:", error));    
      setVisitorData({
        ip: response.data.ip || "Unavailable",
        device: response.data.deviceType || "Unknown",
        os: response.data.os || "Unknown",
        browser: response.data.browser || "Unknown",
      });
    } catch (error) {
      console.error("Error fetching visitor data:", error);
      setVisitorData({
        ip: "Unavailable", 
        device: "Unknown", 
        os: "Unknown", 
        browser: "Unknown"
      });
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copied!");
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      let start = Math.max(3, currentPage - 1);
      let end = Math.min(totalPages - 2, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="links-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {loading ? (
        <p>Loading links...</p>
      ) : (
        <>
          {links.length === 0 ? (
            <p>No links found.</p>
          ) : (
            <table className="links-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Original Link</th>
                  <th>Short Link</th>
                  <th>IP Address</th>
                  <th>User Device</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link._id}>
                    <td>{new Date(link.createdAt).toLocaleString()}</td>
                    <td className="original-link-cell">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                      </a>
                    </td>
                    <td>
                      <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                        {link.shortUrl}
                      </a>
                      <ol className="action-icons">
                        <li onClick={() => handleCopy(link.shortUrl)} title="Copy">
                          <IoCopyOutline />
                        </li>
                      </ol>
                    </td>
                    <td>{visitorData.ip}</td>
                    <td>{visitorData.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
            generatePageNumbers={generatePageNumbers}
          />
        </>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, setCurrentPage, generatePageNumbers }) => {
  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination">
      <button
        className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <MdNavigateBefore />
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="ellipsis">{page}</span>
        )
      )}

      <button
        className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default Links;
