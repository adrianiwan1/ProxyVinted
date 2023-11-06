import './Style/App.css';
import React, { useState, useEffect } from 'react';
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
  //Recommendte

  const [recommendationItems, setRecommendationItems] = useState('')

  useEffect(() => {
    axios.get("http://localhost:5000/api/isLoggedIn", { withCredentials: true }).then((response) => {
      console.log(response)
      if (response.data.isLoggedIn === true) {
        setUserSession(response.data.user);
        setShowLoginModla(false);
      }
    })
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:5000/api/recommendation?' + new URLSearchParams({ id: userSession.userId }))
      const [item] = await res.json()
      if (!item) return
      const res2 = await fetch('http://localhost:5000/api/getItems?' + new URLSearchParams({ ...item, perPage: 5 }))
      const { items } = await res2.json()
      console.log(items)
      setRecommendationItems(items)
    })()
  }, [userSession])


  return (
    <>
      <UserSesesionContext.Provider value={{ userSession, setUserSession }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute
              path="/home"
              component={
                <Home
                  recommendationItems={recommendationItems}
                  setRecommendationItems={setRecommendationItems}
                />
              }
              setShowLoginModla={setShowLoginModla}
            />
          }>
          </Route>
          <Route path="/:id" element={<DetailsPage />}></Route>
          <Route path="/Profile" element={
            <Profile
              recommendationItems={recommendationItems}
            />
          }>
          </Route>
          <Route path="*" element={<div>Error 404 Page not found</div>}></Route>
        </Routes>
        <LoginModal setUserSession={setUserSession} setShowLoginModla={setShowLoginModla} showLoginModla={showLoginModla} />
      </UserSesesionContext.Provider>
    </>
  );
}

export default App;
