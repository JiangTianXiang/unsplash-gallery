import React from "react";
import axios from "axios";
import ImageAndUser from "components/ImageAndUser";
import { DisplayArea } from "./Home.styles";

export default class Home extends React.Component {
  state = {
    data: null,
    hasError: false,
    isLoading: false,
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true, hasError: false });
      const response = await axios(
        `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`
      );
      const newList = response.data;
      this.setState({ isLoading: false, data: newList });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      !this.state.isLoading &&
      this.state.data !== null && (
        <>
          <DisplayArea>
            {this.state.data.map((item) => {
              return <ImageAndUser key={item.id} item={item} />;
            })}
          </DisplayArea>
        </>
      )
    );
  }
}
