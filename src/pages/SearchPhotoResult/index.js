import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import {
  getSearchResult,
  resetState,
  incrementPage,
} from "store/searchPhoto/searchAction";
import { ExploreImage } from "components";
import {
  ImageContainer,
  ImageColumn,
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoResultDetails,
  PhotoSelectionSwitch,
  UnderScoredLink,
  ImageArea,
} from "./SearchPhotoResult.styles";

function SearchPhotoResult(props) {
  const ref = React.createRef();

  useEffect(() => {
    isLoading ? ref.current.continuousStart() : ref.current.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult.isLoading]);

  useEffect(() => {
    if (props.searchResult.page !== 1) {
      props.getSearchResult(props.match.params.searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult.page]);

  useEffect(() => {
    props.resetState();
    props.getSearchResult(props.match.params.searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.searchTerm]);

  const {
    data,
    isLoading,
    hasError,
    totalResult,
    renderObject,
    page,
    maxPage,
  } = props.searchResult;
  const hasData = !!data.length && !hasError;
  const searchTerm = props.match.params.searchTerm;

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <>
          <PhotosAndSelectionsContainer>
            <PhotoResultDetails>
              <div>Search results for "{searchTerm}"</div>
              <div>{totalResult} Photos found</div>
            </PhotoResultDetails>
            <PhotoSelectionSwitch>
              <UnderScoredLink to={`/search/photos/${searchTerm}`}>
                Photos
              </UnderScoredLink>
              <StyledLink to={`/search/collections/${searchTerm}`}>
                Collections
              </StyledLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={renderObject[0].images.length}
            next={props.incrementPage}
            hasMore={page <= maxPage}
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
  searchResult: state.searchPhoto,
});

const mapDispatchToProps = {
  getSearchResult,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotoResult);
