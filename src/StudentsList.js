import { useState } from "react";
import { useEffect } from "react";
import React, {Component} from "react";
import MySideNav from "./SideNav";
import StudentSideNav from "./StudentSideNav";
import { isSessionActive, redirectUnauthorizedUser} from "./SessionUtil";

const StudentsList = () => {

    //redirectUnauthorizedUser();

    const[students_list, setStudentsLists] = useState('');


    useEffect( () => {
        fetch('http://localhost:8080/students', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            method: 'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setStudentsLists(data);
        })
    })

    if(isSessionActive()) {
        return (  
            <div>
                <StudentSideNav/>
                <h1 style={{textAlign:"center", fontSize:"3.0vw"}}>Your friends in class </h1>
                <div className="studentslist">
                    <div className="table-container">
                        <table>
                            <tr style={{backgroundColor:"#ffafcc"}}>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Surname</th>
                            </tr>
                            <tbody>
                            {students_list.length > 0 && students_list.map( (student) => (
                                    <tr key={student.id}>
                                        <td>{student.email}</td>
                                        <td>{student.name}</td>
                                        <td>{student.surname}</td>
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

 
export default StudentsList;