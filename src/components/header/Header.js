import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {

  const { currentUser, logout } = useContext(AuthContext);

  console.log(currentUser);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <header className="sticky-header">
      <div className="header-content">

        <h1 className="logo">Digicademic</h1>
        <div className="nav-links">
          <div className="user-section">
            {currentUser ? (
              <>
                <span className="user-name">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="login-link-header">
                Login
              </Link>
            )}
          </div>
          <Link to="/" className="exit-link">
            Exit
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;