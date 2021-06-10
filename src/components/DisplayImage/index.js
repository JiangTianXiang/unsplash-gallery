import {ImageContainer} from "./DisplayImage.styles";
export default function Image(props) {
  return (
    <>
      <ImageContainer image={props.url}/>
    </>
  );
}
