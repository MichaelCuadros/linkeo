import styled from "styled-components";

import {colors} from "../../../styles/colors"

const StyledButton = styled.button`
  background-color: ${(props) => colors[props.color] || colors["blue"]};
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default StyledButton;