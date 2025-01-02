import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";

export default function Answers() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]); // To store questions for the dropdown
  const [newAnswerText, setNewAnswerText] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [updatedAnswerText, setUpdatedAnswerText] = useState("");
  const [updatedQuestionId, setUpdatedQuestionId] = useState(null);
  const [updatedIsCorrect, setUpdatedIsCorrect] = useState(null);
  const toastRef = React.useRef(null);
  const managementOptions = [
    { label: "Exams", value: "exams" },
    { label: "Programming Languages", value: "programmingLanguages" },
    { label: "Questions", value: "questions" },
    { label: "Answers", value: "answers" },
  ];

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Answers/GetAll");
        const data = await response.json();
        setAnswers(data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5201/api/Questions/GetAll");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchAnswers();
    fetchQuestions();
  }, []);

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

  const handleAddAnswer = async () => {
    const newAnswer = {
      questionId: selectedQuestionId,
      answerText: newAnswerText,
      isCorrect: isCorrect,
    };

    try {
      const response = await fetch("http://localhost:5201/api/Answers/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnswer),
      });

      if (response.ok) {
        const responseData = await response.json();
        setAnswers([...answers, responseData]);
        setNewAnswerText("");
        setSelectedQuestionId(null);
        setIsCorrect(false);
        toastRef.current.show({ severity: "success", summary: "Success", detail: "Answer added!", life: 3000 });
      } else {
        const errorMessage = await response.text();
        toastRef.current.show({ severity: "error", summary: "Error", detail: errorMessage, life: 3000 });
      }
    } catch (error) {
      console.error("Error adding answer:", error);
      toastRef.current.show({ severity: "error", summary: "Error", detail: "An error occurred while adding the answer.", life: 3000 });
    }
  };

  const handleEditAnswer = (answer) => {
    setEditingAnswerId(answer.id);
    setUpdatedAnswerText(answer.answerText);
    setUpdatedQuestionId(answer.question?.id || null);
    setUpdatedIsCorrect(answer.isCorrect);
  };

  const handleSaveEditedAnswer = async (id) => {
    const updatedAnswer = {
      id,
      questionId: updatedQuestionId,
      answerText: updatedAnswerText,
      isCorrect: updatedIsCorrect,
    };

    try {
      const response = await fetch("http://localhost:5201/api/Answers/Update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAnswer),
      });

      if (response.ok) {
        setAnswers(
          answers.map((answer) =>
            answer.id === id ? { ...answer, ...updatedAnswer } : answer
          )
        );
        setEditingAnswerId(null);
        toastRef.current.show({ severity: "success", summary: "Success", detail: "Answer updated!", life: 3000 });
      } else {
        const errorMessage = await response.text();
        toastRef.current.show({ severity: "error", summary: "Error", detail: errorMessage, life: 3000 });
      }
    } catch (error) {
      console.error("Error updating answer:", error);
      toastRef.current.show({ severity: "error", summary: "Error", detail: "An error occurred while updating the answer.", life: 3000 });
    }
  };

  const handleDeleteAnswer = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this answer?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5201/api/Answers/Delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setAnswers(answers.filter((answer) => answer.id !== id));
          toastRef.current.show({ severity: "success", summary: "Success", detail: "Answer deleted!", life: 3000 });
        } else {
          const errorMessage = await response.text();
          toastRef.current.show({ severity: "error", summary: "Error", detail: errorMessage, life: 3000 });
        }
      } catch (error) {
        console.error("Error deleting answer:", error);
        toastRef.current.show({ severity: "error", summary: "Error", detail: "An error occurred while deleting the answer.", life: 3000 });
      }
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <Toast ref={toastRef} />
      <div className="text-900 font-bold text-6xl mb-4 text-center">Answers</div>
      
      <div className="mb-4">
        <Dropdown
          options={managementOptions}
          onChange={handleManagementOptionChange}
          placeholder="Select option to manage"
          className="w-full"
        />
      </div>

      <div className="text-700 mb-6 text-center">
        <h3>Manage Answers</h3>
      </div>

      {/* Add Answer Section */}
      <div className="flex mb-4">
        <InputText
          value={newAnswerText}
          onChange={(e) => setNewAnswerText(e.target.value)}
          placeholder="Answer Text"
          className="mr-2"
        />
        <Dropdown
          value={selectedQuestionId}
          options={questions.map((q) => ({ label: q.questionText, value: q.id }))}
          onChange={(e) => setSelectedQuestionId(e.value)}
          placeholder="Select Question"
          className="mr-2"
        />
        <Dropdown
          value={isCorrect}
          options={[
            { label: "True", value: true },
            { label: "False", value: false },
          ]}
          onChange={(e) => setIsCorrect(e.value)}
          placeholder="Is Correct?"
          className="mr-2"
        />
        <Button label="Add" onClick={handleAddAnswer} className="p-button-success" />
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-3 border border-gray-200">Answer Text</th>
            <th className="p-3 border border-gray-200">Question Text</th>
            <th className="p-3 border border-gray-200">Is Correct</th>
            <th className="p-3 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => (
            <tr key={answer.id}>
              {editingAnswerId === answer.id ? (
                <>
                  <td className="p-3 border border-gray-200">
                    <InputText
                      value={updatedAnswerText}
                      onChange={(e) => setUpdatedAnswerText(e.target.value)}
                    />
                  </td>
                  <td className="p-3 border border-gray-200">
                    <Dropdown
                      value={updatedQuestionId}
                      options={questions.map((q) => ({ label: q.questionText, value: q.id }))}
                      onChange={(e) => setUpdatedQuestionId(e.value)}
                      placeholder="Select Question"
                    />
                  </td>
                  <td className="p-3 border border-gray-200">
                    <Dropdown
                      value={updatedIsCorrect}
                      options={[
                        { label: "True", value: true },
                        { label: "False", value: false },
                      ]}
                      onChange={(e) => setUpdatedIsCorrect(e.value)}
                      placeholder="Is Correct?"
                    />
                  </td>
                  <td className="p-3 border border-gray-200">
                    <Button
                      label="Save"
                      onClick={() => handleSaveEditedAnswer(answer.id)}
                      className="p-button-success mr-2"
                    />
                    <Button
                      label="Cancel"
                      onClick={() => setEditingAnswerId(null)}
                      className="p-button-danger"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="p-3 border border-gray-200">{answer.answerText}</td>
                  <td className="p-3 border border-gray-200">
                    {answer.question ? answer.question.questionText : "N/A"}
                  </td>
                  <td className="p-3 border border-gray-200">{answer.isCorrect ? "Yes" : "No"}</td>
                  <td className="p-3 border border-gray-200">
                    <Button
                      label="Edit"
                      onClick={() => handleEditAnswer(answer)}
                      className="p-button-warning mr-2"
                    />
                    <Button
                      label="Delete"
                      onClick={() => handleDeleteAnswer(answer.id)}
                      className="p-button-danger"
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
