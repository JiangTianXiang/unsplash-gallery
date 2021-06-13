import React from "react";
import DisplayImage from "../DisplayImage";
import Author from "../Author";
import { ImageAndUserContainer, Likes } from "./ImageAndUser.styles";

export default class ImageAndUser extends React.Component {
  state = {
    data: this.props.item,
  };

  render() {
    return (
      <ImageAndUserContainer>
        <Author getUser={this.state.data.user} />
        <DisplayImage
          url={this.state.data.urls.regular}
          placeholder={this.state.data.color}
        />
        <Likes>{`${this.state.data.likes} likes`} </Likes>
      </ImageAndUserContainer>
    );
  }
}
