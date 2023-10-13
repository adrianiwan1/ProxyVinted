import React, { useState, useContext } from 'react';
import LoginModal from '../Components/LoginModal.js';
import NavbarComponent from '../Components/Navbar.js';
import { UserSesesionContext } from '../UserSession/SessionContext.js';

function Home({ setUserSession }) {

  

  const user = useContext(UserSesesionContext).userSession;
  console.log(user);


  return (
    <div className="A">
      <NavbarComponent setShowLoginModla={setShowLoginModla} />
    </div>
  );
}

export default Home;
