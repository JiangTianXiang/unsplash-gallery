import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import {
  ExploreImage,
  LoadingCircle,
  TopicDetail,
  ErrorPage,
} from "components";
import {
  ImageContainer,
  ImageArea,
  ImageColumn,
  DisplayArea,
} from "./Collection.styles";
import {
  getCollectionFeed,
  getCollectionDetails,
  resetState,
  incrementPage,
} from "store/collectionFeed/collectionFeedAction";

function Collection(props) {
  const ref = React.createRef();
  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collectionFeed.isLoading]);

  useEffect(() => {
    if (props.collectionFeed.page !== 1) {
      props.getCollectionFeed(props.match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collectionFeed.page]);

  useEffect(() => {
    props.getCollectionDetails(props.match.params.id);
    props.getCollectionFeed(props.match.params.id);
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, hasError, renderObject, detail } =
    props.collectionFeed;
  const { total_photos } = detail || {};
  const hasData = !!data.length && !hasError && !!detail;
  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <DisplayArea>
          <TopicDetail
            detail={detail}
            searchTerm={detail.title}
            author={detail.user.username}
            collection
          />
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={data.length < total_photos}
            endMessage={<h4>End of collection</h4>}
          >
            <ImageContainer>
              <ImageArea>
                {renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ExploreImage key={item.id} item={item} restrict />
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </ImageContainer>
          </InfiniteScroll>
        </DisplayArea>
      )}
      {isLoading && <LoadingCircle />}
      {hasError && <ErrorPage />}
    </>
  );
}

const mapStateToProps = (state) => ({
  collectionFeed: state.collectionFeed,
});

const mapDispatchToProps = {
  getCollectionFeed,
  getCollectionDetails,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
