import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import {
  getSearchResult,
  resetState,
  incrementPage,
} from "store/searchPhoto/searchAction";
import { ExploreImage, LoadingCircle, ErrorPage } from "components";
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
import SearchPhotoProps from "./SearchPhoto.types";
import { IState } from "store/store.type";

type TParams = { searchTerm: string };
const SearchPhotoResult: React.FunctionComponent<
  SearchPhotoProps & RouteComponentProps<TParams>
> = (props) => {
  const ref:any = React.createRef();

  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchPhoto.isLoading]);

  useEffect(() => {
    if (props.searchPhoto.page !== 1) {
      props.getSearchResult(
        props.match.params.searchTerm,
        props.searchPhoto.page
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchPhoto.page]);

  useEffect(() => {
    props.resetState();
    props.getSearchResult(
      props.match.params.searchTerm,
      props.searchPhoto.page
    );
    return function cleanup() {
      props.resetState();
    };
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
  } = props.searchPhoto;
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
              <div>{totalResult} Photos found</div>
            </PhotoResultDetails>
            <PhotoSelectionSwitch>
              <UnderScoredLink to={`/search/photos/${searchTerm}`}>
                Photos
              </UnderScoredLink>
              <StyledLink to={`/search/collections/${searchTerm}`}>
                Collections
              </StyledLink>
              <StyledLink to={`/topic/${searchTerm}`}>Topic</StyledLink>
            </PhotoSelectionSwitch>
          </PhotosAndSelectionsContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={page <= maxPage}
            loader={null}
          >
            <ImageContainer>
              <ImageArea>
                {renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item:any) => (
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
};

const mapStateToProps = (state: IState) => ({
  searchPhoto: state.searchPhoto,
});

const mapDispatchToProps = {
  getSearchResult,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotoResult);
