import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import { InputText } from "primereact/inputtext";
import axios from "axios";

function Homepage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login state
  const navigate = useNavigate();

  // Check if the user is already logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set login state if token is found
    }
  }, []);

  // Login logic with the backend
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before attempting login

    try {
      const response = await axios.post("http://localhost:5201/api/Auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, userId, userRole } = response.data;

        // Store necessary data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);

        setIsLoggedIn(true); // Update login state
        navigate("/"); // Redirect to the dashboard route
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  const handleSignUpClick = () => {
    navigate("/RegisterForm");
  };

  // Logout function to clear localStorage and reset state
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to the home page
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Background image section */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "300px",
          backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/324/908/991/attractive-beauty-brunette-girl-wallpaper-preview.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      >
        {/* Top-right login section */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          {!isLoggedIn ? (
            <form
              onSubmit={handleLoginSubmit}
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <InputText
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "150px" }}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "150px" }}
              />
              <Button label="Login" type="submit" className="p-button-raised p-button-rounded" />
              <Button
                label="Sign Up"
                icon="pi pi-user"
                className="p-button-raised p-button-rounded"
                onClick={handleSignUpClick}
              />
            </form>
          ) : (
            <Button
              label="Logout"
              className="p-button-raised p-button-rounded"
              onClick={handleLogout}
            />
          )}

          {/* Show error message if login fails */}
          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Main hero section */}
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
        <section>
          <span className="block text-6xl font-bold mb-1">Create the screens</span>
          <div className="text-6xl text-primary font-bold mb-3">
            your visitors deserve to see
          </div>
          <p className="mt-0 mb-4 text-700 line-height-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <Button label="Learn More" type="button" className="mr-3 p-button-raised" />
          <Button label="Live Demo" type="button" className="p-button-outlined" />
        </section>
      </div>

      <div className="col-12 md:col-6 overflow-hidden">
        <img
          src="/home2.webp"
          alt="hero-1"
          className="md:ml-auto block md:h-full"
          style={{
            clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
          }}
        />
      </div>
    </div>
  );
}

export default Homepage;
