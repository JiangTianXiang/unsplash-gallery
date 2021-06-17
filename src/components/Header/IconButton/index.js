import {
  StyledLink,
  IconContainer,
  FunctionDescription,
  StyledLinkIcon,
} from "components/StyledLink";

const IconButton = (props) => {
  const handleClick = () => {
    props.handleSelected(props.description);
  };

  return (
    <StyledLink to={props.to || ""} onClick={handleClick}>
      <IconContainer selected={props.selected}>
        <StyledLinkIcon src={props.icon} alt="Explore" />
      </IconContainer>
      <FunctionDescription>{props.description}</FunctionDescription>
    </StyledLink>
  );
};

export default IconButton;
