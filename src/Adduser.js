import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";

const formValidationSchema = yup.object({
  id: yup.string().required(),
  employeename: yup.string().required(),
  cabinetname: yup.string().required(),

});

function Adduser() {
  const navigate = useNavigate();
  const [form, setForm] = useState("success");

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {  id:"", employeename: "",cabinetname:"" },
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
              placeholder="Id"
              type="number"
              name="id"
              value={values.id}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.id && errors.id}
              autoComplete="id"
            />
            <br></br>
            <br></br>
            <input
              className="textfield"
              placeholder="EmployeeId"
              type="number"
              name="employeeid"
              value={values.employeeid}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.employeeid && errors.employeeid}
              autoComplete="employeeid"
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
              name="cabinetname"
              value={values.cabinetname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cabinetname && errors.cabinetname}
              autoComplete="cabinetname"
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
