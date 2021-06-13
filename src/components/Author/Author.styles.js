import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  background-color: ${(props) => props.theme.secondary};
`;

export const UserName = styled.div`
  font-family: Poppins;
  align-self: center;
`;

export const Avatar = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  margin: 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
