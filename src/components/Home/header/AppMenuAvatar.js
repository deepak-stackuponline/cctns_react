import React from 'react'
import './AppMenuAvatar.css'
import { useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiLogOut } from 'react-icons/fi'

function AppMenuAvatar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    
    navigate('/');
  };

  const handleCartClick = () => {
   
    navigate('/home');
  };

  return (
    <>
      <div className="header-actions-container">
        <div className="cart-icon-container" onClick={handleCartClick}>
          <FiShoppingCart className="cart-icon" size={24} />
          <span className="cart-badge">0</span>
        </div>
        
        <div className="logout-container" onClick={handleLogoutClick}>
          <div className="logout-circle">
            <FiLogOut className="logout-icon" size={16} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AppMenuAvatar