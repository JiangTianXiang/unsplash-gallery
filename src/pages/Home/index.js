import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { getUrl } from "utils";
import { ImageAndUser } from "components";
import { DisplayArea } from "./Home.styles";

export default class Home extends React.Component {
  state = {
    data: [],
    hasError: false,
    page: 1,
  };
  ref = React.createRef();

  getData = async () => {
    try {
      this.ref.current.continuousStart();
      this.setState({ isLoading: true });
      const response = await axios(
        getUrl({ isRandom: false, numberOfRequest: 10, page: this.state.page })
      );
      const newList = response.data;
      this.setState({
        data: this.state.data.concat(newList),
        page: this.state.page + 1,
        isLoading: false,
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

  render() {
    const hasData = !!this.state.data.length && !this.state.hasError;
    return (
      <>
        <LoadingBar color="#f11946" ref={this.ref} shadow={true} />
        {hasData && (
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.getData}
            hasMore={true}
          >
            <DisplayArea>
              {this.state.data.map((item) => {
                return (
                  <ImageAndUser
                    key={item.id}
                    item={item}
                    handleModal={this.handleModal}
                  />
                );
              })}
            </DisplayArea>
          </InfiniteScroll>
        )}
        {this.state.isLoading && <LoadingCircle />}
      </>
    );
  }
}
