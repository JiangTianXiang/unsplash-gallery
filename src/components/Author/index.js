import {
  UserContainer,
  UserName,
  UserAndTimeContainer,
  Avatar,
  LastUpdateTime,
} from "./Author.styles";

export default function Author(props) {
  return (
    <UserContainer to={`/user/${props.getUser.username}`}>
      <Avatar image={props.getUser.profile_image.large} />
      <UserAndTimeContainer>
        <UserName>{props.getUser.username}</UserName>
        <LastUpdateTime>{props.timeStamp}</LastUpdateTime>
      </UserAndTimeContainer>
    </UserContainer>
  );
}
