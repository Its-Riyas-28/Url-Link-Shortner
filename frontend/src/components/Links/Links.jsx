import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { IoCopyOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./Links.css";

const Links = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("/links");
        if (response.data.success) {
          setLinks(response.data.links || []);
        }
      } catch (error) {
        toast.error("Error fetching links! ❌");
        console.error("Error fetching links:", error.response?.data || error.message);
      }
    };

    fetchLinks();
  }, []);

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
        setLinks(links.filter((link) => link._id !== id));
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
    </div>
  );
};

export default Links;
