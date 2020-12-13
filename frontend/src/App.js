import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "./screens/MainPage/MainPage";
import AdminPage from "./screens/AdminPage/AdminPage";
import AddItemPage from "./screens/AddItemPage/AddItemPage";
import DetailItemPage from "./screens/DetailItemPage/DetailItemPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import SeenItemsPage from "./screens/SeenItemsPage/SeenItemsPage";
import UpdateItemPage from "./screens/UpdateItemPage/UpdateItemPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/seenItemPage" component={SeenItemsPage} />
        <Route path="/loginPage" component={LoginPage} />
        <Route path="/registerPage" component={RegisterPage} />
        <Route path="/detailItemPage/:id" component={DetailItemPage} />
        <Route path="/adminPage" component={AdminPage} />
        <Route path="/addItemPage" component={AddItemPage} />
        <Route path="/updateItemPage" component={UpdateItemPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
