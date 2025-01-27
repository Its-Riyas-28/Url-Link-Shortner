import React from "react";
import "./Sidebar.css";
import { FaLink, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="menu-item active">
          <span className="icon">
            <img
              src="https://res.cloudinary.com/dikzsipnp/image/upload/v1737926395/Icons_viffm0.png"
              alt="Dashboard Icon"
              className="custom-icon"
            />
          </span>
          <span className="menu-text">Dashboard</span>
        </li>
        <li className="menu-item">
          <span className="icon">
            <FaLink />
          </span>
          <span className="menu-text">Links</span>
        </li>
        <li className="menu-item">
          <span className="icon">
            <img
              src="https://res.cloudinary.com/dikzsipnp/image/upload/v1737926447/Icons_1_nvimxm.png"
              alt="Analytics Icon"
              className="custom-icon"
            />
          </span>
          <span className="menu-text">Analytics</span>
        </li>
        <li className="menu-item">
          <span className="icon">
            <FaCog />
          </span>
          <span className="menu-text">Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
