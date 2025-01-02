import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";

export default function MyProfile() {
  const [passedCertificates, setPassedCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState(""); // State for the user's first name

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
      if (!userId) {
        setError("User ID is not available in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5201/api/Users/GetById?id=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setPassedCertificates(data.passedCertificates || []); // Update state with user's passed certificates
        setFirstName(data.firstName || "User"); // Assuming user data includes a firstName field
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while fetching user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as dd/mm/YYYY
  };

  // Function to download the certificate from the backend
  const handleDownloadCertificate = async (certificateId, examName) => {
    try {
      const response = await fetch(`http://localhost:5201/api/Certificates/download?id=${certificateId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${examName}_Certificate.pdf`; // Use the name of the exam for the file name
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Failed to download the certificate. Please try again.");
      }
    } catch (error) {
      console.error("Error downloading the certificate:", error);
      alert("An error occurred while downloading the certificate. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div className="text-900 font-bold text-6xl mb-4 text-center">
        {passedCertificates.length > 0
          ? `Congrats ${firstName}!`
          : `Hi ${firstName}, you haven't passed any exams yet.`}
      </div>
      <div className="text-700 text-xl mb-6 text-center line-height-3">
        <h3>{passedCertificates.length > 0 ? "Your Passed Certificates" : ""}</h3>
      </div>

      {passedCertificates.length > 0 ? (
        <div className="grid">
          {passedCertificates.map((certificate) => (
            <div key={certificate.id} className="col-12 lg:col-4">
              <div className="p-3 h-full">
                <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: "6px" }}>
                  <img
                    src={certificate.exam.imageSrc}
                    alt={certificate.exam.name}
                    height={200}
                    width={200}
                    className="mb-3"
                    style={{ display: "block", margin: "0 auto" }} // Center the image
                  />
                  <div className="text-900 font-medium text-xl mb-2 text-center">
                    {certificate.exam.name}:{" "}
                    <span className="text-500 font-medium line-height-3">
                      <em>{certificate.exam.description}</em>
                    </span>
                  </div>
                  {/* Put text in center */}
                  <div className="text-600" style={{ textAlign: "center" }}>
                    Date Passed: {formatDate(certificate.issuedDate)}
                  </div>

                  <Button
                    label="Download Certificate"
                    icon="pi pi-download"
                    className="mt-3 p-button-success"
                    onClick={() => handleDownloadCertificate(certificate.id, certificate.exam.name)} // Use the certificate id and exam name
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
