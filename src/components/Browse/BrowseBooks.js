import React from 'react';
import BookSearch from './BookSearch';
import BrowseBookCard from './BrowseBookCard';

function BrowseBooks() {


  return (
    <div className="browse-container container mt-2">
      <h2 className="text-center mb-4">Browse Our Collection</h2>

    <BookSearch />
    <BrowseBookCard />
    
      
    </div>
  );
}

export default BrowseBooks;