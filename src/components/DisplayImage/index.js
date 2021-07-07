import React, { useState } from "react";
import Modal from "components/Modal";
import { imageExistInLocalStorage } from "utils/index";
import {
  Container,
  Overlay,
  ImageArea,
  defaultImageContainerCSS,
  defaultImageCSS,
  portraitImageCSS,
} from "./DisplayImage.styles";

export default function DisplayImage(props) {
  const [opacity, setOpacity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    document.body.style.overflow = "hidden";
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "unset";
    const found = imageExistInLocalStorage(props.item.id);
    if (found != props.saved) {
      props.onSaveChanged(found);
    }
    setModalOpen(false);
  };

  return (
    <>
      <Modal item={props.item} open={modalOpen} onClose={closeModal} />
      <Container
        imageContainerCSS={defaultImageContainerCSS}
        onClick={showModal}
      >
        <Overlay opacity={opacity} placeholderColor={props.placeholder} />
        <ImageArea
          src={props.url}
          objectFit={"cover"}
          imageCSS={props.portrait ? portraitImageCSS : defaultImageCSS}
          onLoad={() => setOpacity(0)}
        />
      </Container>
    </>
  );
}
