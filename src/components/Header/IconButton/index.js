import {
  StyledLink,
  IconContainer,
  FunctionDescription,
  StyledLinkIcon
} from "components/StyledLink";

export const IconButton = (props) => {
  return (
    <StyledLink to={props.to || ""}>
      <IconContainer>
        <StyledLinkIcon src={props.icon} alt="Explore" />
      </IconContainer>
      <FunctionDescription>{props.description}</FunctionDescription>
    </StyledLink>
  );
};
