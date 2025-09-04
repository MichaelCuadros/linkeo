// src/pages/Dashboard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../context/AuthContext";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background:
    radial-gradient(1200px 600px at -10% 0%, #60a5fa 0%, transparent 50%),
    radial-gradient(900px 500px at 110% 10%, #34d399 0%, transparent 45%),
    #0b1220;
`;

const Nav = styled.nav`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(11,18,32,.55); backdrop-filter: blur(8px);
`;
const Brand = styled(Link)`
  text-decoration: none; color: #fff; font-weight: 800; letter-spacing: .3px; font-size: 18px;
`;
const NavActions = styled.div` display: flex; gap: 8px; flex-wrap: wrap; align-items: center; `;
const NavBtn = styled(Link)`
  text-decoration: none; padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,.18);
  color: #e5e7eb; background: rgba(255,255,255,.05); transition: background .15s ease, transform .04s ease;
  &:hover { background: rgba(255,255,255,.12); } &:active { transform: translateY(1px); }
`;
const UserBadge = styled.span`
  color: #cbd5e1; font-size: 14px; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,.08);
`;
const LogoutBtn = styled.button`
  padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,.18); color: #fca5a5;
  background: rgba(255,255,255,.05); cursor: pointer; &:hover { background: rgba(239,68,68,.15); }
`;

const Wrap = styled.div`
  width: 100%; max-width: 1040px; margin: 0 auto; padding: 22px 18px 40px; animation: ${fadeUp} .35s ease-out both;
`;
const Header = styled.header`
  color: #e5e7eb; margin-bottom: 18px;
  h1 { margin: 0 0 6px; font-size: 24px; color: #fff; }
  p  { margin: 0; color: #cbd5e1; font-size: 14px; }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 16px;
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;
const Card = styled(Link)`
  text-decoration: none; border: 1px solid #e5e7eb; border-radius: 18px; background: rgba(255,255,255,0.96);
  backdrop-filter: blur(6px); padding: 18px; display: grid; grid-template-columns: 56px 1fr; gap: 14px;
  box-shadow: 0 18px 42px rgba(0,0,0,.18);
  transition: transform .06s ease, box-shadow .2s ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 24px 56px rgba(0,0,0,.24); }
  &:focus-visible { outline: 3px solid rgba(99,102,241,.35); outline-offset: 2px; }
`;
const IconWrap = styled.div`
  width: 56px; height: 56px; border-radius: 14px; display: grid; place-items: center; color: #111827; background: #f1f5f9;
`;
const CardTitle = styled.div` font-weight: 800; color: #0f172a; margin: 2px 0 6px; font-size: 16px; `;
const CardText  = styled.div` color: #475569; font-size: 13px; line-height: 1.35; `;

const CogIcon = (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="2"/><path d="M19 12a7 7 0 0 0-.1-1l2.2-1.7-2-3.5-2.6 1A7 7 0 0 0 14 5l-.4-2.7h-3.2L10 5a7 7 0 0 0-2.5 1l-2.6-1-2 3.5L5 11a7 7 0 0 0 0 2l-2.2 1.7 2 3.5 2.6-1A7 7 0 0 0 10 19l.4 2.7h3.2L14 19a7 7 0 0 0 2.5-1l2.6 1 2-3.5L19 13c.1-.3.1-.7.1-1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>);
const CardIcon = (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M3 9h18" stroke="currentColor" strokeWidth="2"/><path d="M7 14h6" stroke="currentColor" strokeWidth="2"/></svg>);

export default function Dashboard() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const name = user?.username || user?.email || "usuario";

  const handleLogout = async () => {
    await logout();
    nav("/login", { replace: true });
  };

  return (
    <Page>
      <Nav>
        <Brand to="/dashboard">🔗 Linkeo</Brand>
        <NavActions>
          <UserBadge>Hola, {name}</UserBadge>
          <NavBtn to="/config">Configurar</NavBtn>
          <NavBtn to="/designCard">Diseñar tarjeta</NavBtn>
          <LogoutBtn onClick={handleLogout}>Cerrar sesión</LogoutBtn>
        </NavActions>
      </Nav>

      <Wrap>
        <Header>
          <h1>Dashboard</h1>
          <p>Elige a dónde ir. Puedes configurar enlaces o diseñar tu tarjeta.</p>
        </Header>

        <Grid>
          <Card to="/config" aria-label="Ir a Configurar">
            <IconWrap><CogIcon /></IconWrap>
            <div>
              <CardTitle>Configurar enlaces</CardTitle>
              <CardText>Gestiona tus redes, URLs y estilo general. Guarda o carga tu perfil desde el backend.</CardText>
            </div>
          </Card>

          <Card to="/designCard" aria-label="Ir a Diseñar tarjeta">
            <IconWrap><CardIcon /></IconWrap>
            <div>
              <CardTitle>Diseñar tarjeta</CardTitle>
              <CardText>Previsualiza tu tarjeta tipo “link-in-bio”, ajusta tipografía, fondo, botones e iconos.</CardText>
            </div>
          </Card>
        </Grid>
      </Wrap>
    </Page>
  );
}
