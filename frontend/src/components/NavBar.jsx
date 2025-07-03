import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/habits.png" alt="Logo" className="logo-img" />
        <h1 className="navbar-title">
          <Link to="/">HabitTracker!</Link>
        </h1>
      </div>
      <div className="navbar-right">
        <Link className="nav-link" to="/create">Create</Link>
      </div>
    </nav>
  );
};

export default NavBar;
