import { useEffect } from "react";
import AdminHomePage from "./AdminLoginPage";
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
                hello user
            </div>
         );
    }
}

export default Homepage;