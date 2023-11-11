import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }

  body {
    line-height: 1;
    font-size: 100%;
    font-family: Arial, sans-serif;
  }

  /* Set a default background color and text color */
  body {
    background: #fff;
    color: #333;
  }

  /* Set defaults for links */
  a {
    background-color: transparent;
    text-decoration: none;
    color: inherit;
  }

  /* Set a style for button and input elements */
  button, input {
    font-family: inherit;
    font-size: 100%;
  }
`;

export default GlobalStyle;
