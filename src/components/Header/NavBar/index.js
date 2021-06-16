import React from "react";
import { withRouter } from "react-router";
import exploreIcon from "utils/resources/Iconly-Bulk-Camera.svg";
import savedIcon from "utils/resources/Iconly-Bulk-Heart.svg";
import themeIcon from "utils/resources/Scan.svg";
import { NavBarContianer, NavBarInfo } from "./NavBar.styles";
import Search from "components/Header/Search";
import { IconButton } from "components/StyledLink";

class NavBar extends React.Component {
  render() {
    return (
      <NavBarContianer>
        <NavBarInfo>
          <Search />
          <IconButton icon={exploreIcon} to="/explore" description="Photos" />
          <IconButton icon={savedIcon} description="Saved" />
          <IconButton icon={themeIcon} description="Theme" />
        </NavBarInfo>
      </NavBarContianer>
    );
  }
}

export default withRouter(NavBar);
