import React from 'react';
import{ NavLink } from 'react-router-dom';

const Header = () =>(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink to="/" activeClassName="active" className="nav-link">Accesorios doña claudia</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/clase-accesorios" activeClassName="active" className="nav-link">Clases de accesorios</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/nueva-clase" activeClassName="active" className="nav-link">Nueva clase de accesorio</NavLink>
                </li>
            </ul>
        </div>
    </nav>
)


export default Header;