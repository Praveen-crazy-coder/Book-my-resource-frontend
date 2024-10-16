import './Header.css';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from "react";

function Header() {
    const { logout } = useContext(AuthContext);
    return (
        <div>
            <header className="Header-container">
                <h1 className="Home-header">Book My Resources</h1>
                <button onClick={logout} className="logout">Logout</button>
            </header>
            <hr/>
        </div>
    );
}

export default Header;
