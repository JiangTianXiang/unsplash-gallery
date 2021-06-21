import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 600px;
  padding-left: 35px;
  padding-right: 35px;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => `${props.placeholderColor || "grey"}`};
  max-width: 830px;
  border-radius: 8px;
  transition: 0.5s;
`;

export const ImageArea = styled.img`
  width: 100%;
  height: 100%;
  max-height: 600px;
  object-fit:${(props) => `${props.objectFit || "cover"}`};
  border-radius: 8px;
  min-width: 600px;
`;