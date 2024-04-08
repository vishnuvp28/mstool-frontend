import React from "react";
import { useState } from "react";

function Search({data}) {
  console.log(data)
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    filterData(searchValue);
  }; 
  const filterData = (searchValue) => {
    const filteredList = (data || []).filter((item) =>
      Object.values(item).some((value) =>
      value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filteredList);
  };
  const handleClick = (e) => {
    console.log("Search button clicked");
    filterData(search);
  };

  return (
    <div>
      <input
        className="search"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      ></input>

      <button className="bt" onClick={handleClick}>
        Search
      </button>
      <div>
        {filteredData && filteredData.map((item, index) => (
          <div key={index}>
            <p>Name: {item.name}</p>
            <p>Door Number: {item.doornumber}</p>
            <p>Time: {item.time}</p>
          </div>
        ))}
        </div>
    </div>
  );
}

export default Search;
