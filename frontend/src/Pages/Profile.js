import React, { useState, useContext, useEffect } from "react";
import NavbarComponent from '../Components/Navbar.js';
import { UserSesesionContext } from "../UserSession/SessionContext.js";
import ItemCard from '../Components/ItemCard.js'
import Footer from "../Components/Footer.js";
import axios, { all } from 'axios';

function Profile() {

  const { userSession } = useContext(UserSesesionContext)

  const [recommendationItems, setRecommendationItems] = useState(null)

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
  }, [])

  const [foundItems, setFoundItems] = useState([]);
  const [users, setUsers] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:5000/api/getUsers')
      const json = await res.json();
      setUsers(json)
    })();
  }, [refreshKey])

  const blockUser = async (userId) => {

    if (userId.id !== userSession.userId) {
      let userID = userId.id;
      axios.put('http://localhost:5000/api/banUser', { userId: userID }, { withCredentials: true })
        .then((response) => {
          setRefreshKey(prevKey => prevKey + 1)
        })
        .catch((error) => {
          console.log('Błąd:', error.response.data);
        });

    } else {
      alert('you cant ban yourself')
    }
  };

  const unBlockUser = (userId) => {
    let userID = userId.id;
    axios.put('http://localhost:5000/api/unBanUser', { userId: userID }, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setRefreshKey(prevKey => prevKey + 1)
      })
      .catch((error) => {
        console.log('Błąd:', error.response.data)
      });
  }

  return (
    <div className="home">
      <NavbarComponent setFoundItems={setFoundItems} />
      <div className="user-data-holder d-flex justify-content-start col-11 ms-5">
        <div className="d-flex ">
          <div className="img-holder">
            <img className="user-img" src="https://ponadwszystko.com/wp-content/uploads/2016/08/anonim.jpg"></img>
          </div>
          <div className="fs-4 d-flex flex-column justify-content-center ms-4">
            <div >User Data:</div>
            <div>Login: {userSession.login}</div>
            <div>Role: {userSession.role}</div>
          </div>
        </div>
      </div>
      {userSession.role === 'admin' ? (
        <div className="col-12 d-flex justify-content-xl-center mb-5 justify-content-start">
          <ul className="users-holder col-6 pt-2 pb-4 pe-4">
            {users.map((userElm) =>
              <li className="col-12 mt-3 d-flex col-12 user-elm-holder p-4">
                <div className="d-flex fs-4 col-1 me-4" >
                  <label className="me-1">ID.</label>
                  <label>{userElm.id}</label>
                </div>
                <div className="d-flex fs-4 col-9" >
                  <label className="me-2">User login: </label>
                  <label>{userElm.user}</label>
                </div>
                <div className="d-flex fs-4 col-5" >
                  {userElm.isBanned === 0 ? (
                    <button className="mb-md-2 ms-1 rounded-pill btn  border rounded d-flex p-2 block-unlock-button" onClick={() => blockUser(userElm)}>
                      <div className="pe-2 ps-2" >Block</div>
                      <svg className="block-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg>
                    </button>
                  ) : (
                    <button className="mb-md-2 ms-1 rounded-pill btn btn-secondary bg-transparent border rounded d-flex p-2 block-unlock-button" onClick={() => unBlockUser(userElm)} >
                      <div className="pe-2">Unlock</div>
                      <svg className="block-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" /></svg>                    </button>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div>
          {recommendationItems?.length &&
            <div className="mb-5">
              <h1 className='px-5 pt-5'>Recommendations</h1>
              <div className="d-flex flex-wrap justify-content-center mt-1">
                {recommendationItems.map((item, index) => (
                  <ItemCard item={item} key={index} />
                ))}
              </div>
            </div>
          }
        </div>
      )
      }
      <Footer />
    </div >
  );
}

export default Profile;