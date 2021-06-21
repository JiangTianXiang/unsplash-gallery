import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "pages/Home";
import Explore from "pages/Explore";
import NavBar from "components/Header/NavBar";
import User from "pages/User";
import SearchPhotoResult from "pages/SearchPhotoResult";
import SearchCollectionResult from "pages/SearchCollectionResult";
import FavoriteImage from "pages/FavoriteImage";
import { GlobalStyle, lightTheme, darkTheme, AppContainer } from "App.styles";
import Collection from "pages/Collection";

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
            <Route
              path="/collection/:id&total_photos=:total_photos&user=:user&title=:title"
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
