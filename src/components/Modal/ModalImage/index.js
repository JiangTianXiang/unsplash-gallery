import React, { useState } from "react";
import { Container, Overlay, ImageArea } from "./ModalImage.styles";

export default function DisplayImage(props) {
  const [opacity, setOpacity] = useState(1);
  return (
    <Container>
      <Overlay opacity={opacity} placeholderColor={props.placeholder} />
      <ImageArea
        src={props.url}
        objectFit={"cover"}
        onLoad={() => setOpacity(0)}
      />
    </Container>
  );
}
