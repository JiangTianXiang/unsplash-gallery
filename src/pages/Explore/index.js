import React, { useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import ExploreImage from "components/ExploreImage";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "components/LoadingCircle";
import {
  getExploreFeed,
  resetState,
  incrementPage,
} from "store/exploreFeed/exploreFeedAction";
import { DisplayArea, ImageColumn, ImageArea } from "./Explore.styles";

function Explore(props) {
  const ref = React.createRef();
  useEffect(() => {
    isLoading ? ref.current.continuousStart() : ref.current.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.exploreFeed.isLoading]);

  useEffect(() => {
    if (props.exploreFeed.page !== 1) {
      props.getExploreFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.exploreFeed.page]);

  useEffect(() => {
    props.resetState();
    props.getExploreFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data,
    isLoading,
    hasError,
    renderObject,
  } = props.exploreFeed;
  const hasData = !!data.length && !hasError;

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <InfiniteScroll
          dataLength={renderObject[0].images.length}
          next={props.incrementPage}
          hasMore={true}
        >
          <DisplayArea>
            <ImageArea>
              {renderObject.map((column) => (
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
      {isLoading && <LoadingCircle />}
    </>
  );
}

const mapStateToProps = (state) => ({
  exploreFeed: state.exploreFeed,
});

const mapDispatchToProps = {
  getExploreFeed,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
