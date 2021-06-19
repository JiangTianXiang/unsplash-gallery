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
  LikesContainer,
  LikeIcon,
  OpacityBackground,
} from "./Modal.styles.js";
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

  const { setModalVisible, modalVisible } = props;

  return (
    <>
      <OpacityBackground
        open={modalVisible}
        animationDuration={1000}
        focusTrapped={true}
        closeIconSize={40}
        showCloseIcon={true}
        onClick={() => props.close()}
      />
      <ImageAndUserContainer>
        <Author
          getUser={data.user}
          timeStamp={getDiffInTime(data.updated_at)}
        />
        <DisplayImage
          url={data.urls.regular}
          placeholder={data.color}
          portrait={data.width < data.height}
          modal
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
    </>
  );
};

export default Modal;
