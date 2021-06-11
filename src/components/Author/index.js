import { UserContainer, UserName, Avatar } from "./Author.styles";

export default function Author(props) {
  return (
    <UserContainer to={`/user/${props.getUser.username}`}>
      <Avatar image={props.getUser.profile_image.large} />
      <UserName>{props.getUser.username}</UserName>
    </UserContainer>
  );
}
