import React from "react";
import axios from "axios";
import ExploreImage from "components/ExploreImage";
import { DisplayArea, ImageColumn } from "./Explore.styles";
export default class Explore extends React.Component {
  state = {
    data: null,
    hasError: false,
    isLoading: false,
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true, hasError: false });
      const response = await axios(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}&count=30`
      );
      const newList = response.data;
      this.setState({
        isLoading: false,
        data: [
          { key: Math.random(), images: newList.slice(0, 10) },
          { key: Math.random(), images: newList.slice(10, 20) },
          { key: Math.random(), images: newList.slice(20) },
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

  render() {
    const loadSuccess = !this.state.isLoading && this.state.data !== null;
    return (
      loadSuccess && (
        <>
          <DisplayArea>
            {this.state.data.map((column) => (
              <ImageColumn key={column.key}>
                {column.images.map((item) => (
                  <ExploreImage key={item.id} url={item.urls.small} />
                ))}
              </ImageColumn>
            ))}
          </DisplayArea>
        </>
      )
    );
  }
}
