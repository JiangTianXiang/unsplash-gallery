import styled from "styled-components";

export const OpacityBackground = styled.div`
  background-color: #9a9a9a;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.8;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const ImageAndUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  border-radius: 4px;
  z-index: 1000;
  background-color: white;

  max-height: 890px;
  max-width: 830px;
  padding-left: 32px;
  padding-right: 37px;
`;

export const ImageAndUserHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 37px;
`;

export const Close = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 31px;
  width: 31px;
  cursor: pointer;

  margin-top: 31px;
`;

export const ImageAndUserFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const LikesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Likes = styled.div`
  font-family: Poppins;
  margin-top: 25px;
  margin-bottom: 34px;
  color: red;
  font-size: 18px;
  font-weight: 500;
`;

export const LikeIcon = styled.img`
  height: 31px;
  width: 31px;
  margin-right: 11px;
  margin-bottom: 32px;
  margin-top: 22px;
  margin-left: 15px;
`;

export const FavoriteButton = styled.img`
  height: 31px;
  width: 31px;

  margin-right: 10px;
  margin-bottom: 32px;
  margin-top: 22px;
`;