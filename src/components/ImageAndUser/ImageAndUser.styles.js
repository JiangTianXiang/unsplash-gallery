import styled from "styled-components";

export const ImageAndUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  border-radius: 4px;

  background-color: white;
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

export const ShowMore = styled.img`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 5px;
  width: 25px;

  margin-top: 53px;
`;

export const ImageAndUserFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const PostBio = styled.div`
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  text-align: left;
  margin-bottom: 16px;
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
