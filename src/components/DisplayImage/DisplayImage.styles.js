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
  max-width: 900px;
  transition: 2s;
`;

export const defaultImageCSS = css`
  width: 100%;
  height: 100%;
`;

export const DisplayImage = styled.img`
  ${(props) => props.imageCSS}
  object-fit:${(props) => `${props.objectFit || "cover"}`};
  border-radius: 8px;
  min-width: 600px;
`;

export const defaultImageContainerCSS = css`
  width: 100%;
  height: 100%;
`;
