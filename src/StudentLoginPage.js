import { useEffect, useState } from "react";
import StudentSideNav from "./StudentSideNav";
import Calendar from "react-calendar";
import "./index.css";
import "react-calendar/dist/Calendar.css";
import { ClockStudent } from "./ClockStudent";

const StudentLoginPage = () => {
  const [averageClassGrade, setAverageClassGrade] = useState("");
  const [highestGrade, setHighestGrade] = useState("");
  const [student_marks, setMarks] = useState("");
  const mail = localStorage.getItem("email");
  const [date, setDate] = useState(new Date());
  const [student_all_marks, setAllMarks] = useState("");

  const url = "http://localhost:8080/marks-student/" + mail;

  function test(arg) {
    const MarksOfStudents = arg.marks;
    const marksArray = MarksOfStudents.split(",");
    const intArray = marksArray.map((int) => parseInt(int, 10));
    const chartData = intArray.map((grade, index) => ({
      x: index + 1,
      y: grade,
    }));
    return chartData;
  }

  useEffect(() => {
    fetch("http://localhost:8080/average-class-grade", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAverageClassGrade(data);
      });

    fetch("http://localhost:8080/highest-grade", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHighestGrade(data);
      });

    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllMarks(data);
        const StudentMarksInt = test(data);
        setMarks(StudentMarksInt);
        console.log(StudentMarksInt);
      });
  }, []);

  let your_average = 0;
  let grades = student_marks.length;
  let value = 0;

  for (let i = 0; i < student_marks.length; i++) {
    value = student_marks[i].y + value;
  }

  your_average = value / grades;
  console.log(your_average)
  if (isNaN(your_average)) {
    your_average = 'No grades';
  }

  return (
    <div className="student-home-page">
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>
        Hello {localStorage.getItem("email")}
      </h1>
      <StudentSideNav />
      <div className="statistics">
        <div className="students-quantity">
          <div style={{ fontWeight: "1000", fontSize: "3.5vw" }}>
            {your_average}
          </div>
          <br></br>
          Your average grade
          <i className="fa-solid fa-user"></i>
        </div>
        <div className="average-grade">
          <div style={{ fontWeight: "1000", fontSize: "3.5vw" }}>
            {averageClassGrade}
          </div>
          <br></br>
          Average class grade
          <i class="fa-solid fa-chart-simple"></i>
        </div>
      </div>
      <div className="statistics-two">
        <div className="highest-grade">
          <div style={{ fontWeight: "1000", fontSize: "3.5vw" }}>
            {highestGrade}
          </div>
          <br></br>
          Highest grade
          <i class="fa-solid fa-medal"></i>
        </div>
        <div className="marks-total">
          <div style={{ fontWeight: "1000", fontSize: "3.5vw" }}>
            {student_all_marks.marks}
          </div>
          <br></br>
          Your marks
          <i class="fa-solid fa-pen"></i>
        </div>
      </div>
      <div className="Calendar-student">
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className="text-center">
          <span className="bold">Selected Date:</span> {date.toDateString()}
        </p>
      </div>
      <div className="Clock-on-page-student">
        <ClockStudent />
      </div>
    </div>
  );
};

export default StudentLoginPage;
