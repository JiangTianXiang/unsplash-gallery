import { StyledImg } from "./ImageCollection.styles";
export default function Image(props) {
  return (
    <StyledImg src={props.item.cover_photo.urls.small} />
  );
}
