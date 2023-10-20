import React, { useState } from "react";
import NavbarComponent from '../Components/Navbar.js';
import ItemCard from '../Components/ItemCard.js'
import Footer from '../Components/Footer.js'
import ItemPagination from '../Components/ItemPagination.js'

function Home({ setItemDetails, itemDetails }) {

  const [foundItems, setFoundItems] = useState([])

  return (
    <div className="A">
      <NavbarComponent setFoundItems={setFoundItems} />
      <div className="d-flex flex-wrap justify-content-center mt-5">
        {foundItems.map((item, index) => (
          <ItemCard item={item} key={index} setItemDetails={setItemDetails} itemDetails={itemDetails}/>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {foundItems && <ItemPagination foundItems={foundItems} />}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
