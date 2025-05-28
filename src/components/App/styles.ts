import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
  * {
    color: #ffffff;
    font-family: 'montserrat';
  }

  *:focus {
    outline: none;
  }

  body {
    margin: 0;
  }
`;
