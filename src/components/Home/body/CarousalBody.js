import React from 'react';
import './Carousal.css';
import { useNavigate } from 'react-router-dom';


function CarousalBody() {
    const Literary = "Literary Ledger";


       const navigate = useNavigate();

    const browseButtonClick = () => {
        navigate('/browse');
    }

    return (
        <div className="container d-flex align-items-center justify-content-center mt-2 carousal">
      <div className="text-center">
      <h1 className="display-4 mb-3 fw-semibold" style={{ fontSize: '3.2rem' }}>
  Welcome to 
  <span className="Literary"> {Literary}</span>
</h1>   

<div >
        <h2 className="lead text-secondary mb-3 fw-semibold" style={{ lineHeight: '180%' }}>

          Discover your next favourite book, list your own for sale or rent, and get <br />personalized recommendations
        </h2>
        </div>


<div className="d-flex justify-content-center">
  <div style={{ maxWidth: '400px', width: '100%' }}>
    <div className="input-group mb-3 centered-input-group">
      <input
        type="text"
        className="form-control small-input" style={{backgroundColor: 'rgb(195, 192, 192)'}}
        placeholder="Search for books, authors, genres"
      />
      <button className="custom-button small-input" onClick={browseButtonClick}>Search</button>
    </div>
  </div>
</div>






      
          <button className="browse-book mt-0" onClick={browseButtonClick}>
                    Browse All Books <i className="fas fa-arrow-right"></i>
                </button>
    
      </div>
    </div>
  );
}

export default CarousalBody;