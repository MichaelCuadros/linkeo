// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
*, *::before, *::after { box-sizing: border-box; }
html, body, #root { height: 100%; }
html, body { margin: 0; padding: 0; font-family: Inter, system-ui, Arial, sans-serif; }
`;


export default GlobalStyle;