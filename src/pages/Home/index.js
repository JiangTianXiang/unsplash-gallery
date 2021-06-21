import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUrl } from "utils";
import { ImageAndUser } from "components";
import { DisplayArea } from "./Home.styles";

export default class Home extends React.Component {
  state = {
    data: [],
    hasError: false,
    page: 1,
  };

  getData = async () => {
    try {
      this.setState({ hasError: false });
      const response = await axios(
        getUrl({ isRandom: false, numberOfRequest: 10, page: this.state.page })
      );
      const newList = response.data;
      this.setState({
        data: this.state.data.concat(newList),
        page: this.state.page + 1,
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
    this.setState({ page: 1 });
  }

  render() {
    const loadSuccess = this.state.data.length;
    return (
      loadSuccess && (
        <InfiniteScroll
          dataLength={this.state.data.length}
          next={this.getData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <DisplayArea>
            {this.state.data.map((item, index) => {
              return (
                <ImageAndUser
                  key={index}
                  item={item}
                  handleModal={this.handleModal}
                />
              );
            })}
          </DisplayArea>
        </InfiniteScroll>
      )
    );
  }
}
