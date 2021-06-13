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
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    page: 1,
    maxPage: 0,
    totalResult: 0,
  };

  getData = async () => {
    try {
      const searchInput = this.props.match.params.input;
      console.log(this.state.page);
      const response = await axios(
        getSearchUrl({ query: searchInput, page: this.state.page })
      );
      const newList = response.data.results;
      this.setState({
        data: [...this.state.data, newList],
        renderObject: this.splitDataToColumns(newList),
        page: this.state.page + 1,
        maxPage: response.data.total_pages,
        totalResult: response.data.total,
        hasError: false,
      });
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
    //Reset to get image from first page
    this.setState({ page: 1 });
  }

  componentDidUpdate(prevPros) {
    if (this.props.match.params.input !== prevPros.match.params.input) {
      this.setState({
        page: 1,
        data: [],
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
          <InfiniteScroll
            dataLength={this.state.renderObject[0].images.length}
            next={this.getData}
            hasMore={this.state.page <= this.state.maxPage}
            loader={<h4>Loading...</h4>}
          >
            <ImageContainer>
              {this.state.renderObject.map((column) => (
                <ImageColumn key={column.key}>
                  {column.images.map((item, index) => (
                    <ExploreImage key={column.key * index} item={item} />
                  ))}
                </ImageColumn>
              ))}
            </ImageContainer>
          </InfiniteScroll>
        </>
      )
    );
  }
}
