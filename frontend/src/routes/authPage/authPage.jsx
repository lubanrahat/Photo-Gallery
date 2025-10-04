import React from "react";
import "./authPage.css";
import Image from "../../components/image/image";
import { useState } from "react";

const authPage = () => {
  const [isRegister, setRegister] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" alt="" w={36} h={36} />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
        {isRegister ? (
          <form key="register">
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">DisplayName</label>
              <input
                type="text"
                placeholder="DisplayName"
                required
                name="displayName"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="email" required name="email" />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                required
                name="password"
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setRegister(false)}>
              Do you have an account? <b className="login-register">Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="loginForm">
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="email" required name="email" />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                required
                name="password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setRegister(true)}>
              Don't have an account? <b className="login-register">Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default authPage;
