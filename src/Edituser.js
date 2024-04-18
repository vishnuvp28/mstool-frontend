import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";

const EditUser = () => {
  const [ustate, usetState] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/employee")
      .then((res) => res.json())
      .then((result) => usetState(result.responseDto))
      .catch((err)=> console.log(err))
  }, []);
 
  return (
    <div>{ustate ? <GetEditUser data={ustate} /> : <h2>Loading...</h2>}</div>
  );
};

function GetEditUser({ emp, setEmp ,data}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState("success");


  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        employeeid: "",
        employeename: "",
        cabinetname: "",
      },
      onSubmit: async (values) => {
        try {
          const response = await fetch(`http://localhost:8080/edit/${id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          },[]);
          console.log(emp);
          if (!response.ok) {
            throw new Error("Failed to edit user.");
          }

          const updatedEmp = emp.map((user) =>
            user.id === id ? { ...user, ...values } : user
          );
          setEmp(updatedEmp);
          setState("success");
          alert("User Edited successfully");
          navigate("/employee");
        } catch (error) {
          console.error("Error editing user:", error);
          setState("error");
          alert("Failed to edit user");
        }
      },
    });

  return (
    <div className="register">
      <br />
      <div className="regi">
        <div className="reg">
          <h1 className="h1">Edit</h1>
          <br />
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="textfield"
              placeholder="Employee ID"
              type="text"
              name="employeeid"
              value={values.employeeid}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.employeeid && errors.employeeid && (
              <div>{errors.employeeid}</div>
            )}
            <br />
            <input
              className="textfield"
              placeholder="Employee Name"
              type="text"
              name="employeename"
              value={values.employeename}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.employeename && errors.employeename && (
              <div>{errors.employeename}</div>
            )}
            <br />
            <input
              className="textfield"
              placeholder="Cabinet Name"
              type="text"
              name="cabinetname"
              value={values.cabinetname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.cabinetname && errors.cabinetname && (
              <div>{errors.cabinetname}</div>
            )}
            <br />
            <button type="submit" className="addbtn">
              Edit
            </button>
            <br />
            <button className="addbtn" onClick={() => navigate("/employee")}>
              Back
            </button>
          </form>
        </div>
      </div>
      <span></span>
    </div>
  );
}

export default EditUser;
