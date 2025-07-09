import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cards({book}) {



  
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/book/${book.id}`, { state: { bookData: book } });
  };

  return (
    <div className="card shadow-lg" style={{ width: '18rem', maxWidth: '100%' }}>
      <img
        src={book.image}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'cover' }}
        alt={book.title}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="text-muted mb-2">by {book.author}</h6>

        <div className="mb-2">
          {book.genres.map((genre, i) => (
            <span key={i} className="badge bg-light text-dark border me-2">{genre}</span>
          ))}
        </div>

        <div className={`mb-3 fw-semibold ${book.available === "Available" ? 'text-success' : 'text-danger'}`}>
          {book.available}
        </div>
        <hr/>

        <div className="d-flex justify-content-between text-muted mb-3">
          <span>Buy: <strong>${book.buyPrice}</strong></span>
          <span>Rent: <strong>${book.rentPrice}</strong>/wk</span>
        </div>

        <button 
          className="btn btn-light w-100 border fw-semibold"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default Cards;