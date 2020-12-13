import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./RegisterPage.css";
import { useHistory } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onChangeEmail = async (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = async (event) => {
    setPassword(event.target.value);
  };

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return alert("Please type all the field!!!");
    }

    if (!validateEmail(email)) {
      return alert("You have entered an invalid email address!");
    }

    const response = await axios.post(
      "/users/register",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.data.success) {
      alert("Register successful!!!");
      history.push("/loginPage");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Header />
      <h2>Register Page</h2>
      <form className="loginForm" onSubmit={onSubmitRegister}>
        <div className="form-group" style={{ display: "block" }}>
          <label htmlFor="loginEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            aria-describedby="emailHelp"
            value={email}
            onChange={onChangeEmail}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group" style={{ display: "block" }}>
          <label htmlFor="loginPass">Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPass"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button type="submit" id="loginButton" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default RegisterPage;
