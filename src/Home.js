import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Excel from "./Excel";
import { DateRangePicker } from "react-date-range";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [alldata, setAlldata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
          // Wrap the object inside an array
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
            SIGNUP
          </button>
        </span>
          <br></br>
          <br></br>
          <input
            className="search"
            placeholder="Search"
            onChange={handleChange}
          ></input>

          <span className="excel">
            <Excel data={data} filteredData={filteredData} search={search} />
          </span>
          <span className="logout">
            <button className="log" onClick={() => navigate("/")}>
              Logout
            </button>
          </span>
          <br></br>
          <br></br>
        </div>

        <br></br>
      
      </div>
      <div>
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        <br></br>
        <button onClick={() => window.location.reload(false)} className="exp">
          Get All Data
        </button>
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
              <th className="th">IN_TIME</th>
              <th className="th">OUT_TIME</th>
              <th className="th">DATE</th>
            </tr>
          </thead>

          {Array.isArray(data) ? (
            <GetData data={data} search={search} />
          ) : (
            <h2>Loading</h2>
          )}
        </table>
      </div>
    </div>
  );
}

const GetData = ({ data, search }) => {
  console.log(data);
  return (
    <tbody>
      {data
        .filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item.employeename.toLowerCase().includes(search);
        })
        .map((item, index) => (
          <Data data={[item]} key={index} />
        ))}
    </tbody>
  );
};

const Data = ({ data }) => {
  const navigate = useNavigate();

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return null; // or handle this case accordingly
  }
  console.log(data);
  return (
    <div>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="tr">
            <td className="th">{item.id}</td>
            <td className="th">{item.employeename}</td>
            <td className="th">{item.doornumber}</td>
            <td className="th">{item.cabinetname}</td>
            <td className="th">{item.intime}</td>
            <td className="th">{item.outtime}</td>
            <td className="th">{item.dailydate}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default Home;
