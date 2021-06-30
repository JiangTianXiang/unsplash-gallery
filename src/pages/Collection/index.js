import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { ExploreImage } from "components";
import LoadingCircle from "components/LoadingCircle";
import {
  ImageContainer,
  ImageArea,
  ImageColumn,
  CollectionInfoContainer,
  CollectionDetails,
} from "./Collection.styles";
import {
  getCollectionFeed,
  resetState,
  incrementPage,
} from "store/collectionFeed/collectionFeedAction";

function Collection(props) {
  const [maxPhoto] = useState(props.match.params.total_photos);
  const ref = React.createRef();
  useEffect(() => {
    isLoading ? ref.current.continuousStart() : ref.current.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collectionFeed.isLoading]);

  useEffect(() => {
    if (props.collectionFeed.page !== 1) {
      props.getCollectionFeed(props.match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collectionFeed.page]);

  useEffect(() => {
    props.resetState();
    props.getCollectionFeed(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, hasError, renderObject } =
    props.collectionFeed;
  const hasData = !!data.length && !hasError;
  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <>
          <CollectionInfoContainer>
            <CollectionDetails>
              <div>
                Collection "{props.match.params.title}" created by
                {props.match.params.user}
              </div>
              <div>{maxPhoto} Photos in this collection</div>
            </CollectionDetails>
          </CollectionInfoContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={data.length < maxPhoto}
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
        </>
      )}
      {isLoading && <LoadingCircle />}
    </>
  );
}

const mapStateToProps = (state) => ({
  collectionFeed: state.collectionFeed,
});

const mapDispatchToProps = {
  getCollectionFeed,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
