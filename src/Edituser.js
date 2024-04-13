import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";

function EditUser() {
  
    const navigate = useNavigate();
    const {id}=useParams();
    const [state, setState] = useState("success");
  
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
      useFormik({
        initialValues: {employeename:"" },
      
        onSubmit: async (values) => {
          console.log(values);
          const data = await fetch(`http://localhost:8080/edit/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
           
          });

          if (data.status==="failed login") {
            console.log("error");
            setState("error");
            alert("Invalid credentials");
          } else {
            setState("success");
            alert("User Edited successfully");
            navigate("/employee");
            console.log("success")
          }
        },
      });
    return (
        <div className="register">
       
          <br></br>
    
          <div className="regi">
            {/* <img className="img" src="https://as1.ftcdn.net/v2/jpg/01/77/26/48/1000_F_177264823_kGXpCq5Ln3kSh0Vg35aQvAJGh9bXAI9k.jpg" alt=""/> */}
            {/* <img className="img" src="https://as1.ftcdn.net/v2/jpg/07/10/39/04/1000_F_710390477_7hah8IKLt3FeUp7Q1VYS3wJJdK9aKozP.jpg" alt=""/> */}
            {/* https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg */}
    
            <div className="reg">
              <h1 className="h1">Edit</h1>
              <br></br>
              <form onSubmit={handleSubmit} className="login-form">
        
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
            {/* <input
              className="textfield"
              placeholder="Cabinet Name"
              type="text"
              name="cabinetname"
              value={values.cabinetname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cabinetname && errors.cabinetname}
              autoComplete="cabinetname"
            />
            <br></br>
            <br></br> */}
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