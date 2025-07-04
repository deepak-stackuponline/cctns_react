import React from 'react'
import './ProfileSection.css'

function ProfileSection() {
  const userInfo = {
    fullName: 'Deepak RB',
    username: 'deepakrb',
    email: 'deepak@gmail.com',
    phoneNumber: '9020433391',
    pinNumber: '695524',
    district: 'Kasaragod',
    state: 'Kerala',  
    country: 'India',
    profilePicture: 'https://picsum.photos/200/300?random=5'
  };

  return (
    <div className="user-profile-container shadow-lg">
      <div className="user-profile-header">
        <h2 className="user-profile-title">
          <i className="fas fa-user-circle"></i> Profile Information
        </h2>
      </div>

      <div className="user-profile-content">
        <div className="user-profile-picture-section">
          <div className="user-profile-picture-wrapper">
            <img 
              src={userInfo.profilePicture} 
              alt="Profile" 
              className="user-profile-picture"
            />
          </div>
        </div>

        <div className="user-profile-details">
          <div className="user-form-grid">
          


            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-user"></i> Full Name
              </label>
              <div className="user-form-value">{userInfo.fullName}</div>
            </div>

           


            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-at"></i> Username
              </label>
              <div className="user-form-value">{userInfo.username}</div>
            </div>

           



            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-envelope"></i> Email Address
              </label>
              <div className="user-form-value">{userInfo.email}</div>
            </div>

           



            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-phone"></i> Phone Number
              </label>
              <div className="user-form-value">{userInfo.phoneNumber}</div>
            </div>

            



            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-map-marker-alt"></i> PIN Code
              </label>
              <div className="user-form-value">{userInfo.pinNumber}</div>
            </div>



            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-map-marker-alt"></i> District
              </label>
              <div className="user-form-value">{userInfo.district}</div>
            </div>



            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-map-marker-alt"></i> State
              </label>
              <div className="user-form-value">{userInfo.state}</div>
            </div>
            



            <div className="user-form-group">
              <label className="user-form-label">
                <i className="fas fa-map-marker-alt"></i> Country
              </label>
              <div className="user-form-value">{userInfo.country}</div>
            </div>



          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection