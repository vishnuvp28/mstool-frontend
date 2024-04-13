import React, { useState } from 'react'
// import { useParams } from "react-router";
function Pagination({currentPage, recordsPerPage, totalRecords, paginate, nextPage, prevPage ,setCurrentPage,lastIndex}) {
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
  //   pageNumbers.push(i);
  // }
  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 5;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = emp.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(emp.length / recordsPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1);

    // function prePage() {
    //     if (currentPage !== firstIndex) {
    //       setCurrentPage(currentPage - 1);
    //     }
    //   }
    //   function nextPage() {
    //     setCurrentPage(id);
    //   }
      // function ChangeCPage(id) {
  //       if (currentPage !== lastIndex) {
  //         setCurrentPage(currentPage + 1);
  //       }
  //     }
  // const { id } = useParams();

  return (
    <div>

      <h1>PAGINATION</h1>
        {/* <nav>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={nextPage} disabled={currentPage === Math.ceil(totalRecords / recordsPerPage)}>
            Next
          </button>
        </li>
      </ul>
    </nav> */}
    </div> 
  )
}

export default Pagination