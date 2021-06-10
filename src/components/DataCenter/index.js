import Home from "pages/Home";
import React from "react";
/**
 *  Store all information received from unsplash
 *  as array of image objects
 *  Note this class should not handle error or onloading status
 *  Mainly used for storing information and redirect it to the right page
 */
export default class DataCenter extends React.Component {
  state = {
    data: this.props.data,
  };

  render() {
    return (
      <>
        <div>At data center</div>
        <Home data={this.state.data}/>
      </>
    );
  }
}
