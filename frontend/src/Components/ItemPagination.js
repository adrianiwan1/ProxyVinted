import { useState } from 'react'
import Pagination from 'react-paginate'

function ItemPagination({ foundItems }) {
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 2; // ilość elementów na stronie
  const pageCount = Math.ceil(foundItems.length / itemsPerPage);  // ilość stron
  const currentData = foundItems.slice(offset, offset + itemsPerPage);

  //Pagination handler
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * itemsPerPage;
    setOffset(offset)
  };

 

  return (

    <Pagination
      pageCount={pageCount}
      onPageChange={handlePageClick}
      forcePage={offset / itemsPerPage}
      className=" d-flex align-items-center justify-content-center pagination pt-5"
      nextLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
      previousLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
    />


  );
}

export default ItemPagination;