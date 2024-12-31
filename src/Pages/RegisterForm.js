import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // State for error messages
  const [errors, setErrors] = useState({});

  // Use navigate hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match!" });
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    };

    try {
      const response = await fetch("http://localhost:5201/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setErrors({});
        navigate("/"); // Redirect to the homepage
      } else if (data.errors) {
        // Handle validation errors
        const backendErrors = {};
        for (const [key, messages] of Object.entries(data.errors)) {
          backendErrors[key] = messages.join(" ");
        }
        setErrors(backendErrors);

        // Alert all error messages
        const errorMessages = Object.values(backendErrors).join("\n");
        alert(`Registration failed:\n${errorMessages}`);
      } else if (data.message) {
        // Handle single message (e.g., "Email already exists")
        setErrors({ global: [data.message] });
        alert(`Registration failed:\n${data.message}`);
      } else {
        // Handle unexpected error format
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      const errorMsg = "An error occurred. Please try again.";
      setErrors({ global: [errorMsg] });
      alert(errorMsg);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      

                      {/* First Name */}
                      <div className="mb-4">
                        <label className="form-label" htmlFor="form3Example1c">
                          Your First Name
                        </label>
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          style={{ backgroundColor: "#f8f9fa" }}
                          placeholder="Enter your first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                        {errors.firstName && (
                          <div className="text-danger">{errors.firstName}</div>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="mb-4">
                        <label className="form-label" htmlFor="form3Example1d">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="form3Example1d"
                          className="form-control"
                          style={{ backgroundColor: "#f8f9fa" }}
                          placeholder="Enter your last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                        {errors.lastName && (
                          <div className="text-danger">{errors.lastName}</div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label className="form-label" htmlFor="form3Example3c">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          style={{ backgroundColor: "#f8f9fa" }}
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>

                      {/* Password */}
                      <div className="mb-4">
                        <label className="form-label" htmlFor="form3Example4c">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          style={{ backgroundColor: "#f8f9fa" }}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {errors.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="mb-4">
                        <label className="form-label" htmlFor="form3Example4cd">
                          Repeat your password
                        </label>
                        <input
                          type="password"
                          id="form3Example4cd"
                          className="form-control"
                          style={{ backgroundColor: "#f8f9fa" }}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        {errors.confirmPassword && (
                          <div className="text-danger">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>

                      {/* Agree to Terms */}
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="form2Example3c"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree to all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
