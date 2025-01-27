import React from "react";
import "./Navbar.css";
import { FiPlus } from "react-icons/fi"; // Import plus icon
import { AiOutlineSearch } from "react-icons/ai"; // Import search icon

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <img
          src="https://res.cloudinary.com/dikzsipnp/image/upload/v1737925921/Logo_Wrapper_putbik.png"
          alt="Logo"
        />
      </div>

      {/* Center: Greeting */}
      <div className="space">
        <div className="navbar-greeting">
          <h3 className="greeting-text">Good morning, Sujith</h3>
          <p className="greeting-date">Tue, Jan 25</p>
        </div>

        {/* Right: Button, Search Bar, Avatar */}
        <div className="navbar-actions">
          {/* Button with React Icon */}
          <button className="create-button">
            <FiPlus /> Create new
          </button>

          {/* Search Bar with Icon */}
          <div className="search-bar-container">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by remarks"
              className="search-bar"
            />
          </div>

          {/* User Avatar */}
          <div className="user-avatar">SU</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
