import React from "react";
import { withRouter } from "react-router";
import exploreIcon from "utils/resources/Iconly-Bulk-Camera.svg";
import savedIcon from "utils/resources/Iconly-Bulk-Heart.svg";
import themeIcon from "utils/resources/Scan.svg";
import { NavBarContianer, NavBarInfo } from "./NavBar.styles";
import Search from "components/Header/Search";
import IconButton from "components/Header/IconButton";

class NavBar extends React.Component {
  state = {
    selectedIcon: null,
  };

  handleSelected = (description) => {
    this.setState({ selectedIcon: description });
  };

  render() {
    return (
      <NavBarContianer>
        <NavBarInfo>
          <Search />
          <IconButton
            icon={exploreIcon}
            to="/explore"
            description="Photos"
            handleSelected={this.handleSelected}
            selected={this.state.selectedIcon === "Photos"}
          />
          <IconButton
            icon={savedIcon}
            to="/favorite"
            description="Saved"
            handleSelected={this.handleSelected}
            selected={this.state.selectedIcon === "Saved"}
          />
          <IconButton
            icon={themeIcon}
            description="Theme"
            handleSelected={this.handleSelected}
            selected={this.state.selectedIcon === "Theme"}
          />
        </NavBarInfo>
      </NavBarContianer>
    );
  }
}

export default withRouter(NavBar);
