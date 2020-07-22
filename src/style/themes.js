import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#FFF",
  text: "#363537",
  hover: "#d8d7d7",
  toggleBorder: "#FFF",
  background: "#363537",
};
export const darkTheme = {
  body: "#16232c",
  text: "#FAFAFA",
  hover: "#0c1217",
  toggleBorder: "#6B8096",
  background: "#999",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }`;
