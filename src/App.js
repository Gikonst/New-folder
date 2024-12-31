import "./App.css";
import Sidebar from "./Componets/Sidebar";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyProfile from "./Pages/MyProfile";
import Exams from "./Pages/Exams";
import AboutUs from "./Pages/AboutUs";
import RegisterForm from "./Pages/RegisterForm";
import Homepage from "./Pages/Homepage";
import ExamPage from "./Pages/ExamPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <div>
      <div className="layout-container">
        <Sidebar />
      </div>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/Exams" element={<Exams />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          {/* Add route for ExamPage with examId parameter */}
          <Route path="/ExamPage/:id" element={<ExamPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
