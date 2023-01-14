import { useState } from "react";
import { useEffect } from "react";
import MySideNav from "./SideNav";
import { isAdminRoleActive, redirectUnauthorizedUser } from "./SessionUtil";

const Notifications = () => {
  // redirectUnauthorizedUser();

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
  });

  if (isAdminRoleActive()) {
    return (
      <div>
        <MySideNav />
        <div className="main-add-blog">
          <form className="form">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                // onChange={this.handleChange}
              />
            </div>
            <div className="msg">
              <label>Write what you want:</label>
              <textarea
                name="blogtext"
                placeholder="Message (max 200 chars!)"
                // onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="button">
              Send message
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Notifications;
