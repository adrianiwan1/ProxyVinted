import React, { useState } from "react";
import NavbarComponent from '../Components/Navbar.js';
import ItemCard from '../Components/ItemCard.js'
import Footer from '../Components/Footer.js'
import ReactPaginate from 'react-paginate';

function Home({ recommendationItems }) {

  const [foundItems, setFoundItems] = useState([])
  //Pagination 
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(foundItems.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const itemsToDisplay = foundItems.slice(offset, offset + itemsPerPage);

  return (
    <div className="home">
      <NavbarComponent setFoundItems={setFoundItems} />
      {foundItems?.length > 0 &&
        <div>
          <h1 className='px-5 pt-5'>Search Results</h1>
          <div>
            <div className="d-flex flex-wrap justify-content-center mt-1">
              {itemsToDisplay.map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
            </div>
            <ReactPaginate
              nextLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
              previousLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              activeClassName={'active'}
              pageClassName="pagination-item"
              className="d-flex align-items-center justify-content-center pagination pt-5"
            />
          </div>
        </div>
      }
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
      <Footer />
    </div>
  );
}

export default Home;
