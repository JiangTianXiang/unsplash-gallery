import ImageAndUser from "components/ImageAndUser";
import React from "react";
import { DisplayArea } from "./Home.styles";

export default class Home extends React.Component {
  state = {
    data: this.props.data,
  };

  render() {
    return (
      <>
        <div>Home page</div>
        <DisplayArea>
          {this.state.data.map((item) => {
            return <ImageAndUser key={item.id} item={item} />;
          })}
        </DisplayArea>
      </>
    );
  }
}
