import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";

function EditUser() {
  
    const navigate = useNavigate();
    const {id}=useParams();
    const [state, setState] = useState("success");
    const [data, setData]=useState();
  
    useEffect(() => {
       fetch("http://localhost:8080/employee")
        .then((res) => res.json()).then((result) => setData(result.responseDto))  
       
    }, [])
console.log(data);
var array;
if(data!=undefined){

for(let i=0;i<data.length;i++){
  if(data[i].id==id){
    array=data[i];
  }
}
}

console.log(array);
     
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
      useFormik({
        initialValues: {   employeename: "",
          field1: "",
          field3: "", },
      
        onSubmit: async () => {
          console.log(values.employeename);
          console.log(values.field1);
          console.log(values.field3);

          const datas={...array,employeename:values.employeename,field1:values.field1,field3:values.field3}
          const datae = await fetch(`http://localhost:8080/edit/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(datas),
           
          });
       console.log(datas);

          if (datae.status==="failed login") {
            console.log("error");
            setState("error");
            alert("Invalid credentials");
          } else {
            setState("success");
            alert("User Edited successfully");
            navigate("/employee");
            console.log("success")
            console.log(datae);
          }
        },
      });
     
    return (
        <div className="register">
       
          <br></br>
    
          <div className="regi">
          
    
            <div className="reg">
              <h1 className="h1">Edit</h1>
              <br></br>
              <form onSubmit={handleSubmit} className="login-form">
              <input
               className="textfield"
               placeholder=" Employee Id"
               type="number"
               name="field1"
               value={values.field1}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.field1 && errors.field1}
               autoComplete="field1"
            />{" "}
            <br></br>
            <br></br>
            <input
               className="textfield"
               placeholder="Name"
               type="text"
               name="employeename"
               value={values.employeename}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.employeename && errors.employeename}
               autoComplete="employeename"
            />{" "}
            <br></br>
            <br></br>
            <input
               className="textfield"
               placeholder="Cabinet Name"
               type="number"
               name="field3"
               value={values.field3}
               onChange={handleChange}
               onBlur={handleBlur}
               error={touched.field3 && errors.field3}
               autoComplete="field3"
            />{" "}
            <br></br>
            <br></br>
         
            <>
              <button type="submit" className="addbtn" >
                Edit
              </button>
              <br></br>
              <button  className="addbtn" onClick={()=>navigate("/employee")}>
                Back 
              </button>  
            </>
          </form>
            </div>
          </div>
          <span>
          </span>
        </div>
      ); 
    }

export default EditUser