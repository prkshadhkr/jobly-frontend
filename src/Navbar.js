import React, { useContext } from 'react';
import {Link, NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import './Navbar.css';

const Navbar = ({ handleLogout }) => {
  const { user } = useContext(UserContext);

  const navbarLoggedIn = () =>{
    return (
      <>
        <ul className="navbar-nav ml-auto">

          <li className="nav-item mr-4">
            <NavLink to="/companies" className="nav-link">
              Companies
            </NavLink>
          </li>

          <li className="nav-item mr-4">
            <NavLink to="/jobs" className="nav-link">
              Jobs
            </NavLink>
          </li>

          <li className="nav-item mr-4">
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          </li>

          <li className="nav-item mr-4">
            <Link to="/" onClick={handleLogout} className="nav-link" >
              Logout
            </Link>
          </li>
        
        </ul>
      </>
    )
  }

  const navbarLoggedOut = () =>{
    return (
      <>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </ul>
      </>
    )
  }

  return (
    <nav className="Navbar navbar navbar-expand-md">
          <Link to="/" className="navbar-brand">
            Jobly
          </Link>
        { user? navbarLoggedIn() : navbarLoggedOut() }
    </nav>
  )
}

export default Navbar;