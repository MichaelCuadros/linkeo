// App.jsx
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Config from "./pages/Config";
import LinkSingle from "./pages/perro";
import LinkMenu from "./pages/Menu2";
import Login from "./pages/login"; // si usas Step2 como login, puedes reemplazarlo
import Tarjeta from "./pages/tarjeta";
import LandingPage from "./pages/land";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/config"
            element={
              <RequireAuth>
                <Config />
              </RequireAuth>
            }
          />
          <Route
            path="/designCard"
            element={
              <RequireAuth>
                <Tarjeta />
              </RequireAuth>
            }
          />
          <Route path="/step1" element={<LinkMenu />} />
          <Route path="/step2" element={<LinkSingle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
