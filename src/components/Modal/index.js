import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import favoriteIcon from "utils/resources/Iconly-Broken-Star.svg";
import savedFavoriteIcon from "utils/resources/Iconly-Filled-Star.svg";
import likeIcon from "utils/resources/Iconly-Broken-Heart.svg";
import closeIcon from "utils/resources/Icon-metro-cross.svg";
import ModalImage from "components/Modal/ModalImage";
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

export default function Modal(props) {
  const [data] = useState(props.item);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saved ? removeFavoriteImage(data) : saveFavoriteImage(data);
    setSaved(!saved);
  };

  useEffect(() => {
    if (data) {
      const founded = localStorage.getItem(data.id);
      setSaved(founded ? true : false);
    }
  }, [data]);

  if (!props.open) return null;

  return ReactDOM.createPortal(
    <>
      <OpacityBackground onClick={props.onClose} />
      <ImageAndUserContainer>
        <ImageAndUserHeader>
          <Author
            getUser={data.user}
            timeStamp={getDiffInTime(data.updated_at)}
          />
          <Close image={closeIcon} onClick={props.onClose} />
        </ImageAndUserHeader>
        <ModalImage url={data.urls.regular} placeholder={data.color} />
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
    </>,
    document.getElementById("modal-root")
  );
}
