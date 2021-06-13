import React, { useState } from "react";
import { Container, Overlay, DisplayImage, defaultImageContainerCSS, defaultImageCSS } from "./DisplayImage.styles";
export default function Image(props) {
  const [opacity, setOpacity] = useState(1);
  return (
    <>
    <Container imageContainerCSS={defaultImageContainerCSS}>
      <Overlay opacity={opacity} placeholderColor={props.placeholder} />
      <DisplayImage
        src={props.url}
        objectFit={"cover"}
        imageCSS={defaultImageCSS}
        onLoad={() => setOpacity(0)}
        alt="placeholder"
      />
    </Container>
    </>
  );
}
