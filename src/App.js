import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Home from "pages/Home";
import Explore from "pages/Explore";
import NavBar from "components/NavBar";
import User from "pages/User";
import SearchPhotoResult from "pages/SearchPhotoResult";
import SearchCollectionResult from "pages/SearchCollectionResult";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins";
    text-align: center;
  }
`;

const theme = {
  main: "#000000",
  secondary: "#FFFFFF",
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <NavBar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/user/:name" component={User}></Route>
          <Route
            path="/search/photos/:input"
            component={SearchPhotoResult}
          ></Route>
          <Route
            path="/search/collections/:input"
            component={SearchCollectionResult}
          ></Route>
          <Route path="/explore" component={Explore}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
