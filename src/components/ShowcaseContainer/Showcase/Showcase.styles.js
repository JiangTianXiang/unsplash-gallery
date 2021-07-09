import styled, { css } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => `${props.placeholderColor || "grey"}`};
  transition: 2s;
  border-radius: 8px;
`;

export const defaultImageCSS = css`
  width: 160px;
  height: 234px;
  border-radius: 8px;
`;

export const DisplayImage = styled.img`
  transition: 0.5s ease;
  ${(props) => props.imageCSS}
  object-fit:${(props) => `${props.objectFit || "cover"}`};
`;

export const defaultImageContainerCSS = css`
  width: 160px;
  height: 234px;
  flex-basis: 100%;
  margin-left: 11px;
  margin-right: 11px;
`;

export const MoreInfoDiv = styled.div`
  position: absolute;
  transition: 0.5s ease;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
`;

export const TitleDiv = styled.div`
  position: absolute;
  color: white;
  font-weight: 600;
  font-size: 14px;
  bottom: 19px;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const CollectionInfoDiv = styled.div`
  font-size: 18px;
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
