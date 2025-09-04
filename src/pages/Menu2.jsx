import React from "react";
import styled, { keyframes } from "styled-components";

/* Animación sutil */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* Layout */
const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(1200px 600px at -10% 0%, #60a5fa 0%, transparent 50%),
    radial-gradient(900px 500px at 110% 10%, #34d399 0%, transparent 45%),
    #0b1220;
`;
const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
  animation: ${fadeUp} .35s ease-out both;
`;
const Title = styled.h1`
  margin: 0 0 8px;
  color: #fff;
  font-size: 24px;
  letter-spacing: .2px;
`;
const Subtitle = styled.p`
  margin: 0 0 18px;
  color: #cbd5e1;
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Card = styled.button`
  text-align: left;
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(6px);
  padding: 18px;
  cursor: pointer;
  transition: transform .06s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease;
  box-shadow: 0 16px 40px rgba(0,0,0,.16);
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 14px;

  &:hover { transform: translateY(-1px); box-shadow: 0 22px 50px rgba(0,0,0,.22); }
  &:focus-visible { outline: 3px solid rgba(99,102,241,.35); outline-offset: 2px; }
`;

const IconWrap = styled.div`
  width: 56px; height: 56px; border-radius: 14px;
  display: grid; place-items: center;
  color: #111827;
  background: #f1f5f9;
`;

const CardTitle = styled.div`
  font-weight: 800; color: #0f172a; margin: 2px 0 6px; font-size: 16px;
`;
const CardText = styled.div`
  color: #475569; font-size: 13px; line-height: 1.35;
`;

/* Iconos */
const LinkIcon = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M10.5 13.5a4.5 4.5 0 0 0 6.4.1l2.5-2.5a4.5 4.5 0 0 0-6.3-6.3l-1.5 1.5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M13.5 10.5a4.5 4.5 0 0 0-6.4-.1L4.6 12.9a4.5 4.5 0 0 0 6.3 6.3l1.5-1.5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const SparkIcon = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 2l2.2 5.4L20 9l-5.2 2.1L12 16l-2.8-4.9L4 9l5.8-1.6L12 2Z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="19" cy="19" r="2" fill="currentColor"/>
  </svg>
);

/* Componente */
export default function Step1({ onSimple, onCustom }) {
  const handleSimple = () => {
    if (onSimple) return onSimple();
    alert("Elegiste: Enlazar una sola página web");
  };
  const handleCustom = () => {
    if (onCustom) return onCustom();
    alert("Elegiste: Modo personalizado");
  };

  return (
    <Page>
      <Wrap>
        <Title>Elige el tipo de enlace</Title>
        <Subtitle>Selecciona una opción para continuar.</Subtitle>

        <Grid>
          <Card onClick={handleSimple} aria-label="Enlazar una sola página web">
            <IconWrap><LinkIcon /></IconWrap>
            <div>
              <CardTitle>Una sola página web</CardTitle>
              <CardText>Ingresa una URL (por ejemplo, https://tusitio.com) y la tarjeta abrirá ese enlace.</CardText>
            </div>
          </Card>

          <Card onClick={handleCustom} aria-label="Enlace personalizado">
            <IconWrap><SparkIcon /></IconWrap>
            <div>
              <CardTitle>Personalizado</CardTitle>
              <CardText>Crea un destino más completo: múltiples links, botones, redes, o contenido a medida.</CardText>
            </div>
          </Card>
        </Grid>
      </Wrap>
    </Page>
  );
}
