import React from "react";
import axios from "axios";
import { getSearchUrl } from "utils";
import ExploreImage from "components/ExploreImage";
import {
  ImageContainer,
  ImageColumn,
  PhotosAndSelectionsContainer,
  StyledLink
} from "./SearchPhotoResult.styles";

export default class SearchPhotoResult extends React.Component {
  state = {
    data: null,
    hasError: false,
    isLoading: false,
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true, hasError: false });
      const response = await axios(
        getSearchUrl(true, this.props.match.params.input, 30)
      );
      const newList = response.data.results;
      const imagesPerColumn = Math.floor(newList.length / 3);
      this.setState({
        isLoading: false,
        data: [
          { key: Math.random(), images: newList.slice(0, imagesPerColumn) },
          {
            key: Math.random(),
            images: newList.slice(imagesPerColumn, 2 * imagesPerColumn),
          },
          { key: Math.random(), images: newList.slice(2 * imagesPerColumn) },
        ],
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevPros) {
    if (this.props.match.params.input !== prevPros.match.params.input) {
      this.getData();
    }
  }

  render() {
    const loadSuccess = !this.state.isLoading && this.state.data !== null;
    return (
      loadSuccess && (
        <>
          <PhotosAndSelectionsContainer>
            <StyledLink to={`/search/photos/${this.props.match.params.input}`}>
              Photos
            </StyledLink>
            <StyledLink to={`/search/collections/${this.props.match.params.input}`}>
              Collections
            </StyledLink>
          </PhotosAndSelectionsContainer>
          <ImageContainer>
            {this.state.data.map((column) => (
              <ImageColumn key={column.key}>
                {column.images.map((item) => (
                  <ExploreImage key={item.id} item={item} />
                ))}
              </ImageColumn>
            ))}
          </ImageContainer>
        </>
      )
    );
  }
}
