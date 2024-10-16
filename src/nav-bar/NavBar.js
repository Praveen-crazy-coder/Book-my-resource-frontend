import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <div className="nav-bar">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink exact className="nav-link" activeClassName='active' to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName='active' to="/create-resource">Add resources</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName='active' to="/book-resource">Book resource</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
