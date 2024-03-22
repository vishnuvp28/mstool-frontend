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
        if (data.status === 401) {
          console.log("error");
          setFormState("error");
          alert("Invalid credentials");
        } else {
          setFormState("success");
          alert("LoginSuccessful");
          navigate("/home");
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
              <button onClick={() => navigate("/signup")} className="butn">
                New User? SIGNUP
              </button>
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
