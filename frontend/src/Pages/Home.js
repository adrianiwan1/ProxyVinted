import React, { useState, useContext, useEffect } from "react";
import NavbarComponent from '../Components/Navbar.js';
import ItemCard from '../Components/ItemCard.js'
import Footer from '../Components/Footer.js'
import { UserSesesionContext } from "../UserSession/SessionContext.js";


function Home({ setItemDetails, itemDetails }) {

  const [foundItems, setFoundItems] = useState([])
  const [recommendationItems, setRecommendationItems] = useState(null)

  const { userSession } = useContext(UserSesesionContext)

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:5000/api/recommendation?' + new URLSearchParams({ id: userSession.userId }))
      const [item] = await res.json()
      if (!item) return
      const res2 = await fetch('http://localhost:5000/api/getItems?' + new URLSearchParams({ ...item, perPage: 5 }))
      const { items } = await res2.json()
      setRecommendationItems(items)
    })()
  }, [])

  return (
    <div className="home">
      <NavbarComponent setFoundItems={setFoundItems} />
      {recommendationItems?.length &&
        <div>
          <h1 className='px-5 pt-5'>Recommendations</h1>
          <div className="d-flex flex-wrap justify-content-center mt-1">
            {recommendationItems.map((item, index) => (
              <ItemCard item={item} key={index} />
            ))}
          </div>
        </div>
      }
      {foundItems?.length > 0 &&
        <div>
          <h1 className='px-5 pt-5'>Search Results</h1>
          <div className="d-flex flex-wrap justify-content-center mt-1">
            {foundItems.map((item, index) => (
              <ItemCard item={item} key={index} />
            ))}
          </div>
        </div>
      }
      <Footer />
    </div>
  );
}

export default Home;
