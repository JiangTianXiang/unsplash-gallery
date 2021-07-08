import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { exploreIcon, savedIcon, themeIcon } from "utils/resources";
import { NavBarContainer, NavBarInfo } from "./NavBar.styles";
import { Search, IconButton } from "components";

const EXPLORE_PAGE = "/explore";
const SAVED_PAGE = "/favorite";
const HOME_PAGE = "/";
function NavBar(props) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    switch (props.location.pathname) {
      case EXPLORE_PAGE:
        setSelectedIcon("Photos");
        break;
      case SAVED_PAGE:
        setSelectedIcon("Saved");
        break;
      case HOME_PAGE:
        setSelectedIcon("Theme");
        break;
      default:
        setSelectedIcon(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);

  return (
    <NavBarContainer>
      <NavBarInfo>
        <Search />
        <IconButton
          icon={exploreIcon}
          to="/explore"
          description="Photos"
          selected={selectedIcon === "Photos"}
        />
        <IconButton
          icon={savedIcon}
          to="/favorite"
          description="Saved"
          selected={selectedIcon === "Saved"}
        />
        <IconButton
          icon={themeIcon}
          description="Theme"
          selected={selectedIcon === "Theme"}
        />
      </NavBarInfo>
    </NavBarContainer>
  );
}

export default withRouter(NavBar);
