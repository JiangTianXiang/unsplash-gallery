import ImageAndUser from "components/ImageAndUser";
import React from "react";

export default class Home extends React.Component {
  state = {
    data: this.props.data,
  };

  render() {
    return (
      <>
        <div>Home page</div>
        {this.state.data.map((item) => {
          return <ImageAndUser key={item.id} item={item} />;
        })}
      </>
    );
  }
}
