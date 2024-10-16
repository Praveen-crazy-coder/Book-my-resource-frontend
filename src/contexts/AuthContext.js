import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, doSignOut } from '../firebase-config';

export const AuthContext = createContext();

export const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await doSignOut(); // use doSignOut here
        } catch (error) {
            console.error('Error in signOut: ', error);
        }
    };

    useEffect(() => {
        const authSubscription = onAuthStateChanged(auth, authUser => {
            setIsAuthenticated(!!authUser);
            setLoading(false);
        });
        return () => {
            authSubscription();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
