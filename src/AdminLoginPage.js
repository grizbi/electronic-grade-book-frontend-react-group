import { useEffect, useState } from "react";
import MySideNav from "./SideNav";



const AdminHomePage = () => {

    const[students, setStudents] = useState('');
    const[averageClassGrade, setAverageClassGrade] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/students-total', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setStudents(data);
        })
        fetch('http://localhost:8080/average-class-grade', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setAverageClassGrade(data);
        })
    })

    return ( 
        <div className="admin-home-page">
            <MySideNav/>
            <div className="statistics">
                <div className="students-quantity">
                    <div style={{fontWeight: "1000", fontSize:"3.5vw"}}>{students}</div>
                    <br></br>
                    Currently enrolled students
                    <i className="fa-solid fa-user" ></i>
                </div>
                <div className="average-grade">
                    <div style={{fontWeight: "1000", fontSize:"3.5vw"}}>{averageClassGrade}</div>
                    <br></br>
                    Average class grade
                    <i class="fa-solid fa-chart-simple"></i>
                </div>
            </div>
        </div>

     );
}
 
export default AdminHomePage;