import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Overlay,
  DisplayImage,
  userCollectionContainerCSS,
  userCollectionImageCSS,
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
  const containerCSS = props.user ? userCollectionContainerCSS : defaultImageContainerCSS;
  const imageCSS = props.user ? userCollectionImageCSS : defaultImageCSS;
  return (
    <>
      <Container
        imageContainerCSS={containerCSS}
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
          imageCSS={imageCSS}
          onLoad={() => setOpacity(0)}
          alt="placeholder"
        />
      </Container>
    </>
  );
}


export default withRouter(ImageCollection);
