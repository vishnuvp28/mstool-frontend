import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CalendarComp from "./CalendarComp";
import DateRangePickerComp from "./DateRangePickerComp";
import Excel from "./Excel";
import Search from "./Search";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  <CalendarComp />;
  useEffect(() => {
    fetch("http://localhost:8080/home")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <div>
        <div className="homediv">
          <button className="bttn1" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
        <div className="bttn2">
          <Excel data={data} />
          {/* <PDFGenerator data={data} /> */}
          {/* {console.log(data)} */}
        </div>
        {/* <Search data={data}/> */}
        <input
          className="search"
          placeholder="Search"
          onChange={handleChange}
        ></input>

        {/* <button className="bt" onClick={handleClick} >Search</button> */}
      </div>
      <div>
        <DateRangePickerComp />
      </div>
      <br></br>
      <div className="container">
        <table border="3" className="table">
          <thead>
            <tr className="tr">
              <th className="th">ID</th>
              <th className="th">NAME</th>
              <th className="th">DOOR_NUMBER</th>
              <th className="th">TIME</th>
              <th className="th">DATE</th>
            </tr>
          </thead>

          {data ? <GetData data={data} search={search}/> : <h2>Loading</h2>}
        </table>
      </div>
    </div>
  );
}

const GetData = ({ data, search }) => {
  // console.log(data);
  return (
    <tbody>
      {data
        .filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item.employeename.toLowerCase().includes(search);
        })
        .map((key, index) => (
          <Data data={key} key={index} />
        ))}
    </tbody>
  );
};

const Data = ({ data }) => {
  return (
    <tr className="tr">
      <td className="th">{data.id}</td>
      <td className="th">{data.employeename}</td>
      <td className="th">{data.doornumber}</td>
      <td className="th">{data.intime}</td>
      <td className="th">{data.dailydate}</td>
    </tr>
  );
};

export default Home;
