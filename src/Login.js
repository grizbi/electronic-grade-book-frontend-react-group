const Login = () => {
    return (
        <div>
            <div className="center">
                <form>
                    <h1>Login</h1>
                    <div className="txt_field">
                        <input type="text" required/>
                        <label>E-mail</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
             </div>   
             <div className="welcome">
                <h1>Welcome page</h1>
                <p>Sign in to continue access</p>
                <p className="websitename">www.electronicgradebook.com</p>
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
