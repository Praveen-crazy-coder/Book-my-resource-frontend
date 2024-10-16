import React, { useState, useContext } from "react";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
const Auth = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [isNewUser, setIsNewUser] = useState(false);
    let navigate = useNavigate();

    // Handles changes in form input values
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = form;

        try {
            let authUser;
            if (isNewUser) {
                authUser = await doCreateUserWithEmailAndPassword(email, password);
            } else {
                authUser = await doSignInWithEmailAndPassword(email, password);
            }
            if (authUser) {
                setIsAuthenticated(true); // Add this to update
                navigate("/book-resource");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Toggles between Sign In and Sign Up form
    const toggleForm = () => {
        setIsNewUser(!isNewUser);
    };

    return (
        <div>
            <h1>{isNewUser ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">{isNewUser ? "Sign Up" : "Sign In"}</button>
            </form>
            <p onClick={toggleForm}>{isNewUser ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</p>
        </div>
    );
};

export default Auth;
