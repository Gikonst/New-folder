import React, { useEffect, useState } from "react";
import { Button } from "primereact/button"; // Import the Button component from PrimeReact
import { InputText } from "primereact/inputtext"; // Import InputText from PrimeReact (for editing)
import { Toast } from "primereact/toast"; // Import Toast for feedback messages
import { Dropdown } from "primereact/dropdown"; // Import Dropdown from PrimeReact
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

export default function ProgrammingLanguages() {
  const navigate = useNavigate(); // Initialize navigation
  const [programmingLanguages, setProgrammingLanguages] = useState([]); // State for programming languages
  const [userRole, setUserRole] = useState(null); // State to determine the user's role (0: user, 1: admin, null: guest)
  const toastRef = React.useRef(null); // Ref for Toast
  const [editingLanguageId, setEditingLanguageId] = useState(null); // Track which programming language is currently being edited
  const [newLanguage, setNewLanguage] = useState(""); // Track new programming language input

  // Define management options for dropdown
  const managementOptions = [
    { label: "Exams", value: "exams" },
    { label: "Programming Languages", value: "programmingLanguages" },
    { label: "Questions", value: "questions" },
    { label: "Answers", value: "answers" },
  ];

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

    // Fetch programming languages from API
    const fetchProgrammingLanguages = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/ProgrammingLanguages/GetAll");
        const data = await response.json();
        setProgrammingLanguages(data); // Set programming languages to the fetched data
      } catch (error) {
        console.error("Error fetching programming languages:", error); // Log any fetch errors
      }
    };

    fetchProgrammingLanguages(); // Call the fetch function for programming languages
  }, []);

  const handleDeleteLanguage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this programming language?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5201/api/ProgrammingLanguages/Delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProgrammingLanguages(programmingLanguages.filter((lang) => lang.id !== id)); // Remove deleted language from state
          toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Programming language deleted successfully!', life: 3000 });
        } else {
          const errorMessage = await response.text();
          toastRef.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      } catch (error) {
        console.error("Error deleting programming language:", error);
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while deleting the programming language.", life: 3000 });
      }
    }
  };

  const handleAddProgrammingLanguage = async () => {
    const newLang = {
      name: newLanguage,
    };
  
    try {
      const response = await fetch("http://localhost:5201/api/ProgrammingLanguages/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLang),
      });
  
      const responseData = await response.json(); // Parse the response as JSON
  
      if (response.ok) {
        setProgrammingLanguages([...programmingLanguages, responseData]); // Update the state with the new language
        setNewLanguage(""); // Clear the input field
        toastRef.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Programming language added!',
          life: 3000,
        });
      } else {
        // Handle validation errors or other errors
        if (responseData.errors) {
          const validationErrors = Object.values(responseData.errors).flat(); // Flatten the errors
          const errorMessage = validationErrors.join(", "); // Combine into a single message
          toastRef.current.show({
            severity: 'error',
            summary: 'Validation Error',
            detail: errorMessage,
            life: 3000,
          });
        } else {
          // General error message
          toastRef.current.show({
            severity: 'error',
            summary: 'Error',
            detail: responseData.title || "An unknown error occurred.",
            life: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error adding programming language:", error);
      toastRef.current.show({
        severity: 'error',
        summary: 'Error',
        detail: "An error occurred while adding the programming language.",
        life: 3000,
      });
    }
  };
  
  
  
  
  

  const handleUpdateProgrammingLanguage = async (id, updatedLang) => {
    try {
      const response = await fetch(`http://localhost:5201/api/ProgrammingLanguages/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLang),
      });
  
      const responseData = await response.json(); // Parse the response as JSON
  
      if (response.ok) {
        setProgrammingLanguages(programmingLanguages.map((lang) => (lang.id === id ? updatedLang : lang))); // Update state
        toastRef.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Programming language updated!',
          life: 3000,
        });
        setEditingLanguageId(null); // Exit edit mode
      } else {
        // Handle validation errors or other errors
        if (responseData.errors) {
          const validationErrors = Object.values(responseData.errors).flat(); // Flatten the errors
          const errorMessage = validationErrors.join(", "); // Combine into a single message
          toastRef.current.show({
            severity: 'error',
            summary: 'Validation Error',
            detail: errorMessage,
            life: 3000,
          });
        } else {
          // General error message
          toastRef.current.show({
            severity: 'error',
            summary: 'Error',
            detail: responseData.title || "An unknown error occurred.",
            life: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error updating programming language:", error);
      toastRef.current.show({
        severity: 'error',
        summary: 'Error',
        detail: "An error occurred while updating the programming language.",
        life: 3000,
      });
    }
  };
  

  const handleEditLanguageField = (id, value) => {
    setProgrammingLanguages(programmingLanguages.map((lang) => (lang.id === id ? { ...lang, name: value } : lang))); // Update specific language field
  };

  const handleEditLanguage = (id) => {
    setEditingLanguageId(id); // Set the editing state for the selected language
  };

  const handleCancelEditLanguage = () => {
    setEditingLanguageId(null); // Reset editing state to cancel editing
  };

  const handleManagementOptionChange = (e) => {
    switch (e.value) {
      case "exams":
        navigate("/Exams"); // Navigate to Exams component
        break;
      case "programmingLanguages":
        navigate("/ProgrammingLanguages"); // Navigate to Programming Languages component (current page)
        break;
      case "questions":
        navigate("/Questions"); // Navigate to Questions component
        break;
      case "answers":
        navigate("/Answers"); // Navigate to Answers component
        break;
      default:
        break;
    }
  };

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <Toast ref={toastRef} /> {/* Toast for feedback messages */}
      <div className="text-900 font-bold text-6xl mb-4 text-center">Programming Languages</div>
      
      {userRole === 1 && (
        <div className="mb-4">
          <Dropdown
            options={managementOptions}
            onChange={handleManagementOptionChange}
            placeholder="Select option to manage"
            className="w-full"
          />
        </div>
      )}

      <div className="text-700 mb-6 text-center">
        {userRole === 1 ? (
          <h3>Manage Programming Languages</h3>
        ) : (
          <h3>Please log in to manage programming languages</h3>
        )}
      </div>

      {userRole === 1 && (
        <div className="mb-4 ">
          <InputText 
            value={newLanguage} 
            onChange={(e) => setNewLanguage(e.target.value)} 
            placeholder="Add new programming language" 
            className="mr-2"
          />
          <Button className="p-button-success" label="Add" onClick={handleAddProgrammingLanguage} />
        </div>
      )}

<table className="table-auto w-full">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-3 text-left">Programming Language</th>
      {userRole === 1 && <th className="p-3 text-left">Actions</th>} {/* Actions column header */}
    </tr>
  </thead>
  <tbody>
    {programmingLanguages.map((lang) => (
      <tr key={lang.id} className="border-b">
        <td className="p-3">
          {editingLanguageId === lang.id ? (
            <div className="flex items-center">
              <InputText value={lang.name} onChange={(e) => handleEditLanguageField(lang.id, e.target.value)} className="mr-2" />
              <Button label="Save" onClick={() => handleUpdateProgrammingLanguage(lang.id, lang)} className="p-button-success" />
              <Button label="Cancel" onClick={handleCancelEditLanguage} className="p-button-danger ml-2" />
            </div>
          ) : (
            <span>{lang.name}</span>
          )}
        </td>
        {userRole === 1 && (
          <td className="p-3"> {/* Actions column for edit and delete buttons */}
            {editingLanguageId !== lang.id && ( // Show actions only when not editing
              <div className="flex items-center">
                <Button label="Edit" onClick={() => handleEditLanguage(lang.id)} className="p-button-warning mr-2" />
                <Button label="Delete" onClick={() => handleDeleteLanguage(lang.id)} className="p-button-danger" />
              </div>
            )}
          </td>
        )}
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
