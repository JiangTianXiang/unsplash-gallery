import React, { useState } from "react";
import Modal from "components/Modal";
import {
  Container,
  Overlay,
  DisplayImage,
  defaultImageContainerCSS,
  defaultImageCSS,
  MoreInfoDiv,
  LikeInfoDiv,
  restrictedImageContainerCss,
  restrictedImageCss,
} from "./ExploreImage.styles";

export default function ExploreImage(props) {
  const [opacity, setOpacity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

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
      <Container
        width={props.item.width}
        height={props.item.height}
        imageContainerCSS={
          props.restrict
            ? restrictedImageContainerCss
            : defaultImageContainerCSS
        }
        onClick={showModal}
      >
        <Overlay opacity={opacity} placeholderColor={props.item.color} />
        <MoreInfoDiv>
          <LikeInfoDiv>{props.item.likes} Likes</LikeInfoDiv>
        </MoreInfoDiv>
        <DisplayImage
          src={props.item.urls.small}
          objectFit={"cover"}
          imageCSS={props.restrict ? restrictedImageCss : defaultImageCSS}
          onLoad={() => setOpacity(0)}
          alt="placeholder"
        />
      </Container>
    </>
  );
}
