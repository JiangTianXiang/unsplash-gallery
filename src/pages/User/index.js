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
  ImageContainer,
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
      const imagesPerColumn = Math.floor(newList.length / 3);
      this.setState({
        isLoading: false,
        user: newList[0].user,
        data: [
          { key: Math.random(), images: newList.slice(0, imagesPerColumn) },
          { key: Math.random(), images: newList.slice(imagesPerColumn, 2 * imagesPerColumn) },
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

  render() {
    const loadedSuccess = !this.state.isLoading && this.state.data !== null;
    return (
      loadedSuccess && (
        <DisplayArea>
          <UserInfoContainer>
            <Avatar src={this.state.user.profile_image.large} />
            <UserInfo>
              <UserName>{this.state.user.username}</UserName>
              <UserDetail>
                <DetailDiv>{`${this.state.user.total_likes} likes`}</DetailDiv>
                <DetailDiv>{`${this.state.user.total_photos} photos`}</DetailDiv>
                <DetailDiv>{`${this.state.user.total_collections} collections`}</DetailDiv>
              </UserDetail>
            </UserInfo>
          </UserInfoContainer>
          <ImageContainer>
            {this.state.data.map((column) => (
              <ImageColumn key={column.key}>
                {column.images.map((item) => (
                  <ExploreImage key={item.id} item={item}/>
                ))}
              </ImageColumn>
            ))}
          </ImageContainer>
        </DisplayArea>
      )
    );
  }
}
