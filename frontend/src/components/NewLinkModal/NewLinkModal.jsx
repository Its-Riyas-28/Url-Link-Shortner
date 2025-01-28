import React, { useState } from "react";
import "./NewLinkModal.css"; // Assuming this file contains the CSS

const NewLinkModal = () => {
  const [url, setUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(true);
  const [expirationDate, setExpirationDate] = useState("Jan 15, 2025, 11:56 PM");

  const clearForm = () => {
    setUrl("");
    setRemarks("");
    setIsExpirationEnabled(true);
    setExpirationDate("Jan 15, 2025, 11:56 PM");
  };

  const handleCreate = () => {
    console.log({ url, remarks, isExpirationEnabled, expirationDate });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>New Link</h2>
          <button
            className="close-button"
            onClick={() => console.log("Close Modal")}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>
              Destination Url <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="https://web.whatsapp.com/"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Remarks <span className="required">*</span>
            </label>
            <textarea
              placeholder="Add remarks"
              rows="4"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <div className="expiration-header">
              <label>Link Expiration</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isExpirationEnabled}
                  onChange={() => setIsExpirationEnabled(!isExpirationEnabled)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              disabled={!isExpirationEnabled}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="clear-button" onClick={clearForm}>
            Clear
          </button>
          <button className="create-button" onClick={handleCreate}>
            Create new
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLinkModal;
