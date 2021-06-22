import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserUrl } from "utils";
import { ExploreImage } from "components";
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
  ImageArea,
} from "./User.styles";

export default class User extends React.Component {
  state = {
    data: [],
    renderObject: [
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
      { key: Math.random(), images: [] },
    ],
    hasError: false,
    user: null,
    page: 1,
    maxPage: 0,
    totalResult: 0,
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

  getData = async () => {
    try {
      const response = await axios(
        getUserUrl({
          page: this.state.page,
          userName: this.props.match.params.name,
        })
      );
      const newList = response.data;
      this.setState({
        user: newList[0].user,
        data: [...this.state.data, newList],
        renderObject: this.splitDataToColumns(newList),
        page: this.state.page + 1,
        totalResult: newList[0].user.total_photos,
        maxPage: Math.floor(newList[0].user.total_photos / 30),
        hasError: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({ hasError: true });
    }
  };

  componentDidMount() {
    this.getData();
    document.body.style.overflow = "unset";
    this.setState({ page: 1 });
  }

  render() {
    const loadedSuccess = this.state.data.length && this.state.user !== null;
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
          <InfiniteScroll
            dataLength={this.state.renderObject[0].images.length}
            next={this.getData}
            hasMore={this.state.page <= this.state.maxPage}
            loader={<h4>Loading...</h4>}
          >
            <ImageContainer>
              <ImageArea>
                {this.state.renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ExploreImage key={item.id} item={item} restrict/>
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </ImageContainer>
          </InfiniteScroll>
        </DisplayArea>
      )
    );
  }
}
