import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


function Employee() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [emp, setEmp] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const totalRecords = emp.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(11);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = emp.slice(indexOfFirstRecord, indexOfLastRecord);

  // // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

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
  console.log(filteredData);


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
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(totalRecords / recordsPerPage)
                }
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
          return search.toLowerCase() === ""
            ? item
            : item.employeename.toLowerCase().includes(search);
        })
        .map((item, index) => (
          <Data records={[item]} key={index} />
        ))}
    </tbody>
  );
};

const Data = ({ records }) => {
  const navigate = useNavigate();

  if (!Array.isArray(records)) {
    console.error("Data is not an array:", records);
    return null; // or handle this case accordingly
  }
  console.log(records);
  return (
    <div>
      <tbody>
        {records.map((item, index) => (
          <tr key={index} className="tr">
            <td className="th">{item.id}</td>
            <td className="th">{item.employeeid}</td>
            <td className="th">{item.employeename}</td>
            <td className="th">{item.cabinetname}</td>
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
