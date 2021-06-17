import styled from "styled-components";

export const DisplayArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`;

export const ImageArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-left: 14px;
  padding-right: 14px;
  width: 928px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Avatar = styled.img`
  display: block;
  height: auto;
  width: 160px;
  cursor: pointer;
  border-radius: 50%;
  margin: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.div`
  font-size: 40px;
`;

export const UserDetail = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DetailDiv = styled.div`
  font-size: 32px;
  margin-right: 20px;
`;
