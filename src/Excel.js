import React from "react";
import * as XLSX from 'xlsx';
import Home from "./Home";


function Excel({data}) {
  if(!data){
    console.error("Data is undefined", data);
    return null;
  }
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "records");
    XLSX.writeFile(workbook, "data.xlsx");
  };
  return (
    <div>
      <button className="exp" onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
}

export default Excel;
