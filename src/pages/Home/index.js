import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { ImageAndUser } from "components";
import { DisplayArea } from "./Home.styles";
import { getData } from "store/feed/feedAction";

class Home extends React.Component {
  ref = React.createRef();
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { isLoading, hasError, data } = this.props.feed;
    const hasData = !!data.length && !hasError;
    console.log(this.props.feed);
    return (
      <>
        <LoadingBar color="#f11946" ref={this.ref} shadow={true} />
        {hasData && (
          <InfiniteScroll
            dataLength={data.length}
            next={this.props.getData}
            hasMore={true}
          >
            <DisplayArea>
              {data.map((item) => {
                return <ImageAndUser key={item.id} item={item} />;
              })}
            </DisplayArea>
          </InfiniteScroll>
        )}
        {isLoading && <LoadingCircle />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
