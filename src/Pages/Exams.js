import React, { useEffect, useState } from "react";
import { Button } from "primereact/button"; // Import the Button component from PrimeReact
import { InputText } from "primereact/inputtext"; // Import InputText from PrimeReact (for editing)
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Toast } from "primereact/toast"; // Import Toast for feedback messages

export default function Exams() {
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [exams, setExams] = useState([]); // State to hold exams
  const [userRole, setUserRole] = useState(null); // State to determine the user's role (0: user, 1: admin, null: guest)
  const toastRef = React.useRef(null); // Ref for Toast

  // Store editing state
  const [editingExamId, setEditingExamId] = useState(null); // Track which exam is currently being edited

  useEffect(() => {
    // Get the user role from local storage
    const role = localStorage.getItem("userRole");
    // Determine user role based on local storage value
    if (role === "1") {
      setUserRole(1); // Admin
    } else if (role === "0") {
      setUserRole(0); // Regular user
    } else {
      setUserRole(null); // Guest
    }

    // Fetch exams from API
    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Exams/GetAll");
        const data = await response.json();
        setExams(data); // Set exams to the fetched data
      } catch (error) {
        console.error("Error fetching exams:", error); // Log any fetch errors
      }
    };

    fetchExams(); // Call the fetch function
  }, []);

  const handleDelete = async (id) => {
    // Confirm the deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5201/api/Exams/Delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove the deleted exam from state
          setExams(exams.filter((exam) => exam.id !== id)); 
          toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Exam deleted successfully!', life: 3000 });
        } else {
          // Handle error response
          const errorMessage = await response.text();
          toastRef.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      } catch (error) {
        console.error("Error deleting exam:", error);
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while deleting the exam.", life: 3000 });
      }
    }
  };

  const handleAddExam = () => {
    const newExam = {
      id: exams.length + 1,
      name: "New Exam",
      imageSrc: "https://f.hubspotusercontent10.net/hubfs/6448316/web-programming-languages.jpg",
      description: "New Exam Description", // Example description
    };
    setExams([...exams, newExam]); // Add the new exam to state
    toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'New exam added!', life: 3000 });
  };

  const handleExamPageNavigation = (examId) => {
    navigate(`/ExamPage/${examId}`); // Navigate to ExamPage with the examId
  };

  const handleUpdateExam = async (examId, updatedExam) => {
    try {
      const response = await fetch(`http://localhost:5201/api/Exams/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExam),
      });

      const responseMessage = await response.text(); // Get the response text

      if (response.ok) {
        // Only set success message if the update was successful
        setExams(exams.map((exam) => (exam.id === examId ? updatedExam : exam))); // Update the exams state
        toastRef.current.show({ severity: 'success', summary: 'Success', detail: responseMessage, life: 3000 });
        setEditingExamId(null); // Exit edit mode
      } else {
        // Handle error response
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: responseMessage, life: 3000 });
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while updating the exam.", life: 3000 });
    }
  };

  const handleEditExamField = (id, field, value) => {
    // Update the specific field of the exam that is being edited
    setExams(exams.map((exam) => (exam.id === id ? { ...exam, [field]: value } : exam))); 
  };

  const handleEdit = (id) => {
    setEditingExamId(id); // Set the editing state to the selected exam's ID
  };

  const handleCancelEdit = () => {
    setEditingExamId(null); // Reset editing state to cancel editing
  };

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <Toast ref={toastRef} /> {/* Toast component for messages */}
      <div className="text-900 font-bold text-6xl mb-4 text-center">Exams List</div>
      <div className="text-700 text-xl mb-6 text-center line-height-3">
        <h3>
          {userRole === 1 ? "Manage Exams" : 
           userRole === 0 ? "Choose the exam you are interested in" : 
           "Please log in to view exams"}
        </h3>
      </div>

      <div className="grid">
        {exams.map((exam) => (
          <div key={exam.id} className="col-12 lg:col-4">
            <div className="p-3 h-full">
              <div className="shadow-2 p-3 h-full flex flex-column surface-card" style={{ borderRadius: "6px" }}>
                {editingExamId === exam.id ? ( // Check if this exam is currently being edited
                  <InputText
                    value={exam.imageSrc} // Display the current image source
                    onChange={(e) => handleEditExamField(exam.id, "imageSrc", e.target.value)} // Handle image source editing
                    placeholder="Image URL"
                    className="w-full mb-2" // Add margin at the bottom
                  />
                ) : (
                  <img
                    src={exam.imageSrc}
                    alt={exam.name}
                    style={{ height: "40%", width: "60%", margin: "0 auto", display: "block" }} // Adjust the width and center the image
                    className="mb-3"
                  />
                )}
                <div className="text-900 font-medium text-xl mb-2" style={{ textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {editingExamId === exam.id ? ( // Check if this exam is currently being edited
                    <InputText
                      value={exam.name}
                      onChange={(e) => handleEditExamField(exam.id, "name", e.target.value)} // Handle name editing
                      className="w-full"
                    />
                  ) : (
                    exam.name
                  )}
                </div>
                <div className="text-600 mb-2" style={{ textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {editingExamId === exam.id ? ( // Check if this exam is currently being edited
                    <InputText
                      value={exam.description}
                      onChange={(e) => handleEditExamField(exam.id, "description", e.target.value)} // Handle description editing
                      className="w-full"
                    />
                  ) : (
                    exam.description
                  )}
                </div>
                <hr className="my-3 mx-0 border-top-1 border-none surface-border" />

                <div className="flex justify-content-center my-3">
                  {userRole === 1 ? ( // Admin view
                    <div className="flex justify-content-between">
                      {editingExamId === exam.id ? ( // Check if this exam is currently being edited
                        <>
                          <Button
                            label="Save"
                            className="p-3 mr-2"
                            icon="pi pi-save"
                            onClick={() => handleUpdateExam(exam.id, { ...exam })} // Save the updated exam
                          />
                          <Button
                            label="Cancel"
                            className="p-3"
                            icon="pi pi-times"
                            onClick={handleCancelEdit} // Cancel editing
                          />
                        </>
                      ) : (
                        <>
                          <Button
                            label="Edit"
                            className="p-3 mr-2"
                            icon="pi pi-pencil"
                            onClick={() => handleEdit(exam.id)} // Enable editing mode
                          />
                          <Button
                            label="Delete"
                            className="p-3"
                            icon="pi pi-trash"
                            onClick={() => handleDelete(exam.id)} // Delete exam on click
                          />
                        </>
                      )}
                    </div>
                  ) : userRole === 0 ? ( // Regular user view
                    <Button
                      label="Take Exam"
                      className="flex justify-content-center my-3"
                      icon="pi pi-play"
                      onClick={() => handleExamPageNavigation(exam.id)} // Navigate to ExamPage
                    />
                  ) : ( // Guest view
                    <Button
                      label="Log In"
                      className="flex justify-content-center my-3"
                      icon="pi pi-sign-in"
                      onClick={() => navigate('/')} // Redirect to login
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userRole === 1 && ( // Show add exam button only for admin
        <div className="mt-4">
          <Button label="Add New Exam" icon="pi pi-plus" onClick={handleAddExam} className="p-3 w-full" />
        </div>
      )}
    </div>
  );
}
