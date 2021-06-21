import { downloadIcon } from "utils/resources";
import {
  DownloadContainer,
  DownloadIcon,
  DownloadText,
} from "./Download.styles";

export default function Download(props) {
  return (
    <DownloadContainer href={props.url} target="_blank">
      <DownloadIcon src={downloadIcon} />
      <DownloadText>Download</DownloadText>
    </DownloadContainer>
  );
}
