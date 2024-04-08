import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CalendarComp from "./CalendarComp";
import DateRangePickerComp from "./DateRangePickerComp";
import Excel from "./Excel";
import Search from "./Search";

function Employee() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [emp, setEmp] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = emp.slice(firstIndex, lastIndex);
  const npage = Math.ceil(emp.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    setCurrentPage(id);
  }
  function ChangeCPage(id) {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/employee")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setEmp(result.responseDto);
          console.log();
        } else if (typeof result === "object") {
          setEmp(result.responseDto);
        } else {
          console.error("Invalid response format:", result);
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
        <h1>User details</h1>
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
            <GetData records={emp} search={search} />
          ) : (
            <h2>Loading</h2>
          )}
        </table>
      </div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-item" onClick={ChangeCPage}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            {" "}
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const GetData = ({ records, search }) => {
  console.log(records);
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
const handleDelete = (id) => {
  console.log("Delete item with ID:", id);

  fetch(`http://localhost:8080/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      console.log("Item deleted successfully");
      // Optionally, you can update the UI or perform any other actions after successful deletion
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      // Handle the error (e.g., show an error message to the user)
    });
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
              <button className="Editbtn" onClick={() => navigate("/edit/:id")}>
                Edit
              </button>
              {/* <button className="Editbtn" onClick={handleDelete}>
                Delete
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default Employee;

// useEffect(() => {
//   fetch("http://localhost:8080/home")
//   .then((res) => res.json())
//   .then((result) => {
//     if (Array.isArray(result.responseDto)) {
//       setData(result.responseDto);
//     } else if (typeof result.responseDto === "object") {
//       setData([result.responseDto]); // Wrap the object inside an array
//     } else {
//       console.error("Invalid response format:", result.responseDto);
//     }
//   })
//   .catch((err) => console.log(err));
// }, []);
