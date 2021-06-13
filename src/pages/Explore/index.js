import React from "react";
import axios from "axios";
import ExploreImage from "components/ExploreImage";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUrl } from "utils";
import { DisplayArea, ImageColumn } from "./Explore.styles";

export default class Explore extends React.Component {
  state = {
    data: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
  };

  getData = async () => {
    try {
      this.setState({ hasError: false });
      const response = await axios(getUrl({ page: null }));
      const newList = response.data;
      this.setState({
        data: [
          {
            key: this.state.data[0].key,
            images: this.state.data[0].images.concat(newList.slice(0, 10)),
          },
          {
            key: this.state.data[1].key,
            images: this.state.data[1].images.concat(newList.slice(10, 20)),
          },
          {
            key: this.state.data[2].key,
            images: this.state.data[2].images.concat(newList.slice(20)),
          },
        ],
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const loadSuccess = this.state.data !== null;
    return (
      loadSuccess && (
        <InfiniteScroll
          dataLength={this.state.data[0].images.length}
          next={this.getData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <DisplayArea>
            {this.state.data.map((column, index) => (
              <ImageColumn key={column.key}>
                {column.images.map((item, index) => (
                  <ExploreImage key={column.key * index} item={item} />
                ))}
              </ImageColumn>
            ))}
          </DisplayArea>
        </InfiniteScroll>
      )
    );
  }
}
