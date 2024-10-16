import React, {useState, useContext} from "react";
import {doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext';
import loginImage from '../images/login.png'

const Auth = () => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('')
    const [form, setForm] = useState({email: "", password: ""});
    const [isNewUser, setIsNewUser] = useState(false);
    let navigate = useNavigate();

    // Handles changes in form input values
    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = form;

        try {
            let authUser;
            if (isNewUser) {
                authUser = await doCreateUserWithEmailAndPassword(email, password);
                localStorage.setItem('user_email', email)
            } else {
                authUser = await doSignInWithEmailAndPassword(email, password);
            }
            if (authUser) {
                setIsAuthenticated(true);
                localStorage.setItem('user_email', email)
                navigate("/book-resource");
            }
        } catch (error) {
            console.error(error);
            setErrorMsg(error)
        }
    };

    // Toggles between Sign In and Sign Up form
    const toggleForm = () => {
        setIsNewUser(!isNewUser);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <h1>{isNewUser ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={handleSubmit}
                  style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px'}}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange}
                       style={{marginBottom: '1rem', width: '100%'}}/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange}
                       style={{marginBottom: '1rem', width: '100%'}}/>
                <button type="submit" style={{width: '100%'}}>{isNewUser ? "Sign Up" : "Sign In"}</button>
            </form>
            <p onClick={toggleForm} style={{color: 'blue', cursor: 'pointer'}}>
                {isNewUser ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>
            {errorMsg && <div style={{color: 'red'}}>{errorMsg.message}</div>}
        </div>
    );
};

export default Auth;
