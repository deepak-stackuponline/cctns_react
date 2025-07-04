import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BodySection from './components/Home/body/BodySection';
import FooterSection from './components/Home/footer/FooterSection';
import BrowseBooks from './components/Browse/BrowseBooks';
import ListBooks from './components/List/ListBooks';
import ProfileSection from './components/Profile/ProfileSection';
import GetRecommendations from './components/Recommendations/GetRecommendations';
import BookDetailCard from './components/Browse/BookDetailCard';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';

function AppRoutes() {
 

  return (
    <div>
<Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={
          <div>
            <BodySection />
            <FooterSection />
          </div>
        } />
        <Route path="/browse" element={<BrowseBooks />} />
        <Route path="/list" element={<ListBooks />} />
        <Route path="/recommendations" element={<GetRecommendations />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/book/:id" element={<BookDetailCard />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;