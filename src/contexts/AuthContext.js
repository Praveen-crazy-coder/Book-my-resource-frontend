import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

export const AuthContext = createContext();

export const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
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
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {props.children}
        </AuthContext.Provider>
    );
};
