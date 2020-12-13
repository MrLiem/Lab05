import React from "react";
import "./Header.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isUser = JSON.parse(localStorage.getItem("userId"));
  const x_auth = document.cookie.split("=")[1];

  const logout = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:5000/users/logout", {
      withCredentials: true,
    });

    if (response.data.success) {
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      document.cookie = "x_auth=;";
      history.push("/loginPage");
    } else {
      alert(response.data.message);
    }
  };
  return (
    <header id="main-head">
      <nav className="navbar navbar-expand-sm nav_custom">
        <a className="navbar-brand" href="#">
          IT SHOP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!x_auth && (
              <>
                <li className="nav-item " id="home-nav">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item " id="seenItem-nav">
                  <Link className="nav-link active" to="/seenItemPage">
                    Seen Items
                  </Link>
                </li>
                <li className="nav-item " id="login-nav">
                  <Link className="nav-link" to="/loginPage">
                    Login
                  </Link>
                </li>
                <li className="nav-item " id="register-nav">
                  <Link className="nav-link" to="/registerPage">
                    Register
                  </Link>
                </li>
              </>
            )}
            {isAdmin && isUser && x_auth && (
              <>
                <li className="nav-item " id="home-nav">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item " id="seenItem-nav">
                  <Link className="nav-link active" to="/seenItemPage">
                    Seen Items
                  </Link>
                </li>
                <li className="nav-item " id="admin-nav">
                  <Link className="nav-link" to="/adminPage">
                    Admin
                  </Link>
                </li>
                <li className="nav-item " id="logout-nav" onClick={logout}>
                  <Link className="nav-link" to="/loginPage">
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!isAdmin && isUser && (
              <>
                <li className="nav-item " id="home-nav">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item " id="seenItem-nav">
                  <Link className="nav-link active" to="/seenItemPage">
                    Seen Items
                  </Link>
                </li>
                <li className="nav-item " id="logout-nav" onClick={logout}>
                  <Link className="nav-link" to="/loginPage">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
