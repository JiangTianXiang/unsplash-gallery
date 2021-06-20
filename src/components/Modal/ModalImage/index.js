import React, { useState } from "react";
import {
  Container,
  Overlay,
  ImageArea,
  modalImageCSS,
  modalImageContainerCSS,
} from "./ModalImage.styles";

export default function DisplayImage(props) {
  const [opacity, setOpacity] = useState(1);
  return (
    <Container imageContainerCSS={modalImageContainerCSS}>
      <Overlay opacity={opacity} placeholderColor={props.placeholder} />
      <ImageArea
        src={props.url}
        objectFit={"cover"}
        imageCSS={modalImageCSS}
        onLoad={() => setOpacity(0)}
      />
    </Container>
  );
}
