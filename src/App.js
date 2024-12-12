import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubjectSelector from "./SubjectSelector";
import QuestionsPage from "./QuestionsPage";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SubjectSelector />} />
      <Route path="/questions" element={<QuestionsPage />} />
    </Routes>
  </Router>
  );
}

export default App;

