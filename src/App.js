import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "pages/Home";
import Explore from "pages/Explore";
import NavBar from "components/Header/NavBar";
import User from "pages/User";
import SearchPhotoResult from "pages/SearchPhotoResult";
import SearchCollectionResult from "pages/SearchCollectionResult";
import { GlobalStyle, lightTheme, darkTheme, AppContainer } from "App.styles";

export default class App extends React.Component {
  state = {
    on: true,
  };

  handleTheme = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <AppContainer>
        <ThemeProvider theme={this.state.on ? lightTheme : darkTheme}>
          <GlobalStyle />
          <Router>
            <NavBar handleTheme={this.handleTheme} on={this.state.on} />
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
      </AppContainer>
    );
  }
}
