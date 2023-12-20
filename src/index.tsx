import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "normalize.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PT Sans';
    src: url('fonts/ptsans-regular-webfont.woff2') format('woff2'),
         url('fonts/ptsans-regular-webfont.woff') format('woff');
    font-weight: 400;
    font-style: normal;

  }

  @font-face {
    font-family: 'PT Sans';
    src: url('fonts/ptsans-bold-webfont.woff2') format('woff2'),
        url('fonts/ptsans-bold-webfont.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('fonts/bebasneue-regular-webfont.woff2') format('woff2'),
        url('fonts/bebasneue-regular-webfont.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    font-family: 'PT Sans', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
