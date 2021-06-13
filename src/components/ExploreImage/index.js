import React, { useState } from "react";
import { Container, Overlay, DisplayImage, defaultImageContainerCSS, defaultImageCSS } from "./ExploreImage.styles";
export default function Image(props) {
  const [opacity, setOpacity] = useState(1);
  return (
    <>
    <Container imageContainerCSS={defaultImageContainerCSS}>
      <Overlay opacity={opacity} placeholderColor={props.item.color} />
      <DisplayImage
        src={props.item.urls.small}
        objectFit={"cover"}
        imageCSS={defaultImageCSS}
        onLoad={() => setOpacity(0)}
        alt="placeholder"
      />
    </Container>
    </>
  );
}
