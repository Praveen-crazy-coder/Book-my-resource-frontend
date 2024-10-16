import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'

function AuthenticatedRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return null;  // or return a <Loading /> component if you like
    }

    return isAuthenticated ? children : null;
}

export default AuthenticatedRoute;
