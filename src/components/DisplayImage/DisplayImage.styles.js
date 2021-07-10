import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  ${(props) => props.imageContainerCSS};
  padding-left: 35px;
  padding-right: 35px;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => `${props.placeholderColor || "grey"}`};
  width: 830px;
  border-radius: 8px;
  transition: 0.5s;
`;

export const defaultImageCSS = css`
  width: 100%;
  height: 100%;
  min-height: 530px;
`;

export const portraitImageCSS = css`
  width: 100%;
  height: 100%;
  max-height: 800px;
`;

export const ImageArea = styled.img`
  ${(props) => props.imageCSS}
  object-fit:${(props) => `${props.objectFit || "cover"}`};
  border-radius: 8px;
  min-width: 830px;
`;

export const defaultImageContainerCSS = css`
  width: 100%;
  height: 100%;
  min-height: 530px;
`;