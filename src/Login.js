import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

const Login = () => {

const [areBadCredentials, setAreBadCredentials] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
let jwt = "";

useEffect( () => {
    localStorage.clear();
})

const handleSubmit = (e) => {
    e.preventDefault();
    const user = {email, password}

    fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    .then((response) => {
        if(response.status===401) {
            setAreBadCredentials(true);
        } 
        else if(response.status===200){
            return response.json();
        }
    })
    .then(data => {
        jwt = data.jwt;
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('email', email);
        window.location.replace("/homepage");
    
    })
    .catch(e => {
        console.log(e);
    })
}

    return (
        <div>
            <div className="center">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="txt_field">
                        <input type="text"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                        required/>
                        <label>E-mail</label>
                    </div>
                    <div className="txt_field">
                        <input type="password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                        required/>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login"/>
                    <div class="error">{areBadCredentials && <p>Bad credentials!</p>}</div>
                </form>
             </div>   
             <div className="welcome">
                <h1>Welcome page</h1>
                <p>Sign in to continue access</p>
                <p className="websitename">www.electronicgradebook.com</p>
                <Link to="/register">No account? Click me to register</Link>

             </div>
             <div className="footer">
                <div className="authors">
                    <h1>Authors</h1>
                    <p>Jakub Kos</p>
                    <p>Tomasz Kowalcze</p>
                    <p>Hubert Ziobro</p>
                </div>
                <div className="contact">
                    <h1>Contacts</h1>
                    <p>+123123123</p>
                    <p>infoexample@gmail.com</p>
                </div>
                <div className="resources">
                    <h1>Resources</h1>
                    <p>Instagram</p>
                    <p>Facebook</p>
                </div>
             </div>

        </div>
    )
}

export default Login;
