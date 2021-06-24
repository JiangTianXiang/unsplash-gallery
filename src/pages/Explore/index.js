import React from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import ExploreImage from "components/ExploreImage";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "components/LoadingCircle";
import { getUrl } from "utils";
import { DisplayArea, ImageColumn, ImageArea } from "./Explore.styles";

export default class Explore extends React.Component {
  state = {
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    page: 1,
  };
  ref = React.createRef();

  getData = async () => {
    try {
      this.ref.current.continuousStart();
      const response = await axios(getUrl({ page: this.state.page }));
      const newList = response.data;
      this.setState({
        data: [...this.state.data, ...newList],
        renderObject: this.splitDataToColumns(newList),
        hasError: false,
        page: this.state.page + 1,
      });
      this.ref.current.complete();
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
    const loadSuccess = !!this.state.data.length;
    return (
      <>
        <LoadingBar color="#f11946" ref={this.ref} shadow={true} />
        {!loadSuccess && <LoadingCircle />}
        {loadSuccess && (
          <InfiniteScroll
            dataLength={this.state.renderObject[0].images.length}
            next={this.getData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <DisplayArea>
              <ImageArea>
                {this.state.renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ExploreImage
                        key={item.id}
                        item={item}
                        portrait={item.width < item.height}
                      />
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </DisplayArea>
          </InfiniteScroll>
        )}
      </>
    );
  }
}
