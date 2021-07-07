import React, { useEffect, useState } from "react";
import Modal from "components/Modal";
import {
  favoriteIcon,
  savedFavoriteIcon,
  likeIcon,
  showMoreIcon,
} from "utils/resources";
import { Author, DisplayImage } from "components";
import {
  saveFavoriteImage,
  removeFavoriteImage,
  imageExistInLocalStorage,
} from "utils/index";
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
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = () => {
    saved ? removeFavoriteImage(data.id) : saveFavoriteImage(data);
    setSaved(!saved);
  };

  useEffect(() => {
    const found = imageExistInLocalStorage(data.id);
    setSaved(!!found);
  }, [data]);

  const showModal = () => {
    document.body.style.overflow = "hidden";
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "unset";
    setModalOpen(false);
  };

  return (
    <>
      <Modal item={props.item} open={modalOpen} onClose={closeModal} />
      <ImageAndUserContainer>
        <ImageAndUserHeader>
          <Author
            getUser={data.user}
            timeStamp={getDiffInTime(data.updated_at)}
          />
          <ShowMore src={showMoreIcon} onClick={showModal} />
        </ImageAndUserHeader>
        {data.description && <PostBio>{data.description}</PostBio>}
        <DisplayImage
          onSaveChanged={setSaved}
          saved={saved}
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
    </>
  );
};

export default ImageAndUser;
