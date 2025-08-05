import StyledButton from "./Button.styles";

export const Button = ({ color = "blue", label="button" }) => {
  return <StyledButton color={color}>{label}</StyledButton>;
};
