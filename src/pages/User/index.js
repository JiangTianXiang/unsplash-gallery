import React from "react";
import axios from "axios";
import ExploreImage from "components/ExploreImage";
import {
  DisplayArea,
  ImageColumn,
  UserInfoContainer,
  Avatar,
  UserInfo,
  UserName,
  UserDetail,
  DetailDiv,
} from "./User.styles";

export default class User extends React.Component {
  state = {
    data: null,
    hasError: false,
    isLoading: false,
    user: null,
  };

  getData = async () => {
    try {
      this.setState({ isLoading: true, hasError: false });
      const response = await axios(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}&count=30&username=${this.props.match.params.name}`
      );
      const newList = response.data;

      this.setState({
        isLoading: false,
        user: newList[0].user,
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
    console.log(this.state.user);
    return (
      !this.state.isLoading &&
      this.state.data !== null && (
        <>
          <DisplayArea>
            <UserInfoContainer>
              <Avatar />
              <UserInfo>
                <UserName></UserName>
                <UserDetail>
                  <DetailDiv> </DetailDiv>
                  <DetailDiv> </DetailDiv>
                  <DetailDiv> </DetailDiv>
                </UserDetail>
              </UserInfo>
            </UserInfoContainer>
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