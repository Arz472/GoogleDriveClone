import React from 'react';
import '../components/styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate('/');
  };

  return (
    <div className="Navbar">
      <h1>Mazani Drive</h1>
      <div className="nav-links">
      <button type="submit" onClick={handleProfile}>
        Log Out
      </button>
      </div>
    </div>
  );
}

export default Navbar;
