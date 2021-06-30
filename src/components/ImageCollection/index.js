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
} from "./ImageCollection.styles";

function ImageCollection(props) {
  const [opacity, setOpacity] = useState(1);
  const handleClick = () => {
    props.history.push(
      `/collection/${props.item.id}&total_photos=${props.item.total_photos}&user=${props.item.user.username}&title=${props.item.title}`
    );
  };

  return (
    <>
      <Container
        imageContainerCSS={defaultImageContainerCSS}
        onClick={handleClick}
      >
        <Overlay
          opacity={opacity}
          placeholderColor={props.item.cover_photo.color}
        />
        <MoreInfoDiv>
          <CollectionInfoDiv>
            {props.item.total_photos} Photos
          </CollectionInfoDiv>
        </MoreInfoDiv>
        <DisplayImage
          src={props.item.cover_photo.urls.regular}
          objectFit={"cover"}
          imageCSS={defaultImageCSS}
          onLoad={() => setOpacity(0)}
          alt="placeholder"
        />
      </Container>
    </>
  );
}


export default withRouter(ImageCollection);
