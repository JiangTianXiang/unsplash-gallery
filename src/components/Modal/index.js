import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  favoriteIcon,
  savedFavoriteIcon,
  likeIcon,
  closeIcon,
} from "utils/resources";
import { Author, Download, ModalImage } from "components";
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
      const found = localStorage.getItem(data.id);
      setSaved(found ? true : false);
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
