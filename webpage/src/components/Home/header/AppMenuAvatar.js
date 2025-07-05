import React, { useState } from 'react'
import './AppMenuAvatar.css'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import CartOffcanvas from '../../shared/CartOffcanvas'
import { FiShoppingCart, FiLogOut } from 'react-icons/fi'

function AppMenuAvatar() {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  const handleLogoutClick = () => {
    // Add any logout logic here (clear tokens, etc.)
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
          <FiShoppingCart className="cart-icon" size={24} />
          <span className="cart-badge">{cartCount}</span>
        </div>
        
        <div className="logout-container" onClick={handleLogoutClick}>
          <div className="logout-circle">
            <FiLogOut className="logout-icon" size={16} />
          </div>
        </div>
      </div>

      {/* Cart Offcanvas */}
      <CartOffcanvas isOpen={cartOpen} toggle={toggleCart} />
    </>
  )
}

export default AppMenuAvatar