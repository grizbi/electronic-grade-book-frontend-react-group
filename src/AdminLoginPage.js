import { useEffect, useState } from "react";
import MySideNav from "./SideNav";
import MyCalendar from "./Calendar";


const AdminHomePage = () => {

    const[students, setStudents] = useState('');
    const[averageClassGrade, setAverageClassGrade] = useState('');
    const[lowestAverageGradeStudent, setLowestAverageGradeStudent] = useState('');
    const[highestAverageGradeStudent, setHighestAverageGradeStudent] = useState('');
    const[mostOftenObtainedMark, setMostOftenObtainedMark] = useState('');
    const[leastFrequentlyObtainedMark, setLeastFrequentlyObtainedMark] = useState('');

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
    })

    return ( 
        <div className="admin-home-page">
            <h1 style={{textAlign:"center"}}>Hello {localStorage.getItem('email')}</h1>
            <h2 style={{paddingLeft:"12%", paddingTop:"2%"}}>Student Management Control Panel</h2>
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
            
            <div className="statistics-info">Interesting facts about students and marks</div>
            <div className="flex-container">
            <div className="fun-fact">
                    Student with the highest average grade: {highestAverageGradeStudent}<br></br>
                    Student with the lowest average grade: {lowestAverageGradeStudent} <br></br>
                    Most often obtained mark: {mostOftenObtainedMark} <br></br>
                    Least frequently obtained mark: {leastFrequentlyObtainedMark}
                    
                </div>
                <div className="calendar">
                    <MyCalendar/>  
                </div>        
            </div>
        </div>

     );
}
 
export default AdminHomePage;