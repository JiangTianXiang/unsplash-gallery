import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Explore from "pages/Explore";
import NavBar from "components/NavBar";
import User from "pages/User";

export default function App() {
  return (
    <Router>
      <NavBar />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/explore" component={Explore}></Route>
        <Route path="/user/:name" component={User}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}
