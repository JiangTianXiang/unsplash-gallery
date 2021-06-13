import styled, { css } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => `${props.placeholderColor || "grey"}`};
  transition: 2s;
`;

export const defaultImageCSS = css`
  width: 100%;
  height: 100%;
`;

export const DisplayImage = styled.img`
  transition: 0.5s ease;
  ${(props) => props.imageCSS}
  object-fit:${(props) => `${props.objectFit || "cover"}`};
`;

export const defaultImageContainerCSS = css`
  width: 100%;
  height: auto;
`;

export const MoreInfoDiv = styled.div`
  position: absolute;
  transition: 0.5s ease;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
`;

export const LikeInfoDiv = styled.div`
  font-size: 32px;
`;

export const Container = styled.div`
  position: relative;
  ${(props) => props.imageContainerCSS};
  &:hover {
    ${DisplayImage} {
      opacity: 0.3;
    }
    ${MoreInfoDiv} {
      opacity: 1;
    }
  }
`;
