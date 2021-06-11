import { Link } from "react-router-dom";
import styled from "styled-components";
export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  margin: 8px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const PhotosAndSelectionsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledLink = styled(Link) `
    margin: 16px;
    font-size: 32px;
    font-family: "Poppins";
`
