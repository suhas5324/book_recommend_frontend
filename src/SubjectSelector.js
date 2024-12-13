
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectSelector.css";

const SubjectSelector = () => {
  const subjects = [
    { id: 1, name: "Math" },
    { id: 2, name: "CProgramming" },
    { id: 3, name: "Python" },
    { id: 4, name: "Java" },
    {id:6, name:"Aptitude"}
  ];
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();

  const handleSubjectChange = (index, value) => {
    const newSelectedSubjects = [...selectedSubjects];
    newSelectedSubjects[index] = value;
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleSubmit = () => {
    if (selectedSubjects.length === 3 && selectedSubjects.every((subject) => subject)) {
      navigate("/questions", { state: { subjects: selectedSubjects } });
    } else {
      alert("Please select exactly 3 subjects.");
    }
  };

  // return (
  //   <div>
  //     <h2>Select 3 Subjects</h2>
  //     <div>
  //       {Array.from({ length: 3 }).map((_, index) => (
  //         <div key={index}>
  //           <select
  //             value={selectedSubjects[index] || ""}
  //             onChange={(e) => handleSubjectChange(index, e.target.value)}
  //           >
  //             <option value="">Select a subject</option>
  //             {subjects.map((subject) => (
  //               <option key={subject.id} value={subject.name}>
  //                 {subject.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       ))}
  //     </div>
  //     <button onClick={handleSubmit}>Submit</button>
  //   </div>
  // );


  return (
    <div className="container">
      <h2>Select 3 Subjects</h2>
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <select
              value={selectedSubjects[index] || ""}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubjectSelector;
