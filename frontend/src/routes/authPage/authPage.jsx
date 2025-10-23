import React, { useState } from "react";
import "./authPage.css";
import Image from "../../components/image/image";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router";

const AuthPage = () => {
  const [isRegister, setRegister] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post(
        `/users/auth/${isRegister ? "register" : "login"}`,
        data
      );
      console.log("✅ Success:", res.data);

      // Redirect user
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" alt="logo" w={36} h={36} />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>

        {isRegister ? (
          <form key="register" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label>Username</label>
              <input type="text" name="username" required placeholder="Username" />
            </div>

            <div className="formGroup">
              <label>Display Name</label>
              <input type="text" name="displayName" required placeholder="Display Name" />
            </div>

            <div className="formGroup">
              <label>Email</label>
              <input type="email" name="email" required placeholder="Email" />
            </div>

            <div className="formGroup">
              <label>Password</label>
              <input type="password" name="password" required placeholder="Password" />
            </div>

            <button type="submit">Register</button>

            <p onClick={() => setRegister(false)}>
              Do you have an account? <b className="login-register">Login</b>
            </p>

            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="loginForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label>Email</label>
              <input type="email" name="email" required placeholder="Email" />
            </div>

            <div className="formGroup">
              <label>Password</label>
              <input type="password" name="password" required placeholder="Password" />
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

export default AuthPage;
