import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog"; // Import Dialog component

export default function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const toastRef = React.useRef(null);
  const [editingExamId, setEditingExamId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  // State for the dialog/modal
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newExam, setNewExam] = useState({ name: "", imageSrc: "", description: "", programmingLanguageId: "" });
  
  // State for programming languages
  const [programmingLanguages, setProgrammingLanguages] = useState([]);

  const managementOptions = [
    { label: "Exams", value: "exams" },
    { label: "Programming Languages", value: "programmingLanguages" },
    { label: "Questions", value: "questions" },
    { label: "Answers", value: "answers" },
  ];

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "1") {
      setUserRole(1);
    } else if (role === "0") {
      setUserRole(0);
    } else {
      setUserRole(null);
    }

    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Exams/GetAll");
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    const fetchProgrammingLanguages = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/ProgrammingLanguages/GetAll");
        const data = await response.json();
        setProgrammingLanguages(data.map(lang => ({ label: lang.name, value: lang.id }))); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching programming languages:", error);
      }
    };

    fetchExams();
    fetchProgrammingLanguages(); // Fetch programming languages on component mount
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5201/api/Exams/Delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setExams(exams.filter((exam) => exam.id !== id));
          toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Exam deleted successfully!', life: 3000 });
        } else {
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
    setIsDialogVisible(true); // Show the dialog when the button is clicked
    setNewExam({ name: "", imageSrc: "", description: "", programmingLanguageId: "" }); // Reset new exam details
  };

  const handleDialogSave = async () => {
    try {
      const response = await fetch("http://localhost:5201/api/Exams/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExam),
      });

      const responseMessage = await response.text();

      if (response.ok) {
        setExams([...exams, { ...newExam, id: exams.length + 1 }]); // Add the new exam to state
        toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'New exam added!', life: 3000 });
        setIsDialogVisible(false); // Hide the dialog
      } else {
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: responseMessage, life: 3000 });
      }
    } catch (error) {
      console.error("Error adding exam:", error);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while adding the exam.", life: 3000 });
    }
  };

  const handleDialogCancel = () => {
    setIsDialogVisible(false); // Hide the dialog on cancel
  };

  const handleExamPageNavigation = (examId) => {
    navigate(`/ExamPage/${examId}`);
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

      const responseMessage = await response.text();

      if (response.ok) {
        setExams(exams.map((exam) => (exam.id === examId ? updatedExam : exam)));
        toastRef.current.show({ severity: 'success', summary: 'Success', detail: responseMessage, life: 3000 });
        setEditingExamId(null);
      } else {
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: responseMessage, life: 3000 });
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while updating the exam.", life: 3000 });
    }
  };

  const handleEditExamField = (id, field, value) => {
    setExams(exams.map((exam) => (exam.id === id ? { ...exam, [field]: value } : exam)));
  };

  const handleEdit = (id) => {
    setEditingExamId(id);
  };

  const handleCancelEdit = () => {
    setEditingExamId(null);
  };

  const handleManagementOptionChange = (e) => {
    setSelectedOption(e.value);
    switch (e.value) {
      case "programmingLanguages":
        navigate("/ProgrammingLanguages");
        break;
      case "questions":
        navigate("/Questions");
        break;
      case "answers":
        navigate("/Answers");
        break;
      default:
        break;
    }
  };

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <Toast ref={toastRef} />
      <div className="text-900 font-bold text-6xl mb-4 text-center">Exams List</div>
      
      {userRole === 1 && (
        <div className="mb-4">
          <Dropdown
            value={selectedOption}
            options={managementOptions}
            onChange={handleManagementOptionChange}
            placeholder="Select option to manage"
            className="w-full"
          />
        </div>
      )}

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
                {editingExamId === exam.id ? (
                  <InputText
                    value={exam.imageSrc}
                    onChange={(e) => handleEditExamField(exam.id, "imageSrc", e.target.value)}
                    placeholder="Image URL"
                    className="w-full mb-2"
                  />
                ) : (
                  <img
                    src={exam.imageSrc}
                    alt={exam.name}
                    style={{ height: "35%", width: "50%", margin: "0 auto", display: "block" }}
                    className="mb-3"
                  />
                )}
                <div className="text-900 font-medium text-xl mb-2" style={{ textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {editingExamId === exam.id ? (
                    <InputText
                      value={exam.name}
                      onChange={(e) => handleEditExamField(exam.id, "name", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    exam.name
                  )}
                </div>
                <div className="text-600 mb-2" style={{ textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {editingExamId === exam.id ? (
                    <InputText
                      value={exam.description}
                      onChange={(e) => handleEditExamField(exam.id, "description", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    exam.description
                  )}
                </div>
                <hr className="my-3 mx-0 border-top-1 border-none surface-border" />

                <div className="flex justify-content-center my-3">
                  {userRole === 1 ? (
                    <div className="flex justify-content-between">
                      {editingExamId === exam.id ? (
                        <>
                          <Button
                            label="Save"
                            className="p-3 mr-2"
                            icon="pi pi-save"
                            onClick={() => handleUpdateExam(exam.id, { ...exam })}
                          />
                          <Button
                            label="Cancel"
                            className="p-3"
                            icon="pi pi-times"
                            onClick={handleCancelEdit}
                          />
                        </>
                      ) : (
                        <>
                          <Button
                            label="Edit"
                            className="p-3 mr-2"
                            icon="pi pi-pencil"
                            onClick={() => handleEdit(exam.id)}
                          />
                          <Button
                            label="Delete"
                            className="p-3"
                            icon="pi pi-trash"
                            onClick={() => handleDelete(exam.id)}
                          />
                        </>
                      )}
                    </div>
                  ) : userRole === 0 ? (
                    <Button
                      label="Take Exam"
                      className="flex justify-content-center my-3"
                      icon="pi pi-play"
                      onClick={() => handleExamPageNavigation(exam.id)}
                    />
                  ) : (
                    <Button
                      label="Log In"
                      className="flex justify-content-center my-3"
                      icon="pi pi-sign-in"
                      onClick={() => navigate('/')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userRole === 1 && (
        <div className="mt-4">
          <Button label="Add New Exam" icon="pi pi-plus" onClick={handleAddExam} className="p-3 w-full" />
        </div>
      )}

      {/* Modal for adding new exam */}
      <Dialog header="Add New Exam" visible={isDialogVisible} onHide={handleDialogCancel} footer={
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={handleDialogCancel} />
          <Button label="Save" icon="pi pi-check" onClick={handleDialogSave} />
        </div>
      }>
        <div>
          <InputText
            placeholder="Exam Name"
            value={newExam.name}
            onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
            className="mb-2 w-full"
          />
          <InputText
            placeholder="Image URL"
            value={newExam.imageSrc}
            onChange={(e) => setNewExam({ ...newExam, imageSrc: e.target.value })}
            className="mb-2 w-full"
          />
          <InputText
            placeholder="Exam Description"
            value={newExam.description}
            onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
            className="mb-2 w-full"
          />
          {/* Dropdown for selecting programming language */}
          <Dropdown
            placeholder="Select Programming Language"
            value={newExam.programmingLanguageId}
            options={programmingLanguages}
            onChange={(e) => setNewExam({ ...newExam, programmingLanguageId: e.value })}
            className="w-full mb-2"
          />
        </div>
      </Dialog>
    </div>
  );
}
