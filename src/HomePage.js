import { useEffect } from "react";
import AdminHomePage from "./AdminLoginPage";
import StudentLoginPage from "./StudentLoginPage";

import { isSessionActive, redirectUserIfSessionNotEstablished } from "./SessionUtil";


const Homepage = () => {
    useEffect(( )=> {
        redirectUserIfSessionNotEstablished();
    })

    const user = localStorage.getItem('email');
    if(user === 'admin') {
        return ( 
            <div>
                <AdminHomePage/>
            </div>
         );
    }
    else if(isSessionActive()) {
        return ( 
            <div>
                <StudentLoginPage/>
            </div>
         );
    }
}

export default Homepage;