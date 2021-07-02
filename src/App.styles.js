import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins";
    text-align: center;
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.main}
  }
`;

export const AppContainer = styled.div`
  background-color: ${(props) => props.theme.secondary};
  background-color: white;
  border: 10px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const lightTheme = {
  main: "#000000",
  secondary: " #f9fafb",
};

export const darkTheme = {
  secondary: "#000000",
  main: "#FFFFFF",
};
