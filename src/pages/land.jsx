// src/pages/LandingLinkeo.jsx
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import imagenHome from "../assets/imagen_home.png";
import imgTarjeta from "../assets/img_tarjeta.png";

/* ----------------------------- Global Styles ----------------------------- */
const Global = createGlobalStyle`
  :root{
    --primary-color: #474747;
    --primary-color-light: #fffcfa;
    --primary-color-dark: #db6e09;
    --text-dark: #18181b;
    --text-light: #6b7280;
    --white: #ffffff;
    --max-width: 1200px;
  }
  *,*::before,*::after{ box-sizing: border-box; }
  html, body { scroll-behavior: smooth; }
  body{ margin:0; font-family: "Poppins", system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans"; color: var(--text-dark); }
  img{ display:block; max-width:100%; }
  a{ text-decoration: none; }
`;

/* --------------------------------- Layout -------------------------------- */
const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

/* --------------------------------- Navbar -------------------------------- */
const Nav = styled.nav`
  position: sticky; top: 0; z-index: 20;
  background: #000; color: var(--white);
  @media (min-width: 768px){
    background: transparent; color: var(--text-dark);
  }
`;

const NavInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px){
    grid-template-columns: auto 1fr auto;
    padding: 2rem 1rem;
  }
`;

const Logo = styled.a`
  font-size: 1.5rem; font-weight: 700; color: var(--primary-color);
  span{ color: ${p => (p.$dark ? "var(--text-dark)" : "var(--white)")}; }
  @media (min-width: 768px){ span{ color: var(--text-dark);} }
`;

const MenuBtn = styled.button`
  justify-self: end;
  border: 0; background: transparent; color: inherit;
  font-size: 1.6rem; cursor: pointer;
  @media (min-width: 768px){ display: none; }
`;

const Links = styled.ul`
  grid-column: 1 / -1;
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; align-items: center; gap: 2rem;
  background: var(--primary-color-light);
  transform: translateY(${p => (p.$open ? "0%" : "-120%")});
  transition: transform .4s ease;
  padding: 2rem;
  a{ color: var(--primary-color); font-weight: 600; }
  a:hover{ color: var(--text-dark); }

  @media (min-width: 768px){
    position: static; transform: none; background: transparent; padding: 0;
    grid-column: auto; flex-direction: row; gap: 1.5rem; justify-self: center;
    a{ color: var(--text-dark); }
    a:hover{ color: var(--primary-color); }
  }
`;

const CtaWrap = styled.div`
  justify-self: end;
  a .btn{ padding: 8px 10px; border-radius: 999px; font-size: 1.4rem; }
`;

const Btn = styled.button`
  padding: .75rem 1.5rem; border: 0; border-radius: 10px;
  background: var(--primary-color); color: var(--white); cursor: pointer; font-weight: 600;
  transition: background .2s ease;
  display: inline-flex; align-items: center; gap: .5rem;
  &:hover{ background: var(--primary-color-dark); }
`;

/* --------------------------------- Sections ------------------------------- */
const Section = styled.section`
  max-width: var(--max-width); margin: 0 auto; padding: 5rem 1rem;
`;

const HeaderContainer = styled(Section)`
  display: grid; gap: 2rem; overflow: hidden;
  @media (min-width: 768px){
    grid-template-columns: 2fr 3fr; align-items: center;
  }
`;

const H1 = styled.h1`
  margin: 0 0 1rem; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.2;
  text-align: center; color: var(--text-dark);
  span{ color: var(--primary-color); }
  @media (min-width: 768px){ text-align: left; }
`;

const P = styled.p`
  color: var(--text-light); line-height: 1.75rem; margin: 0 0 2rem;
  text-align: center;
  @media (min-width: 768px){ text-align: left; }
`;

const Center = styled.div`
  text-align: center;
  @media (min-width: 768px){ text-align: left; }
`;

const Explore = styled(Section)`
  display: grid; gap: 2rem; overflow: hidden;
  @media (min-width: 768px){
    grid-template-columns: 1fr 1fr; align-items: center;
  }
`;

const H2 = styled.h2`
  margin: 0 0 1rem; font-size: clamp(1.8rem, 3vw, 2.5rem); line-height: 1.2; text-align: center;
  color: var(--text-dark);
  @media (min-width: 768px){ text-align: left; }
`;

const BannerGrid = styled(Section)`
  display: grid; gap: 1rem;
  @media (min-width: 540px){ grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 768px){ grid-template-columns: repeat(3, 1fr); }
`;

const BannerCard = styled.div`
  padding: 2rem; border-radius: 3rem; box-shadow: 5px 5px 20px rgba(0,0,0,.1);
  background: var(--white);
  transition: box-shadow .2s ease;
  &:hover{ box-shadow: 10px 10px 40px rgba(0,0,0,.12); }
  h4{ margin: .5rem 0; font-size: 1.4rem; color: var(--text-dark); }
  p{ margin: 0; color: var(--text-light); line-height: 1.75rem; }
`;

const BannerIcon = styled.span`
  display: inline-block; margin-bottom: 1rem; padding: 5px 11px;
  font-size: 2rem; color: var(--white); border-radius: 1rem; background: #000; box-shadow: 5px 5px 30px #595959;
`;

const Special = styled(Section)`
  text-align: center;
`;

const SpecialGrid = styled.div`
  margin-top: 2.5rem; display: grid; gap: 1rem;
  @media (min-width: 540px){ grid-template-columns: repeat(2,1fr); }
  @media (min-width: 768px){ grid-template-columns: repeat(3,1fr); gap: 2rem; }
`;

const Card = styled.div`
  background: var(--white); text-align: center; padding: 2rem; border-radius: 3rem;
  transition: box-shadow .2s ease;
  &:hover{ box-shadow: 10px 10px 40px rgba(0,0,0,.1); }
  img{ max-width: 200px; margin: 0 auto 1rem; filter: drop-shadow(10px 10px 20px rgba(0,0,0,.3)); }
  h4{ margin:.25rem 0 .5rem; font-size: 1.4rem; color: var(--text-dark); }
  p{ color: var(--text-light); line-height: 1.75rem; margin: 0 0 .75rem; }
`;

const Ratings = styled.div`
  margin-bottom: 1rem; color: goldenrod; font-size: 1rem;
`;

const PriceRow = styled.div`
  display: flex; gap: 10px; align-items: center; justify-content: center;
  .price{ font-size: 1.1rem; font-weight: 700; color: var(--text-dark); }
`;

const Footer = styled.footer`
  background: var(--primary-color-light);
`;

const FooterInner = styled(Section)`
  display: grid; gap: 2rem;
  @media (min-width: 540px){ grid-template-columns: 3fr 2fr; }
  @media (min-width: 768px){ grid-template-columns: 2fr repeat(3,1fr); }
`;

const FooterCol = styled.div`
  h4{ margin: 0 0 1rem; font-weight: 700; color: var(--text-dark); }
  p{ color: var(--text-light); }
  ul{ list-style:none; padding:0; margin:0; display:grid; gap:.75rem; }
  a{ color: var(--text-light); }
  a:hover{ color: var(--primary-color); }
`;

const FooterBar = styled.div`
  padding: 1rem; text-align: center; color: var(--text-light);
`;

/* ------------------------------ Landing View ------------------------------ */
export default function LandingLinkeo(){
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <Global />

      {/* NAVBAR */}
      <Nav>
        <NavInner>
          <Logo href="#home">LINKEO<span> </span></Logo>

          <MenuBtn aria-label="Menú" onClick={() => setOpen(v => !v)}>
            <i className={open ? "ri-close-line" : "ri-menu-line"} />
          </MenuBtn>

          <CtaWrap>
            <a href="https://wa.me/51987095046?text=Hola%2C%20deseo%20saber%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20tarjetas%20NFC%20de%20Linkeo" target="_blank" rel="noreferrer">
              <Btn className="btn"><i className="ri-whatsapp-line" /></Btn>
            </a>
          </CtaWrap>

          <Links $open={open} onClick={() => setOpen(false)}>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#NFC">Tecnología NFC</a></li>
            <li><a href="#Tarjetas">Tarjetas</a></li>
          </Links>
        </NavInner>
      </Nav>

      {/* HERO */}
      <HeaderContainer id="home">
        <div>
          <img src={imagenHome} alt="Tarjeta NFC Linkeo" />
        </div>
        <div>
          <H1>Conecta con <span>un solo toque</span>.</H1>
          <P>
            Con Linkeo, comparte tu perfil, redes sociales o negocio con una tarjeta NFC moderna y personal.
            Tu identidad digital, ahora al alcance de un tap.
          </P>
          <Center>
            <a href="https://wa.me/51987095046?text=Hola%2C%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20las%20tarjetas%20NFC%20de%20Linkeo" target="_blank" rel="noreferrer">
              <Btn className="btn"><i className="ri-whatsapp-line" /> Solicitar información</Btn>
            </a>
          </Center>
        </div>
      </HeaderContainer>

      {/* NFC */}
      <Explore id="NFC">
        <div>
          <img src={imgTarjeta} alt="Tarjeta NFC Linkeo" />
        </div>
        <div>
          <H2>Tarjeta NFC Inteligente</H2>
          <P>
            Conecta tu mundo digital con un solo toque. Nuestra tarjeta NFC inteligente te permite compartir tu perfil,
            redes sociales, contacto, portafolio o cualquier enlace personalizado sin apps ni complicaciones.
            Compatible con todos los dispositivos modernos.
          </P>
          <Center>
            <a href="#Tarjetas"><Btn className="btn">Conoce Más <span><i className="ri-arrow-right-line" /></span></Btn></a>
          </Center>
        </div>
      </Explore>

      {/* BANNERS */}
      <BannerGrid>
        <BannerCard>
          <BannerIcon><i className="ri-link" /></BannerIcon>
          <h4>Activa tu Tarjeta</h4>
          <p>Solo acerca tu tarjeta NFC Linkeo a un smartphone y activa tu enlace personalizado. No necesitas apps ni escáneres QR.</p>
        </BannerCard>
        <BannerCard>
          <BannerIcon><i className="ri-profile-line" /></BannerIcon>
          <h4>Personaliza tu Perfil</h4>
          <p>Te ayudamos a crear tu perfil con redes, contacto, ubicación y más. Tú envías la info, nosotros lo diseñamos por ti.</p>
        </BannerCard>
        <BannerCard>
          <BannerIcon><i className="ri-share-line" /></BannerIcon>
          <h4>Comparte con un Toque</h4>
          <p>Conecta al instante con clientes y contactos tocando la tarjeta en un teléfono. Experiencia moderna y memorable.</p>
        </BannerCard>
      </BannerGrid>

      {/* CTA EXPLORA */}
      <Explore>
        <div>
          <H2>¿Listo para conectar de verdad?</H2>
          <P>
            El mundo se mueve con un solo toque. Haz que cada encuentro sea una oportunidad con <strong>Linkeo</strong>.<br/>
            Elige la tarjeta que mejor se adapte a ti y da el siguiente paso hacia tu identidad digital.
          </P>
          <Center>
            <a href="#Tarjetas"><Btn className="btn">Conoce Más <span><i className="ri-arrow-right-line" /></span></Btn></a>
          </Center>
        </div>
        <div>
          <img src={imgTarjeta} alt="Tarjeta NFC Linkeo" />
        </div>
      </Explore>

      {/* TARJETAS */}
      <Special id="Tarjetas">
        <H2>Nuestras Tarjetas NFC</H2>
        <P>Elige el tipo de tarjeta que se adapta a tu estilo y necesidad. Todas con tecnología NFC para compartir tu identidad digital con un solo toque.</P>

        <SpecialGrid>
          {/* Personal */}
          <Card>
            <img src={imgTarjeta} alt="Tarjeta Personal" />
            <h4>Linkeo Personal</h4>
            <p>Comparte un solo enlace de forma rápida y moderna. Ideal para creadores, freelancers e influencers.</p>
            <Ratings>
              <span><i className="ri-nfc-fill" /></span>
              <span><i className="ri-user-fill" /></span>
              <span><i className="ri-smartphone-line" /></span>
            </Ratings>
            <PriceRow>
              <p className="price">Desde S/ 39.90</p>
              <a
                href="https://wa.me/51987095046?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20tarjeta%20Linkeo%20Personal"
                target="_blank" rel="noreferrer">
                <Btn className="btn">Más info</Btn>
              </a>
            </PriceRow>
          </Card>

          {/* Empresarial */}
          <Card>
            <img src={imgTarjeta} alt="Tarjeta Empresarial" />
            <h4>Linkeo Empresarial</h4>
            <p>Gestiona múltiples tarjetas para tu equipo con acceso a catálogo, WhatsApp Business y redes.</p>
            <Ratings>
              <span><i className="ri-building-line" /></span>
              <span><i className="ri-briefcase-line" /></span>
              <span><i className="ri-share-line" /></span>
            </Ratings>
            <PriceRow>
              <p className="price">Desde S/ 59.90</p>
              <a
                href="https://wa.me/51987095046?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20tarjeta%20Linkeo%20Empresarial"
                target="_blank" rel="noreferrer">
                <Btn className="btn">Más info</Btn>
              </a>
            </PriceRow>
          </Card>

          {/* Premium */}
          <Card>
            <img src={imgTarjeta} alt="Tarjeta Premium" />
            <h4>Linkeo Premium</h4>
            <p>Diseño exclusivo y perfil digital completo, editable en cualquier momento desde un solo lugar.</p>
            <Ratings>
              <span><i className="ri-star-fill" /></span>
              <span><i className="ri-bar-chart-box-line" /></span>
              <span><i className="ri-global-line" /></span>
            </Ratings>
            <PriceRow>
              <p className="price">Desde S/ 79.90</p>
              <a
                href="https://wa.me/51987095046?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20tarjeta%20Linkeo%20Premium"
                target="_blank" rel="noreferrer">
                <Btn className="btn">Más info</Btn>
              </a>
            </PriceRow>
          </Card>
        </SpecialGrid>
      </Special>

      {/* FOOTER */}
      <Footer id="contact">
        <FooterInner>
          <FooterCol>
            <Logo href="#">Link<span>eo</span></Logo>
            <p>Revoluciona tu forma de conectar. Con Linkeo, comparte tu identidad digital con una tarjeta NFC moderna, elegante y sin complicaciones.</p>
          </FooterCol>

          <FooterCol>
            <h4>Productos</h4>
            <ul>
              <li><a href="#Tarjetas">Tarjetas NFC</a></li>
              <li><a href="#">Linkeo Personal</a></li>
              <li><a href="#">Linkeo Empresarial</a></li>
              <li><a href="#">Linkeo Premium</a></li>
            </ul>
          </FooterCol>

          <FooterCol>
            <h4>Enlaces Útiles</h4>
            <ul>
              <li><a href="#">¿Cómo funciona?</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Soporte Técnico</a></li>
              <li><a href="https://wa.me/51987095046" target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
          </FooterCol>

          <FooterCol>
            <h4>Compañía</h4>
            <ul>
              <li><a href="#">Nuestra Historia</a></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </FooterCol>
        </FooterInner>
        <FooterBar>Copyright © {new Date().getFullYear()} Linkeo. Todos los derechos reservados.</FooterBar>
      </Footer>
    </Page>
  );
}
