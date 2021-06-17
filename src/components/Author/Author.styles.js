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

export const ImageAndUserHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 37px;
`;

export const UserAndTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 18px;
  margin-top: 34px;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  text-align: start;
`;

export const LastUpdateTime = styled.div`
  font-size: 14px;
  text-align: start;
  opacity: 39%;
`;

export const Avatar = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 27px;
  margin-bottom: 24px;
  width: 57px;
  height: 57px;
  border-radius: 8px;
`;

export const ShowMore = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 5px;
  width: 25px;

  margin-top: 53px;
`;
