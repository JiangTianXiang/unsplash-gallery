import React from "react";
import axios from "axios";
import ExploreImage from "components/ExploreImage";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUrl } from "utils";
import { DisplayArea, ImageColumn } from "./Explore.styles";

export default class Explore extends React.Component {
  state = {
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    newDataIndex: 0,
  };

  getData = async () => {
    try {
      this.setState({ hasError: false });
      const response = await axios(getUrl({ page: null }));
      const newList = response.data;
      this.setState({
        data: [...this.state.data, newList],
        renderObject: this.splitDataToColumns(newList),
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
  }

  splitDataToColumns = (newData) => {
    const newRenderObject = [...this.state.renderObject];
    let counter = 0;

    while (counter < newData.length) {
      newRenderObject[counter % 3].images.push(newData[counter]);
      counter++;
    }
    return newRenderObject;
  };

  render() {
    const loadSuccess = this.state.data !== null;
    return (
      loadSuccess && (
        <InfiniteScroll
          dataLength={this.state.renderObject[0].images.length}
          next={this.getData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <DisplayArea>
            {this.state.renderObject.map((column) => (
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
