import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { formatTopic } from "utils/index";
import {
  getTopicFeed,
  getTopicDetails,
  resetState,
  incrementPage,
} from "store/topicFeed/topicAction";
import {
  ExploreImage,
  LoadingCircle,
  TopicDetail,
  ErrorPage,
} from "components";
import {
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoSelectionSwitch,
  UnderScoredLink,
  DisplayArea,
} from "components/UI/Layout/SearchPageInfoLayout.styles";
import {
  ImageColumn,
  ImageArea,
  ImageContainer,
} from "components/UI/Layout/ThreeColumnLayout.styles";

function Topic(props) {
  const ref = React.createRef();
  const searchTerm = props.match.params.searchTerm.toLowerCase();
  const searchTopic = formatTopic(searchTerm);

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
      props.getTopicFeed(searchTopic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.topicFeed.page]);

  useEffect(() => {
    props.getTopicDetails(searchTopic);
    props.getTopicFeed(searchTopic);
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.searchTerm]);

  const { data, isLoading, hasError, renderObject, detail } = props.topicFeed;
  const { total_photos } = detail || {};
  const hasData = !!data.length && !hasError;
  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasError && (
        <>
          <div>Can not find topic with name "{searchTerm}"</div>
          <PhotosAndSelectionsContainer>
            <PhotoSelectionSwitch>
              <StyledLink to={`/search/photos/${searchTerm}`}>
                Photos
              </StyledLink>
              <StyledLink to={`/search/collections/${searchTopic}`}>
                Collections
              </StyledLink>
              <UnderScoredLink to={`/topic/${formatTopic(searchTerm)}`}>
                Topic
              </UnderScoredLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
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
      {hasError && <ErrorPage />}
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
