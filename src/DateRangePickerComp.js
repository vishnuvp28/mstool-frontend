import axios from "axios";
import { addDays, format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function DateRangePickerComp() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const refOne = useRef(null);
  useEffect(() => {
    fetchData();
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };
  // const sedateRangeToBackend = async () => {
  //   try {
  //     console.log(
  //       "Sending date range to backend with startDate:",
  //       range[0].startDate
  //     );
  //     console.log(
  //       "Sending date range to backend with endDate:",
  //       range[0].endDate
  //     );
  //     const formattedStartDate = format(range[0].startDate, "MM/dd/yyyy");
  //     const formattedEndDate = format(range[0].endDate, "MM/dd/yyyy");
  //     console.log("Formatted Start Date:", formattedStartDate);
  //     console.log("Formatted End Date:", formattedEndDate);

  //     const response = await axios.post("http://localhost:8080/date", {
  //       startDate: formattedStartDate,
  //       endDate: formattedEndDate,
  //     });

  //     console.log("range", range);
  //     console.log("Server response:", response);
  //   } catch (error) {
  //     console.error("Error sending date range to the server:", error);
  //   }
  // };

  // const handleDateRangeChange = (item) => {
  //   setRange([item.selection]);
  //   // sedateRangeToBackend(); // Send date range to the backend when it changes
  // };

  // const fetchData = async () => {
  //   try {
  //     console.log("Fetching data with startDate:", range[0].startDate);
  //     console.log("Fetching data with endDate:", range[0].endDate);
  //     const formattedStartDate = format(range[0].startDate, "MM/dd/yyyy");
  //     const formattedEndDate = format(range[0].endDate, "MM/dd/yyyy");
  //     console.log("Formatted Start Date:", formattedStartDate);
  //     console.log("Formatted End Date:", formattedEndDate);

  //     const response = await axios.post("http://localhost:8080/date", {
  //       startDate: formattedStartDate,
  //       endDate: formattedEndDate,
  //     });
  //     filteredData(response.data);
  //     console.log(response.data);
  //     console.log(filteredData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);

  //   }

  //     console.log(filteredData);
  // };
  // const handleFilter = () => {
  //   fetchData();
  //   setOpen(false); // Close date picker after applying filter
  // };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8080/date"); // Adjust the URL to your backend endpoint
  //     setData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const formattedStartDate = format(range[0].startDate, "dd/MM/yyyy");
      const formattedEndDate = format(range[0].endDate, "dd/MM/yyyy");
      const response = await axios.post("http://localhost:8080/date", {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateRangeChange = (item) => {
    setRange([item.selection]);
  };

  const handleFilter = () => {
    console.log("Filter button clicked");
    if (data.length === 0) {
      console.log("Data is empty. Fetching data...");
      fetchData();
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = new Date(item.dailydate); // Assuming dailydate is a date string in MM/dd/yyyy format
      return itemDate >= range[0].startDate && itemDate <= range[0].endDate;
    });
    setFilteredData(filtered);
    setOpen(false); // Close date picker after applying filter
  };
  console.log("Data:", data);
  console.log("Date Range:", range);
  console.log("Filtered Data:", filteredData);
  return (
    <div className="calenderwrap">
      <h5 className="h3">DD/MM/YYYY </h5>

      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
          range[0].endDate,
          "dd/MM/yyyy"
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
        <button onClick={handleFilter}>Filter</button>

        <div>
          {filteredData.map((item) => (
            <tr className="tr">
              <td className="th">{item.id}</td>
              <td className="th">{item.employeename}</td>
              <td className="th">{item.doornumber}</td>
              <td className="th">{item.intime}</td>
              <td className="th">{item.dailydate}</td>
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DateRangePickerComp;
