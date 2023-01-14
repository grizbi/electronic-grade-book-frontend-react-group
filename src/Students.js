import { useState } from "react";
import { useEffect } from "react";
import MySideNav from "./SideNav";
import { isAdminRoleActive, redirectUnauthorizedUser } from "./SessionUtil";

const Students = () => {
  redirectUnauthorizedUser();

  const [students, setStudents] = useState("");

  const deleteStudent = (studentId) => {
    fetch("http://localhost:8080/users/" + studentId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      method: "DELETE",
    });
  };

  const updateStudent = (student) => {
    localStorage.setItem("student", JSON.stringify(student));
    window.location.replace("/student-update");
  };

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

  if (isAdminRoleActive()) {
    return (
      <div>
        <MySideNav />
        <div className="students">
          <h1 style={{ textAlign: "center", fontSize: "3.0vw" }}>
            List of all students
          </h1>
          <div className="table-container">
            <table>
              <tr style={{ backgroundColor: "#ffafcc" }}>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
              <tbody>
                {students.length > 0 &&
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.email}</td>
                      <td>{student.name}</td>
                      <td>{student.surname}</td>
                      <td>{student.marks}</td>
                      <button
                        onClick={() => {
                          updateStudent(student);
                        }}
                        className="update-button"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          deleteStudent(student.id);
                        }}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default Students;
