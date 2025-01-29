import React, { useState } from "react";
import axios from "../../api/axiosInstance";
import "./NewLinkModal.css";

const NewLinkModal = ({ onClose, onLinkCreated }) => {
  const [url, setUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);
  const [linkExpiration, setLinkExpiration] = useState("");

  const clearForm = () => {
    setUrl("");
    setRemarks("");
    setIsExpirationEnabled(false);
    setLinkExpiration("");
  };

  const handleCreate = async () => {
    if (!url || !remarks) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        url,
        remarks,
        expirationDate: isExpirationEnabled ? linkExpiration : null,
      };

      const response = await axios.post("/links", payload);

      if (response.data.success && response.data.data.shortUrl) {
        const newLink = response.data.data;

        onLinkCreated(newLink); // ✅ Now correctly calls the function from App.js

        clearForm();
        onClose();
      } else {
        alert("Failed to retrieve shortened link.");
      }
    } catch (error) {
      console.error("Error creating link:", error.response?.data || error.message);
      alert("Failed to create link. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>New Link</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Destination URL <span className="required">*</span></label>
            <input type="text" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Remarks <span className="required">*</span></label>
            <textarea placeholder="Add remarks" rows="4" value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
          </div>

          <div className="form-group">
            <div className="expiration-header">
              <label>Link Expiration</label>
              <label className="switch">
                <input type="checkbox" checked={isExpirationEnabled} onChange={() => setIsExpirationEnabled(!isExpirationEnabled)} />
                <span className="slider"></span>
              </label>
            </div>
            {isExpirationEnabled && (
              <input type="datetime-local" value={linkExpiration} onChange={(e) => setLinkExpiration(e.target.value)} />
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="clear-button" onClick={clearForm}>Clear</button>
          <button className="create-button" onClick={handleCreate}>Create new</button>
        </div>
      </div>
    </div>
  );
};

export default NewLinkModal;
