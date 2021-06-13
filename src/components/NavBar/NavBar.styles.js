import styled from "styled-components";

export const NavBarContianer = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  padding: 32px;
  background-color: ${(props) => props.theme.secondary};
`;

export const NavBarInfo = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ThemeSwitch = styled.button`
  background-color: ${(props) => props.theme.secondary};
  border: none;
`;
