import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "./Navibar";
import { Route, Routes } from "react-router";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import DateRangePickerComp from "./DateRangePickerComp";
function App() {
  return (
    <div className="App">
      <Navibar />

      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/date" element={<DateRangePickerComp/>}/>

      </Routes>
    </div>
  );
}

export default App;
