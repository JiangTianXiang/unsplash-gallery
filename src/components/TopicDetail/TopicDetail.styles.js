import styled from "styled-components";

export const TopicDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 70px;
`;

export const PhotoResultDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: space-between;
  align-items: space-between;
  height: 183px;
  padding-left: 40px;
`;

export const CoverPhoto = styled.img`
  width: 183px;
  height: 183px;
  border-radius: 8px;
`;

export const TopicDescription = styled.div`
  max-width: 545px;
  word-wrap: break-word;
  font-size: 15px;
`;

export const TopicTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

export const TopicStats = styled.div`
  color: #7b7b7b;
  opacity: 0.39;
`;

export const Follow = styled.div`
  width: 139px;
  height: 49px;
  background-color: #1877f2;
  border-radius: 9px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;
