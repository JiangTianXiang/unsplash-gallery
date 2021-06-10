import React from "react";
import axios from "axios";
export default class ApiCall extends React.Component {
  state = {
    data: null,
    hasError: false,
    isLoading: false,
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true, hasError: false });
      const response = await axios(
        `https://api.unsplash.com/photos/?client_id=Hq0j6DyWf2PdMPFtpxM32s74jwFbvcnGPpAaHjJXb1o`
      );
      const newList = response.data;
      console.log(newList);
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
      this.state.data !== null &&
      this.props.passData(this.state)
    );
  }
}
