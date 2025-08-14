import { Menu } from "./pages/Menu";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />  
      <Menu />       
    </>
  );
}

export default App;
