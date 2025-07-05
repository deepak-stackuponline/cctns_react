import React, { useState } from 'react'
import './AppMenuAvatar.css'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import CartOffcanvas from '../../shared/CartOffcanvas'

function AppMenuAvatar() {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  const handleAvatarClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  return (
    <>
      <div className="header-actions-container">
        <div className="cart-icon-container" onClick={handleCartClick}>
          <svg 
            className="cart-icon" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="cart-badge">{cartCount}</span>
        </div>
        
        <div className="avatar-container" onClick={handleAvatarClick}>
          <div className="avatar-circle">
            <span className="avatar-initials">U</span>
          </div>
        </div>
      </div>

      {/* Cart Offcanvas */}
      <CartOffcanvas isOpen={cartOpen} toggle={toggleCart} />
    </>
  )
}

export default AppMenuAvatar