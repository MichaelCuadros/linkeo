// App.jsx
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Menu } from "./pages/Menu";
import LinkSingle from "./pages/perro";
import LinkMenu from "./pages/Menu2";
import Login from "./pages/login";
import Tarjeta from "./pages/tarjeta";
import LandingPage from "./pages/land";

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

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />
                <Route path="/menu2" element={<LinkMenu />} />
        <Route path="/auth" element={<LinkSingle />} />
                <Route path="/login" element={<Login />} />
                  <Route path="/login2" element={<Tarjeta />} />
      </Routes>
    </>
  );
}

export default App;
