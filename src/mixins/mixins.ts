import { Color } from "@/const/const";
import { css } from "styled-components";

const ResetHeading = css`
  margin: 0;
  color: ${Color.BlackBlue};
`;

const ResetText = css`
  margin: 0;
  color: ${Color.BlackBlue};
`;

const ResetButton = css`
  cursor: pointer;
  padding: 0;
  border: none;
  background-color: transparent;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
`;

export { ResetHeading, ResetText, ResetButton };
