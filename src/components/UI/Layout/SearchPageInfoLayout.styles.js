import { Link } from "react-router-dom";
import styled from "styled-components";

export const DisplayArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  background-color: #f9fafb;
`;

export const PhotosAndSelectionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  width: 900px;
`;

export const StyledLink = styled(Link)`
  font-size: 32px;
  color: #7B7B7B;
  opacity: 0.39;
  text-decoration: none;
  flex-basis: 100%;
`;

export const UnderScoredLink = styled(Link)`
  font-size: 32px;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  flex-basis: 100%;
  border-bottom: 5px solid ${(props) => props.theme.main};
`;

export const PhotoResultDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PhotoSelectionSwitch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;