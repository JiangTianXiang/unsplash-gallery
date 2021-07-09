import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { NavBar } from "components";
import { GlobalStyle, lightTheme, darkTheme, AppContainer } from "App.styles";
import {
  Home,
  Explore,
  SearchPhotoResult,
  SearchCollectionResult,
  Topic,
  User,
  FavoriteImage,
  Collection,
} from "pages";

export default function App() {
  const [theme, setTheme] = useState(true);

  return (
    <AppContainer>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router>
          <NavBar handleTheme={setTheme} on={theme} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:name" component={User} />
            <Route
              path="/search/photos/:searchTerm"
              component={SearchPhotoResult}
            />
            <Route
              path="/search/collections/:searchTerm"
              component={SearchCollectionResult}
            />
            <Route path="/topic/:searchTerm" component={Topic} />
            <Route
              path="/collection/:id"
              component={Collection}
            />
            <Route path="/explore" component={Explore} />
            <Route path="/favorite" component={FavoriteImage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AppContainer>
  );
}
