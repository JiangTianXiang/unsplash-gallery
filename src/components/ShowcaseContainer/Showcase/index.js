import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Overlay,
  DisplayImage,
  defaultImageContainerCSS,
  defaultImageCSS,
  MoreInfoDiv,
  CollectionInfoDiv,
  TitleDiv,
} from "./Showcase.styles";

function Showcase(props) {
  const [opacity, setOpacity] = useState(1);
  const handleClick = () => {
    const { feedType, searchTerm } = props.detail;
    props.history.push(`/${feedType}/${searchTerm}`);
  };
  return (
    <>
      <Container imageContainerCSS={defaultImageContainerCSS} onClick={handleClick}>
        <Overlay
          opacity={opacity}
          placeholderColor={props.detail.cover_photo.color}
        />
        <TitleDiv>{props.detail.title}</TitleDiv>
        <MoreInfoDiv>
          <CollectionInfoDiv>
            {props.detail.total_photos} Photos
          </CollectionInfoDiv>
        </MoreInfoDiv>
        <DisplayImage
          src={props.detail.cover_photo.urls.regular}
          objectFit={"cover"}
          imageCSS={defaultImageCSS}
          onLoad={() => setOpacity(0)}
          alt="placeholder"
        />
      </Container>
    </>
  );
}

export default withRouter(Showcase);
