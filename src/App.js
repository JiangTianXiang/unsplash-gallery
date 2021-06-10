import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DataCenter from "./components/DataCenter";
import ApiCall from "components/ApiCall";
import NavBar from "components/NavBar";

export default function App() {
  return (
    <Router>
      <NavBar />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route
          path="/"
          component={(props) => (
            <ApiCall {...props} passData={(state) => <DataCenter {...state} />} />
          )}
        ></Route>
        <Route
          path="/page/:name"
          component={(props) => (
            <ApiCall {...props} passData={(state) => <DataCenter {...state} />} />
          )}
        ></Route>
      </Switch>
    </Router>
  );
}
