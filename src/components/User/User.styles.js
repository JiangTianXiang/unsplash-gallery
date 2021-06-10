import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
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
