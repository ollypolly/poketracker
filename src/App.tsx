import React from "react";
import "./App.css";
import "./style/index.scss";
import CardList from "./pages/CardList/CardList";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./style/themes";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./app/checkboxSlice";
import DeckBuilder from "./pages/DeckBuilder/DeckBuilder";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

function App() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <BrowserRouter>
          <Route exact path="/" component={CardList} />
          <Route exact path="/deckbuilder" component={DeckBuilder} />
          <Redirect to="/" />
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
