import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import {
  getSearchCollectionResult,
  resetCollectionState,
  incrementCollectionPage,
} from "store/searchCollection/searchCollectionAction";
import { ImageCollection, LoadingCircle } from "components";
import {
  ImageColumn,
  ImageArea,
  ImageContainer,
} from "components/UI/Layout/ThreeColumnLayout.styles";
import {
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoResultDetails,
  PhotoSelectionSwitch,
  UnderScoredLink,
  DisplayArea
} from "components/UI/Layout/SearchPageInfoLayout.styles";

function SearchCollectionResult(props) {
  const ref = React.createRef();

  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult.isLoading]);

  useEffect(() => {
    if (props.searchResult.page !== 1) {
      props.getSearchCollectionResult(props.match.params.searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult.page]);

  useEffect(() => {
    props.resetCollectionState();
    props.getSearchCollectionResult(props.match.params.searchTerm);
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
  const searchTerm = props.match.params.searchTerm.toLowerCase();

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <DisplayArea>
          <PhotosAndSelectionsContainer>
            <PhotoResultDetails>
              <div>
                Search results for "{searchTerm}"
              </div>
              <div>{totalResult} collections found</div>
            </PhotoResultDetails>
            <PhotoSelectionSwitch>
              <StyledLink
                to={`/search/photos/${searchTerm}`}
              >
                Photos
              </StyledLink>
              <UnderScoredLink
                to={`/search/collections/${searchTerm}`}
              >
                Collections
              </UnderScoredLink>
              <StyledLink to={`/topic/${searchTerm}`}>
                Topic
              </StyledLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementCollectionPage}
            hasMore={page <= maxPage}
          >
            <ImageContainer>
              <ImageArea>
                {renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ImageCollection key={item.id} item={item} />
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
  searchResult: state.searchCollection,
});

const mapDispatchToProps = {
  getSearchCollectionResult,
  resetCollectionState,
  incrementCollectionPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCollectionResult);
