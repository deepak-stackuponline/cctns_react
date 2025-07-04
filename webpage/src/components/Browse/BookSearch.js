import React, { useState, useEffect } from 'react';
import './browsebooks.css';
import filter from './filter.png'; 

function BookSearch() {
  const [filterOptions, setFilterOptions] = useState({
    genres: [],
    conditions: [],
    availability: []
  });

  
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    condition: '',
    availability: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  async function fetchData() {
    try {
      setLoading(true);

      setError(null); 

      const response = await fetch('https://mocki.io/v1/faf8dc79-8cd1-44ea-9f37-c31e73c6daa7');
      
      const data = await response.json();

      setFilterOptions(data);

      setLoading(false);

    } catch (error) {
      
      setError('Failed to load data.');

      setLoading(false);

    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  function resetFilters() {
    setFilters({
      search: '',
      genre: '',
      condition: '',
      availability: ''
    });
  }

if(loading){
  return <div className="loading text-primary">Loading...</div>;
}

if(error){
  return <div className="error text-center text-danger">{error}</div>;
}

return (
  <div className="filter-container mb-5">
     <div className="title-section" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <img src={filter} alt="Filter Icon" className="filter-icon" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
      <h3 className="title" style={{ textAlign: 'left', margin: '0' }}>Filter Books</h3>
    </div>
    <div className="filter-row">
      <div className="filter-item">
        <label>Search</label>
        <input type="text" name="search" placeholder="Title or Author..." value={filters.search} onChange={handleChange} />
      </div>

      <div className="filter-item">
        <label>Genre</label>
        <select name="genre" value={filters.genre} onChange={handleChange}>
          {filterOptions.genres.map(genre => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label>Condition</label>
        <select name="condition" value={filters.condition} onChange={handleChange}>
          {filterOptions.conditions.map(condition => (
            <option key={condition.value} value={condition.value}>
              {condition.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label>Availability</label>
        <select name="availability" value={filters.availability} onChange={handleChange}>
          {filterOptions.availability.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="button-container">
      <button className="reset-btn" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  </div>
);
}

export default BookSearch;