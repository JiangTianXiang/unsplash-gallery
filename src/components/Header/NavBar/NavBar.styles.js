import styled from "styled-components";

export const NavBarContianer = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  background-color: #fcfcfd;
  /* background-color: ${(props) => props.theme.secondary}; */
  padding-top: 22px;
`;

export const NavBarInfo = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 900px;
`;

