import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { NavBarContianer } from "./NavBar.styles";
import Search from "components/Search";

class NavBar extends React.Component {
  render() {
    return (
      <NavBarContianer>
        <Link to="/">Home</Link>
        <Search />
        <Link to="/explore">Explore</Link>
      </NavBarContianer>
    );
  }
}

export default withRouter(NavBar);
