
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
 

function FooterCard() {



  const [footercard, setFooterCard] = useState([]);
  
  
    async function fetchData() {
      try {
        
        const response = await fetch("https://mocki.io/v1/55a3df14-8998-416c-bc93-7947dc24748d");
        const data = await response.json();
        setFooterCard(data);
    
  
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  

  return (

    <div>
<h4 className='text-center mt-5 mb-5'>How it works</h4>


  

   <div className="d-flex flex-wrap justify-content-center" style={{ gap: '20px' }}>
      {footercard.map((card, index) => (
        <div className="card text-center shadow-lg" style={{ width: '18rem' }} key={index}>
          <div className="card-body">
            <div className="mb-3">
              <i className={`bi ${card.icon}`} style={{ fontSize: '2.5rem', color: 'purple' }}></i>
            </div>
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.text}</p>
          </div>
        </div>


      ))}
    </div>



    </div>
  )
}

export default FooterCard