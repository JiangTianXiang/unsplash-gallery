import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import {
  getSearchCollectionResult,
  resetCollectionState,
  incrementCollectionPage,
} from "store/searchCollection/searchCollectionAction";
import { ImageCollection } from "components";
import {
  ImageContainer,
  ImageColumn,
  PhotosAndSelectionsContainer,
  StyledLink,
  PhotoResultDetails,
  PhotoSelectionSwitch,
  UnderScoredLink,
  ImageArea,
} from "./SearchCollectionResult.styles";

function SearchCollectionResult(props) {
  const ref = React.createRef();

  useEffect(() => {
    isLoading ? ref.current.continuousStart() : ref.current.complete();
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
  const searchTerm = props.match.params.searchTerm;

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <>
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
        </>
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
