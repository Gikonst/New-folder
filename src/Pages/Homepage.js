import React, { useState, useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import bgPicture from "../assets/22589.jpg";


function Homepage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login state
  const [firstName, setFirstName] = useState(""); // To store the user's first name
  const [exams, setExams] = useState([]); // State to hold exams data
  const navigate = useNavigate();
  const servicesRef = useRef(null);


  // Check if the user is already logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedFirstName = localStorage.getItem("firstName"); // Retrieve firstName from localStorage
    if (token) {
      setIsLoggedIn(true); // Set login state if token is found
      if (storedFirstName) setFirstName(storedFirstName); // Set user's name if found
    }
  }, []);

  // Fetch a few exams for the homepage
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Exams/GetAll");
        const data = await response.json();
        setExams(data.slice(0, 3)); // Fetch only the first 3 exams
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
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
        const { token, userId, userRole, firstName } = response.data;

        // Store necessary data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("firstName", firstName); // Save first name to localStorage

        setIsLoggedIn(true); // Update login state
        setFirstName(firstName); // Update firstName state
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
    localStorage.removeItem("firstName"); // Remove firstName from localStorage
    setIsLoggedIn(false);
    setFirstName(""); // Clear firstName state
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
          backgroundImage: `url(${bgPicture})`,
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#f0f0f0",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Welcome, {firstName}
              </span>
              <Button
                label="Logout"
                className="p-button-raised p-button-rounded"
                onClick={handleLogout}
              />
            </div>
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
      <br />
      <br />
      <br />
      

      {/* Main hero section */}
      <div className="col-12  p-6 text-center md:text-left flex align-items-center">
        <section>
          <span className="block text-6xl font-bold mb-1">We shape the future you deserve to see.</span>
          <div className="text-6xl text-primary font-bold mb-3">
            The best certification platform in the world.
          </div>
          <p className="mt-0 mb-4 text-700 line-height-3">
           Log in and explore our wolrd.
          </p>

          <Button
            label="Learn More"
            type="button"
            className="mr-3 p-button-raised"
            onClick={() => servicesRef.current.scrollIntoView({ behavior: "smooth" })}
          />

        </section>
      </div>


      {/* Add the who we are here section */}
      <div className="grid">
        <div className="col-12 mb-6 mt-6 px-10">
          <div className="border border-cyan-500 rounded-md shadow-lg p-6 ml-5 mr-5"> {/* Increased border radius to rounded-3xl */}
            <div className="grid">
              <div className="col-12 md:col-6 mb-4">
                <div className="font-bold text-4xl mb-4 text-center">
                  <span className="text-cyan-500">What We Do</span>
                </div>
                <div className="text-700 mb-4 px-5">
                  <p>Certiland is the global leader in exam and certification management. We partner with organizations and governments to certify individuals across a portfolio of <b>700</b> leading certifications in IT, Digital Transformation, Project Management, Business, and Languages.</p>
                  <p>Our exams are delivered in over <b>200</b> countries and <b>25</b> languages, leveraging state-of-the-art assessment technology. This empowers professionals to achieve their potential through learning.</p>
                  <p>Our commitment to quality and integrity ensures compliance with the strictest regulations and the best infrastructure in the industry.</p>
                </div>
              </div>

              <div className="col-12 md:col-6 mb-4">
                <div className="font-bold text-4xl mb-4 text-center">
                  <span className="text-cyan-500">Why Us?</span>
                </div>
                <div className="text-700 mb-4 px-5">
                  <p>Trusted, Secure, and Easy to Use. Thousands of users choose us for their certification needs for several reasons:</p>
                  <ul className="list-outside list-disc text-left space-y-2">
                    <li><b>Industry-Leading Certifications:</b> Over 700 certifications in IT, Digital Transformation, Project Management, and more.</li>
                    <li><b>End-to-End Security:</b> Your data is protected with robust encryption and strict privacy measures.</li>
                    <li><b>User-Friendly Platform:</b> Access exams, track progress, and earn certifications easily.</li>
                    <li><b>Global Reach:</b> We deliver exams in over 200 countries, bringing opportunities to professionals worldwide.</li>
                    <li><b>24/7 Support:</b> Our dedicated team is always here to assist you.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



<div ref={servicesRef} className="grid mb-3 justify-center">

{/* Services section */}
<div className="grid mt-8 justify-center"> {/* Added margin top and bottom for spacing and center alignment */}
  <div className="col-12 md:col-3 mb-4 px-5 flex justify-center"> {/* Center the column */}
    <div className="rounded-lg shadow-lg p-6 text-center"> {/* Added rounded corners and shadow */}
      <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block rounded-full"> {/* Rounded icon container */}
        <i className="pi pi-desktop text-4xl text-cyan-500"></i>
      </span>
      <div className="text-900 text-xl mb-3 font-medium">Built for Developers</div>
      <span className="text-700 line-height-3">Empower your career with industry-recognized certifications. Our platform provides easy access to exams,
        helping you validate your skills and advance in the tech world.</span>
    </div>
  </div>

  <div className="col-12 md:col-3 mb-4 px-5 flex justify-center"> {/* Center the column */}
    <div className="rounded-lg shadow-lg p-6 text-center"> {/* Added rounded corners and shadow */}
      <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block rounded-full"> {/* Rounded icon container */}
        <i className="pi pi-check-circle text-4xl text-cyan-500"></i>
      </span>
      <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
      <span className="text-700 line-height-3">Our platform is designed with you in mind, offering an intuitive interface that makes navigating and
        completing your certification process effortless. Get certified with ease, no matter your technical expertise.</span>
    </div>
  </div>

  <div className="col-12 md:col-3 mb-4 px-5 flex justify-center"> {/* Center the column */}
    <div className="rounded-lg shadow-lg p-6 text-center"> {/* Added rounded corners and shadow */}
      <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block rounded-full"> {/* Rounded icon container */}
        <i className="pi pi-lock text-4xl text-cyan-500"></i>
      </span>
      <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
      <span className="text-700 line-height-3">Your data, fully protected. We use end-to-end encryption to ensure that all your personal information and
        certification data is securely transmitted and only accessible by you. Rest assured, privacy and security are our top priorities.</span>
    </div>
  </div>

  <div className="col-12 md:col-3 mb-4 px-5 flex justify-center"> {/* Center the column */}
    <div className="rounded-lg shadow-lg p-6 text-center"> {/* Added rounded corners and shadow */}
      <span className="bg-gray-200 p-3 shadow-4 mb-3 inline-block rounded-full"> {/* Rounded icon container */}
        <i className="pi pi-shield text-4xl text-cyan-500"></i>
      </span>
      <div className="text-900 text-xl mb-2 font-medium ">Trusted Security</div>
      <span className="text-700 line-height-3">Reliability you can count on. Our platform is built with the highest security standards to ensure your data is
        always protected. With advanced encryption and strict access controls, your certification journey is safe and secure.</span>
    </div>
  </div>
</div>

</div>



      {/* Exams section */}
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div className="text-900 font-bold text-4xl mb-8 text-center">Our Featured Exams</div>
        <div className="grid">
          {exams.map((exam) => (
            <div key={exam.id} className="col-12 md:col-4">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: "6px" }}>
              <img
                src={exam.imageSrc}
                alt={exam.name}
                style={{ height: "150px", width: "100%", objectFit: "contain", marginBottom: "10px" }}
              />
              <div className="flex-grow-1 flex flex-column align-items-center justify-content-center text-center">
                <div className="text-900 font-medium text-lg mb-2">{exam.name}</div>
                <div className="text-600 mb-3">{exam.description}</div>
              </div>
              <Button
                label="Learn More"
                className="p-button-raised w-full"
                onClick={() => navigate("/Exams")} // Navigate to Exams component
              />
            </div>
          </div>          
          ))}
        </div>
      </div>


{/* Footer Section */}
<div className="px-4 py-4 bg-gray-100 flex justify-between items-center">
  {/* Left side - Copyright */}
  <div className='Copyright flex items-center justify-center  p-2 rounded-lg shadow-md'>
    <i className='bi bi-c-circle fs-8 mr-2 text-gray-600'></i>
    <span className="text-gray-800 font-semibold">{new Date().getFullYear()} Certiland</span>
  </div>

  {/* Right side - Social Media Links */}
  <div className="flex items-center ml-auto">
    <div className="text-900 text-xl mb-3 font-medium mr-3 text-center">Follow Us On:</div>
    <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-1 inline-block" style={{ borderRadius: '10px' }}>
      <i className="pi pi-facebook text-3xl text-cyan-500"></i>
    </span>
    <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-1 inline-block" style={{ borderRadius: '10px' }}>
      <i className="pi pi-twitter text-4xl text-cyan-500"></i>
    </span>
    <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-1 inline-block" style={{ borderRadius: '10px' }}>
      <i className="pi pi-youtube text-4xl text-cyan-500"></i>
    </span>
    <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-1 inline-block" style={{ borderRadius: '10px' }}>
      <i className="pi pi-linkedin text-4xl text-cyan-500"></i>
    </span>
    <span className="bg-gray-200 p-2 shadow-4 ml-2 mb-1 inline-block" style={{ borderRadius: '10px' }}>
      <i className="pi pi-instagram text-4xl text-cyan-500"></i>
    </span>
  </div>
</div>


    </div>
  );
}

export default Homepage;