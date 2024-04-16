// import axios from "axios";
// import { addDays, format } from "date-fns";
// import React, { useEffect, useRef, useState } from "react";
// import { DateRangePicker } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file

// function DateRange({data}) {
//     const[products,setProducts]=useState(data)
//   useEffect(() => {
//     fetch("http://localhost:8080/date")
//     .then((res)=>res.json())
//     .then((result)=>setProducts(result.responseDto))
//     .catch((err)=>console.log(err))
//   }, []);
//   console.log(products);
//   return (
//     <div className="calenderwrap">
//       <h5 className="h3">DD/MM/YYYY </h5>
// {/* 
//       <input
//         value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
//           range[0].endDate,
//           "dd/MM/yyyy"
//         )}`}
//         readOnly
//         className="inputBox"
//         onClick={() => setOpen((open) => !open)}
//       />

//       <div ref={refOne}>
//         {open && (
//           <DateRangePicker
//             onChange={(item) => setRange([item.selection])}
//             editableDataInputs={true}
//             moveRangeOnFirstSelection={false}
//             ranges={range}
//             months={1}
//             direction="horizontal"
//             className="calendarElement"
//           />
//         )}
//         <button onClick={handleFilter}>Filter</button> */}

//         <div>
//           {products.map((item) => (
//             <tr className="tr">
//               <td className="th">{item.id}</td>
//               <td className="th">{item.employeename}</td>
//               <td className="th">{item.doornumber}</td>
//               <td className="th">{item.intime}</td>
//               <td className="th">{item.dailydate}</td>
//             </tr>
//           ))}
//         </div>
//       </div>
//     // </div>
//   );
// }

// export default DateRange;
