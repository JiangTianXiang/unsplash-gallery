import { UserContainer, UserName, Avatar } from "./User.styles";

export default function User(props) {
  return (
    <UserContainer>
      <Avatar image={props.getUser.profile_image.small} />
      <UserName>{props.getUser.username}</UserName>
    </UserContainer>
  );
}
