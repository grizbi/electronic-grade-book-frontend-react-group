import { useState } from "react";
import { useEffect } from "react";
import MySideNav from "./SideNav";
import StudentSideNav from "./StudentSideNav";
import React, { PureComponent } from "react";
import "./index.css";
import {
  Area,
  AreaChart,
  BarChart,
  Bar,
  Cel,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import { act } from "react-dom/test-utils";

const StudentCharts = () => {
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

  const [student_marks, setMarks] = useState("");
  const [student_data, setStudentData] = useState("");
  const mail = localStorage.getItem("email");

  const url = "http://localhost:8080/marks-student/" + mail;

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const StudentMarksInt = test(data);
        setMarks(StudentMarksInt);
        setStudentData(data);
      });
  }, []);

  let average = [];
  let av = 0;
  let value = 0;
  let grades = 1;

  for (let i = 0; i < student_marks.length; i++) {
    value = student_marks[i].y + value;
    av = value / grades;

    var obj = {};
    obj["x"] = i + 1;
    obj["y"] = parseFloat(av).toFixed(2);
    average.push(obj);
    grades++;
  }

  return (
    <ResponsiveContainer>
    <div className="StudentGradeChart">
      <h2 style={{ textAlign: "center", fontSize: "2.5vw" }}>
        <StudentSideNav />
        Chart for your grades
      </h2>
      <div className="area_chart">
        <AreaChart
          width={700}
          height={400}
          data={average}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="Ilosc ocen">
            <Label
              value="The number of your grades"
              offset={-40}
              position="insideBottom"
              fontSize="1.3vw"
            />
          </XAxis>
          <YAxis
            name="średnia"
            domain={[2, 5]}
            label={{
              value: "Your average grade",
              angle: -90,
              position: "insideBottomLeft",
              fontSize: "1.5vw", //popraw
            }}
          />
          <Tooltip />
          <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>

      <div className="line_chart">
        <LineChart
          width={700}
          height={400}
          data={student_marks}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" name="Ilość ocen danego ucznia">
            <Label
              value="The number of your grades"
              offset={-40}
              position="insideBottom"
              fontSize="1.3vw"
            />
          </XAxis>
          <YAxis
            name="Otrzymana ocena"
            domain={[2, 5]}
            label={{
              value: "Rating of the grade obtained",
              angle: -90,
              position: "insideBottomLeft",
              fontSize: "1.3vw",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            name="Grade received"
            dataKey="y"
            stroke="#9900ff"
          />
        </LineChart>
      </div>
    </div>
    </ResponsiveContainer>
  );
};

export default StudentCharts;
