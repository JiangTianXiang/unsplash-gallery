import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import DataCenter from "./components/DataCenter";
import ApiCall from "components/ApiCall";


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <ApiCall passData={(state) => <DataCenter {...state} />} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
