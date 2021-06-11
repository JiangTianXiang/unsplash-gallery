import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { NavBarContianer } from "./NavBar.styles";
import Search from "components/Search";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins";
    text-align: center;
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.main}
  }
`;

const lightTheme = {
  main: "#000000",
  secondary: "#FFFFFF",
};

const darkTheme = {
  secondary: "#000000",
  main: "#FFFFFF",
};

class NavBar extends React.Component {
  state = {
    on: true,
  };

  handleClick = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.on ? lightTheme : darkTheme}>
        <GlobalStyle />
        <NavBarContianer>
          <Link to="/">Home</Link>
          <Search />
          <Link to="/explore">Explore</Link>
          <button onClick={this.handleClick}>{this.state.on ? "Light" : "Dark"}</button>
        </NavBarContianer>
      </ThemeProvider>
    );
  }
}

export default withRouter(NavBar);
