import './Style/App.css';
import React, { useState, useContext, useEffect } from 'react';
import Home from './Pages/Home.js';
import { UserSesesionContext } from './UserSession/SessionContext'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes/Private';
import LoginModal from './Components/LoginModal.js';
import DetailsPage from './Pages/DetailsPage';
import Profile from './Pages/Profile.js';
import axios from 'axios';

function App() {
  
  //User session state
  const [userSession, setUserSession] = useState('');
  const [showLoginModla, setShowLoginModla] = useState(false);

  useEffect(() => {
      axios.get("http://localhost:5000/api/isLoggedIn", {withCredentials: true}).then((response) => {
        console.log(response)
        if (response.data.isLoggedIn === true) {
          setUserSession(response.data.user);
          setShowLoginModla(false);
        }
      })
  },[]);

  return (
      <UserSesesionContext.Provider value={{ userSession, setUserSession }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute
              path="/home"
              component={<Home/>}
              setShowLoginModla={setShowLoginModla}
            />
          }>
          </Route>
          <Route path="/:id" element={<DetailsPage />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="*" element={<div>Error 404 Page not found</div>}></Route>
        </Routes>
        <LoginModal setUserSession={setUserSession} setShowLoginModla={setShowLoginModla} showLoginModla={showLoginModla} />
      </UserSesesionContext.Provider>
  );
}

export default App;
