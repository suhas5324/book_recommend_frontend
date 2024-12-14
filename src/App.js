import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import QuestionsPage from './QuestionsPage';
import SubjectSelector from './SubjectSelector';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subjects" element={
            <PrivateRoute>
              <SubjectSelector />
            </PrivateRoute>
          } />
          <Route path="/questions" element={
            <PrivateRoute>
              <QuestionsPage />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
