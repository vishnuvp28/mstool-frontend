import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";

const formValidationSchema = yup.object({
  field1: yup.string().required(),
  employeename: yup.string().required(),
  field3: yup.string().required(),

});

function Adduser() {
  const navigate = useNavigate();
  const [form, setForm] = useState("success");

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {  field1:"", employeename: "",field3:"" },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch("http://localhost:8080/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (data.status==="failed login") {
          console.log("error");
          setForm("error");
          alert("Invalid credentials");
        } else {
          setForm("success");
          alert("User Added successfully");
          navigate("/employee");
          console.log("success")
        }
      },
    });

  return (
    <div className="addi">
      <div className="maindiv-addi">
        <div className="subdiv-addi">
      <h1>Add User</h1>
<br></br>
<br></br>

        <form onSubmit={handleSubmit} className="login-form">

            <input
              className="textfield"
              placeholder="EmployeeId"
              type="number"
              name="field1"
              value={values.field1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.field1 && errors.field1}
              autoComplete="field1"
            />
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
              type="text"
              name="field3"
              value={values.field3}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.field3 && errors.field3}
              autoComplete="field3"
            />
            <br></br>
            <br></br>
            <>
              <button type="submit" className="addbtn" >
                Add
              </button>
              <br></br>
              <button  className="addbtn" onClick={()=>navigate("/employee")}>
                Back
              </button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adduser;
