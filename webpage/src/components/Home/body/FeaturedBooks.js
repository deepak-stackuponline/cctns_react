import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import SkeletonComponent from './SkeletonComponent';

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); 

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("https://mocki.io/v1/b3a9090b-a9ea-4e29-94fa-ae10890c9e1f");
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);




useEffect(() => {
  fetchData();
}, []);

  return (
    <div>
      

   
      <div className="container mt-4">
        <div className="row justify-content-center">
          {loading ? (
            <SkeletonComponent/>
          ) : (
            books.map((data) => (
              <div key={data.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                <Cards book={data} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedBooks;