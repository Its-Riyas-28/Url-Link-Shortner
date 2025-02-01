import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { IoCopyOutline } from "react-icons/io5";
import { MdEdit, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Links.css";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLinks(currentPage);
  }, [currentPage]); // Fetch links when `currentPage` changes

  const fetchLinks = async (page) => {
    try {
      const response = await axios.get(`/links?page=${page}`);
      if (response.data.success) {
        setLinks(response.data.links || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error("Error fetching links! ❌");
      console.error("Error fetching links:", error.response?.data || error.message);
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copied!");
  };

  const handleEdit = (id) => {
    toast.info(`Edit functionality coming soon! (ID: ${id})`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await axios.delete(`/links/${id}`);
        fetchLinks(currentPage); // Refresh links after deletion
        toast.success("Link deleted successfully! 🗑️");
      } catch (error) {
        toast.error("Error deleting link! ❌");
        console.error("Error deleting link:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="links-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <table className="links-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td>{new Date(link.createdAt).toLocaleString()}</td>
              <td className="original-link-cell">
                <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.url}>
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
              <td>{link.remarks}</td>
              <td>{link.clicks}</td>
              <td className={link.status === "Active" ? "status-active" : "status-inactive"}>
                {link.status}
              </td>
              <td>
                <ol className="action-icons">
                  <li onClick={() => handleEdit(link._id)} title="Edit">
                    <MdEdit />
                  </li>
                  <li onClick={() => handleDelete(link._id)} title="Delete">
                    <RiDeleteBin6Line />
                  </li>
                </ol>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const maxPagesToShow = 5;
  const pageNumbers = [];

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push("...");

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

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
