import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
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
          navigate("/");
        } else {
          alert("User added successfully");
          navigate("/");
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
          <h1 className="h1">SIGN UP</h1>
          <form onSubmit={handleSubmit} className="login-form">
            {/* <div className="login-form-container"> */}
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
            />
            <br></br>
            <br></br>

            <button className="butn" type="submit">
              Sign up
            </button>
            <br></br>
            <button className="butn" onClick={() => navigate("/")}>
              Already have an account? LOGIN
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
