import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


function Employee() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [emp, setEmp] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);

  const totalRecords = emp.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const maxVisibleButtons = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = emp.slice(indexOfFirstRecord, indexOfLastRecord);


  const getVisiblePageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
  
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/employee")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result.responseDto)) {
          setEmp(result.responseDto);
          console.log(result.responseDto);
        } else if (typeof result.responseDto === "object") {
          setEmp(result.responseDto);
        } else {
          console.error("Invalid response format:", result.responseDto);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(filteredData);


  return (
    <div className="home">
      <div>
        <div className="homediv">
          <br></br>
          <br></br>

          <input
            className="search"
            placeholder="Search"
            onChange={handleChange}
            style={{color:"white", fontSize:"x-large", backdropFilter:"blur(30px)"}}

          ></input>
          <br></br>
          <button className="add" onClick={() => navigate("/add")}>
            Add
          </button>
          <button className="add" onClick={() => navigate("/home")}>
            Back
          </button>
        </div>
        <h1>Employee</h1>
      </div>
      <br></br>
      <div className="container">
        <table border="3" className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">ID</th>
              <th className="th">EMPLOYEE ID</th>
              <th className="th">NAME</th>
              <th className="th">CABINET NAME</th>
              <th className="th">EDIT</th>
            </tr>
          </thead>

          {Array.isArray(emp) ? (
            <GetData records={currentRecords} search={search} />
          ) : (
            <h2>Loading</h2>
          )}
        </table>
      </div>
      <br></br>
      {/* Paginaton---------------------------------- */}

      <div className="nav">
  <nav>
    <ul className="pagination">
      <li className="page-item">
        <button
          className="page-link"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </li>
      {getVisiblePageNumbers().map((number) => (
        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          className="page-link"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>
    </div>
  );
}

const GetData = ({ records, search }) => {
  console.log(records);

  // Change page

  return (
    <tbody>
      {records
         .filter((item) => {
          return search.trim() === "" ||
            item.employeename.toLowerCase().includes(search.toLowerCase()) ||
            (item.field1 && item.field1.toString().includes(search))  
            
        })
        .map((item, index) => (
          <Data records={[item]} key={index} />
        ))}
    </tbody>
  );
};

const Data = ({ records }) => {
  const navigate = useNavigate();

  if (!Array.isArray(records|| records.length=== 0)) {
    console.error("Data is not an array:", records);
    return null; 
  }
  console.log(records);
  return (
    <div>
      <tbody>
        {records.map((item, index) => (
          <tr key={index} className="tr">
            <td className="th">{item.id}</td>
            <td className="th">{item.field1}</td>
            <td className="th">{item.employeename}</td>
            <td className="th">{item.field3}</td>
            <td className="th">
              <button
                className="Editbtn"
                onClick={() => navigate(`/edit/${item.id}`)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default Employee;
