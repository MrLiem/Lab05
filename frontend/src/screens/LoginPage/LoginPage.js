import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./LoginPage.css";
import axios from "axios";
import { validateEmail } from "../../utils/validateEmail";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("admin1@gmail.com");
  const [password, setPassword] = useState("admin1");
  let history = useHistory();

  const onChangeEmail = async (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = async (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return alert("Please type all the field!!!");
    }

    if (!validateEmail(email)) {
      return alert("You have entered an invalid email address!");
    }

    const response = await axios.post(
      "/users/login",
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

    if (response.data.loginSuccess) {
      alert("Login successfull!");
      // Save cookie
      const x_auth = response.data.x_auth;
      document.cookie = `x_auth=${x_auth}`;

      // Save user info
      const userId = response.data.userId;
      const isAdmin = response.data.isAdmin;
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

      // Move to Main Page
      history.push("/");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <React.Fragment>
      <Header />
      <h2>Login Page</h2>
      <form className="loginForm" onSubmit={onSubmitLogin}>
        <div className="form-group" style={{ display: "block" }}>
          <label htmlFor="loginEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            value={email}
            onChange={onChangeEmail}
          />
          <small id="emailHelp" className="form-text text-muted">
            By default we have 2 admin accounts <br />
            admin1@gmail.com (pass: admin1) and admin2@gmail.com(pass: admin2)
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

export default LoginPage;
