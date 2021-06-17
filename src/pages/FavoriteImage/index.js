import React from "react";
import { DisplayArea, ImageColumn, ImageArea } from "./FavoriteImage.styles";
import ExploreImage from "components/ExploreImage";

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

  loadImageFromLocalStorage = () => {
    try {
      const favoriteImages = JSON.parse(localStorage.getItem("favoriteImages"));
      this.setState({
        data: [favoriteImages],
        renderObject: this.splitDataToColumns(favoriteImages),
        hasError: false,
      });
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
    return (
      loadSuccess && (
        <>
          <div>Saved Photos</div>
          <DisplayArea>
            <ImageArea>
              {this.state.renderObject.map((column) => (
                <ImageColumn key={column.key}>
                  {column.images.map((item, index) => (
                    <ExploreImage key={column.key * index} item={item} />
                  ))}
                </ImageColumn>
              ))}
            </ImageArea>
          </DisplayArea>
        </>
      )
    );
  }
}
