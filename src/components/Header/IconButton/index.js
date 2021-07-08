import {
  StyledLink,
  IconContainer,
  FunctionDescription,
  StyledLinkIcon,
} from "components/StyledLink";

const IconButton = (props) => {
  return (
    <StyledLink to={props.to || ""}>
      <IconContainer selected={props.selected}>
        <StyledLinkIcon src={props.icon} alt="Explore" />
      </IconContainer>
      <FunctionDescription>{props.description}</FunctionDescription>
    </StyledLink>
  );
};

export default IconButton;
