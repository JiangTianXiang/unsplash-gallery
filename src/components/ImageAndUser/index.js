import React, { useEffect, useState } from "react";
import favoriteIcon from "utils/resources/Iconly-Broken-Star.svg";
import savedFavoriteIcon from "utils/resources/Iconly-Filled-Star.svg";
import likeIcon from "utils/resources/Iconly-Broken-Heart.svg";
import DisplayImage from "components/DisplayImage";
import Author from "components/Author";
import { saveFavoriteImage, removeFavoriteImage } from "utils/index";
import {
  ImageAndUserContainer,
  Likes,
  ImageAndUserFooter,
  FavoriteButton,
  PostBio,
  LikesContainer,
  LikeIcon,
} from "./ImageAndUser.styles";
import { getDiffInTime } from "utils/index";

const ImageAndUser = (props) => {
  const [data] = useState(props.item);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saved ? removeFavoriteImage(data) : saveFavoriteImage(data);
    setSaved(!saved);
  };

  useEffect(() => {
    if (localStorage.getItem("favoriteImages")) {
      const favoriteImages = JSON.parse(localStorage.getItem("favoriteImages"));
      const founded = favoriteImages.find(
        (favoriteImage) => favoriteImage.id === data.id
      );
      setSaved(founded ? true : false);
    }
  }, [data]);

  return (
    <ImageAndUserContainer>
      <Author getUser={data.user} timeStamp={getDiffInTime(data.updated_at)} />
      {data.description && <PostBio>{data.description}</PostBio>}
      <DisplayImage
        url={data.urls.regular}
        placeholder={data.color}
        portrait={data.width < data.height}
      />
      <ImageAndUserFooter>
        <LikesContainer>
          <LikeIcon src={likeIcon} />
          <Likes>{`${data.likes}`} </Likes>
        </LikesContainer>
        <FavoriteButton
          src={saved ? savedFavoriteIcon : favoriteIcon}
          onClick={handleSave}
        />
      </ImageAndUserFooter>
    </ImageAndUserContainer>
  );
};

export default ImageAndUser;
