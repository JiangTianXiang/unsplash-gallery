import React from "react";
import axios from "axios";
import { getUrl } from "utils";
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
      const response = await axios(getUrl(true, false, 10));
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
    const loadSuccess = !this.state.isLoading && this.state.data !== null;
    return (
      loadSuccess && (
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
