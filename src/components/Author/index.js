import {
  UserContainer,
  UserName,
  UserAndTimeContainer,
  Avatar,
  ShowMore,
  ImageAndUserHeader,
  LastUpdateTime,
} from "./Author.styles";
import showMoreIcon from "utils/resources/Icon-show-detail.png";

export default function Author(props) {
  return (
    <ImageAndUserHeader>
      <UserContainer to={`/user/${props.getUser.username}`}>
        <Avatar image={props.getUser.profile_image.large} />
        <UserAndTimeContainer>
          <UserName>{props.getUser.username}</UserName>
          <LastUpdateTime>{props.timeStamp}</LastUpdateTime>
        </UserAndTimeContainer>
      </UserContainer>
      <ShowMore image={showMoreIcon} />
    </ImageAndUserHeader>
  );
}
