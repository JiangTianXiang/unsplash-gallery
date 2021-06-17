import { Link } from "react-router-dom";
import styled from "styled-components";

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`;

export const ImageArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-left: 14px;
  padding-right: 14px;
  width: 928px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const PhotosAndSelectionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  margin: 16px;
  font-size: 32px;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  background-color: ${(props) => props.theme.secondary};
`;

export const UnderScoredLink = styled(Link)`
  margin: 16px;
  font-size: 32px;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  background-color: ${(props) => props.theme.secondary};
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
