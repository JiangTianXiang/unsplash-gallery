import React, { useState } from "react";
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
  return (
    <Container
      imageContainerCSS={defaultImageContainerCSS}
      onClick={() => !props.modal && props.handleModal(props.item)}
    >
      <Overlay opacity={opacity} placeholderColor={props.placeholder} />
      <ImageArea
        src={props.url}
        objectFit={"cover"}
        imageCSS={props.portrait ? portraitImageCSS : defaultImageCSS}
        onLoad={() => setOpacity(0)}
      />
    </Container>
  );
}
