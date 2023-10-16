import './Style/App.css';
import React, { useState, useContext } from 'react';
import Home from './Pages/Home.js';
import { UserSesesionContext } from './UserSession/SessionContext'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes/Private'
import LoginModal from './Components/LoginModal.js';

function App() {

  //User session state
  const [userSession, setUserSession] = useState('');
  const [showLoginModla, setShowLoginModla] = useState(false);


  return (
    <div className="">
      <UserSesesionContext.Provider value={{ userSession, setUserSession }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute
              path="/home"
              component={<Home />}
              setShowLoginModla={setShowLoginModla}
            />
          }>
          </Route>
          <Route path="*" element={<div>Error 404 Page not found</div>}></Route>
        </Routes>
        <LoginModal setUserSession={setUserSession} setShowLoginModla={setShowLoginModla} showLoginModla={showLoginModla} />
      </UserSesesionContext.Provider>
    </div>
  );
}

export default App;
