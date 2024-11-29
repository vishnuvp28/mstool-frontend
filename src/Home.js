import React, { useEffect } from "react";
// import { useNavigate } from "react-router";
// import Excel from "./Excel";
import { useState, CSSProperties } from "react";
// import { DateRangePicker } from "react-date-range";
// import DateRangePickerComp from "./DateRangePickerComp";
// import PDFGenerator from "./PDFGenerator";
// import { ClipLoader } from "react-spinners";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   border: "5px solid white",

// };

// function Home() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredData, setFilteredData] = useState(null);
//   const [alldata, setAlldata] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const [think, setThink] = useState(null);

//   const fetchData = async() => {
//     setLoading(true);
//     await fetch("http://localhost:8080/thinks")
//       .then((res) => res.json())
//       .then((result) => {
//         if (Array.isArray(result.responseDto)) {
//           setThink(result.responseDto);
//         } else if (typeof result.responseDto === "object") {
//           setThink([result.responseDto]);
//         } else {
//           console.error("Invalid response format:", result.responseDto);
//         }

//       }
//     )
//       .catch((err) => console.log(err))
//       .finally(()=>{
//         setLoading(false);
//       });
//   };
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearch(query);
//     const results = data.filter((item) => {
//       const employeeName = item.employeename || "";
//       return (
//         employeeName.toLowerCase().includes(query) ||
//         (item.employeeid && item.employeeid.toString().includes(query)) ||
//         (item.cabinetname &&
//           item.cabinetname.toString().toLowerCase().includes(query))
//       );
//     });
//     setFilteredData(results);
//     setCurrentPage(1);
//   };

//   const [currentPage, setCurrentPage] = useState(0);
//   const [recordsPerPage] = useState(20);

//   const totalRecords = filteredData?.length || data?.length || 0;
//   const totalPages = Math.ceil(totalRecords / recordsPerPage);

//   const indexOfLastRecord = currentPage * recordsPerPage;
// const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

// const currentRecords = Array.isArray(filteredData)
//   ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
//   : data.slice(indexOfFirstRecord, indexOfLastRecord);

//   const maxVisibleButtons = 5;

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   console.log(filteredData)

//   const changePage = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const getVisiblePageNumbers = () => {
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };

//   useEffect(() => {
//     fetch("http://localhost:8080/home")
//       .then((res) => res.json())
//       .then((result) => {
//         if (Array.isArray(result.responseDto)) {
//           setData(result.responseDto);

//           setAlldata(result.responseDto);
//         } else if (typeof result.responseDto === "object") {
//           setData([result.responseDto]);
//           setAlldata([result.responseDto]);
//         } else {
//           console.error("Invalid response format:", result.responseDto);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   console.log(data)
//   console.log(filteredData, "filtered");

//   const handleSelect = (date) => {
//     let filt = alldata.filter((item) => {
//       let productDate = new Date(item.dailydate);
//       return (
//         productDate >= date.selection.startDate &&
//         productDate <= date.selection.endDate
//       );
//     });
//     setStartDate(date.selection.startDate, "Start");
//     setEndDate(date.selection.endDate, "End");
//     setData(filt);
//   };

//   const selectionRange = {
//     startDate: startDate,
//     endDate: endDate,
//     key: "selection",
//   };

//   const slicedData = data && data.slice ? data.slice(0, 10) : [];
//   return (
//     <div className="home">
//       <div>
//         <div className="homediv">
//         <span className="emp">
//           <button className="em" onClick={() => navigate("/employee")}>
//             Employee
//           </button>
//           <button onClick={() => navigate("/signup")} className="em">
//             Sign Up
//           </button>
//         </span>
//           <br></br>
//           <br></br>
//           <input
//             className="search"
//             placeholder="Search"
//             style={{color:"white", fontSize:"x-large", backdropFilter:"blur(30px)"}}
//              onChange={handleSearch}

//           ></input>

//           <span className="excel">
//             <Excel records={currentRecords} data={data} filteredData={filteredData} search={search} />
//           </span>
//           <span className="logout">
//           <PDFGenerator
//   data={data}
//   filteredData={filteredData}
//   search={search}
// />

//           </span>
//           <span className="logout">
//             <button className="log" onClick={() => navigate("/")}>
//               Logout
//             </button>
//           </span>
//           <br></br>
//           <br></br>
//           <span>
//             <button onClick={fetchData} className="exp1">
//               Refresh
//             </button>
//           </span>
//         </div>
//         <br></br>
//         {loading && (
//           <div className="loading-spinner">
//             <ClipLoader
//               loading={loading}
//               cssOverride={override}
//               size={150}
//               aria-label="Loading Spinner"
//               data-testid="loader"
//             />
//           </div>

//         )}

//         <div>
//           <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
//           <br></br>

//         </div>
//         <br></br>
//       <div className="container">
//         <table border="3" className="table">
//           <thead className="thead">
//             <tr className="tr">
//               <th className="th">ID</th>
//               <th className="th">NAME</th>
//               <th className="th">DOOR NUMBER</th>
//               <th className="th">CABINET NAME</th>
//               <th className="th">DATE</th>
//               <th className="th">TIME</th>
//               <th className="th">OPEN/CLOSE</th>

//             </tr>
//           </thead>

//           {data && Array.isArray(data) ? (
//             <GetData records={currentRecords} data={data} search={search} />
//           ) : (
//             <h2>Loading</h2>
//           )}
//         </table>

//       </div>

//       <br></br>
//       <div className="nav">
//       <nav>
//     <ul className="pagination">
//       <li className="page-item">
//         <button
//           className="page-link"
//           onClick={prevPage}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//       </li>
//       {Array.from({ length: totalPages }, (_, i) => i + 1)
//         .filter(
//           (number) =>
//             number === 1 ||
//             number === totalPages ||
//             (number >= currentPage - 2 && number <= currentPage + 2)
//         )
//         .map((number, index, array) => (
//           <React.Fragment key={number}>
//             {index > 0 && number > array[index - 1] + 1 && (
//               <li className="page-item disabled">
//                 <span className="page-link">...</span>
//               </li>
//             )}
//             <li
//               className={`page-item ${number === currentPage ? "active" : ""}`}
//             >
//               <button
//                 onClick={() => paginate(number)}
//                 className="page-link"
//               >
//                 {number}
//               </button>
//             </li>
//           </React.Fragment>
//         ))}
//       <li className="page-item">
//         <button
//           className="page-link"
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </li>
//     </ul>
//   </nav>
//       </div>
//       {loading && (
//         <div className="loading-spinner">

//           <ClipLoader

//         loading={loading}
//         cssOverride={override}
//         size={150}
//         aria-label="Loading Spinner"
//         data-testid="loader" />
//         </div>

//       )}
//     </div>
//     </div>
//   );
// }

// const GetData = ({ data, search,records,setData }) => {
//   console.log(records);

//   return (
//     <tbody>
//       {records
//        .filter((item) => {
//         const employeeName = item.employeename || "";
//         return (
//           search.trim() === "" ||
//           employeeName.toLowerCase().includes(search.toLowerCase()) ||
//           (item.employeeid && item.employeeid.toString().includes(search)) ||
//           (item.cabinetname && item.cabinetname.toString().toLowerCase().includes(search))
//         );

//       })
//       }
//       {data && data.length > 0 ? (
//         data.map((item, index) => (
//           <Data records={[item]} key={index} />
//         ))
//       ) : (
//         <tr>
//           <td colSpan="100%">No records available</td>
//         </tr>
//       )}
//     </tbody>
//   );
// };
// const Data = ({ records }) => {
//   const navigate = useNavigate();

//   if (!Array.isArray(records) || records.length=== 0) {
//     console.error("Data is not an array or is empty:", records);
//     return null;
//   }
//   console.log(records);
//   return (
//     <div>
//       <tbody>
//         {records.map((item, index) => (
//           <tr key={index} className="tr">
//             <td className="th">{item.id}</td>
//             <td className="th">{item.employeename}</td>
//             <td className="th">{item.doornumber}</td>
//             <td className="th">{item.cabinetname}</td>
//             <td className="th">{item.dailydate}</td>
//             <td className="th">{item.time}</td>
//             <td className="th">{item.openclose}</td>
//           </tr>
//         ))}
//       </tbody>
//     </div>
//   );
// };

// export default Home;
import jsPDF from "jspdf";
import "./Home.css";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Use 1-based indexing for clarity
  const [recordsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    border: "5px solid white",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/home");
      const result = await res.json();

      if (Array.isArray(result.responseDto)) {
        setData(result.responseDto);
        setFilteredData(result.responseDto);
      } else if (typeof result.responseDto === "object") {
        setData([result.responseDto]);
        setFilteredData([result.responseDto]);
      } else {
        console.error("Invalid response format:", result.responseDto);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const results = data.filter((item) => {
      const employeeName = item.employeename || "";
      return (
        employeeName.toLowerCase().includes(query) ||
        (item.employeeid && item.employeeid.toString().includes(query)) ||
        (item.cabinetname &&
          item.cabinetname.toString().toLowerCase().includes(query))
      );
    });

    setFilteredData(results);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const totalRecords = filteredData?.length || 0;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords =
    filteredData?.slice(indexOfFirstRecord, indexOfLastRecord) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // PDF Export Functionality
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "ID",
      "Name",
      "Door Number",
      "Cabinet Name",
      "Date",
      "Time",
      "Status",
    ];
    const tableRows = [];

    filteredData?.forEach((item) => {
      const rowData = [
        item.id,
        item.employeename,
        item.doornumber,
        item.cabinetname,
        item.dailydate,
        item.time,
        item.openclose,
      ];
      tableRows.push(rowData);
    });

    doc.text("Table Data", 14, 15);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("table_data.pdf");
  };

  // Excel Export Functionality
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "table_data.xlsx");
  };
  const navigate = useNavigate();

  return (
    <div className="home">
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
          type="text"
          className="search"
          style={{
            color: "white",
            fontSize: "x-large",
            backdropFilter: "blur(30px)",
          }}
          placeholder="Search"
          onChange={handleSearch}
          value={search}
        />{" "}
        <span className="logout">
          <button onClick={exportPDF} className="pdf">
            Download PDF
          </button>
        </span>
        <span className="excel">
          <button onClick={exportExcel} className="pdf">
            Export Excel
          </button>
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
        {/* <div className="homediv">
         <span className="emp">
         <button className="em" onClick={() => navigate("/employee")}>
            Employee
          </button>
          <button onClick={() => navigate("/signup")} className="em">
            Sign Up
          </button>
         </span>
          <br></br>
          <br></br> */}
        {/* <input
            className="search"
            placeholder="Search"
            style={{color:"white", fontSize:"x-large", backdropFilter:"blur(30px)"}}           
             onChange={handleSearch}
             

          ></input> */}
        {/* <span className="excel">
            <Excel records={currentRecords} data={data} filteredData={filteredData} search={search} />
          </span> */}
        {/* <span className="logout">
          <PDFGenerator
  data={data}
  filteredData={filteredData}
  search={search}
/>

          </span> */}
      </div>
      {/* </div> */}
      <br></br>
      {loading && (
        <div className="loading-spinner">
          <ClipLoader
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className="container">
        <table border="3" className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">ID</th>
              <th className="th">Name</th>
              <th className="th">Door Number</th>
              <th className="th">Cabinet Name</th>
              <th className="th">Date</th>
              <th className="th">Time</th>
              <th className="th">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((item, index) => (
                <tr key={index} className="tr">
                  <td className="th">{item.id}</td>
                  <td className="th">{item.employeename}</td>
                  <td className="th">{item.doornumber}</td>
                  <td className="th">{item.cabinetname}</td>
                  <td className="th">{item.dailydate}</td>
                  <td className="th">{item.time}</td>
                  <td className="th">{item.openclose}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="nav">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="page-link"
              >
                Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <li
                  key={number}
                  className={`page-item ${
                    number === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(number)}
                    className="page-link"
                  >
                    {number}
                  </button>
                </li>
              )
            )}

            <li>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="page-link"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
