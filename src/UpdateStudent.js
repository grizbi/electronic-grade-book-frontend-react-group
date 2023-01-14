import { useState } from "react";
import MySideNav from "./SideNav";

const UpdateStudent = () => {
  const student = JSON.parse(localStorage.getItem("student"));
  const id = student.id;
  const [email, setEmail] = useState(student.email);
  const [name, setName] = useState(student.name);
  const [surname, setSurname] = useState(student.surname);
  const [marks, setMarks] = useState(student.marks);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id, email, name, surname, marks };

    fetch("http://localhost:8080/users/" + user.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(user),
    }).then((response) => {
      setIsUserUpdated(true);
    });
  };
  return (
    <div>
      <MySideNav />
      <div className="update-student-form">
        <form onSubmit={handleSubmit}>
          <h1>Update student</h1>
          <div className="txt_field">
            <input
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
            <label>Surname</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />
            <label>Marks</label>
          </div>
          <input position type="submit" value="Update"></input>
          <div>
            {isUserUpdated && (
              <p
                style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}
              >
                Student data updated successfully
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
