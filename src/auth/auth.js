import React, {useState, useContext} from "react";
import {doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext';
import loginImage from '../images/login.png';

const Auth = () => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState('');
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
                localStorage.setItem('user_email', email);
            } else {
                authUser = await doSignInWithEmailAndPassword(email, password);
            }
            if (authUser) {
                setIsAuthenticated(true);
                localStorage.setItem('user_email', email);
                navigate("/book-resource");
            }
        } catch (error) {
            console.error(error);
            // Setting error message for UI feedback
            setErrorMsg(error.code === 'auth/email-already-in-use' ?
                'This email is already registered. Please sign in.' :
                error.message);
        }
    };

    // Toggles between Sign In and Sign Up form
    const toggleForm = () => {
        setIsNewUser(!isNewUser);
        setErrorMsg(''); // Clear error message when toggling forms
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
            backgroundSize: 'cover',
        }}>
            <h1 style={{color: '#fff', marginBottom: '2rem'}}>{isNewUser ? "Sign Up" : "Sign In"}</h1>

            {/* Error Message UI */}
            {errorMsg && <div style={{
                backgroundColor: '#ff4d4d',
                color: '#fff',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '1rem',
                animation: 'shake 0.3s ease-in-out',
                width: '300px',
                textAlign: 'center'
            }}>
                {errorMsg}
            </div>}

            <form onSubmit={handleSubmit}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '300px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '2rem',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      position: 'relative'
                  }}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange}
                       style={{
                           marginBottom: '1rem',
                           width: '100%',
                           padding: '10px',
                           borderRadius: '4px',
                           border: errorMsg ? '1px solid red' : '1px solid #ccc',
                           backgroundColor: errorMsg ? '#ffe6e6' : '#fff'
                       }}/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange}
                       style={{
                           marginBottom: '1rem',
                           width: '100%',
                           padding: '10px',
                           borderRadius: '4px',
                           border: errorMsg ? '1px solid red' : '1px solid #ccc',
                           backgroundColor: errorMsg ? '#ffe6e6' : '#fff'
                       }}/>
                <button type="submit" style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    {isNewUser ? "Sign Up" : "Sign In"}
                </button>
            </form>

            <p onClick={toggleForm} style={{
                color: 'blue',
                cursor: 'pointer',
                marginTop: '1rem'
            }}>
                {isNewUser ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>

            {/* CSS for shaking effect on error */}
            <style>
                {`@keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }`}
            </style>
        </div>
    );
};

export default Auth;
