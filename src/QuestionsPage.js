
// import React, { useState } from "react";
// import { data, useLocation } from "react-router-dom";
// import "./QuestionsPage.css";
// import axios from "axios";
// const sampleQuestions = {
//   Math: [
//     { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
//     { question: "What is 12 / 4?", options: ["2", "3", "4", "5"], correctAnswer: "3" },
//     { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
//     { question: "Solve: 7 x 6", options: ["36", "42", "48", "54"], correctAnswer: "42" },
//     { question: "What is 15 - 7?", options: ["5", "6", "7", "8"], correctAnswer: "8" },
//   ],
//   CProgramming: [
//     { question: "What is the output of: printf(\"%d\", 5+3);", options: ["5", "3", "8", "Error"], correctAnswer: "8" },
//     { question: "Which of the following is a valid C data type?", options: ["int", "bool", "number", "string"], correctAnswer: "int" },
//     { question: "What is the file extension for a C program?", options: [".c", ".cpp", ".java", ".py"], correctAnswer: ".c" },
//     { question: "Which function is used to allocate memory in C?", options: ["malloc", "new", "alloc", "memalloc"], correctAnswer: "malloc" },
//     { question: "What is the default value of a global variable in C?", options: ["Undefined", "Zero", "Null", "Garbage"], correctAnswer: "Zero" },
//   ],
//   Python: [
//     { question: "What is the correct file extension for Python files?", options: [".pyt", ".pyth", ".py", ".python"], correctAnswer: ".py" },
//     { question: "How do you start a comment in Python?", options: ["//", "#", "/*", "<!--"], correctAnswer: "#" },
//     { question: "Which method can be used to remove whitespace from the start and end of a string?", options: ["trim()", "strip()", "cut()", "clear()"], correctAnswer: "strip()" },
//     { question: "Which keyword is used to define a function in Python?", options: ["def", "function", "fun", "define"], correctAnswer: "def" },
//     { question: "What is the output of: print(2**3)?", options: ["6", "8", "9", "Error"], correctAnswer: "8" },
//   ],
//   Java: [
//     { question: "What is the default value of an instance variable?", options: ["0", "null", "Depends on the type", "Undefined"], correctAnswer: "Depends on the type" },
//     { question: "Which keyword is used to inherit a class in Java?", options: ["this", "extends", "implements", "inherits"], correctAnswer: "extends" },
//     { question: "What is used to execute a Java program?", options: ["javac", "java", "jvm", "jre"], correctAnswer: "java" },
//     { question: "Which of the following is not a Java access modifier?", options: ["public", "protected", "private", "internal"], correctAnswer: "internal" },
//     { question: "What is the size of an int in Java?", options: ["16 bits", "32 bits", "64 bits", "8 bits"], correctAnswer: "32 bits" },
//   ],
//   Aptitude: [
//     { question: "If a train is traveling at 60 km/hr, how far will it travel in 45 minutes?", options: ["45 km", "40 km", "50 km", "60 km"], correctAnswer: "45 km" },
//     { question: "What is the next number in the sequence: 2, 6, 12, 20, 30?", options: ["40", "42", "38", "36"], correctAnswer: "42" },
//     { question: "If a bag contains 4 red balls, 5 blue balls, and 6 green balls, what is the probability of picking a blue ball?", options: ["1/3", "1/5", "1/4", "5/15"], correctAnswer: "1/3" },
//     { question: "A person bought an item for $120 and sold it for $150. What is the profit percentage?", options: ["25%", "30%", "20%", "15%"], correctAnswer: "25%" },
//     { question: "If 3x + 5 = 20, what is the value of x?", options: ["3", "5", "7", "10"], correctAnswer: "5" },
//   ],
// };



// const QuestionsPage = () => {
//   const location = useLocation();
//   const selectedSubjects = location.state?.subjects || [];
//   const [userAnswers, setUserAnswers] = useState({});
//   const [results, setResults] = useState(null);
//   const [recommendations, setRecommendations] = useState(null); // State for recommendations

//   const handleAnswerChange = (subject, questionIndex, answer) => {
//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [subject]: {
//         ...prevAnswers[subject],
//         [questionIndex]: answer,
//       },
//     }));
//   };

//   const subjectIdMapping = {
//     Math: "1",
//     CProgramming: "2",
//     Python: "3",
//     Java: "4",
//     Aptitude: "6",
//   };

//   const handleSubmit = async () => {
//     let subjectScores = {};
//     selectedSubjects.forEach((subject) => {
//       const questions = sampleQuestions[subject];
//       let correctAnswers = 0;

//       questions.forEach((question, index) => {
//         if (userAnswers[subject]?.[index] === question.correctAnswer) {
//           correctAnswers++;
//         }
//       });

//       subjectScores[subjectIdMapping[subject]] = {
//         correctAnswers,
//         totalQuestions: questions.length,
//         percentage: ((correctAnswers / questions.length) * 100).toFixed(2),
//       };
//     });

//     setResults(subjectScores);

//     // Prepare data to send to the backend with subject IDs and percentages
//     const dataToSend = Object.keys(subjectScores).reduce((acc, subjectId) => {
//       acc[subjectId] = parseFloat(subjectScores[subjectId].percentage);
//       return acc;
//     }, {});
// console.log(dataToSend)
//     try {
//       const response = await axios.post("http://localhost:8080/api/results/process", dataToSend);
//       console.log("Data sent to backend:", dataToSend);
//       console.log("Backend response:", response.data);

//       // Set recommendations based on the response
//       setRecommendations(response.data.recommendations);
//     } catch (error) {
//       console.error("Error submitting results:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Questions</h2>
//       {selectedSubjects.map((subject) => (
//         <div key={subject}>
//           <h3>{subject}</h3>
//           <ul>
//             {sampleQuestions[subject].map((q, index) => (
//               <li key={index}>
//                 <p>{q.question}</p>
//                 {q.options.map((option, optIndex) => (
//                   <div key={optIndex}>
//                     <input
//                       type="radio"
//                       name={`question-${subject}-${index}`}
//                       value={option}
//                       checked={userAnswers[subject]?.[index] === option}
//                       onChange={() => handleAnswerChange(subject, index, option)}
//                       id={`${subject}-${index}-${optIndex}`}
//                     />
//                     <label htmlFor={`${subject}-${index}-${optIndex}`}>
//                       {option}
//                     </label>
//                   </div>
//                 ))}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit</button>

//       {results && (
//         <div>
//           <h3>Results</h3>
//           {Object.keys(results).map((subject) => (
//             <div key={subject}>
//               <h4>{subject}</h4>
//               <p>
//                 Correct Answers: {results[subject].correctAnswers} / {results[subject].totalQuestions}
//               </p>
//               <p>Score: {results[subject].percentage}%</p>
//             </div>
//           ))}
//           {recommendations && (
//             <div>
//               <h3>Recommendations</h3>
//               {recommendations.map((rec, index) => (
//                 <div key={index}>
//                   <h4>{selectedSubjects[index]}</h4>
//                   <p>
//                     Recommended Resource:{" "}
//                     <a href={rec.url} target="_blank" rel="noopener noreferrer">
//                       {rec.resource}
//                     </a>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionsPage;


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

export default QuestionsPage;

