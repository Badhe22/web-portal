// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function Navbar() {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
    
  useEffect(() => {
    // Load registered users from local storage on component mount
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setRegisteredUsers(storedUsers);
  }, []);

  
  const handleRegister = (userData) => {
    setRegisterVisible(false);
    // Simulate storing registered users (in a real app, use a database)
    const updatedUsers = [...registeredUsers, userData];
    setRegisteredUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    // Show the login form after successful registration
    setLoginVisible(true);
    // Reset login success and error messages
    setLoginSuccess(false);
    setLoginError("");
  };

  const handleLogin = (userData) => {
    // Perform validation and check if the user is registered
    const userExists = registeredUsers.some(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (userExists) {
      // Set the user as logged in and show the success message
      setLoggedIn(true);
      setLoginSuccess(true);
      setLoginError("");
      // Reset the login form visibility
      setLoginVisible(false);
    } else {
      // Display an error if the user is not registered
      setLoggedIn(false);
      setLoginSuccess(false);
      setLoginError("Invalid email or password.");
      // Reset the login form visibility
      setLoginVisible(true);
    }
  };

  const handleLogout = () => {
    // Handle logout logic (e.g., clear user session)
    console.log("Logout");
    // Set the user as logged out
    setLoggedIn(false);
    // Reset login success and error messages
    setLoginSuccess(false);
    setLoginError("");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ color: "Black" }} to="/">
            Logo
          </Link>

          <ul className="nav justify-content-end navbar-dark">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "Black" }} to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "Black" }} to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "Black" }}
                    to="/register"
                    onClick={() => {
                      setRegisterVisible(true);
                      setLoginVisible(false);
                    }}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={{ color: "Black" }}
                    to="/login"
                    onClick={() => {
                      setLoginVisible(true);
                      setRegisterVisible(false);
                    }}
                  >
                    Login
                  </Link>
                </li>{" "}
              </>
            )}
            {isLoggedIn && <li style={{ color: "Black" }} onClick={handleLogout}>Logout</li>}
          </ul>
        </div>
      </nav>

      
    </div>
  );
}

export default Navbar;
