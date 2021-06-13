import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  ${(props) => props.imageContainerCSS};
`;

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
    ${(props) => props.imageCSS}
    object-fit:${(props) => `${props.objectFit || "cover"}`};
`;

export const defaultImageContainerCSS = css`
  width: 100%;
  height: auto;
`;