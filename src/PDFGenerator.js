// import React from "react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const PDFGenerator = ({ data,search }) => {

//   const generatePDF = () => {

//     const filteredData = data.filter((item) => {
//       const employeeName = item.employeename || "";
//       const employeeId = item.employeeid || "";
//       const cabinetName = item.cabinetname || ""; 
//     const isSearchActive = search.trim().length>0;
//     const validData = Array.isArray(data) ? data : [];
//     const validFilteredData = Array.isArray(filteredData) ? filteredData : [];
  


// return (
//   search.trim() === "" ||
//   employeeName.toLowerCase().includes(search.toLowerCase()) ||
//   employeeId.toString().includes(search) ||
//   cabinetName.toLowerCase().includes(search.toLowerCase())
// );
// });


  
//     if (!filteredData || filteredData.length === 0) {
//       alert("No data available to download as PDF.");
//       return;
//     }

//     const doc = new jsPDF();
//     doc.text("Employee Data", 20, 10);

//     const tableColumn = ["ID", "NAME", "DOOR NUMBER", "CABINET NAME", "DATE", "TIME", "OPEN/CLOSE"];
//     const tableRows = filteredData.map((item) => [
//       item.id,
//       item.employeename,
//       item.doornumber,
//       item.cabinetname,
//       item.dailydate,
//       item.time,
//       item.openclose,
//     ]);

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//       theme:"striped"
//     });

//     doc.save("employee_data.pdf");
//   };

//   return (
//     <button className="pdf" onClick={generatePDF}>Download PDF</button>
//   );
// };

// export default PDFGenerator;
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFGenerator = ({ data, search }) => {
  const generatePDF = () => {
    const isSearchActive = search.trim().length > 0;
    const tableData = isSearchActive
      ? data.filter((item) => {
          const employeeName = item.employeename || "";
          return (
            employeeName.toLowerCase().includes(search.toLowerCase()) ||
            (item.employeeid && item.employeeid.toString().includes(search)) ||
            (item.cabinetname &&
              item.cabinetname.toString().toLowerCase().includes(search))
          );
        })
      : data;

    if (!Array.isArray(tableData) || tableData.length === 0) {
      alert("No data available to download as PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Employee Data", 20, 10);

    const tableColumn = [
      "ID",
      "NAME",
      "DOOR NUMBER",
      "CABINET NAME",
      "DATE",
      "TIME",
      "OPEN/CLOSE",
    ];
    const tableRows = tableData.map((item) => [
      item.id,
      item.employeename,
      item.doornumber,
      item.cabinetname,
      item.dailydate,
      item.time,
      item.openclose,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: "striped",
    });

    doc.save("employee_data.pdf");
  };

  return <button className="pdf" onClick={generatePDF}>Download PDF</button>;
};

export default PDFGenerator;
