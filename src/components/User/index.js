import Image from "../DisplayImage";
export default function User(props) {
    console.log(props);
    return (
      <>
        <div>{props.getUser.username}</div>
        <Image getImageUrl={props.getUser.profile_image.small}/>
      </>
    );
  }