import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Excel from "./Excel";
import { DateRangePicker } from "react-date-range";
// import CalendarComp from "./CalendarComp";
import DateRangePickerComp from "./DateRangePickerComp";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [alldata, setAlldata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [think, setThink] = useState(null);

  const fetchData = async() => {
    await fetch("http://localhost:8080/thinks")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result.responseDto)) {
          setThink(result.responseDto);
          window.location.reload(false)
        } else if (typeof result.responseDto === "object") {
          setThink([result.responseDto]);
          window.location.reload(false)
        } else {
          console.error("Invalid response format:", result.responseDto);
          window.location.reload(false)
        }
        
      }
    ) 
      .catch((err) => console.log(err));
  };
 

  const totalRecords = data ? data.length : 0;
  // console.log(data)
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(40);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =data ? data.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  // // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/home")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result.responseDto)) {
          setData(result.responseDto);
          
          setAlldata(result.responseDto);
        } else if (typeof result.responseDto === "object") {
          setData([result.responseDto]);
          setAlldata([result.responseDto]);
        } else {
          console.error("Invalid response format:", result.responseDto);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(filteredData, "filtered");

  const handleSelect = (date) => {
    let filt = alldata.filter((item) => {
      let productDate = new Date(item.dailydate);
      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate, "Start");
    setEndDate(date.selection.endDate, "End");
    setData(filt);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <div className="home">
      <div>
        <div className="homediv">
        <span className="emp">
          <button className="em" onClick={() => navigate("/employee")}>
            Employee
          </button>
          <button onClick={() => navigate("/signup")} className="em">
            Sign Up
          </button>
        </span>
          <br></br>
          <br></br>
          <input
            className="search"
            placeholder="Search"
            style={{color:"white", fontSize:"x-large", backdropFilter:"blur(30px)"}}            onChange={handleChange}
          ></input>

          <span className="excel">
            <Excel records={currentRecords} data={data} filteredData={filteredData} search={search} />
          </span>
          <span className="logout">
            <button className="log" onClick={() => navigate("/")}>
              Logout
            </button>
            
          </span>
        
          <br></br>
          <br></br>
        <span>
          <button onClick={fetchData} className="exp1">
            Refresh
          </button>
        </span>
        </div>
        <br></br>
      </div>
      <div>
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        <br></br>
        {/* <button onClick={() => window.location.reload(false)} 
         className="exp">
          Get All Data
        </button> */}
      </div>
      <br></br>
      <div className="container">
        <table border="3" className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">ID</th>
              <th className="th">NAME</th>
              <th className="th">DOOR NUMBER</th>
              <th className="th">CABINET NAME</th>
              <th className="th">DATE</th>
              <th className="th">TIME</th>
              <th className="th">OPEN/CLOSE</th>
             
            </tr>
          </thead>

          {data && Array.isArray(data) ? (
            <GetData records={currentRecords} data={data} search={search} />
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

const GetData = ({ data, search,records }) => {
  console.log(records);
  return (
    <tbody>
      {records 
       .filter((item) => {
        const employeeName = item.employeename || "".toString(); 
        return (
          search.trim() === "" ||
          employeeName.toLowerCase().includes(search.toLowerCase()) ||
          (item.employeeid && item.employeeid.toString().includes(search)) ||
          (item.cabinetname && item.cabinetname.toString().toLowerCase().includes(search))
        );
      
      })
        .map((item, index) => (
          <Data records={[item]} key={index} />
        ))}
    </tbody>
  );
};

const Data = ({ records }) => {
  const navigate = useNavigate();

  if (!Array.isArray(records) || records.length=== 0) {
    console.error("Data is not an array or is empty:", records);
    return null; 
  }
  console.log(records);
  return (
    <div>
      <tbody>
        {records.map((item, index) => (
          <tr key={index} className="tr">
            <td className="th">{item.id}</td>
            <td className="th">{item.employeename}</td>
            <td className="th">{item.field2}</td>
            <td className="th">{item.cabinetname}</td>
            <td className="th">{item.dailydate}</td>
            <td className="th">{item.intime}</td>
            <td className="th">{item.openclose}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default Home;
