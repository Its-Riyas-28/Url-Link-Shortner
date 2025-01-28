import React, { useState } from "react";
import "./Settings.css"; 

const Settings = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Changes Saved!");
  };

  const handleDelete = () => {
    alert("Account Deleted!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="form-container">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email id</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mobile no.</label>
          <input
            type="text"
            name="mobile"
            value={user.mobile || ""}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSave} className="save-btn">
          Save Changes
        </button>

        <button onClick={handleDelete} className="button2">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;