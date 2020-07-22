import React from "react";
import "./App.css";
import "./style/index.scss";
import CardList from "./pages/CardList/CardList";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./style/themes";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./app/checkboxSlice";

function App() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <CardList />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
