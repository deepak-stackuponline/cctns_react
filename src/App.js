import "./App.css";
import "./App.scss";
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import HeaderSection from "./components/Home/header/HeaderSection";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterFixed from "./components/Home/footer/FooterFixed";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainContent() {
  const location = useLocation();
  const helloRef = useRef(null);
  const isLoginPage = location.pathname === '/' || location.pathname === '/register';

  useEffect(() => {
  
    
    if (helloRef.current) {
      // Remove the hello class temporarily
      helloRef.current.classList.remove('hello');
      
      // Force a reflow 
      // eslint-disable-next-line no-unused-expressions
      helloRef.current.offsetHeight;
      
      // Re-add the hello class to trigger any CSS animations/effects
      helloRef.current.classList.add('hello');
      
      // Optional: Add a temporary class for route change effects
      helloRef.current.classList.add('route-changed');
      
      // Remove the temporary class after animation
      setTimeout(() => {
        if (helloRef.current) {
          helloRef.current.classList.remove('route-changed');
        }
      }, 500);
    }
  }, [location.pathname]);

return (
    <div className="hide-scrollbar App-custom" style={{ overflowY: 'scroll', height: '100vh' }}>
      <div className="container"> 
        {!isLoginPage && <HeaderSection />}
      </div>
      <div ref={helloRef} className="hello">
        <AppRoutes />
      </div>
      <div>
        {!isLoginPage && <FooterFixed />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
      
      
      
      
      
      
      
      
      
      
      
<ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      ></ToastContainer>
    </Router>
  );
}

export default App;