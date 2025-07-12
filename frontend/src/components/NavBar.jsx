import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/authHelper/auth';

const NavBar = () => {
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/habits.png" alt="Logo" className="logo-img" />
        <Link to="/" className="navbar-title">HabitTracker!</Link>
      </div>

    <div className="navbar-actions">
  {isAuthenticated && (
    <>
      <div className="nav-buttons-group">
        <Link className="nav-button" to="/create">Create</Link>
        <Link className="nav-button" to="/dashboard">Profile</Link>
      </div>
      <button className="nav-button logout" onClick={handleLogout}>Logout</button>
    </>
  )}
</div>

    </nav>
  );
};

export default NavBar;
