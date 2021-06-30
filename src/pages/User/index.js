import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { ExploreImage } from "components";
import {
  getUserFeed,
  resetState,
  incrementPage,
} from "store/userFeed/userFeedAction";
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

function User(props) {
  const ref = React.createRef();
  useEffect(() => {
    isLoading ? ref.current.continuousStart() : ref.current.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userFeed.isLoading]);

  useEffect(() => {
    if (props.userFeed.page !== 1) {
      props.getUserFeed(props.match.params.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userFeed.page]);

  useEffect(() => {
    props.resetState();
    props.getUserFeed(props.match.params.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, hasError, renderObject, user } = props.userFeed;
  const hasData = !!data.length && !hasError && user != null;
  const {
    total_likes,
    total_photos,
    total_collections,
    username,
    profile_image,
  } = user || {};
  
  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <DisplayArea>
          <UserInfoContainer>
            <Avatar src={profile_image.large} />
            <UserInfo>
              <UserName>{username}</UserName>
              <UserDetail>
                <DetailDiv>{`${total_likes} likes`}</DetailDiv>
                <DetailDiv>{`${total_photos} photos`}</DetailDiv>
                <DetailDiv>{`${total_collections} collections`}</DetailDiv>
              </UserDetail>
            </UserInfo>
          </UserInfoContainer>
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={data.length < total_photos}
            endMessage={<h4>End of Collection</h4>}
          >
            <ImageContainer>
              <ImageArea>
                {renderObject.map((column) => (
                  <ImageColumn key={column.key}>
                    {column.images.map((item) => (
                      <ExploreImage key={item.id} item={item} restrict />
                    ))}
                  </ImageColumn>
                ))}
              </ImageArea>
            </ImageContainer>
          </InfiniteScroll>
        </DisplayArea>
      )}
      {isLoading && <LoadingCircle />}
    </>
  );
}

const mapStateToProps = (state) => ({
  userFeed: state.userFeed,
});

const mapDispatchToProps = {
  getUserFeed,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
