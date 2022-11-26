import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isUserAlreadyDefined, setIsUserAlreadyDefined] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password, name, surname, grades:null }

    fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then((response) => {
        response.json()
        .then((data) => {
            if(data.email == null) {
                setIsUserAlreadyDefined(true);
                setIsCreated(false);
            }
            else {
                setIsUserAlreadyDefined(false);
                setIsCreated(true);
            }
        })
    })
}
    return ( 
        <div>
            <div className="registerform">
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    <div className="txt_field">
                        <input type="text" 
                        value = {email}
                        required
                        onChange={ (e) => setEmail(e.target.value) }
                        />
                        <label>Email</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" 
                        value = {password}
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                        />
                        <label>Password</label>
                    </div>
                    <div className="txt_field">
                        <input type="text"
                        value = {name}
                        onChange={ (e) => setName(e.target.value) }
                        required
                        />
                        <label>Name</label>
                    </div>
                    <div className="txt_field">
                        <input type="text" 
                        value = {surname}
                        onChange={ (e) => setSurname(e.target.value) }
                        required
                        />
                        <label>Surname</label>
                    </div>
                    <input position type="submit" value="Submit"></input>
                    <p>Already have an account? <Link to="/login"> Log in </Link> </p>  
                    <div className="error">{isUserAlreadyDefined && <p>User already defined, try different e-mail</p>}</div>
                    <div>{isCreated && <p style={{color:"Green"}}>Account created successfully</p>}</div>
                </form>
                
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
     );
}
 
export default Register;