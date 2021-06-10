import React from "react";
import DisplayImage from "../DisplayImage";
import User from "../User";
import { ImageAndUserContainer, Likes } from "./ImageAndUser.styles";

export default class ImageAndUser extends React.Component {
  state = {
    data: this.props.item,
  };

  render() {
    return (
      <ImageAndUserContainer>
        <User getUser={this.state.data.user} />
        <DisplayImage url={this.state.data.urls.regular} />
        <Likes>{`${this.state.data.likes} likes`} </Likes>
      </ImageAndUserContainer>
    );
  }
}
