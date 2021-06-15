import React from "react";
import { withRouter } from "react-router";
import { NavBarContianer, NavBarInfo } from "./NavBar.styles";
import Search from "components/Header/Search";
import { IconButton } from "components/StyledLink";
import exploreIcon from "utils/resources/Iconly-Bulk-Camera.png";
import savedIcon from "utils/resources/Iconly-Bulk-Heart.png";
import themeIcon from "utils/resources/Iconly-Bulk-Scan.png";

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
