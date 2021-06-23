import React from "react";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { DisplayArea, ImageColumn, ImageArea } from "./FavoriteImage.styles";
import { getAllFavoriteImage } from "utils/index.js";
import { ExploreImage } from "components";

export default class FavoriteImage extends React.Component {
  state = {
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
  };
  ref = React.createRef();

  loadImageFromLocalStorage = () => {
    try {
      this.ref.current.continuousStart();
      const favoriteImages = getAllFavoriteImage();
      this.setState({
        data: [...favoriteImages],
        renderObject: this.splitDataToColumns(favoriteImages),
        hasError: false,
      });
      this.ref.current.complete();
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.loadImageFromLocalStorage();
  }

  splitDataToColumns = (newData) => {
    const newRenderObject = [...this.state.renderObject];
    let counter = 0;

    while (counter < newData.length) {
      newRenderObject[counter % 3].images.push(newData[counter]);
      counter++;
    }
    return newRenderObject;
  };

  render() {
    const loadSuccess = this.state.data !== null;
    const noImage = this.state.data.length === 0;
    return (
      <>
        <LoadingBar color="#f11946" ref={this.ref} shadow={true} />
        {!loadSuccess && <LoadingCircle />}
        {loadSuccess && (
          <>
            {noImage && (
              <div>
                No image saved yet. Press star button to save some images
              </div>
            )}
            {!noImage && <div>Saved Photos</div>}
            <DisplayArea>
              <ImageArea>
                {this.state.renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ExploreImage key={item.id} item={item} restrict />
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </DisplayArea>
          </>
        )}
      </>
    );
  }
}
