import React from "react";
import { withRouter } from "react-router";
import { NavBarContianer, NavBarInfo, ThemeSwitch } from "./NavBar.styles";
import Search from "components/Search";
import { StyledLink, StyledLinkIcon } from "components/StyledLink";
import logo from "utils/resources/moon.PNG";

const HOME_ICON_URL =
  "https://icon-library.com/images/homepage-icon/homepage-icon-17.jpg";
const EXPLORE_ICON_URL = "https://www.materialui.co/materialIcons/action/explore_grey_192x192.png";
const SUN_THEME_ICON_URL = "data:image/png;base64,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"
const MOON_THEME_ICON_URL = logo;
class NavBar extends React.Component {
  render() {
    return (
      <NavBarContianer>
        <NavBarInfo>
          <StyledLink to="/">
            <StyledLinkIcon
              src={HOME_ICON_URL}
              alt="Home icon"
              width="50px"
              height="50px"
            />
          </StyledLink>
          <Search />
          <div>
            <StyledLink to="/explore">
              <StyledLinkIcon
                src={EXPLORE_ICON_URL}
                alt="Explore"
                width="50px"
                height="50px"
              />
            </StyledLink>
            <ThemeSwitch onClick={this.props.handleTheme}>
              <StyledLinkIcon
                src={
                  this.props.on
                    ? SUN_THEME_ICON_URL
                    : MOON_THEME_ICON_URL
                }
                width="50px"
                height="50px"
                alt="Toggle Theme"
              />
            </ThemeSwitch>
          </div>
        </NavBarInfo>
      </NavBarContianer>
    );
  }
}

export default withRouter(NavBar);
