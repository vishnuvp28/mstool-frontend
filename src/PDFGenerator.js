import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFGenerator = ({ data,filteredData,search }) => {
  const generatePDF = () => {
    // Check if data and filteredData are valid arrays
    const isSearchActive = search.trim();
    const validData = Array.isArray(data) ? data : [];
    const validFilteredData = Array.isArray(filteredData) ? filteredData : [];
  
    // Decide what data to use for PDF generation
    const tableData = isSearchActive ? validFilteredData : validData;
  

  console.log("Data for PDF:", tableData);
    if (tableData.length === 0) {
      alert("No data available to download as PDF.");
      return;
    }
  

    const doc = new jsPDF();

    // Add a title to the PDF
    doc.text("Employee Data", 20, 10);

    // Prepare table content
    const tableColumn = ["ID", "NAME", "DOOR NUMBER", "CABINET NAME", "DATE", "TIME", "OPEN/CLOSE"];
    const tableRows = tableData.map((item) => [
      item.id,
      item.employeename,
      item.doornumber,
      item.cabinetname,
      item.dailydate,
      item.time,
      item.openclose,
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("employee_data.pdf");
  };

  return (
    <button className="pdf" onClick={generatePDF}>Download PDF</button>
  );
};

export default PDFGenerator;
