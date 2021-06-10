import React from "react";
import Image from "../DisplayImage";
import User from "../User";

export default class ImageAndUser extends React.Component {
  state = {
    data: this.props.item,
  };

  render() {
    return (
      <>
        <div>At Image and User</div>
        <>
          <User getUser={this.state.data.user}/>
          <Image getImageUrl={this.state.data.urls.regular} />
        </>
      </>
    );
  }
}
