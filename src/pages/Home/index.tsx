import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ImageAndUser, LoadingCircle, ErrorPage } from "components";
import Showcase from "components/ShowcaseContainer";
import { DisplayArea } from "./Home.styles";
import {
  getData,
  resetState,
  incrementPage,
} from "store/feed/feedActionCreators";
import PageProps from "pages/Home/Home.types";
import { IState } from "store/store.type";

const Home = (props: PageProps) => {
  const ref: any = React.createRef();
  const [showcaseLoaded, setShowcaseLoaded] = useState(false);
  const { isLoading, hasError, data } = props.feed || {};
  const hasLoadingFinish = !isLoading && showcaseLoaded;
  const hasData = !!data.length && !hasError && showcaseLoaded;

  useEffect(() => {
    const loadingBar = ref.current;
    if (loadingBar) {
      isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    }

    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (props.feed.page !== 1) {
      props.getData(props.feed.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.feed.page]);

  useEffect(() => {
    props.getData(1);
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      <Showcase setLoading={setShowcaseLoaded} />
      {hasData && (
        <InfiniteScroll
          dataLength={data.length}
          next={props.incrementPage}
          hasMore={true}
          loader={null}
        >
          <DisplayArea>
            {data.map((item: any) => {
              return <ImageAndUser key={item.id} item={item} />;
            })}
          </DisplayArea>
        </InfiniteScroll>
      )}
      {hasLoadingFinish && <LoadingCircle />}
      {hasError && <ErrorPage />}
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  feed: state.feed,
});

const mapDispatchToProps = {
  getData,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
