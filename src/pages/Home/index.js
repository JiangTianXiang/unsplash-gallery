import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { ImageAndUser } from "components";
import { DisplayArea } from "./Home.styles";
import { getData, resetState, incrementPage } from "store/feed/feedAction";

function Home(props) {
  const ref = React.createRef();

  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.feed.isLoading]);

  useEffect(() => {
    if (props.feed.page !== 1) {
      props.getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.feed.page]);

  useEffect(() => {
    props.getData();
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, hasError, data } = props.feed;
  const hasData = !!data.length && !hasError;
  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <InfiniteScroll
          dataLength={data.length}
          next={props.incrementPage}
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

const mapStateToProps = (state) => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  getData,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
