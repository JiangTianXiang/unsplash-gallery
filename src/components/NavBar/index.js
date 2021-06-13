import React from "react";
import { withRouter } from "react-router";
import { NavBarContianer, NavBarInfo } from "./NavBar.styles";
import Search from "components/Search";
import { StyledLink, StyledLinkIcon } from "components/StyledLink";

class NavBar extends React.Component {
  render() {
    return (
      <NavBarContianer>
        <NavBarInfo>
          <StyledLink to="/">
            <StyledLinkIcon
              src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/unsplash_free_picture_photo-512.png"
              alt="unsplash logo"
            />
          </StyledLink>
          <Search />
          <div>
            <StyledLink to="/explore">Explore</StyledLink>
            <button onClick={this.props.handleTheme}>
              {this.props.on ? "Light" : "Dark"}
            </button>
          </div>
        </NavBarInfo>
      </NavBarContianer>
    );
  }
}

export default withRouter(NavBar);
