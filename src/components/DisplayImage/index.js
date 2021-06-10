import { StyledImg } from "./DisplayImage.styles";
export default function Image(props) {
  return (
      <StyledImg src={props.url} />
  );
}
