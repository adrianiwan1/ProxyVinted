import React, { useState, useContext, useEffect } from "react";
import NavbarComponent from '../Components/Navbar.js';
import Footer from '../Components/Footer.js'
import { UserSesesionContext } from "../UserSession/SessionContext.js";
import { Button } from 'react-bootstrap'

function Profile({ setItemDetails, itemDetails }) {

  const [foundItems, setFoundItems] = useState([])
  const [recommendationItems, setRecommendationItems] = useState(null)

  const { userSession } = useContext(UserSesesionContext)

  console.log(userSession);

  return (
    <div className="home">
      <NavbarComponent setFoundItems={setFoundItems} />
        <div>
            <div>Profil:</div>

            <div>Login:{userSession.login}</div>
            <div><Button>Edytuj</Button></div>
              
        </div>
    </div>
  );
}

export default Profile;
