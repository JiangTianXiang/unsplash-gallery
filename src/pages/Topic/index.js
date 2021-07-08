import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import {
  getTopicFeed,
  getTopicDetails,
  resetState,
  incrementPage,
} from "store/topicFeed/topicAction";
import { ExploreImage, LoadingCircle, TopicDetail } from "components";
import {
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoSelectionSwitch,
  UnderScoredLink,
  DisplayArea
} from "components/UI/Layout/SearchPageInfoLayout.styles";
import {
  ImageColumn,
  ImageArea,
  ImageContainer,
} from "components/UI/Layout/ThreeColumnLayout.styles";

function Topic(props) {
  const ref = React.createRef();

  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.topicFeed.isLoading]);

  useEffect(() => {
    if (props.topicFeed.page !== 1) {
      props.getTopicFeed(props.match.params.searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.topicFeed.page]);

  useEffect(() => {
    props.getTopicDetails(props.match.params.searchTerm);
    props.getTopicFeed(props.match.params.searchTerm);
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.searchTerm]);

  const { data, isLoading, hasError, renderObject, detail } = props.topicFeed;
  const { total_photos } = detail || {};
  const hasData = !!data.length && !hasError;
  const searchTerm = props.match.params.searchTerm.toLowerCase();
  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasError && (
        <>
          <div>Can not find topic with name "{searchTerm}"</div>
          <PhotoSelectionSwitch>
            <StyledLink to={`/search/photos/${searchTerm}`}>Photos</StyledLink>
            <StyledLink to={`/search/collections/${searchTerm}`}>
              Collections
            </StyledLink>
            <UnderScoredLink to={`/topic/${searchTerm}`}>Topic</UnderScoredLink>
          </PhotoSelectionSwitch>
        </>
      )}
      {hasData && (
        <DisplayArea>
          <PhotosAndSelectionsContainer>
            <TopicDetail detail={detail} searchTerm={searchTerm} />
            <PhotoSelectionSwitch>
              <StyledLink to={`/search/photos/${searchTerm}`}>
                Photos
              </StyledLink>
              <StyledLink to={`/search/collections/${searchTerm}`}>
                Collections
              </StyledLink>
              <UnderScoredLink to={`/topic/${searchTerm}`}>
                Topic
              </UnderScoredLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={data.length < total_photos}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  topicFeed: state.topicFeed,
});

const mapDispatchToProps = {
  getTopicFeed,
  getTopicDetails,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
