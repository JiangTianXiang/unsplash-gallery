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
import Modal from "components/Modal";

export default function App() {
  const [theme, setTheme] = useState(true);
  const [modalItem, setModalItem] = useState(null);

  const handleModal = (item) => {
    console.log("APP.JS handle modal");
    document.body.style.overflow = "hidden";
    setModalItem(item);
  };

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalItem(null);
  }

  return (
    <AppContainer>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router>
          {modalItem !== null && <Modal item={modalItem} close={closeModal}/>}
          <NavBar handleTheme={setTheme} on={theme} />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <Home {...props} handleModal={handleModal} />
              )}
            ></Route>
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
            <Route path="/favorite" component={FavoriteImage}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </AppContainer>
  );
}
