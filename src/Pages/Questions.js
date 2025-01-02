import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const toastRef = React.useRef(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [exams, setExams] = useState([]);

  const managementOptions = [
    { label: "Exams", value: "exams" },
    { label: "Programming Languages", value: "programmingLanguages" },
    { label: "Questions", value: "questions" },
    { label: "Answers", value: "answers" },
  ];

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role === "1" ? 1 : role === "0" ? 0 : null);

    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Questions/GetAll");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Exams/GetAll");
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchQuestions();
    fetchExams();
  }, []);

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5201/api/Questions/Delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setQuestions(questions.filter((question) => question.id !== id));
          toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Question deleted successfully!', life: 3000 });
        } else {
          const errorMessage = await response.text();
          toastRef.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      } catch (error) {
        console.error("Error deleting question:", error);
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while deleting the question.", life: 3000 });
      }
    }
  };

  const handleAddQuestion = async () => {
    const selectedExam = exams.find((exam) => exam.id === selectedExamId);
    
    if (!selectedExam) {
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "Selected exam not found. Please select a valid exam.", life: 3000 });
      return;
    }

    const newQuestion = {
      questionText: newQuestionText,
      examId: selectedExam.id,
    };

    try {
      const response = await fetch("http://localhost:5201/api/Questions/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      const responseText = await response.text();

      if (response.ok) {
        const responseData = JSON.parse(responseText);
        setQuestions([...questions, responseData]);
        setNewQuestionText("");
        setSelectedExamId(null);
        toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Question added!', life: 3000 });
      } else {
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.errors) {
            const validationErrors = Object.values(errorData.errors).flat();
            errorMessage = validationErrors.join(", ");
          } else {
            errorMessage = errorData.title || "An unknown error occurred.";
          }
        } catch (jsonError) {
          errorMessage = responseText || "An unknown error occurred.";
        }
        toastRef.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while adding the question.", life: 3000 });
    }
  };

  const handleUpdateQuestion = async (id) => {
    const selectedExam = exams.find((exam) => exam.id === selectedExamId);
    
    if (!selectedExam) {
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "Selected exam not found. Please select a valid exam.", life: 3000 });
      return;
    }

    const updatedQuestion = {
      id,
      questionText: newQuestionText, // Use the new question text from the state
      examId: selectedExam.id, // Use the selected exam ID
    };

    try {
      const response = await fetch(`http://localhost:5201/api/Questions/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      });

      if (response.ok) {
        setQuestions(questions.map((question) => (question.id === id ? updatedQuestion : question)));
        toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Question updated!', life: 3000 });
        setEditingQuestionId(null);
        setNewQuestionText(""); // Clear new question text after updating
        setSelectedExamId(null); // Clear selected exam ID after updating
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          const validationErrors = Object.values(responseData.errors).flat();
          const errorMessage = validationErrors.join(", ");
          toastRef.current.show({ severity: 'error', summary: 'Validation Error', detail: errorMessage, life: 3000 });
        } else {
          toastRef.current.show({ severity: 'error', summary: 'Error', detail: responseData.title || "An unknown error occurred.", life: 3000 });
        }
      }
    } catch (error) {
      console.error("Error updating question:", error);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: "An error occurred while updating the question.", life: 3000 });
    }
  };

  const handleEditQuestionField = (id, value) => {
    setNewQuestionText(value); // Set new question text for editing
    const selectedExam = questions.find(q => q.id === id).examId; // Fetch the current exam ID
    setSelectedExamId(selectedExam); // Set the selected exam ID from the current question
  };

  const handleEditQuestion = (id) => {
    setEditingQuestionId(id);
    const question = questions.find((q) => q.id === id);
    setNewQuestionText(question.questionText); // Set current question text for editing
    setSelectedExamId(question.examId); // Set current exam ID for editing
  };

  const handleCancelEditQuestion = () => {
    setEditingQuestionId(null);
    setNewQuestionText("");
    setSelectedExamId(null); // Clear selected exam ID when cancelling
  };

  const handleManagementOptionChange = (e) => {
    switch (e.value) {
      case "exams":
        navigate("/exams");
        break;
      case "programmingLanguages":
        navigate("/programmingLanguages");
        break;
      case "questions":
        navigate("/questions");
        break;
      case "answers":
        navigate("/answers");
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <Toast ref={toastRef} />
      <div className="text-900 font-bold text-6xl mb-4 text-center">Questions</div>
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
          <h3>Manage Questions</h3>
        ) : (
          <h3>Please log in to manage programming languages</h3>
        )}
      </div>
      <div className="flex mb-4">
        <InputText
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          placeholder="New Question"
          className="mr-2"
        />
        <Dropdown
          value={selectedExamId}
          options={exams.map(exam => ({ label: exam.name, value: exam.id }))}
          onChange={(e) => setSelectedExamId(e.value)}
          placeholder="Select exam"
          className="mr-2"
        />
        <Button
          label="Add"
          onClick={handleAddQuestion}
          className="p-button-success"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-3 border border-gray-200">Question</th>
            <th className="p-3 border border-gray-200">Exam</th>
            {userRole === 1 && <th className="p-3 border border-gray-200">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="p-3 border border-gray-200">
                {editingQuestionId === question.id ? (
                  <div className="flex">
                    <InputText
                      value={newQuestionText}
                      onChange={(e) => handleEditQuestionField(question.id, e.target.value)}
                      className="mr-2"
                    />
                    <Dropdown
                      value={selectedExamId}
                      options={exams.map(exam => ({ label: exam.name, value: exam.id }))}
                      onChange={(e) => setSelectedExamId(e.value)}
                      placeholder="Select exam"
                      className="mr-2"
                    />
                    <Button
                      label="Save"
                      onClick={() => handleUpdateQuestion(question.id)}
                      className="p-button-success"
                    />
                    <Button
                      label="Cancel"
                      onClick={handleCancelEditQuestion}
                      className="p-button-danger ml-2"
                    />
                  </div>
                ) : (
                  <span>{question.questionText}</span>
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {Array.isArray(question.exams) && question.exams.length > 0 ? question.exams[0].name : "No Exam"}
              </td>
              {userRole === 1 && (
                <td className="p-3 border border-gray-200">
                  {editingQuestionId !== question.id && (
                    <div className="flex items-center">
                      <Button
                        label="Edit"
                        onClick={() => handleEditQuestion(question.id)}
                        className="p-button-warning mr-2"
                      />
                      <Button
                        label="Delete"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="p-button-danger"
                      />
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
