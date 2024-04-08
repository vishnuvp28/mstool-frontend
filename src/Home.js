import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CalendarComp from "./CalendarComp";
import DateRangePickerComp from "./DateRangePickerComp";
import Excel from "./Excel";
import Search from "./Search";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // <CalendarComp />
  useEffect(() => {
    fetch("http://localhost:8080/home")
    .then((res) => res.json())
    .then((result) => {
      if (Array.isArray(result.responseDto)) {
        setData(result.responseDto);
      } else if (typeof result.responseDto === "object") {
        setData([result.responseDto]); // Wrap the object inside an array
      } else {
        console.error("Invalid response format:", result.responseDto);
      }
    })
    .catch((err) => console.log(err));
  }, []);
console.log(filteredData)
  return (
    <div className="home">
      <div>
        <div className="homediv">
       
     <br></br><br></br>
     <input
          className="search"
          placeholder="Search"
          onChange={handleChange}
        ></input>

       <span className="excel"><Excel data={data} filteredData={filteredData} search={search}/></span> 
         <span className="logout">
         <button  onClick={() => navigate("/")}>
            Logout
          </button>
         </span>
         <br>
         </br>
         <br>
         </br>
        </div>
      
        <br></br>
        
        <span className="emp">< button className="em" onClick={()=>navigate("/employee")} >Employee</button>
<br></br></span>
      </div>
      <div>
        <DateRangePickerComp data={data}/>
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
              <th className="th">TIME</th>
              <th className="th">DATE</th>
             

            </tr>
          </thead>

          {Array.isArray(data) ? <GetData data={data} search={search}/> : <h2>Loading</h2>}
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
        ))
      }
    </tbody>
  );
};

const Data = ({ data }) => {
  const navigate = useNavigate();

  if (!Array.isArray(data)) {
    console.error("Data is not an array:",  data);
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
          <td className="th">{item.dailydate}</td>
          {/* <td className="th">
          <button className="Editbtn" onClick={()=>navigate('/edit/:id')}>Edit</button>
          </td> */}


        </tr>
      )
      )
      
    }
    </tbody>
    
</div>
  );
};

export default Home;



