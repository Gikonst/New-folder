import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ExamPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [certificateMessage, setCertificateMessage] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const fetchExam = useCallback(async () => {
    console.log("Fetching exam data for ID:", id);
    try {
      const response = await axios.get(`http://localhost:5201/api/Exams/GetById/${id}`);
      console.log("Fetched exam data:", response.data);
      setExam(response.data);
    } catch (error) {
      console.error("Error fetching exam:", error.response ? error.response.data : error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  const handleAnswerSelect = (questionId, answerId) => {
    if (!lockedAnswers[questionId]) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answerId,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Do you wish to proceed with submission?")) {
      if (!areAllQuestionsAnswered()) {
        alert("Please answer all questions before submitting.");
        return;
      }

      setSubmitted(true);

      const newLockedAnswers = {};
      exam.questions.forEach((q) => {
        newLockedAnswers[q.id] = true;
      });
      setLockedAnswers(newLockedAnswers);
      // Set showVideo based on score
      const score = calculateScore();
      if (score < passingScore) {
        setShowVideo(true); // Show video if the user did not pass
      }
    }
  };

  const areAllQuestionsAnswered = () => {
    return exam.questions.every((question) => answers[question.id]);
  };

  const calculateScore = () => {
    if (!exam) return 0;
    return exam.questions.reduce((total, question) => {
      const selectedAnswer = question.answers.find(
        (answer) => answer.id === answers[question.id]
      );
      return selectedAnswer && selectedAnswer.isCorrect ? total + 1 : total;
    }, 0);
  };

  if (!exam) {
    return <p>Loading exam data...</p>;
  }

  const score = calculateScore();
  const passingScore = Math.ceil(exam.questions.length / 2);

  const handleGenerateCertificate = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found in local storage.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5201/api/Certificates/Create/${id}`, null, {
        params: { userId: parseInt(userId) },
      });
      setCertificateMessage(response.data);
    } catch (error) {
      console.error("Error generating certificate:", error);
      setCertificateMessage(error.response ? error.response.data : "Error generating certificate.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        margin: "20px auto",
        maxWidth: "600px",
        backgroundColor: "#f9f9f9",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#4a90e2", marginBottom: "20px" }}>{exam.name}</h1>
      <p>{exam.description}</p>
      <form onSubmit={handleSubmit}>
        {exam.questions.map((question, index) => (
          <div key={question.id} style={{ marginBottom: "30px" }}>
            <p>
              <strong>{index + 1}. {question.questionText}</strong>
            </p>
            {question.answers.map((answer) => (
              <div key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name={question.id}
                    value={answer.id}
                    checked={answers[question.id] === answer.id}
                    onChange={() => handleAnswerSelect(question.id, answer.id)}
                    disabled={lockedAnswers[question.id]}
                  />
                  {answer.answerText}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          disabled={
            exam.questions.length === 0 ||
            Object.keys(answers).length !== exam.questions.length
          }
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: "30px" }}>
          <h2>Results</h2>
          <p>
            You scored {score} out of {exam.questions.length}.
          </p>

          {score >= passingScore ? (
            <div>
              <p style={{ color: "green" }}>Congratulations! You passed.</p>
              <button
                onClick={handleGenerateCertificate}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
              >
                Generate Certificate
              </button>
              {certificateMessage && <p>{certificateMessage}</p>}
            </div>
          ) : (
            <div>
              <p style={{ color: "red" }}>Keep practicing to improve your score!</p>
              {showVideo && ( // Conditionally render video if the user fails
                <div style={{ marginTop: "20px" }}>
                  <h3>Here's a motivational video for you!</h3>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&si=mys-yhspEydlAYFF"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>

                </div>
              )}
            </div>
          )}
          <button
            onClick={() => navigate("/exams")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Go Back to Exams
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
