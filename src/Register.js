import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

function Register() {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (newUser) => {
        console.log("Form values", newUser);

        const data = await fetch("http://localhost:8080/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (data.status === 400) {
          alert("Username already exist(Redirecting to login page)");
          navigate("/home");
        } else {
          alert("User added successfully");
          navigate("/home");
        }
      },
    });
  return (
    <div className="register">
      <br></br>

      <div className="regi">

        <div className="reg">
          <h1 className="h1">SIGN UP</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="textfield"
              placeholder="USERNAME"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && errors.username}
              autoComplete="username"
              style={{color:"white", backdropFilter:"blur(20px)"}}
            />
            <br></br>
            <br></br>
            <input
              className="textfield"
              placeholder="EMAIL"
              type="email"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              autoComplete="email" 
              style={{color:"white", backdropFilter:"blur(20px)"}}
            />
            <br></br>
            <br></br>

            <input
              className="textfield"
              placeholder="PASSWORD"
              type="password"
              name="password"
              value={values.password || ""}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              style={{color:"white", backdropFilter:"blur(20px)"}}
            />
            <br></br>
            <br></br>
  
            <button className="butn" type="submit"  style={{color:"white", backdropFilter:"blur(20px)"}}
>
              Sign up
            
            </button>
            <br></br>
            <button className="butn" type="button"  onClick={() => navigate("/home")} style={{color:"white", backdropFilter:"blur(20px)"}}
>
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;