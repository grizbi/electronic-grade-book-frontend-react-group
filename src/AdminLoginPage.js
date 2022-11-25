import { useEffect, useState } from "react";
import MySideNav from "./SideNav";

const AdminHomePage = () => {

    const[students, setStudents] = useState('');
    const[averageClassGrade, setAverageClassGrade] = useState('');
    const[lowestAverageGradeStudent, setLowestAverageGradeStudent] = useState('');
    const[highestAverageGradeStudent, setHighestAverageGradeStudent] = useState('');
    const[mostOftenObtainedMark, setMostOftenObtainedMark] = useState('');
    const[leastFrequentlyObtainedMark, setLeastFrequentlyObtainedMark] = useState('');
    const[highestGrade, setHighestGrade] = useState('');
    const[totalOfMarks, setTotalOfMarks] = useState('');

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
        fetch('http://localhost:8080/special-students', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setHighestAverageGradeStudent(data.highestAverageGradeStudent.name + ' ' + data.highestAverageGradeStudent.surname);
            setLowestAverageGradeStudent(data.lowestAverageGradeStudent.name + ' ' + data.lowestAverageGradeStudent.surname);
            setMostOftenObtainedMark(data.mostOftenObtainedMark);
            setLeastFrequentlyObtainedMark(data.leastFrequentlyObtainedMark);
        })
        fetch('http://localhost:8080/highest-grade', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setHighestGrade(data);
        })
        fetch('http://localhost:8080/total-marks', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setTotalOfMarks(data);
        })
    })

    return ( 
        <div className="admin-home-page">
            <h1 style={{textAlign:"center", fontSize:"50px"}}>Hello {localStorage.getItem('email')}</h1>
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
            <div className="statistics-two">
                <div className="highest-grade">
                    <div style={{fontWeight: "1000", fontSize:"3.5vw"}}>{highestGrade}</div>
                    <br></br>
                    Highest grade
                    <i class="fa-solid fa-medal"></i>
                </div>
                <div className="marks-total">
                    <div style={{fontWeight: "1000", fontSize:"3.5vw"}}>{totalOfMarks}</div>
                    <br></br>
                    Total number of marks
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
            <div className="fun-fact">
                    <h3>Interesting facts about students and marks</h3>
                    Student with the highest average grade: {highestAverageGradeStudent}<br></br>
                    Student with the lowest average grade: {lowestAverageGradeStudent} <br></br>
                    Most often obtained mark: {mostOftenObtainedMark} <br></br>
                    Least frequently obtained mark: {leastFrequentlyObtainedMark}   
            </div>       
        </div>

     );
}
 
export default AdminHomePage;