import React from 'react'
import './AppMenuAvatar.css'
import { useNavigate } from 'react-router-dom'

function AppMenuAvatar() {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/');
  };

  return (
    <div className="avatar-container" onClick={handleAvatarClick}>
      <div className="avatar-circle">
        <span className="avatar-initials">U</span>
      </div>
    </div>
  )
}

export default AppMenuAvatar