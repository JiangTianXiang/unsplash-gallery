import styled, { css } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => `${props.placeholderColor || "grey"}`};
  transition: 0.5s;
  border-radius: 8px;
`;

export const defaultImageCSS = css`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const DisplayImage = styled.img`
  transition: 0.5s ease;
  ${(props) => props.imageCSS}
  object-fit:${(props) => `${props.objectFit || "cover"}`};
`;

export const defaultImageContainerCSS = css`
  max-width: 100%;
  min-height: ${(props) => `${props.minHeight}`};
`;

export const restrictedImageContainerCss = css`
  width: 265px;
  height: 265px;
`;

export const restrictedImageCss = css`
  width: 265px;
  height: 265px;
  border-radius: 8px;
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
  margin-bottom: 28px;
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
