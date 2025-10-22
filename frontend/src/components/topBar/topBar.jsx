import React from "react";
import "./topBar.css";
import UserButton from "../userButton/userButton";
import Image from "../image/image";
import { useNavigate } from "react-router";

const TopBar = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/search?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="topBar">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="search">
        <Image path="/general/search.svg" alt="Search Icon" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="search-input"
          autoComplete="off"
        />
      </form>

      {/* User Section */}
      <UserButton />
    </div>
  );
};

export default TopBar;
