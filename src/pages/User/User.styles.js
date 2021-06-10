import styled from "styled-components";

export const DisplayArea = styled.div`
  display: flex;
  justify-content: center;
`;

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  margin: 8px;
`;

export const UserInfoContainer = styled.div `
  display: flex;
`;

export const Avatar = styled.img `
  display: block;
  height: auto;
  width: 100%;
  cursor: pointer;
  border-radius: 50%;
`;

export const UserInfo = styled.div `
  display: flex;
  flex-direction: column;
`
export const UserName = styled.div `
  font-size: 12px;
`;

export const UserDetail = styled.div `
  display: flex;
  flex-direction: row;
`;

export const DetailDiv = styled.div `
  font-size: 8px;
` 