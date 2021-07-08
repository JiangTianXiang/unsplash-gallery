import styled from "styled-components";

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Avatar = styled.img`
  display: block;
  height: auto;
  width: 160px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 35px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

export const BoldText = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const LightText = styled.a`
  color: #7b7b7b;
  opacity: 0.39;
  text-decoration: none;
  font-size: 18px;
`;

export const UserDetail = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  margin-top: 25px;
`;

export const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  flex-basis: 100%;
`;

export const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserCollection = styled.div`
  display: flex;
  justify-content: center;
`;

export const CollectionTitle = styled.div`
  text-align: center;
  word-wrap: break-word;
  max-width: 100px;
`;
