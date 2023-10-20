import './Style/App.css';
import React, { useState, useContext } from 'react';
import Home from './Pages/Home.js';
import { UserSesesionContext } from './UserSession/SessionContext'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes/Private'
import LoginModal from './Components/LoginModal.js';
import DetailsPage from './Pages/DetailsPage'

function App() {
  
  //User session state
  const [userSession, setUserSession] = useState('');
  const [showLoginModla, setShowLoginModla] = useState(false);
  const [itemDetails, setItemDetails] = useState({ details: null })

  console.log(itemDetails)

  return (
    <div className="">
      <UserSesesionContext.Provider value={{ userSession, setUserSession }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute
              path="/home"
              component={<Home setItemDetails={setItemDetails} itemDetails={itemDetails}/>}
              setShowLoginModla={setShowLoginModla}
            />
          }>
          </Route>
          <Route path="/Details" element={<DetailsPage itemDetails={itemDetails} />}></Route>
          <Route path="*" element={<div>Error 404 Page not found</div>}></Route>
        </Routes>
        <LoginModal setUserSession={setUserSession} setShowLoginModla={setShowLoginModla} showLoginModla={showLoginModla} />
      </UserSesesionContext.Provider>
    </div>
  );
}

export default App;
