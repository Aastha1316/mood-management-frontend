import { useState } from 'react';
import { EmailIcon } from '@chakra-ui/icons';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Login from './User/Pages/Login';
import Signup from './User/Pages/Signup';
import UserPage from './User/Pages/UserPage';
import MoodPage from './User/Pages/MoodPage';
import Navbar from './Shared/components/Navbar';
 import RecommendationPage from './User/Pages/RecommendationPage';
import './App.css';
import { useSelector } from 'react-redux';
import LandingPage from './User/Pages/LandingPage';
import ProfilePage from './User/Pages/ProfilePage';
import { useAuth } from './Shared/Hooks/auth-hook';
import AddPage from './User/Pages/AddPage';

function App() {

   
  const {token}=useAuth()
  let routes;
  if(token) {
    routes = (
      <>
        <Route path="/userpage" element ={<UserPage/>}/>
        <Route path="/explore" element={<RecommendationPage />} />
        <Route path="/addpage" element={<AddPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      
        <Route path="*" element={<Navigate to="/userpage" />} />

      </>
    );
  }
      else {
        routes = (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        );
      }

  return (
    <>
      <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          {routes}
          </Routes>
          </BrowserRouter>
      </div>
      
    </>
  );
}

export default App;
