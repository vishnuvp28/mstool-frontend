import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CalendarComp from "./CalendarComp";
// import DateRangeComp from "./DateRangeComponet";
// import { DateRangePicker } from "react-date-range";
import DateRangePickerComp from "./DateRangePickerComp";
import PDFGenerator from "./PDFGenerator";
import Excel from "./Excel";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  <CalendarComp />;
  useEffect(() => {
    fetch("http://localhost:8080/home")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);
  // console.log(res);
  // setData(data);

  return (
    <div className="home">
      <div>
        <div className="homediv">
          <button className="bttn1" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
        <div className="bttn2">
          <Excel data={data}/>
          {/* <PDFGenerator data={data} /> */}
          <Excel/>
          {console.log(data)}
        </div>
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

          {data ? <GetData data={data} /> : <h2>Loading</h2>}
        </table>
      </div>
    </div>
  );
}

const GetData = ({ data }) => {
  console.log(data);
  return (
    <tbody>
      {data.map((key, index) => (
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
