import errorImage from "utils/resources/404.jpg";
import { ErrorMemes } from "./ErrorPage.styles";
export default function errorPage() {
  return (
      <ErrorMemes src={errorImage} alt={"404"} />
  );
}
