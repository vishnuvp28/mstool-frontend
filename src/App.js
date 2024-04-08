import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "./Navibar";
import { Route, Routes } from "react-router";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import DateRangePickerComp from "./DateRangePickerComp";
import Employee from "./Employee";
import Adduser from "./Adduser";
import EditUser from "./Edituser";
function App() {
  return (
    <div className="App">
      <Navibar />

      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/date" element={<DateRangePickerComp/>}/>
        <Route path="/edit/:id" element={<EditUser/>}/>
        <Route path="/delete/:id" element={<Employee/>}/>
        <Route path="/add" element={<Adduser/>}/>
        <Route path="/employee" element={<Employee/>}/>

      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
