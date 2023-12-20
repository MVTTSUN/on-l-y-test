import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "normalize.css";
import { createGlobalStyle } from "styled-components";
import ptSansRegularWoff2 from "../public/fonts/ptsans-regular-webfont.woff2";
import ptSansBoldWoff2 from "../public/fonts/ptsans-bold-webfont.woff2";
import bebasNeueRegularWoff2 from "../public/fonts/bebasneue-regular-webfont.woff2";
import ptSansRegularWoff from "../public/fonts/ptsans-regular-webfont.woff";
import ptSansBoldWoff from "../public/fonts/ptsans-bold-webfont.woff";
import bebasNeueRegularWoff from "../public/fonts/bebasneue-regular-webfont.woff";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PT Sans';
    src: url(${ptSansRegularWoff2}) format('woff2'),
         url(${ptSansRegularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;

  }

  @font-face {
    font-family: 'PT Sans';
    src: url(${ptSansBoldWoff2}) format('woff2'),
        url(${ptSansBoldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url(${bebasNeueRegularWoff2}) format('woff2'),
        url(${bebasNeueRegularWoff}) format('woff');
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
