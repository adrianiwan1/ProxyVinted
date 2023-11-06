import React, { useState, useContext, useEffect } from "react";
import NavbarComponent from '../Components/Navbar.js';
import { UserSesesionContext } from "../UserSession/SessionContext.js";
import ItemCard from '../Components/ItemCard.js'
import Footer from "../Components/Footer.js";


function Profile({ recommendationItems }) {

  const { userSession } = useContext(UserSesesionContext)

  const [foundItems, setFoundItems] = useState([]);

  const [users, setUsers] = useState([])
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:5000/api/getUsers')
      const json = await res.json()
      setUsers(json)
    })()
  }, [])

  const blockUser = (userElm) => {
    console.log(userElm.id)
    // banUser
  }


  const unlockUser = (userElm) => {
    console.log('X')
    // unBanUser
  }


  return (
    <div className="home">
      <NavbarComponent setFoundItems={setFoundItems} />
      <div className="user-data-holder d-flex justify-content-start col-11 ms-5">
        <div className="d-flex ">
          <div className="img-holder">
            <img className="user-img" src="https://ponadwszystko.com/wp-content/uploads/2016/08/anonim.jpg"></img>
          </div>
          <div className="fs-3 d-flex flex-column justify-content-center ms-4">
            <div>User Data:</div>
            <div>Login: {userSession.login}</div>
            <div>Role: {userSession.role}</div>
          </div>
        </div>
      </div>
      {!userSession.role === 'admin' ? (
        recommendationItems?.length &&
        <div className="mb-5">
          <h1 className='px-5 pt-5 fs-2'> Your recommendations</h1>
          <div className="d-flex flex-wrap justify-content-center mt-1">
            {recommendationItems.map((item, index) => (
              <ItemCard item={item} key={index} width={30} height={30} />
            ))}
          </div>
        </div>
      ) : (
        <div className="col-12 d-flex justify-content-center">
          <ul className="users-holder col-4 pt-2 pb-4 pe-4">
            {users.map((userElm) =>
              <li className="col-12 mt-3 d-flex col-12 user-elm-holder p-4">
                <div className="d-flex fs-4 col-1 me-4" >
                  <label className="me-1">ID.</label>
                  <label>{userElm.id}</label>
                </div>
                <div className="d-flex fs-4 col-8" >
                  <label className="me-1">User login: </label>
                  <label>{userElm.user}</label>
                </div>
                <div className="d-flex fs-4 col-5" >
                  {userElm.isBanned === 0 ? (
                    <button className="mb-md-2 ms-1 rounded-pill btn  border rounded d-flex p-2 block-unlock-button" onClick={() => blockUser(userElm)}>
                      <div className="pe-2 ps-2" >Block</div>
                      <svg className="block-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                    </button>
                  ) : (
                    <button className="mb-md-2 ms-1 rounded-pill btn btn-secondary bg-transparent border rounded d-flex p-2 block-unlock-button" onClick={() => unlockUser(userElm)}>
                      <div className="pe-2">Unlock</div>
                      <svg className="block-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                    </button>
                  )}

                </div>
              </li>
            )}
          </ul>
        </div>
      )
      }
      <Footer />
    </div >
  );
}

export default Profile;
