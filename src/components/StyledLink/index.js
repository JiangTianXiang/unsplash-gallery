import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  background-color: ${(props) => props.theme.secondary};

  margin-bottom: 6px;
`;

export const StyledLinkIcon = styled.img``;

export const IconContainer = styled.div`
  width: 49px;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FunctionDescription = styled.div`
  font-size: 8px;
  color: #999999;
`;

export const IconButton = (props) => {
  return (
    <StyledLink to="/explore">
      <IconContainer>
        <StyledLinkIcon src={props.icon} alt="Explore" />
      </IconContainer>
      <FunctionDescription>{props.description}</FunctionDescription>
    </StyledLink>
  );
}
