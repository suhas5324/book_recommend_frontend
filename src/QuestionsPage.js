


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./QuestionsPage.css";
import axios from "axios";

const sampleQuestions = {
  Math: [
    { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { question: "What is 12 / 4?", options: ["2", "3", "4", "5"], correctAnswer: "3" },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { question: "Solve: 7 x 6", options: ["36", "42", "48", "54"], correctAnswer: "42" },
    { question: "What is 15 - 7?", options: ["5", "6", "7", "8"], correctAnswer: "8" },
  ],
  CProgramming: [
    { question: "What is the output of: printf(\"%d\", 5+3);", options: ["5", "3", "8", "Error"], correctAnswer: "8" },
    { question: "Which of the following is a valid C data type?", options: ["int", "bool", "number", "string"], correctAnswer: "int" },
    { question: "What is the file extension for a C program?", options: [".c", ".cpp", ".java", ".py"], correctAnswer: ".c" },
    { question: "Which function is used to allocate memory in C?", options: ["malloc", "new", "alloc", "memalloc"], correctAnswer: "malloc" },
    { question: "What is the default value of a global variable in C?", options: ["Undefined", "Zero", "Null", "Garbage"], correctAnswer: "Zero" },
  ],
  Python: [
    { question: "What is the correct file extension for Python files?", options: [".pyt", ".pyth", ".py", ".python"], correctAnswer: ".py" },
    { question: "How do you start a comment in Python?", options: ["//", "#", "/*", "<!--"], correctAnswer: "#" },
    { question: "Which method can be used to remove whitespace from the start and end of a string?", options: ["trim()", "strip()", "cut()", "clear()"], correctAnswer: "strip()" },
    { question: "Which keyword is used to define a function in Python?", options: ["def", "function", "fun", "define"], correctAnswer: "def" },
    { question: "What is the output of: print(2**3)?", options: ["6", "8", "9", "Error"], correctAnswer: "8" },
  ],
  Java: [
    { question: "What is the default value of an instance variable?", options: ["0", "null", "Depends on the type", "Undefined"], correctAnswer: "Depends on the type" },
    { question: "Which keyword is used to inherit a class in Java?", options: ["this", "extends", "implements", "inherits"], correctAnswer: "extends" },
    { question: "What is used to execute a Java program?", options: ["javac", "java", "jvm", "jre"], correctAnswer: "java" },
    { question: "Which of the following is not a Java access modifier?", options: ["public", "protected", "private", "internal"], correctAnswer: "internal" },
    { question: "What is the size of an int in Java?", options: ["16 bits", "32 bits", "64 bits", "8 bits"], correctAnswer: "32 bits" },
  ],
  Aptitude: [
    { question: "If a train is traveling at 60 km/hr, how far will it travel in 45 minutes?", options: ["45 km", "40 km", "50 km", "60 km"], correctAnswer: "45 km" },
    { question: "What is the next number in the sequence: 2, 6, 12, 20, 30?", options: ["40", "42", "38", "36"], correctAnswer: "42" },
    { question: "If a bag contains 4 red balls, 5 blue balls, and 6 green balls, what is the probability of picking a blue ball?", options: ["1/3", "1/5", "1/4", "5/15"], correctAnswer: "1/3" },
    { question: "A person bought an item for $120 and sold it for $150. What is the profit percentage?", options: ["25%", "30%", "20%", "15%"], correctAnswer: "25%" },
    { question: "If 3x + 5 = 20, what is the value of x?", options: ["3", "5", "7", "10"], correctAnswer: "5" },
  ],
};

const QuestionsPage = () => {
  const location = useLocation();
  const selectedSubjects = location.state?.subjects || [];
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleAnswerChange = (subject, questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [subject]: {
        ...prevAnswers[subject],
        [questionIndex]: answer,
      },
    }));
  };

  const subjectIdMapping = {
    Math: 1,
    CProgramming: 2,
    Python: 3,
    Java: 4,
    Aptitude: 6,
  };

  const handleSubmit = async () => {
    let subjectScores = {};
    selectedSubjects.forEach((subject) => {
      const questions = sampleQuestions[subject];
      let correctAnswers = 0;

      questions.forEach((question, index) => {
        if (userAnswers[subject]?.[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });

      subjectScores[subjectIdMapping[subject]] = {
        correctAnswers,
        totalQuestions: questions.length,
        percentage: ((correctAnswers / questions.length) * 100).toFixed(2),
      };
    });

    setResults(subjectScores);

    const dataToSend = Object.keys(subjectScores).reduce((acc, subjectId) => {
      acc[subjectId] = parseFloat(subjectScores[subjectId].percentage);
      return acc;
    }, {});

    try {
      const response = await axios.post("http://localhost:8080/api/results/process", dataToSend);
      console.log("Data sent to backend:", dataToSend);
      console.log("Backend response:", response.data);
      // Assuming the response contains a recommendations array
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error submitting results:", error);
    }
  };
  return (
    <div>
      <h2>Questions</h2>
      {selectedSubjects.map((subject) => (
        <div key={subject}>
          <h3>{subject}</h3>
          <ul>
            {sampleQuestions[subject].map((q, index) => (
              <li key={index}>
                <p>{q.question}</p>
                {q.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <input
                      type="radio"
                      name={`question-${subject}-${index}`}
                      value={option}
                      checked={userAnswers[subject]?.[index] === option}
                      onChange={() => handleAnswerChange(subject, index, option)}
                      id={`${subject}-${index}-${optIndex}`}
                    />
                    <label htmlFor={`${subject}-${index}-${optIndex}`}>{option}</label>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>

      {results && (
        <div>
          <h3>Results</h3>
          {Object.keys(results).map((subject) => (
            <div key={subject}>
              <h4>{subject}</h4>
              <p>
                Correct Answers: {results[subject].correctAnswers} / {results[subject].totalQuestions}
              </p>
              <p>Score: {results[subject].percentage}%</p>
            </div>
          ))}
        </div>
      )}
      {recommendations && (
  <div>
    <h3>Recommendations</h3>
    {recommendations.map((recommendation, index) => {
      const subjectName = Object.keys(subjectIdMapping).find(
        (key) => subjectIdMapping[key] === recommendation.subject_id
      );
      return (
        <div key={index}>
          <h4>{subjectName}</h4>
          <p>
            <strong>Resource:</strong> {recommendation.resource}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
              {recommendation.url}
            </a>
          </p>
        </div>
      );
    })}
  </div>
)}

    </div>
  );
};








const sampleQuestionss = {
  Math: {
    easy: [
      { question: "What is 6 + 4?", options: ["8", "9", "10", "11"], correctAnswer: "10" },
      { question: "What is 20 - 8?", options: ["12", "14", "10", "15"], correctAnswer: "12" },
      { question: "What is 3 x 5?", options: ["10", "15", "20", "25"], correctAnswer: "15" },
      { question: "What is the square of 2?", options: ["2", "4", "6", "8"], correctAnswer: "4" },
      { question: "What is 50% of 100?", options: ["25", "50", "75", "100"], correctAnswer: "50" },
      { question: "Simplify: 8 ÷ 2", options: ["2", "4", "6", "8"], correctAnswer: "4" },
      { question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], correctAnswer: "2" },
      { question: "What is 10 x 10?", options: ["50", "100", "150", "200"], correctAnswer: "100" },
      { question: "Solve: 25 ÷ 5", options: ["2", "4", "5", "6"], correctAnswer: "5" },
      { question: "What is the value of 3 + 7 - 2?", options: ["5", "8", "10", "12"], correctAnswer: "8" },
    ],
    medium: [
      { question: "What is the value of x if 3x + 9 = 18?", options: ["3", "6", "9", "12"], correctAnswer: "3" },
      { question: "What is the greatest common divisor of 24 and 36?", options: ["6", "8", "12", "18"], correctAnswer: "12" },
      { question: "Simplify: (10 + 5) × 2.", options: ["25", "20", "30", "15"], correctAnswer: "30" },
      { question: "What is the area of a triangle with base 10 cm and height 5 cm?", options: ["25 cm²", "50 cm²", "75 cm²", "100 cm²"], correctAnswer: "25 cm²" },
      { question: "Find the value of x if 2x - 5 = 15.", options: ["5", "10", "15", "20"], correctAnswer: "10" },
      { question: "Evaluate: (3^3) + (2^3).", options: ["29", "30", "31", "35"], correctAnswer: "35" },
      { question: "What is the least common multiple of 8 and 12?", options: ["24", "36", "48", "12"], correctAnswer: "24" },
      { question: "If a car travels 60 km in 2 hours, what is its average speed?", options: ["30 km/h", "60 km/h", "40 km/h", "50 km/h"], correctAnswer: "30 km/h" },
      { question: "Simplify: (5 + 3) × (4 - 2).", options: ["10", "12", "14", "16"], correctAnswer: "16" },
      { question: "Find the sum of the first 5 positive integers.", options: ["10", "12", "15", "20"], correctAnswer: "15" },
    ],
    hard: [
      { question: "What is the value of x if 5x^2 - 20 = 0?", options: ["2", "4", "±2", "±4"], correctAnswer: "±2" },
      { question: "If sin(θ) = 1/2, find θ in degrees.", options: ["30°", "45°", "60°", "90°"], correctAnswer: "30°" },
      { question: "What is the derivative of 3x^2 with respect to x?", options: ["3x", "6x", "x^2", "2x"], correctAnswer: "6x" },
      { question: "Evaluate the integral of x dx.", options: ["x^2 + C", "x^2/2 + C", "2x + C", "x + C"], correctAnswer: "x^2/2 + C" },
      { question: "What is the sum of the interior angles of a hexagon?", options: ["360°", "540°", "720°", "900°"], correctAnswer: "720°" },
      { question: "Solve for x: x^2 - 2x - 15 = 0.", options: ["3, -5", "-3, 5", "5, -3", "None"], correctAnswer: "5, -3" },
      { question: "If a cone has a radius of 3 cm and a height of 4 cm, what is its volume?", options: ["12π cm³", "24π cm³", "36π cm³", "48π cm³"], correctAnswer: "12π cm³" },
      { question: "Find the probability of rolling a sum of 7 with two dice.", options: ["1/6", "1/12", "1/36", "5/36"], correctAnswer: "1/6" },
      { question: "What is the standard deviation of the dataset: 2, 4, 4, 4, 5, 5, 7, 9?", options: ["1", "2", "3", "4"], correctAnswer: "2" },
      { question: "Simplify: (x^2 - 4)/(x - 2).", options: ["x + 2", "x - 2", "x^2 - 2", "None"], correctAnswer: "x + 2" },
    ],
  },
};








export default QuestionsPage;

