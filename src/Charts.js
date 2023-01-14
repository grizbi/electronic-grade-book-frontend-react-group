import { useState } from "react";
import { useEffect } from "react";
import MySideNav from "./SideNav";
import React, { PureComponent } from "react";
import "./index.css";
import {
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

const Charts = () => {
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

  function Mails(arg) {
    const TableRow = ({ email }) => (
      <tr>
        <td>{email}</td>
      </tr>
    );
    const DataTable = ({ arg }) => {
      return (
        <table>
          <tbody>
            {arg.map((item) => (
              <TableRow key={item.field} field={item.email} />
            ))}
          </tbody>
        </table>
      );
    };
  }

  const [averageAndStudent, setAverageAndStudent] = useState([]);
  const [allStudents, setStudents] = useState([]);

  const EmailAllStudents = allStudents.map((user) => user.email);
  console.log(EmailAllStudents);

  useEffect(() => {
    fetch("http://localhost:8080/students-average-grade", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAverageAndStudent(data);
        console.log(data)
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/students", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      });
  }, []);

  const [student_marks, setMarks] = useState("");
  const [student_data, setStudentData] = useState("");

  function handleChange(event) {
    const mail = event.target.value;
    const dane = event.target.value;
    const url = "http://localhost:8080/marks-student/" + mail;

    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((dejta) => {
        const StudentMarksInt = test(dejta);
        setMarks(StudentMarksInt);
        setStudentData(dejta);
      });
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FF3800",
    "#FFBB28",
    "#FF8042",
    "#AB274F",
    "#00FFFF",
    "#D70040",
    "#856088",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    angle,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.70;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {averageAndStudent[index].name} {averageAndStudent[index].surname} ({averageAndStudent[index].averageGrade}
        ) ({`${(percent * 100).toFixed(0)}%`})
      </text>
    );
  };

  return (
    <ResponsiveContainer>
    <div className="chart-page">
      <h1 style={{ fontSize: 50 }}>Charts</h1>
      <MySideNav />
      <div className="charts">
        <div className="BarChart">
          <h1 style={{ textAlign: "center" }}>Average grade of the student</h1>
          <BarChart
            width={1200}
            height={500}
            data={averageAndStudent}
            barCategoryGap={10}
            barSize={15}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10}}
            />
            <YAxis type="number" domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 5" />
            <Bar
              name="Average grade of the student"
              dataKey="averageGrade"
              fill="#8884d9"
              background={{ fill: "white" }}
            />
          </BarChart>

        </div>

        <div className="PieChart">
          <h1 style={{ textAlign: "center" }}>
            Role of individual students' grades
          </h1>
          <PieChart width={800} height={800}>
            <Pie
              data={averageAndStudent}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={400}
              fill="#8884d8"
              dataKey="averageGrade"
              index
              
            >
              {averageAndStudent.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="StudentGradeChart">
          <h1 style={{ textAlign: "center" }}>
            Occurrences of a mark for specific student - {student_data.name}{" "}
            {student_data.surname}
          </h1>
          <select onChange={handleChange}>
            {EmailAllStudents.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>

          <LineChart
            width={1200}
            height={500}
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
                value="The number of grades of a particular student"
                offset={-40}
                position="insideBottom"
              />
            </XAxis>
            <YAxis
              name="Otrzymana ocena"
              domain={[0, 5]}
              label={{
                value: "Rating of the grade obtained",
                angle: -90,
                position: "insideBottomLeft",
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
    </div>
    </ResponsiveContainer>
  );
};
export default Charts;
