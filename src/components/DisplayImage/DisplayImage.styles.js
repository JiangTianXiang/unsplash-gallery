import styled from "styled-components";

export const ImageContainer = styled.div`
  display: flex;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  cursor: pointer;
  min-height: 30vmin;
  max-height: 700px;
  width: 800px;
  
  border-radius: 16px;
`;
