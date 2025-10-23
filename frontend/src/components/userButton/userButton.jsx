import React, { useState } from "react";
import "./userButton.css";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router";

const UserButton = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const currentUser = true;

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      navigate("/auth")
    } catch (error) {
      console.error(error);
    }
  };

  return currentUser ? (
    <div className="userButton">
      <Image
        path="/general/noAvatar.png"
        alt="User avatar"
        className="avatar"
      />

      <div onClick={() => setOpen((prev) => !prev)}>
        <Image
          path="/general/arrow.svg"
          alt="Toggle user menu"
          className={`arrow ${open ? "open" : ""}`}
        />
      </div>
      {open && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Settings</div>
          <div onClick={handleLogout} className="userOption">
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <a href="/" className="loginLink">
      Login / Sign Up
    </a>
  );
};

export default UserButton;
