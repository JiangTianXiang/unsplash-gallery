import React, { useState } from "react";
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

  let imageCSS = defaultImageCSS;
  let containerCSS = defaultImageContainerCSS;
  if (props.modal) {
    imageCSS = modalImageCSS;
    containerCSS = modalImageContainerCSS;
  } else if (props.portrait) {
    imageCSS = portraitImageCSS;
  }

  return (
    <Container
      imageContainerCSS={containerCSS}
      onClick={(e) => !props.modal && props.handleModal(props.item, e)}
    >
      <Overlay opacity={opacity} placeholderColor={props.placeholder} />
      <ImageArea
        src={props.url}
        objectFit={"cover"}
        imageCSS={imageCSS}
        onLoad={() => setOpacity(0)}
      />
    </Container>
  );
}
