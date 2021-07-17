import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import { RouteComponentProps } from "react-router-dom";
import {
  getSearchCollectionResult,
  resetCollectionState,
  incrementCollectionPage,
} from "store/searchCollection/searchCollectionAction";
import { ImageCollection, LoadingCircle, ErrorPage } from "components";
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
  DisplayArea,
} from "components/UI/Layout/SearchPageInfoLayout.styles";
import SearchCollectionProps from "./SearchCollection.types";
import { IState } from "store/store.type";

type TParams = { searchTerm: string };
const SearchCollectionResult: React.FunctionComponent<
  SearchCollectionProps & RouteComponentProps<TParams>
> = (props) => {
  const ref: any = React.createRef();

  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchCollection.isLoading]);

  useEffect(() => {
    if (props.searchCollection.page !== 1) {
      props.getSearchCollectionResult(
        props.match.params.searchTerm,
        props.searchCollection.page
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchCollection.page]);

  useEffect(() => {
    props.resetCollectionState();
    props.getSearchCollectionResult(
      props.match.params.searchTerm,
      props.searchCollection.page
    );
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
  } = props.searchCollection;
  const hasData = !!data.length && !hasError;
  const searchTerm = props.match.params.searchTerm.toLowerCase();

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <DisplayArea>
          <PhotosAndSelectionsContainer>
            <PhotoResultDetails>
              <div>Search results for "{searchTerm}"</div>
              <div>{totalResult} collections found</div>
            </PhotoResultDetails>
            <PhotoSelectionSwitch>
              <StyledLink to={`/search/photos/${searchTerm}`}>
                Photos
              </StyledLink>
              <UnderScoredLink to={`/search/collections/${searchTerm}`}>
                Collections
              </UnderScoredLink>
              <StyledLink to={`/topic/${searchTerm}`}>Topic</StyledLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementCollectionPage}
            hasMore={page <= maxPage}
            loader={null}
          >
            <ImageContainer>
              <ImageArea>
                {renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item: any) => (
                      <ImageCollection key={item.id} item={item} />
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
};

const mapStateToProps = (state: IState) => ({
  searchCollection: state.searchCollection,
});

const mapDispatchToProps = {
  getSearchCollectionResult,
  resetCollectionState,
  incrementCollectionPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCollectionResult);
