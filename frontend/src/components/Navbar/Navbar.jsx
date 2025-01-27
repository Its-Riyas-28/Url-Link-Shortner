import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FiPlus } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [avatarInitials, setAvatarInitials] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName"); 
    if (name) {
      setUserName(name);

      
      const nameParts = name.split(" ");
      let initials;

      if (nameParts.length > 1) {
        
        initials = nameParts
          .slice(0, 2) 
          .map((part) => part.charAt(0).toUpperCase()) 
          .join("");
      } else {
        
        const firstLetter = name[0].toUpperCase();
        const middleIndex =
          name.length % 2 === 0
            ? Math.floor(name.length / 2) - 1 
            : Math.floor(name.length / 2); 
        const middleLetter = name[middleIndex].toLowerCase();
        initials = firstLetter + middleLetter;
      }

      setAvatarInitials(initials);
    }
  }, []);

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
          <h3 className="greeting-text">
            🌞 Good morning, {userName || "User"}
          </h3>
          <p className="greeting-date">Tue, Jan 25</p>
        </div>

        {/* Right: Button, Search Bar, Avatar */}
        <div className="navbar-actions">
          <button className="create-button">
            <FiPlus /> Create new
          </button>
          <div className="search-bar-container">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by remarks"
              className="search-bar"
            />
          </div>
          <div className="user-avatar">
            {avatarInitials || "U"} {/* Show initials or fallback "U" */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
