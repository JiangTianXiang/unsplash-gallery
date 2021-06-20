import React, { useState } from "react";
import Modal from "components/Modal";
import {
  Container,
  Overlay,
  ImageArea,
  defaultImageContainerCSS,
  defaultImageCSS,
  portraitImageCSS,
  modalImageCSS,
  modalImageContainerCSS,
} from "./DisplayImage.styles";

export default function DisplayImage(props) {
  const [opacity, setOpacity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  let imageCSS = defaultImageCSS;
  let containerCSS = defaultImageContainerCSS;
  if (props.modal) {
    imageCSS = modalImageCSS;
    containerCSS = modalImageContainerCSS;
  } else if (props.portrait) {
    imageCSS = portraitImageCSS;
  }

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
      <Container imageContainerCSS={containerCSS} onClick={showModal}>
        <Overlay opacity={opacity} placeholderColor={props.placeholder} />
        <ImageArea
          src={props.url}
          objectFit={"cover"}
          imageCSS={imageCSS}
          onLoad={() => setOpacity(0)}
        />
      </Container>
    </>
  );
}
