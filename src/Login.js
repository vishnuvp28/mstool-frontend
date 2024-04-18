import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";

const formValidationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { username: "", password: "" },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = await fetch("http://localhost:8080/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (data.status === "failed login") {
          console.log("error");
          setFormState("error");
          alert("Invalid credentials");
        } else {
          setFormState("success");
          alert("LoginSuccessful");
          navigate("/home");
          console.log("success");
        }
      },
    });

  return (
    <div className="register">
      <br></br>

      <div className="regi">
        <div className="reg">
          <h1 className="h1">LOGIN</h1>
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
            />
            <br></br>
            <br></br>
            <input
              className="textfield"
              placeholder="PASSWORD"
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && errors.password}
              autocomplete="current-password"
            />{" "}
            <br></br>
            <br></br>
            <>
              <button type="submit" className="butn">
                LOGIN
              </button>
              <br></br>
            </>
          </form>
        </div>
      </div>
      <span>
        {/* <link href="http://localhost:3000/login">Already an user ? Login</link> */}
      </span>
    </div>
  );
}

export default Login;
