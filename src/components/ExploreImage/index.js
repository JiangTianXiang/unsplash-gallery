import { StyledImg } from "./ExploreImage.styles";
export default function Image(props) {
  return (
      <StyledImg src={props.item.urls.small} />
  );
}
