import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.main};
  text-decoration: none;
  background-color: ${(props) => props.theme.secondary};
`;

export const StyledLinkIcon = styled.img `
  width: 50px;
  height: 50px;
`;