import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { getSearchUrl } from "utils";
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

export default class SearchPhotoResult extends React.Component {
  state = {
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    isLoading: false,
    page: 1,
    maxPage: 0,
    totalResult: 0,
  };
  ref = React.createRef();

  getData = async () => {
    try {
      this.setState({ isLoading: true });
      this.ref.current.continuousStart();
      const searchInput = this.props.match.params.searchTerm;
      const response = await axios(
        getSearchUrl({ query: searchInput, page: this.state.page })
      );
      const newList = response.data.results;
      this.setState({
        data: [...this.state.data, ...newList],
        renderObject: this.splitDataToColumns(newList),
        page: this.state.page + 1,
        maxPage: response.data.total_pages,
        totalResult: response.data.total,
        hasError: false,
        isLoading: false,
      });
      this.ref.current.complete();
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  splitDataToColumns = (newData) => {
    const newRenderObject = [...this.state.renderObject];
    let counter = 0;

    while (counter < newData.length) {
      newRenderObject[counter % 3].images.push(newData[counter]);
      counter++;
    }
    return newRenderObject;
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevPros) {
    if (
      this.props.match.params.searchTerm !== prevPros.match.params.searchTerm
    ) {
      this.setState({
        page: 1,
        data: [],
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
        maxPage: 0,
        totalResult: 0,
      });
      this.getData();
    }
  }

  render() {
    const hasData = !!this.state.data.length && !this.state.hasError;
    return (
      <>
        <LoadingBar color="#f11946" ref={this.ref} shadow={true} />
        {this.state.isLoading && <LoadingCircle />}
        {hasData && (
          <>
            <PhotosAndSelectionsContainer>
              <PhotoResultDetails>
                <div>
                  Search results for "{this.props.match.params.searchTerm}"
                </div>
                <div>{this.state.totalResult} Photos found</div>
              </PhotoResultDetails>
              <PhotoSelectionSwitch>
                <UnderScoredLink
                  to={`/search/photos/${this.props.match.params.searchTerm}`}
                >
                  Photos
                </UnderScoredLink>
                <StyledLink
                  to={`/search/collections/${this.props.match.params.searchTerm}`}
                >
                  Collections
                </StyledLink>
              </PhotoSelectionSwitch>
            </PhotosAndSelectionsContainer>
            <InfiniteScroll
              dataLength={this.state.renderObject[0].images.length}
              next={this.getData}
              hasMore={this.state.page <= this.state.maxPage}
              loader={<h4>Loading...</h4>}
            >
              <ImageContainer>
                <ImageArea>
                  {this.state.renderObject.map((column) => (
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
      </>
    );
  }
}
