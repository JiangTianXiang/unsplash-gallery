import React, { useEffect, useState } from "react";
import favoriteIcon from "utils/resources/Iconly-Broken-Star.svg";
import savedFavoriteIcon from "utils/resources/Iconly-Filled-Star.svg";
import likeIcon from "utils/resources/Iconly-Broken-Heart.svg";
import closeIcon from "utils/resources/Icon-metro-cross.svg";
import DisplayImage from "components/DisplayImage";
import Author from "components/Author";
import { Download } from "./Download";
import { saveFavoriteImage, removeFavoriteImage } from "utils/index";
import {
  ImageAndUserContainer,
  Likes,
  ImageAndUserFooter,
  FavoriteButton,
  LikesContainer,
  LikeIcon,
  OpacityBackground,
  ImageAndUserHeader,
  Close,
} from "./Modal.styles";
import { getDiffInTime } from "utils/index";

const Modal = (props) => {
  const [data] = useState(props.item);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saved ? removeFavoriteImage(data) : saveFavoriteImage(data);
    setSaved(!saved);
  };

  useEffect(() => {
    const founded = localStorage.getItem(data.id);
    setSaved(founded ? true : false);
  }, [data]);

  return (
    <>
      <OpacityBackground onClick={() => props.close()} />
      <ImageAndUserContainer>
        <ImageAndUserHeader>
          <Author
            getUser={data.user}
            timeStamp={getDiffInTime(data.updated_at)}
          />
          <Close image={closeIcon} onClick={() => props.close()} />
        </ImageAndUserHeader>
        <DisplayImage url={data.urls.regular} placeholder={data.color} modal />
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
        <Download url={data.urls.regular} />
      </ImageAndUserContainer>
    </>
  );
};

export default Modal;
