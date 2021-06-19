import downloadIcon from "utils/resources/Icon-feather-download.svg";
import {
  DownloadContainer,
  DownloadIcon,
  DownloadText,
} from "./Download.styles";

export const Download = (props) => {
  return (
    <DownloadContainer href={props.url} target="_blank">
      <DownloadIcon src={downloadIcon} />
      <DownloadText>Download</DownloadText>
    </DownloadContainer>
  );
};
