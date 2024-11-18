import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFGenerator = ({ data }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.text("Employee Data", 20, 10);

    // Prepare table content
    const tableColumn = ["ID", "NAME", "DOOR NUMBER", "CABINET NAME", "DATE", "TIME", "OPEN/CLOSE"];
    const tableRows = data.map((item) => [
      item.id,
      item.employeename,
      item.field2,
      item.cabinetname,
      item.dailydate,
      item.intime,
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
