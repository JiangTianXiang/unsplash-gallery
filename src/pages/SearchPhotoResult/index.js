import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import {
  getSearchResult,
  resetState,
  incrementPage,
} from "store/search/searchAction";
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

class SearchPhotoResult extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    console.log("Component did mount");
    this.props.getSearchResult(this.props.match.params.searchTerm);
  }

  componentDidUpdate(prevPros) {
    if (
      this.props.match.params.searchTerm !== prevPros.match.params.searchTerm
    ) {
      console.log("Component did update");
      this.props.resetState();
      this.props.getSearchResult(this.props.match.params.searchTerm);
    }
  }

  render() {
    const {
      data,
      isLoading,
      hasError,
      totalResult,
      renderObject,
      page,
      maxPage,
    } = this.props.searchResult;
    const hasData = !!data.length && !hasError;
    const searchTerm = this.props.match.params.searchTerm;
    console.log(renderObject[0]);
    return (
      <>
        <LoadingBar color="#f11946" ref={this.ref} shadow={true} />
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
              next={this.props.incrementPage}
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
}

const mapStateToProps = (state) => ({
  searchResult: state.search,
});

const mapDispatchToProps = {
  getSearchResult,
  resetState,
  incrementPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotoResult);
