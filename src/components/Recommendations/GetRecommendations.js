import React from 'react'
import './GetRecommendations.css'


function GetRecommendations() {
  return (
    <div className="container mt-4 p-5 shadow-lg rounded " style={{backgroundColor:"#EEEEEE", maxWidth: '1000px'}}>
      <div className='justify-content-center text-center mb-5'>
        <h1>AI Book Recommendations</h1>
        <h2>Let our AI help you discover your next great read! Provide your reading history and preferences below</h2>
      </div>
      <div>

      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold mb-3">Your Reading History...</label>
          <textarea id="description" name="description" placeholder="A brief summary of the book..." className="form-control custom-text" rows="6"></textarea>
        </div>
        </form>











<div className="mb-4">
  <label className="form-label fw-bold">Preferred Genres</label>
<br />
   <label className="form-label ">Select your favourite genres or type them if below if not listed:</label>
  <div className="row border p-3 rounded" style={{backgroundColor:"	#F5F5F5"}}>
    <div className="col-md-3">
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Fiction" id="fiction" />
        <label className="form-check-label " htmlFor="fiction">Fiction</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Mystery" id="mystery" />
        <label className="form-check-label" htmlFor="mystery">Mystery</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Biography" id="biography" />
        <label className="form-check-label" htmlFor="biography">Biography</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Other" id="other" />
        <label className="form-check-label" htmlFor="other">Other</label>
      </div>
    </div>
    <div className="col-md-3">
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Non-Fiction" id="nonfiction" />
        <label className="form-check-label" htmlFor="nonfiction">Non-Fiction</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Thriller" id="thriller" />
        <label className="form-check-label" htmlFor="thriller">Thriller</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Self-Help" id="selfhelp" />
        <label className="form-check-label" htmlFor="selfhelp">Self-Help</label>
      </div>
    </div>
    <div className="col-md-3">
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Science Fiction" id="scifi" />
        <label className="form-check-label" htmlFor="scifi">Science Fiction</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Romance" id="romance" />
        <label className="form-check-label" htmlFor="romance">Romance</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Poetry" id="poetry" />
        <label className="form-check-label" htmlFor="poetry">Poetry</label>
      </div>
    </div>
    <div className="col-md-3">
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Fantasy" id="fantasy" />
        <label className="form-check-label" htmlFor="fantasy">Fantasy</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Historical" id="historical" />
        <label className="form-check-label" htmlFor="historical">Historical</label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="genres" value="Classic" id="classic" />
        <label className="form-check-label" htmlFor="classic">Classic</label>
      </div>
    </div>
  </div>
</div>








        <form>
        <div className="mb-3">
          <input type="text" id="description" name="description" placeholder="A brief summary of the book..." className="form-control custom-text" />
        </div>
        </form>

       <div className="d-flex justify-content-start">
  <button type="submit" className="btn btn-primary custom-button">
    Get My AI Recommendations
  </button>
</div>


    </div>
  )
}

export default GetRecommendations