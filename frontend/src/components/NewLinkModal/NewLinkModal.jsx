import React, { useState } from "react";
import "./NewLinkModal.css";
import { IoToggleOutline, IoToggleSharp } from "react-icons/io5";


function NewLinkModal({ onClose }) {
  const [destinationUrl, setDestinationUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [linkExpiration, setLinkExpiration] = useState("");
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ destinationUrl, remarks, linkExpiration });
    onClose(); // Close modal after form submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal-title">Create New Link</h2>
        <form onSubmit={handleSubmit}>
          {/* Destination URL */}
          <div className="form-group">
            <label>
              Destination URL <span className="required">*</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              required
            />
          </div>

          {/* Remarks */}
          <div className="form-group">
            <label>
              Remarks <span className="required">*</span>
            </label>
            <textarea
              placeholder="Add remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Link Expiration */}
          <div className="form-group">
          <label className="expiration-label">
    Link Expiration
    <span
      className="toggle-icon"
      onClick={() => setIsExpirationEnabled(!isExpirationEnabled)}
    >
      {isExpirationEnabled ? (
        <IoToggleSharp className="enabled-toggle" />
      ) : (
        <IoToggleOutline className="disabled-toggle" />
      )}
    </span>
  </label>
            {isExpirationEnabled && (
              <input
                type="datetime-local"
                value={linkExpiration}
                onChange={(e) => setLinkExpiration(e.target.value)}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button type="button" className="clear-btn" onClick={onClose}>
              Clear
            </button>
            <button type="submit" className="create-new-btn">
              Create New
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLinkModal;
