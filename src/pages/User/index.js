import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
import LoadingCircle from "components/LoadingCircle";
import { ExploreImage, ImageCollection } from "components";
import {
  getUserFeed,
  getUserInfo,
  getUserCollection,
  resetState,
  incrementPage,
} from "store/userFeed/userFeedAction";
import {
  DisplayArea,
  ImageColumn,
  UserInfoContainer,
  Avatar,
  UserInfo,
  BoldText,
  UserDetail,
  DetailDiv,
  ImageContainer,
  ImageArea,
  LightText,
  UserCollection,
  CollectionContainer,
  CollectionTitle,
} from "./User.styles";

const MAX_USER_COLLECTIONS = 7;
function User(props) {
  const ref = React.createRef();
  useEffect(() => {
    const loadingBar = ref.current;
    isLoading ? loadingBar.continuousStart() : loadingBar.complete();
    return function cleanup() {
      loadingBar.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userFeed.isLoading]);

  useEffect(() => {
    if (props.userFeed.page !== 1) {
      props.getUserFeed(props.match.params.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userFeed.page]);

  useEffect(() => {
    props.getUserInfo(props.match.params.name);
    props.getUserCollection(props.match.params.name);
    props.getUserFeed(props.match.params.name);
    return function cleanup() {
      props.resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertToThousand = (stat) => {
    if (stat >= 1000) {
      return `${Math.round(stat / 10) / 100}k `;
    }
    return `${stat}`;
  };

  const {
    data,
    isLoading,
    hasError,
    renderObject,
    user,
    isCollectionLoading,
    userCollections,
  } = props.userFeed;

  const hasData = !hasError && userCollections && !!data.length;

  const {
    totalPhotos,
    followers,
    following,
    name,
    profileImage,
    portfolioUrl,
  } = user || {};

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} shadow={true} />
      {hasData && (
        <DisplayArea>
          <UserInfoContainer>
            <Avatar src={profileImage} />
            <UserInfo>
              <BoldText>{name}</BoldText>
              {portfolioUrl && (
                <LightText href={portfolioUrl} target="_blank">
                  {portfolioUrl}
                </LightText>
              )}
              <UserDetail>
                {totalPhotos && (
                  <DetailDiv>
                    <BoldText>{convertToThousand(totalPhotos)}</BoldText>
                    <LightText>Photos</LightText>
                  </DetailDiv>
                )}
                {followers && (
                  <DetailDiv>
                    <BoldText>{convertToThousand(followers)}</BoldText>
                    <LightText>Followers</LightText>
                  </DetailDiv>
                )}
                {!!following && (
                  <DetailDiv>
                    <BoldText>{convertToThousand(following)}</BoldText>
                    <LightText>Following</LightText>
                  </DetailDiv>
                )}
              </UserDetail>
            </UserInfo>
          </UserInfoContainer>
          {!!userCollections.length && (
            <UserCollection>
              {userCollections.map((item, index) => {
                if (index < MAX_USER_COLLECTIONS) {
                  return (
                    <CollectionContainer>
                      <ImageCollection user key={item.id} item={item} />
                      <CollectionTitle>{item.title}</CollectionTitle>
                    </CollectionContainer>
                  );
                }
                return null;
              })}
            </UserCollection>
          )}
          <InfiniteScroll
            dataLength={data.length}
            next={props.incrementPage}
            hasMore={data.length < totalPhotos}
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
      {(isLoading || isCollectionLoading) && <LoadingCircle />}
    </>
  );
}

const mapStateToProps = (state) => ({
  userFeed: state.userFeed,
});

const mapDispatchToProps = {
  getUserFeed,
  getUserInfo,
  getUserCollection,
  resetState,
  incrementPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
