import { useState } from "react";
import { useEffect } from "react";
import MySideNav from "./SideNav";
import { isAdminRoleActive, redirectUnauthorizedUser} from "./SessionUtil";

const PredictedGrades = () => {

    redirectUnauthorizedUser();

    const [averageAndStudent, setAverageAndStudent] = useState([]);

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
      });
  }, []);

    

    if(isAdminRoleActive()) {
        return (  
            <div>
                <MySideNav/>
                <h1 style={{ fontSize: "3.0vw", textAlign: "center" }}>Students predicted grades</h1>
                <div className="students-predicted-grade">
                    <div className="table-container">
                        <table>
                            <tr style={{backgroundColor:"#ffafcc"}}>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Predicted grade</th> 
                            </tr>
                            <tbody>
                                {averageAndStudent.length > 0 && averageAndStudent.map( (student) => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.surname}</td>
                                        <td>{student.averageGrade}</td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>   
                </div>
            </div>
        );
    }
}
 
export default PredictedGrades;