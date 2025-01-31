import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
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
        console.error("Error fetching links:", error.response?.data || error.message);
      }
    };

    fetchLinks();
  }, []);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await axios.delete(`/links/${id}`);
        setLinks(links.filter((link) => link._id !== id));
      } catch (error) {
        console.error("Error deleting link:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="links-container">
      <h2>Your Links</h2>
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
      <td>{link.originalUrl}</td>
      <td>
        <a href={link.shortUrl || link.originalUrl} target="_blank" rel="noopener noreferrer">
          {link.shortUrl || "No Short URL"}
        </a>
        <button onClick={() => handleCopy(link.shortUrl || link.originalUrl)}>📋</button>
      </td>
      <td>{link.remarks}</td>
      <td>{link.clicks}</td>
      <td className={link.status === "Active" ? "status-active" : "status-inactive"}>
        {link.status}
      </td>
      <td>
        <button onClick={() => handleDelete(link._id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default Links;