import './NavBar.css';
import React, {useState} from 'react';
import {useResource} from "../contexts/ResourceListContext";

function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { resourceList = [] } = useResource();

    const toggleDropdown = () => {
        // Only toggle dropdown if resourceList is not empty
        if (resourceList.length > 0) {
            setIsDropdownOpen(prevState => !prevState);
        }
    };

    return (
        <div className="nav-bar">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="./">Home</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/create-resource" role="button" onClick={toggleDropdown}
                       aria-haspopup="true" aria-expanded={isDropdownOpen}>
                        Resources
                    </a>
                    <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                        {resourceList.map((resource, index) =>
                            <a className="dropdown-item" href="#" key={index}>{resource}</a>
                        )}
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/book-resource">Book resource</a>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
