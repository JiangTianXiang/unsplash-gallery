import React, { useEffect, useState } from "react";
import favoriteIcon from "utils/resources/Iconly-Broken-Star.svg";
import savedFavoriteIcon from "utils/resources/Iconly-Filled-Star.svg";
import likeIcon from "utils/resources/Iconly-Broken-Heart.svg";
import showMoreIcon from "utils/resources/Icon-show-detail.svg";
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
  ImageAndUserHeader,
  ShowMore,
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
    const found = localStorage.getItem(data.id);
    setSaved(!!found);
  }, [data]);

  return (
    <ImageAndUserContainer>
      <ImageAndUserHeader>
        <Author
          getUser={data.user}
          timeStamp={getDiffInTime(data.updated_at)}
        />
        <ShowMore image={showMoreIcon} />
      </ImageAndUserHeader>
      {data.description && <PostBio>{data.description}</PostBio>}
      <DisplayImage
        url={data.urls.regular}
        placeholder={data.color}
        portrait={data.width < data.height}
        item={data}
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
