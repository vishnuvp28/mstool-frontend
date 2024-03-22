import axios from "axios";
import { addDays, format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function DateRangePickerComp() {
  const [range, setRange] = useState([
    {
      sdate: new Date(),
      edate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);

  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    // console.log(e.key);
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    // console.log(refOne.current);
    // console.log(e.target);
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const sedateRangeToBackend = async () => {
    try {
      const response = await axios.post("http://localhost:8080/date", {
        sdate: range[0].sdate,
        edate: range[0].edate,
      });

      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending date range to the server:", error);
    }
  };

  const handleDateRangeChange = (item) => {
    setRange([item.selection]);
    sedateRangeToBackend(); // Send date range to the backend when it changes
  };


  return (
    <div className="calenderwrap">
         <h3 className="h3">MM/DD/YYYY :</h3>
      <input
        value={`${format(range[0].sdate, "MM/dd/yyyy")} to ${format(
          range[0].edate,
          "MM/dd/yyyy"
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
     
      <div ref={refOne}>
        
        {open && (


          <DateRangePicker
            onChange={(item) => setRange([item.selection])}
            editableDataInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}

export default DateRangePickerComp;
