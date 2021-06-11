import React from "react";
import axios from "axios";
import { getSearchUrl } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import ExploreImage from "components/ExploreImage";
import {
  ImageContainer,
  ImageColumn,
  PhotosAndSelectionsContainer,
  StyledLink,
} from "./SearchPhotoResult.styles";
export default class SearchPhotoResult extends React.Component {
  state = {
    data: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    page: 0,
    maxPage: 0,
    totalResult: 0,
  };

  getData = async () => {
    try {
      this.setState({ hasError: false });
      const searchInput = this.props.match.params.input;
      const response = await axios(
        getSearchUrl({ query: searchInput, page: this.state.page })
      );
      const newList = response.data.results;
      const imagesPerColumn = Math.floor(newList.length / 3);
      this.setState({
        data: [
          {
            key: this.state.data[0].key,
            images: this.state.data[0].images.concat(
              newList.slice(0, imagesPerColumn)
            ),
          },
          {
            key: this.state.data[1].key,
            images: this.state.data[1].images.concat(
              newList.slice(imagesPerColumn, 2 * imagesPerColumn)
            ),
          },
          {
            key: this.state.data[2].key,
            images: this.state.data[2].images.concat(
              newList.slice(2 * imagesPerColumn)
            ),
          },
        ],
        page: this.state.page + 1,
        maxPage: response.data.total_pages,
        totalResult: response.data.total,
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
    //Reset to get image from first page
    this.setState({ page: 1 });
  }

  componentDidUpdate(prevPros) {
    console.log(this.props.match.params.input);
    console.log(`PrevProps : ${prevPros.match.params.input}`);
    if (this.props.match.params.input !== prevPros.match.params.input) {
      this.setState({
        page: 1,
        data: [
          { key: this.state.data[0].key, images: [] },
          { key: this.state.data[1].key, images: [] },
          { key: this.state.data[2].key, images: [] },
        ],
      });
      this.getData();
    }
  }

  render() {
    const loadSuccess = this.state.data !== null;
    return (
      loadSuccess && (
        <>
          <PhotosAndSelectionsContainer>
            <div>{this.state.totalResult}</div>
            <StyledLink to={`/search/photos/${this.props.match.params.input}`}>
              Photos
            </StyledLink>
            <StyledLink
              to={`/search/collections/${this.props.match.params.input}`}
            >
              Collections
            </StyledLink>
          </PhotosAndSelectionsContainer>
          <ImageContainer>
            {this.state.data.map((column) => (
              <ImageColumn key={column.key}>
                <InfiniteScroll
                  dataLength={this.state.data[0].images.length}
                  next={this.getData}
                  hasMore={this.state.page <= this.state.maxPage}
                  loader={<h4>Loading...</h4>}
                >
                  {column.images.map((item, index) => (
                    <ExploreImage key={column.key * index} item={item} />
                  ))}
                </InfiniteScroll>
              </ImageColumn>
            ))}
          </ImageContainer>
        </>
      )
    );
  }
}
