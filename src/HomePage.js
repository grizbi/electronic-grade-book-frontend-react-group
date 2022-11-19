import AdminHomePage from "./AdminLoginPage";

const Homepage = () => {
    const user = localStorage.getItem('email');
    console.log(user);
    if(user === 'admin') {
        return ( 
            <div>
                <AdminHomePage/>
            </div>
         );
    }
    else {
        return ( 
            <div>
                hello user
            </div>
         );
    }
}

export default Homepage;