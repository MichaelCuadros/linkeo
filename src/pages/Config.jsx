// src/pages/Config.jsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API } from "../lib/api";

/* ================= ICONOS ================= */
const Icons = {
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.9-1.6A11 11 0 1 0 20.5 3.5Zm-8.9 16.4c-1.8 0-3.4-.5-4.8-1.5l-.3-.2-3.5.9.9-3.4-.2-.3a8.9 8.9 0 1 1 7.9 4.5Zm4.9-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.7.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.9.9-1.3 2.1-1.3 3.3 0 .4.1.8.2 1.1.3 1 .9 1.9 1.1 2.2.2.3 2.1 3.2 5.1 4.5 3 .1 3.6.1 5.8-2.1.3-.4.4-.8.3-1-.2-.1-.5-.2-.9-.4Z"
      />
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2.2.7 3.4.7.7 0 1.2.5 1.2 1.2V20c0 1.1-.9 2-2 2C9.7 22 2 14.3 2 4c0-1.1.9-2 2-2h3.1c.7 0 1.2.5 1.2 1.2 0 1.2.2 2.4.7 3.4.2.4.1.9-.2 1.2L6.6 10.8Z"
      />
    </svg>
  ),
  email: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  ),
  instagram: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.5-8.9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM20 2H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 18H4V4h16v16Z"
      />
    </svg>
  ),
  tiktok: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M19 7.8a6.6 6.6 0 0 1-4.2-2V14a5 5 0 1 1-5.6-5 4.9 4.9 0 0 1 1.6.1V11a3 3 0 1 0 2 2.8V2h2.2a4.3 4.3 0 0 0 4.1 3.3V7.8Z"
      />
    </svg>
  ),
  facebook: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.8 1.8-1.8H17V2.1A25 25 0 0 0 14.6 2C12 2 10 3.8 10 7.1V10H7v4h3v8h3Z"
      />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M6.9 6.8A2.1 2.1 0 1 1 7 2.6a2.1 2.1 0 0 1-.1 4.2ZM3.9 8.7H9v12.4H3.9V8.7ZM13 8.7h4.7v1.8c.7-1.2 2-2.1 4.1-2.1v4.4H21c-2.4 0-2.8 1.1-2.8 2.8v5.6H13V8.7Z"
      />
    </svg>
  ),
  youtube: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M22 12c0-2.1-.2-3.6-.6-4.5-.3-.8-1-1.4-1.8-1.7C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.6A3.1 3.1 0 0 0 2.6 7.5C2.2 8.4 2 9.9 2 12s.2 3.6.6 4.5c.3.8 1 1.4 1.8 1.7 1.7.6 7.6.6 7.6.6s5.9 0 7.6-.6c.8-.3 1.5-.9 1.8-1.7.4-.9.6-2.4.6-4.5ZM10 15.5v-7l6 3.5-6 3.5Z"
      />
    </svg>
  ),
  website: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9H15c-.1-2.1-.7-4-1.6-5.6A8 8 0 0 1 18.9 11ZM9 11H5.1A8 8 0 0 1 10.6 5.4C9.7 7 9.1 8.9 9 11Zm0 2c.1 2.1.7 4 1.6 5.6A8 8 0 0 1 5.1 13H9Zm2 0h2c-.1 1.9-.6 3.6-1 4.7-.4-1.1-.9 2.8-1 4.7Zm0-2c.1-1.9.6-3.6 1-4.7.4 1.1.9 2.8 1 4.7h-2Zm2.4 7.6c.9-1.6 1.5-3.5 1.6-5.6h3.9a8 8 0 0 1-5.5 5.6ZM14.9 11c-.1-2.1-.7-4-1.6-5.6A8 8 0 0 1 18.9 11h-4Z"
      />
    </svg>
  ),
  x: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M4 3h5l3.6 5.1L17 3h3l-5.8 8.1L21 21h-5l-4-5.7L7 21H4l6.3-9L4 3Z"
      />
    </svg>
  ),
  telegram: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M9.1 13.1 17.8 7 6.7 11.4l2.4 1.7v4.1l3.1-2.8 3.5 2.5c.4.2.8 0 .9-.5l2.2-10c.1-.6-.4-1.1-1-1L3.6 9.4c-.8.3-.7 1.5.1 1.7l5.4 1.4Z"
      />
    </svg>
  ),
  pdf: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm2 18H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-7V3.5L18.5 9H13Z"
      />
    </svg>
  ),
  custom: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M12 2 9.5 8H3l5.2 3.8L6.6 18 12 14.4 17.4 18l-1.6-6.2L21 8h-6.5L12 2Z"
      />
    </svg>
  ),
};

/* ================= Plataformas y placeholders ================= */
const PLATFORMS = [
  { key: "whatsapp", name: "WhatsApp", brand: "#25D366" },
  { key: "phone", name: "Teléfono", brand: "#0ea5e9" },
  { key: "email", name: "Email", brand: "#0ea5e9" },
  { key: "instagram", name: "Instagram", brand: "#C13584" },
  { key: "tiktok", name: "TikTok", brand: "#000000" },
  { key: "facebook", name: "Facebook", brand: "#1877F2" },
  { key: "linkedin", name: "LinkedIn", brand: "#0A66C2" },
  { key: "youtube", name: "YouTube", brand: "#FF0000" },
  { key: "website", name: "Página Web", brand: "#0ea5e9" },
  { key: "x", name: "X (Twitter)", brand: "#111111" },
  { key: "telegram", name: "Telegram", brand: "#229ED9" },
  { key: "pdf", name: "PDF", brand: "#6b7280" },
  { key: "custom", name: "Personalizado", brand: "#7c3aed" },
];
const PLACEHOLDERS = {
  whatsapp: "https://wa.me/51999999999",
  phone: "tel:+51999999999",
  email: "mailto:tu@correo.com",
  instagram: "https://instagram.com/usuario",
  tiktok: "https://www.tiktok.com/@usuario",
  facebook: "https://facebook.com/tu.pagina",
  linkedin: "https://linkedin.com/in/usuario",
  youtube: "https://youtube.com/@canal",
  website: "https://tu-dominio.com",
  x: "https://x.com/usuario",
  telegram: "https://t.me/usuario",
  pdf: "Sube un PDF o pega una URL",
  custom: "https://enlace-o-protocolo",
};

/* ================= Helpers ================= */
const normalizeUrl = (url) => {
  if (!url) return "";
  if (
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  )
    return url;
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
};
const isValidUrl = (url) => {
  if (!url) return false;
  if (
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  )
    return true;
  try {
    new URL(normalizeUrl(url));
    return true;
  } catch {
    return false;
  }
};

/* ================= UI BASE ================= */
const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px 60px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  h1 {
    margin: 0;
    font-size: 22px;
  }
`;
const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Btn = styled.button`

  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }
`;

/* ====== Grid ====== */
const Grid = styled.div`
  display: grid;
  align-items: start;
  gap: 18px;
  grid-template-areas: "editor" "phone";
  grid-template-columns: 1fr;
  @media (min-width: 980px) {
    grid-template-areas: "editor phone";
    grid-template-columns: minmax(0, 1.35fr) minmax(360px, 0.8fr);
  }
`;
const EditorCol = styled.div`
  grid-area: editor;
`;
const PhoneCol = styled.div`
  grid-area: phone;
  display: flex;
  flex-direction:column;
  justify-content: center;
  position: static;
  top: auto;
  @media (min-width: 980px) {
    position: sticky;
    top: 16px;
  }
`;

/* ====== “Móvil” ====== */
const Phone = styled.div`
  width: ${(p) => p.$w}px;
  border-radius: 36px;
  padding: 12px;
  background: #e5e7eb;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  border: 1px solid #d1d5db;
  max-height: 85vh;
  overflow: hidden;
`;
const Preview = styled.div`
  border-radius: 28px;
  padding: ${(p) => p.$pad}px;
  padding-top: calc(${(p) => p.$pad}px + ${(p) => p.$offset}px);
  color: ${(p) => p.$color || "#111827"};
  ${(p) =>
    p.$bgImage
      ? `
    background-image: ${p.$overlayCss ? p.$overlayCss + "," : ""} url(${
          p.$bgImage
        });
    background-size: ${p.$bgZoom ? p.$bgZoom + "%" : "cover"};
    background-position: ${p.$bgPosX || 50}% ${p.$bgPosY || 50}%;
    background-repeat: no-repeat;`
      : `background:${p.$bgCss || "#000"};`}
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
  display: grid;
  gap: ${(p) => p.$gap}px;
  font-family: ${(p) => p.$fontFamily};
  font-size: ${(p) => p.$fontSize}px;
  max-height: calc(85vh - 24px);
  overflow: auto;
`;
const Avatar = styled.div`
  display: flex;
  justify-content: ${(p) =>
    p.$avatarAlign === "left"
      ? "flex-start"
      : p.$avatarAlign === "right"
      ? "flex-end"
      : "center"};
  img {
    width: 96px;
    height: 96px;
    border-radius: 999px;
    object-fit: cover;
    border: 3px solid rgba(0, 0, 0, 0.06);
  }
`;
const Heading = styled.div`
  text-align: ${(p) => p.$align};
  h2 {
    margin: 8px 0 4px 0;
    font-size: 24px;
    letter-spacing: 0.2px;
  }
  p {
    margin: 0;
    opacity: 0.9;
  }
`;

/* ====== Inputs ====== */
const TextInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #111827;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
    border-color: #38bdf8;
    background: #fff;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #111827;
  min-height: 70px;
  resize: vertical;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
    border-color: #38bdf8;
    background: #fff;
  }
`;

/* ====== Acordeón de pasos ====== */
const Step = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.06);
  margin-bottom: 14px;
`;
const StepHeader = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 14px 28px 14px 16px;
  cursor: pointer;
  background: #f8fafc;
  border-bottom: 1px solid #eef2f7;
  h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
  }
  > span {
    white-space: nowrap;
    margin-right: 22px;
  }
`;
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #111827;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
`;
const StepBody = styled.div`
  padding: 14px;
  display: grid;
  gap: 12px;
  .row {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  .seg {
    display: inline-flex;
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
  }
  .seg button {
    padding: 8px 12px;
    border: 0;
    background: #fff;
    cursor: pointer;
  }
  .seg button.active {
    background: #111827;
    color: #fff;
  }
`;

/* ====== Controls ====== */
const ControlRow = styled.label`
  display: grid;
  grid-template-columns: 150px 1fr 60px;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: #111827;
`;
const ValuePill = styled.span`
  justify-self: end;
  min-width: 52px;
  font-variant-numeric: tabular-nums;
  background: #f1f5f9;
  border: 1px solid #e5e7eb;
  padding: 6px 8px;
  border-radius: 10px;
  text-align: center;
  color: #0f172a;
`;

const PresetsBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  margin-bottom: 6px;
`;
const PresetBtn = styled(Btn)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
const Swatch = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  display: inline-block;
  background: ${(p) => p.$bg};
  border: 1px solid #e5e7eb;
`;

/* ====== Tarjetas URLs ====== */
const CardsMasonry = styled.div`
  column-count: 1;
  column-gap: 12px;
  @media (min-width: 700px) {
    column-count: 2;
  }
`;
const Card = styled.div`
  display: inline-block;
  width: 100%;
  margin: 0 0 12px;
  break-inside: avoid;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.06);
`;
const CardHeader = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 28px 14px 16px;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  background: ${({ $brand }) =>
    `linear-gradient(135deg, ${$brand} , ${$brand}cc)`};
`;
const TitleSpan = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
`;
const Toggle = styled.span`
  background: rgba(255, 255, 255, 0.18);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  margin-right: 25px;
`;
const CardBody = styled.div`
  padding: 14px 14px 16px;
  border-top: 1px solid #e5e7eb;
`;
const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #374151;
  }
`;
const Error = styled.div`
  color: #dc2626;
  font-size: 12px;
  margin-top: 6px;
`;

/* ====== Botón público ====== */
const LinkRow = styled.div`
  display: flex;
  justify-content: ${(p) => (p.$align === "center" ? "center" : "stretch")};
`;
const LinkBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  width: 100%;
  padding: 12px 14px;
  border-radius: ${(p) => p.$radius}px;
  border: ${(p) => `${p.$borderWidth}px solid ${p.$border}`};
  background: ${(p) =>
    p.$variant === "filled"
      ? p.$bg
      : p.$variant === "glass"
      ? "rgba(255,255,255,.2)"
      : "transparent"};
  color: ${(p) => p.$text};
  backdrop-filter: ${(p) => (p.$variant === "glass" ? "blur(6px)" : "none")};
  box-shadow: ${(p) => (p.$shadow ? "0 6px 16px rgba(0,0,0,.15)" : "none")};
  flex-direction: ${(p) => (p.$iconSide === "right" ? "row-reverse" : "row")};
  justify-content: ${(p) =>
    p.$contentAlign === "center"
      ? "center"
      : p.$contentAlign === "right"
      ? "flex-end"
      : "flex-start"};
  text-align: ${(p) => p.$contentAlign};
  strong {
    flex: ${(p) => (p.$contentAlign === "left" ? 1 : "initial")};
  }
  &:hover {
    opacity: 0.95;
  }
`;

/* ================= Presets mínimos ================= */
const STYLE_PRESETS = [
  {
    key: "claro",
    name: "Claro",
    demo: "linear-gradient(135deg,#f8fafc,#e2e8f0)",
    patch: {
      bgMode: "gradient",
      bgColor: "#f8fafc",
      bgColor2: "#e2e8f0",
      textColor: "#111827",
      btnVariant: "outline",
      btnUseBrand: false,
      btnBg: "#ffffff",
      btnText: "#111827",
      btnBorder: "#cbd5e1",
      btnShadow: true,
      fontFamily: "Inter",
    },
  },
  {
    key: "vibrante",
    name: "Vibrante",
    demo: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
    patch: {
      bgMode: "gradient",
      bgColor: "#0ea5e9",
      bgColor2: "#7c3aed",
      textColor: "#ffffff",
      btnVariant: "filled",
      btnUseBrand: false,
      btnBg: "#111827",
      btnText: "#ffffff",
      btnBorder: "#111827",
      btnShadow: true,
      fontFamily: "Montserrat",
    },
  },
  {
    key: "oscuro",
    name: "Oscuro",
    demo: "linear-gradient(135deg,#0b1220,#111827)",
    patch: {
      bgMode: "solid",
      bgColor: "#0b1220",
      textColor: "#e5e7eb",
      btnVariant: "filled",
      btnUseBrand: false,
      btnBg: "#111827",
      btnText: "#e5e7eb",
      btnBorder: "#374151",
      btnShadow: false,
      fontFamily: "Roboto",
    },
  },
];

/* ================= Estado por defecto ================= */
const DEFAULT_PROFILE = {
  title: "",
  description: "",
  align: "center",
  textColor: "#FFFFFF",
  avatarAlign: "center",
  bgMode: "image",
  bgColor: "#0f172a",
  bgColor2: "#1e3a8a",
  bgAngle: 180,
  bgImageDataUrl: "",
  overlayOpacity: 0.45,
  bgPosX: 50,
  bgPosY: 50,
  bgZoom: 100,
  btnVariant: "filled",
  btnUseBrand: false,
  btnBg: "#0f172a",
  btnText: "#ffffff",
  btnBorder: "#ffffff",
  btnBorderWidth: 2,
  btnRadius: 18,
  btnPill: true,
  btnShadow: true,
  btnAlign: "stretch",
  btnWidth: 85,
  btnContentAlign: "left",
  btnIconSide: "left",
  phoneWidth: 390,
  containerPadding: 18,
  heroOffset: 0,
  linksGap: 12,
  fontFamily: "System",
  fontSize: 16,
  avatarDataUrl: "",
  pdfDataUrl: "",
  pdfName: "",
  contactFullName: "",
  contactOrg: "",
  contactTitle: "",
  contactPhone: "",
  contactEmail: "",
  contactWebsite: "",
  contactStreet: "",
  contactCity: "",
  contactRegion: "",
  contactPostalCode: "",
  contactCountry: "",
  contactNote: "",
};

const FONTS = [
  { label: "System", css: "" },
  { label: "Inter", css: "Inter:wght@400;600;700" },
  { label: "Poppins", css: "Poppins:wght@400;600;700" },
  { label: "Montserrat", css: "Montserrat:wght@400;600;700" },
  { label: "Raleway", css: "Raleway:wght@400;600;700" },
  { label: "Playfair Display", css: "Playfair+Display:wght@400;600;700" },
  { label: "Roboto", css: "Roboto:wght@400;700" },
];

/* =================== Componente =================== */
export default function Config() {
  const nav = useNavigate();
  const {
    user,
    profile: ctxProfile,
    setProfile: setCtxProfile,
    isAuthed,
  } = useAuth();

  // Key de storage por usuario
  const STORAGE_KEY = user?.username
    ? `social_tiles_theme_v9_${user.username}`
    : "social_tiles_theme_v9_anon";

  const [items, setItems] = useState(() =>
    PLATFORMS.map((p) => ({ key: p.key, url: "", visible: true, open: false }))
  );
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [errors, setErrors] = useState({});
  const [openStep, setOpenStep] = useState(1);
  const [loadingNet, setLoadingNet] = useState(false);

  useEffect(() => {
    loadFromBackend();
  }, [isAuthed]);

  // Si no está autenticado, manda a login
  useEffect(() => {
    if (!isAuthed)
      nav("/login", {
        replace: true,
        state: { from: { pathname: "/config" } },
      });
  }, [isAuthed, nav]);

  // Restaura borrador local del usuario o precarga desde ctx
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        const savedLinks = Array.isArray(saved)
          ? saved
          : Array.isArray(saved?.links)
          ? saved.links
          : [];
        const merged = PLATFORMS.map(
          (p) =>
            savedLinks.find((s) => s.key === p.key) || {
              key: p.key,
              url: "",
              visible: true,
              open: false,
            }
        );
        setItems(merged);
        if (!Array.isArray(saved) && saved?.profile)
          setProfile((prev) => ({ ...prev, ...saved.profile }));
        return;
      } catch {}
    }
    if (ctxProfile) {
      const mapped = fromServerDoc({
        theme: ctxProfile.theme,
        links: ctxProfile.links,
        displayName: ctxProfile.displayName,
        bio: ctxProfile.bio,
      });
      setProfile(mapped.profile);
      setItems(mapped.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STORAGE_KEY]);

  // Si cambia el ctxProfile y no hay borrador local, refresca la UI
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw && ctxProfile) {
      const mapped = fromServerDoc(ctxProfile);
      setProfile(mapped.profile);
      setItems(mapped.items);
    }
  }, [ctxProfile, STORAGE_KEY]);

  // Guarda borrador local al vuelo
  useEffect(() => {
    const data = {
      links: items.map(({ key, url, visible }) => ({ key, url, visible })),
      profile,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [items, profile, STORAGE_KEY]);

  // Google Font dinámica
  useEffect(() => {
    const def = FONTS.find((f) => f.label === profile.fontFamily);
    const id = "designer-font-link";
    const existing = document.getElementById(id);
    if (!def || !def.css) {
      if (existing) existing.remove();
      return;
    }
    const href = `https://fonts.googleapis.com/css2?family=${def.css}&display=swap`;
    if (existing) existing.setAttribute("href", href);
    else {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    }
  }, [profile.fontFamily]);

  // Helpers
  const byKey = (k) => items.find((i) => i.key === k);
  const toggleOpen = (k) =>
    setItems((prev) =>
      prev.map((i) =>
        i.key === k ? { ...i, open: !i.open } : { ...i, open: false }
      )
    );
  const setUrl = (k, url) =>
    setItems((prev) => prev.map((i) => (i.key === k ? { ...i, url } : i)));
  const setVisible = (k, v) =>
    setItems((prev) =>
      prev.map((i) => (i.key === k ? { ...i, visible: v } : i))
    );

  const visibleLinks = useMemo(
    () =>
      items
        .filter((i) => i.visible && isValidUrl(i.url))
        .map((i, idx) => ({ ...i, href: normalizeUrl(i.url), order: idx })),
    [items]
  );

  const validateOne = (k) => {
    const i = byKey(k);
    if (!i) return;
    const ok = i.url ? isValidUrl(i.url) : true;
    setErrors((e) => ({
      ...e,
      [k]: ok ? "" : "URL inválida (usa https://, mailto:, tel:, data:)",
    }));
  };

  // Assets
  const onAvatarFile = (file) => {
    const r = new FileReader();
    r.onload = () => setProfile((p) => ({ ...p, avatarDataUrl: r.result }));
    r.readAsDataURL(file);
  };
  const onBgImageFile = (file) => {
    const r = new FileReader();
    r.onload = () =>
      setProfile((p) => ({ ...p, bgImageDataUrl: r.result, bgMode: "image" }));
    r.readAsDataURL(file);
  };
  const onPdfFile = (file) => {
    const r = new FileReader();
    r.onload = () =>
      setProfile((p) => ({ ...p, pdfDataUrl: r.result, pdfName: file.name }));
    r.readAsDataURL(file);
  };

  // Fondo
  const overlayCss =
    profile.bgMode === "image"
      ? `linear-gradient(${profile.bgAngle}deg, rgba(0,0,0,${profile.overlayOpacity}) 0%, rgba(0,0,0,${profile.overlayOpacity}) 100%)`
      : null;
  const bgCss =
    profile.bgMode === "gradient"
      ? `linear-gradient(${profile.bgAngle}deg, ${profile.bgColor} 0%, ${profile.bgColor2} 100%)`
      : profile.bgMode === "solid"
      ? profile.bgColor
      : "#000";

  // Colores botón
  const btnColorsFor = (key) => {
    const brand = PLATFORMS.find((p) => p.key === key)?.brand || profile.btnBg;
    const bg = profile.btnUseBrand ? brand : profile.btnBg;
    const border = profile.btnUseBrand ? brand : profile.btnBorder;
    const text = profile.btnText;
    return { bg, border, text };
  };

  // ====== vCard ======
  const escapeV = (s = "") =>
    s.replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const buildVCard = () => {
    const p = profile;
    const socialNote = visibleLinks
      .map((l) => {
        const name = PLATFORMS.find((x) => x.key === l.key)?.name || l.key;
        return `${name}: ${l.href}`;
      })
      .join("\\n");
    const note = [p.contactNote, socialNote].filter(Boolean).join("\\n");
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeV(p.contactFullName || p.title || "")}`,
      p.contactOrg ? `ORG:${escapeV(p.contactOrg)}` : null,
      p.contactTitle ? `TITLE:${escapeV(p.contactTitle)}` : null,
      p.contactPhone
        ? `TEL;TYPE=CELL:${p.contactPhone.replace(/\s+/g, "")}`
        : null,
      p.contactEmail ? `EMAIL;TYPE=INTERNET:${p.contactEmail}` : null,
      p.contactWebsite ? `URL:${p.contactWebsite}` : null,
      p.contactStreet || p.contactCity || p.contactCountry
        ? `ADR;TYPE=HOME:;;${escapeV(p.contactStreet)};${escapeV(
            p.contactCity
          )};${escapeV(p.contactRegion)};${escapeV(
            p.contactPostalCode
          )};${escapeV(p.contactCountry)}`
        : null,
      p.avatarDataUrl
        ? `PHOTO;ENCODING=b;TYPE=JPEG:${p.avatarDataUrl.split(",")[1] || ""}`
        : null,
      note ? `NOTE:${note}` : null,
      "END:VCARD",
    ].filter(Boolean);
    return lines.join("\r\n");
  };
  const downloadVCard = () => {
    const vcf = buildVCard();
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const nice = (
      profile.contactFullName ||
      profile.title ||
      "contacto"
    ).replace(/\s+/g, "_");
    a.download = `${nice}.vcf`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Export/Import JSON (borradores)
  const exportJson = () => {
    const data = {
      links: items.map(({ key, url, visible }) => ({ key, url, visible })),
      profile,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `perfil_y_links_${user?.username || "draft"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importJson = (file) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        const arr = Array.isArray(obj) ? obj : obj.links;
        const mapped = PLATFORMS.map((p) => {
          const f = arr?.find((x) => x.key === p.key);
          return {
            key: p.key,
            url: f?.url || "",
            visible: f?.visible ?? true,
            open: false,
          };
        });
        setItems(mapped);
        if (obj.profile) setProfile((prev) => ({ ...prev, ...obj.profile }));
      } catch {}
    };
    r.readAsText(file);
  };

  const cssFontFamily =
    profile.fontFamily === "System"
      ? "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
      : `"${profile.fontFamily}", system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;

  const titleText = profile.title?.trim() || "Tu nombre o marca";
  const descText =
    profile.description?.trim() || "Escribe una breve descripción…";

  /* ============ Mappers backend (User ⇄ Profile) ============ */
  const toServerPayload = () => {
    const links = items.map((i, order) => ({
      key: i.key,
      url: i.url,
      visible: i.visible,
      order,
    }));
    const theme = {
      title: profile.title,
      description: profile.description,
      align: profile.align,
      textColor: profile.textColor,
      avatarAlign: profile.avatarAlign,
      bgMode: profile.bgMode,
      bgColor: profile.bgColor,
      bgColor2: profile.bgColor2,
      bgAngle: profile.bgAngle,
      bgImageUrl: profile.bgImageDataUrl,
      overlayOpacity: profile.overlayOpacity,
      bgPosX: profile.bgPosX,
      bgPosY: profile.bgPosY,
      bgZoom: profile.bgZoom,
      btnVariant: profile.btnVariant,
      btnUseBrand: profile.btnUseBrand,
      btnBg: profile.btnBg,
      btnText: profile.btnText,
      btnBorder: profile.btnBorder,
      btnBorderWidth: profile.btnBorderWidth,
      btnRadius: profile.btnRadius,
      btnPill: profile.btnPill,
      btnShadow: profile.btnShadow,
      btnAlign: profile.btnAlign,
      btnWidth: profile.btnWidth,
      btnContentAlign: profile.btnContentAlign,
      btnIconSide: profile.btnIconSide,
      phoneWidth: profile.phoneWidth,
      containerPadding: profile.containerPadding,
      heroOffset: profile.heroOffset,
      linksGap: profile.linksGap,
      fontFamily: profile.fontFamily,
      fontSize: profile.fontSize,
      avatarUrl: profile.avatarDataUrl,
      coverUrl: "",
      pdfUrl: profile.pdfDataUrl,
      pdfName: profile.pdfName,
      contactFullName: profile.contactFullName,
      contactOrg: profile.contactOrg,
      contactTitle: profile.contactTitle,
      contactPhone: profile.contactPhone,
      contactEmail: profile.contactEmail,
      contactWebsite: profile.contactWebsite,
      contactStreet: profile.contactStreet,
      contactCity: profile.contactCity,
      contactRegion: profile.contactRegion,
      contactPostalCode: profile.contactPostalCode,
      contactCountry: profile.contactCountry,
      contactNote: profile.contactNote,
    };
    return {
      displayName: profile.title,
      bio: profile.description,
      theme,
      links,
    };
  };

  const fromServerDoc = (doc) => {
    const t = doc?.theme || {};
    const serverProfile = {
      title: t.title || doc?.displayName || "",
      description: t.description || doc?.bio || "",
      align: t.align ?? "center",
      textColor: t.textColor ?? "#FFFFFF",
      avatarAlign: t.avatarAlign ?? "center",
      bgMode: t.bgMode ?? "image",
      bgColor: t.bgColor ?? "#0f172a",
      bgColor2: t.bgColor2 ?? "#1e3a8a",
      bgAngle: t.bgAngle ?? 180,
      bgImageDataUrl: t.bgImageUrl ?? "",
      overlayOpacity: t.overlayOpacity ?? 0.45,
      bgPosX: t.bgPosX ?? 50,
      bgPosY: t.bgPosY ?? 50,
      bgZoom: t.bgZoom ?? 100,
      btnVariant: t.btnVariant ?? "filled",
      btnUseBrand: t.btnUseBrand ?? false,
      btnBg: t.btnBg ?? "#0f172a",
      btnText: t.btnText ?? "#ffffff",
      btnBorder: t.btnBorder ?? "#ffffff",
      btnBorderWidth: t.btnBorderWidth ?? 2,
      btnRadius: t.btnRadius ?? 18,
      btnPill: t.btnPill ?? true,
      btnShadow: t.btnShadow ?? true,
      btnAlign: t.btnAlign ?? "stretch",
      btnWidth: t.btnWidth ?? 85,
      btnContentAlign: t.btnContentAlign ?? "left",
      btnIconSide: t.btnIconSide ?? "left",
      phoneWidth: t.phoneWidth ?? 390,
      containerPadding: t.containerPadding ?? 18,
      heroOffset: t.heroOffset ?? 0,
      linksGap: t.linksGap ?? 12,
      fontFamily: t.fontFamily ?? "System",
      fontSize: t.fontSize ?? 16,
      avatarDataUrl: t.avatarUrl ?? "",
      pdfDataUrl: t.pdfUrl ?? "",
      pdfName: t.pdfName ?? "",
      contactFullName: t.contactFullName ?? "",
      contactOrg: t.contactOrg ?? "",
      contactTitle: t.contactTitle ?? "",
      contactPhone: t.contactPhone ?? "",
      contactEmail: t.contactEmail ?? "",
      contactWebsite: t.contactWebsite ?? "",
      contactStreet: t.contactStreet ?? "",
      contactCity: t.contactCity ?? "",
      contactRegion: t.contactRegion ?? "",
      contactPostalCode: t.contactPostalCode ?? "",
      contactCountry: t.contactCountry ?? "",
      contactNote: t.contactNote ?? "",
    };
    const serverLinks = Array.isArray(doc?.links) ? doc.links : [];
    const mergedLinks = PLATFORMS.map((p) => {
      const found = serverLinks.find((x) => x.key === p.key);
      return {
        key: p.key,
        url: found?.url || "",
        visible: found?.visible ?? true,
        open: false,
      };
    });
    return { profile: serverProfile, items: mergedLinks };
  };

  /* ============ Acciones de red (con /me) ============ */
  const loadFromBackend = async () => {
    try {
      setLoadingNet(true);
      const data = await API.getMeProfile(); // GET /api/profiles/me/profile
      const mapped = fromServerDoc(data);
      setProfile(mapped.profile);
      setItems(mapped.items);
      // sincroniza contexto
      setCtxProfile(data);
      /*    alert("✅ Perfil cargado"); */
    } catch (e) {
      alert("❌ Error cargando: " + (e.message || "Desconocido"));
    } finally {
      setLoadingNet(false);
    }
  };

  const saveToBackend = async () => {
    try {
      setLoadingNet(true);
      const payload = toServerPayload();
      const saved = await API.upsertMeProfile(payload); // PUT /api/profiles/me/profile
      const mapped = fromServerDoc(saved);
      setProfile(mapped.profile);
      setItems(mapped.items);
      // sincroniza contexto
      setCtxProfile(saved);
      alert("✅ Guardado");
    } catch (e) {
      alert("❌ Error guardando: " + (e.message || "Desconocido"));
    } finally {
      setLoadingNet(false);
    }
  };

  // Título / descripción header
  const headerTitle = user
    ? `Configura tu perfil (${user.username || user.email})`
    : "Configura tu perfil";

  // Presets
  const applyPreset = (key) => {
    const p = STYLE_PRESETS.find((x) => x.key === key);
    if (!p) return;
    setProfile((prev) => ({ ...prev, ...p.patch }));
  };
  const surprise = () => {
    const all = STYLE_PRESETS;
    const r = all[Math.floor(Math.random() * all.length)];
    applyPreset(r.key);
  };

  // Si aún no autenticó, evita parpadeo
  if (!isAuthed) return null;

  return (
    <Wrap>
      <Header>
        <h1>{headerTitle}</h1>
        <Actions>
          {/*           <Btn type="button" onClick={loadFromBackend} disabled={loadingNet}>
            {loadingNet ? "Cargando..." : "Cargar de backend"}
          </Btn> */}
{/*           <Btn type="button" onClick={saveToBackend} disabled={loadingNet}>
            {loadingNet ? "Guardando..." : "Guardar Cambios"}
          </Btn>
          <label style={{ display: "inline-block" }}>
            <input
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files?.[0] && importJson(e.target.files[0])
              }
            />
            <Btn type="button">Importar JSON</Btn>
          </label>
          <Btn type="button" onClick={exportJson}>
            Exportar JSON
          </Btn> */}
        </Actions>
      </Header>

      {/* Presets */}
      <PresetsBar>
        <strong style={{ marginRight: 6 }}>Estilos rápidos:</strong>
        {STYLE_PRESETS.map((p) => (
          <PresetBtn
            key={p.key}
            onClick={() => applyPreset(p.key)}
            title={p.name}
          >
            <Swatch $bg={p.demo} /> {p.name}
          </PresetBtn>
        ))}
        <PresetBtn onClick={surprise}>🎲 Sorpréndeme</PresetBtn>
      </PresetsBar>

      <Grid>
        {/* PREVIEW */}
        <PhoneCol>
          <Phone $w={profile.phoneWidth}>
            <Preview
              $pad={profile.containerPadding}
              $offset={profile.heroOffset}
              $gap={profile.linksGap}
              $fontFamily={cssFontFamily}
              $fontSize={profile.fontSize}
              $color={profile.textColor}
              $bgCss={profile.bgMode !== "image" ? bgCss : undefined}
              $bgImage={
                profile.bgMode === "image" ? profile.bgImageDataUrl : ""
              }
              $overlayCss={profile.bgMode === "image" ? overlayCss : ""}
              $bgPosX={profile.bgPosX}
              $bgPosY={profile.bgPosY}
              $bgZoom={profile.bgZoom}
            >
              {profile.avatarDataUrl && (
                <Avatar $avatarAlign={profile.avatarAlign}>
                  <img src={profile.avatarDataUrl} alt="Avatar" />
                </Avatar>
              )}
              <Heading $align={profile.align}>
                <h2
                  style={{
                    opacity: profile.title ? 1 : 0.7,
                    fontStyle: profile.title ? "normal" : "italic",
                  }}
                >
                  {titleText}
                </h2>
                <p
                  style={{
                    opacity: profile.description ? 1 : 0.7,
                    fontStyle: profile.description ? "normal" : "italic",
                  }}
                >
                  {descText}
                </p>
              </Heading>

              {visibleLinks.length === 0 && (
                <div style={{ color: "#e5e7eb" }}>
                  Agrega enlaces para verlos aquí…
                </div>
              )}

              {visibleLinks.map((l) => {
                const { bg, border, text } = btnColorsFor(l.key);
                const Icon = Icons[l.key] || Icons.custom;
                const radius = profile.btnPill ? 999 : profile.btnRadius;
                const br =
                  profile.btnVariant === "outline"
                    ? border
                    : profile.btnUseBrand
                    ? border
                    : "transparent";
                const bgColor =
                  profile.btnVariant === "filled"
                    ? bg
                    : profile.btnVariant === "glass"
                    ? "rgba(255,255,255,.2)"
                    : "transparent";
                return (
                  <LinkRow key={`prev-${l.key}`} $align={profile.btnAlign}>
                    <div
                      style={{
                        width:
                          profile.btnAlign === "center"
                            ? `${profile.btnWidth}%`
                            : "100%",
                      }}
                    >
                      <LinkBtn
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        $variant={profile.btnVariant}
                        $bg={bgColor}
                        $border={br}
                        $borderWidth={profile.btnBorderWidth}
                        $text={text}
                        $radius={radius}
                        $shadow={profile.btnShadow}
                        $iconSide={profile.btnIconSide}
                        $contentAlign={profile.btnContentAlign}
                      >
                        <Icon />
                        <strong>
                          {PLATFORMS.find((p) => p.key === l.key)?.name ||
                            l.key}
                        </strong>
                      </LinkBtn>
                    </div>
                  </LinkRow>
                );
              })}

              {profile.pdfDataUrl && (
                <a
                  href={profile.pdfDataUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Btn type="button">
                    📄 Ver PDF{profile.pdfName ? `: ${profile.pdfName}` : ""}
                  </Btn>
                </a>
              )}

              <Btn type="button" onClick={downloadVCard}>
                📇 Guardar contacto (.vcf)
              </Btn>
            </Preview>
          </Phone>
             <Btn type="button" onClick={saveToBackend} disabled={loadingNet}>
            {loadingNet ? "Guardando..." : "Guardar Cambios"}
          </Btn>
        </PhoneCol>

        {/* EDITOR */}
        <EditorCol>
          {/* PASO 1: Perfil */}
          <Step>
            <StepHeader onClick={() => setOpenStep((s) => (s === 1 ? 0 : 1))}>
              <h3>
                <Badge>1</Badge> Perfil (avatar, nombre, descripción)
              </h3>
              <span>{openStep === 1 ? "Ocultar" : "Editar"}</span>
            </StepHeader>
            {openStep === 1 && (
              <StepBody>
                <div className="row">
                  <strong>Avatar:</strong>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] && onAvatarFile(e.target.files[0])
                    }
                  />
                  <span> Alineación</span>
                  <div className="seg">
                    {["left", "center", "right"].map((v) => (
                      <button
                        key={v}
                        className={profile.avatarAlign === v ? "active" : ""}
                        onClick={() =>
                          setProfile((p) => ({ ...p, avatarAlign: v }))
                        }
                      >
                        {v === "left"
                          ? "Izq."
                          : v === "center"
                          ? "Centro"
                          : "Der."}
                      </button>
                    ))}
                  </div>
                </div>

                <TextInput
                  type="text"
                  placeholder="Tu nombre o marca"
                  value={profile.title}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, title: e.target.value }))
                  }
                />
                <TextArea
                  placeholder="Escribe una breve descripción…"
                  value={profile.description}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, description: e.target.value }))
                  }
                />

                <div className="row">
                  <span style={{ fontSize: 14, color: "#6b7280" }}>
                    Alineación del texto:
                  </span>
                  <div className="seg">
                    {["left", "center", "right"].map((al) => (
                      <button
                        key={al}
                        className={profile.align === al ? "active" : ""}
                        onClick={() => setProfile((p) => ({ ...p, align: al }))}
                      >
                        {al === "left"
                          ? "Izq."
                          : al === "center"
                          ? "Centro"
                          : "Der."}
                      </button>
                    ))}
                  </div>
                  <label>Color de texto</label>
                  <input
                    type="color"
                    value={profile.textColor}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, textColor: e.target.value }))
                    }
                  />
                </div>
              </StepBody>
            )}
          </Step>

          {/* PASO 2: Fondo */}
          <Step>
            <StepHeader onClick={() => setOpenStep((s) => (s === 2 ? 0 : 2))}>
              <h3>
                <Badge>2</Badge> Fondo (color, degradado o imagen)
              </h3>
              <span>{openStep === 2 ? "Ocultar" : "Editar"}</span>
            </StepHeader>
            {openStep === 2 && (
              <StepBody>
                <div className="row">
                  <div className="seg">
                    {["solid", "gradient", "image"].map((m) => (
                      <button
                        key={m}
                        className={profile.bgMode === m ? "active" : ""}
                        onClick={() => setProfile((p) => ({ ...p, bgMode: m }))}
                      >
                        {m === "solid"
                          ? "Sólido"
                          : m === "gradient"
                          ? "Degradado"
                          : "Imagen"}
                      </button>
                    ))}
                  </div>

                  {profile.bgMode !== "image" ? (
                    <>
                      <label>Color A</label>
                      <input
                        type="color"
                        value={profile.bgColor}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, bgColor: e.target.value }))
                        }
                      />
                      {profile.bgMode === "gradient" && (
                        <>
                          <label>Color B</label>
                          <input
                            type="color"
                            value={profile.bgColor2}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                bgColor2: e.target.value,
                              }))
                            }
                          />
                          <label>Ángulo</label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={profile.bgAngle}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                bgAngle: Number(e.target.value),
                              }))
                            }
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <label>Imagen</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files?.[0] &&
                          onBgImageFile(e.target.files[0])
                        }
                      />
                      <div className="row" style={{ width: "100%" }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <small>Overlay</small>
                          <input
                            style={{ width: "100%" }}
                            type="range"
                            min="0"
                            max="0.9"
                            step="0.05"
                            value={profile.overlayOpacity}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                overlayOpacity: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <small>Pos. X ({profile.bgPosX}%)</small>
                          <input
                            style={{ width: "100%" }}
                            type="range"
                            min="0"
                            max="100"
                            value={profile.bgPosX}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                bgPosX: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <small>Pos. Y ({profile.bgPosY}%)</small>
                          <input
                            style={{ width: "100%" }}
                            type="range"
                            min="0"
                            max="100"
                            value={profile.bgPosY}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                bgPosY: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <small>Zoom ({profile.bgZoom}%)</small>
                          <input
                            style={{ width: "100%" }}
                            type="range"
                            min="80"
                            max="200"
                            value={profile.bgZoom}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                bgZoom: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </StepBody>
            )}
          </Step>

          {/* PASO 3: Tipografía & vista móvil */}
          <Step>
            <StepHeader onClick={() => setOpenStep((s) => (s === 3 ? 0 : 3))}>
              <h3>
                <Badge>3</Badge> Tipografía y marco móvil
              </h3>
              <span>{openStep === 3 ? "Ocultar" : "Editar"}</span>
            </StepHeader>
            {openStep === 3 && (
              <StepBody>
                <div className="row" style={{ width: "100%" }}>
                  <ControlRow>
                    Fuente
                    <select
                      value={profile.fontFamily}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          fontFamily: e.target.value,
                        }))
                      }
                      style={{
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {FONTS.map((f) => (
                        <option key={f.label} value={f.label}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                    <ValuePill>{profile.fontFamily}</ValuePill>
                  </ControlRow>

                  <ControlRow>
                    Tamaño base
                    <input
                      type="range"
                      min="14"
                      max="20"
                      value={profile.fontSize}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          fontSize: Number(e.target.value),
                        }))
                      }
                    />
                    <ValuePill>{profile.fontSize}px</ValuePill>
                  </ControlRow>
                </div>

                <ControlRow>
                  Ancho (px)
                  <input
                    type="range"
                    min="320"
                    max="430"
                    value={profile.phoneWidth}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        phoneWidth: Number(e.target.value),
                      }))
                    }
                  />
                  <ValuePill>{profile.phoneWidth}</ValuePill>
                </ControlRow>

                <ControlRow>
                  Padding
                  <input
                    type="range"
                    min="10"
                    max="36"
                    value={profile.containerPadding}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        containerPadding: Number(e.target.value),
                      }))
                    }
                  />
                  <ValuePill>{profile.containerPadding}px</ValuePill>
                </ControlRow>

                <ControlRow>
                  Offset superior
                  <input
                    type="range"
                    min="0"
                    max="140"
                    value={profile.heroOffset}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        heroOffset: Number(e.target.value),
                      }))
                    }
                  />
                  <ValuePill>{profile.heroOffset}px</ValuePill>
                </ControlRow>

                <ControlRow>
                  Espacio entre botones
                  <input
                    type="range"
                    min="6"
                    max="24"
                    value={profile.linksGap}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        linksGap: Number(e.target.value),
                      }))
                    }
                  />
                  <ValuePill>{profile.linksGap}px</ValuePill>
                </ControlRow>
              </StepBody>
            )}
          </Step>

          {/* PASO 4: Botones */}
          <Step>
            <StepHeader onClick={() => setOpenStep((s) => (s === 4 ? 0 : 4))}>
              <h3>
                <Badge>4</Badge> Botones (estilo, colores, alineaciones)
              </h3>
              <span>{openStep === 4 ? "Ocultar" : "Editar"}</span>
            </StepHeader>
            {openStep === 4 && (
              <StepBody>
                <div className="row">
                  <strong>Estilo:</strong>
                  <div className="seg">
                    {["filled", "outline", "glass"].map((v) => (
                      <button
                        key={v}
                        className={profile.btnVariant === v ? "active" : ""}
                        onClick={() =>
                          setProfile((p) => ({ ...p, btnVariant: v }))
                        }
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="row" style={{ gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={profile.btnUseBrand}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        btnUseBrand: e.target.checked,
                      }))
                    }
                  />
                  Usar color de marca por red
                </label>

                {!profile.btnUseBrand && (
                  <div className="row">
                    <label>BG</label>
                    <input
                      type="color"
                      value={profile.btnBg}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, btnBg: e.target.value }))
                      }
                    />
                    <label>Borde</label>
                    <input
                      type="color"
                      value={profile.btnBorder}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, btnBorder: e.target.value }))
                      }
                    />
                  </div>
                )}

                <div className="row">
                  <label>Texto</label>
                  <input
                    type="color"
                    value={profile.btnText}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, btnText: e.target.value }))
                    }
                  />
                  <label>Grosor</label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={profile.btnBorderWidth}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        btnBorderWidth: Number(e.target.value),
                      }))
                    }
                  />
                  <label>Radio</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={profile.btnRadius}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        btnRadius: Number(e.target.value),
                      }))
                    }
                  />
                  <label className="row" style={{ gap: 6 }}>
                    <input
                      type="checkbox"
                      checked={profile.btnPill}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, btnPill: e.target.checked }))
                      }
                    />
                    Píldora (∞)
                  </label>
                  <label className="row" style={{ gap: 6 }}>
                    <input
                      type="checkbox"
                      checked={profile.btnShadow}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          btnShadow: e.target.checked,
                        }))
                      }
                    />
                    Sombra
                  </label>
                </div>

                <div className="row" style={{ width: "100%" }}>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>
                    Contenido del botón
                  </span>
                  <div className="seg">
                    {["left", "center", "right"].map((v) => (
                      <button
                        key={v}
                        className={
                          profile.btnContentAlign === v ? "active" : ""
                        }
                        onClick={() =>
                          setProfile((p) => ({ ...p, btnContentAlign: v }))
                        }
                      >
                        {v === "left"
                          ? "Izq."
                          : v === "center"
                          ? "Centro"
                          : "Der."}
                      </button>
                    ))}
                  </div>
                  <span>Icono</span>
                  <div className="seg">
                    {["left", "right"].map((v) => (
                      <button
                        key={v}
                        className={profile.btnIconSide === v ? "active" : ""}
                        onClick={() =>
                          setProfile((p) => ({ ...p, btnIconSide: v }))
                        }
                      >
                        {v === "left" ? "Izq." : "Der."}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="row" style={{ width: "100%" }}>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>
                    Ancho de botones
                  </span>
                  <div className="seg">
                    {["stretch", "center"].map((v) => (
                      <button
                        key={v}
                        className={profile.btnAlign === v ? "active" : ""}
                        onClick={() =>
                          setProfile((p) => ({ ...p, btnAlign: v }))
                        }
                      >
                        {v === "stretch" ? "Estirar (100%)" : "Centrar"}
                      </button>
                    ))}
                  </div>
                  {profile.btnAlign === "center" && (
                    <>
                      <label>%</label>
                      <input
                        type="range"
                        min="60"
                        max="100"
                        value={profile.btnWidth}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            btnWidth: Number(e.target.value),
                          }))
                        }
                      />
                    </>
                  )}
                </div>

                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="row">
                    <strong>Adjuntar PDF:</strong>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        e.target.files?.[0] && onPdfFile(e.target.files[0])
                      }
                    />
                  </div>
                  {profile.pdfDataUrl && (
                    <a
                      href={profile.pdfDataUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Btn type="button">
                        📄 Ver PDF: {profile.pdfName || "documento.pdf"}
                      </Btn>
                    </a>
                  )}
                </div>
              </StepBody>
            )}
          </Step>

          {/* PASO 5: Enlaces */}
          <Step>
            <StepHeader onClick={() => setOpenStep((s) => (s === 5 ? 0 : 5))}>
              <h3>
                <Badge>5</Badge> Enlaces (URLs por red)
              </h3>
              <span>{openStep === 5 ? "Ocultar" : "Editar"}</span>
            </StepHeader>
            {openStep === 5 && (
              <StepBody>
                <CardsMasonry>
                  {PLATFORMS.map((p) => {
                    const it = items.find((i) => i.key === p.key);
                    const opened = !!it?.open;
                    const Icon = Icons[p.key] || Icons.custom;
                    return (
                      <Card key={p.key}>
                        <CardHeader
                          $brand={p.brand}
                          onClick={() => toggleOpen(p.key)}
                          aria-expanded={opened}
                        >
                          <TitleSpan>
                            <Icon /> {p.name}
                          </TitleSpan>
                          <Toggle>Editar</Toggle>
                        </CardHeader>
                        {opened && (
                          <CardBody>
                            <Row>
                              <TextInput
                                type="text"
                                placeholder={PLACEHOLDERS[p.key]}
                                value={it?.url || ""}
                                onChange={(e) => setUrl(p.key, e.target.value)}
                                onBlur={() => validateOne(p.key)}
                              />
                            </Row>
                            {errors[p.key] && <Error>{errors[p.key]}</Error>}
                            <Row>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={it?.visible ?? true}
                                  onChange={(e) =>
                                    setVisible(p.key, e.target.checked)
                                  }
                                />
                                Visible en tu perfil
                              </label>
                              <small style={{ color: "#6b7280" }}>
                                Se admite https://, http://, mailto:, tel:,
                                data:
                              </small>
                            </Row>
                          </CardBody>
                        )}
                      </Card>
                    );
                  })}
                </CardsMasonry>
              </StepBody>
            )}
          </Step>

          {/* PASO 6: Datos de contacto (vCard) */}
          <Step>
            <StepHeader onClick={() => setOpenStep((s) => (s === 6 ? 0 : 6))}>
              <h3>
                <Badge>6</Badge> Datos de contacto (para “Guardar contacto”)
              </h3>
              <span>{openStep === 6 ? "Ocultar" : "Editar"}</span>
            </StepHeader>
            {openStep === 6 && (
              <StepBody>
                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <Btn
                    type="button"
                    onClick={() => {
                      const telUrl =
                        byKey("phone")?.url || byKey("whatsapp")?.url || "";
                      let phone = "";
                      if (telUrl.startsWith("tel:")) phone = telUrl.slice(4);
                      else if (/wa\.me\/(\d+)/.test(telUrl))
                        phone = telUrl.match(/wa\.me\/(\d+)/)[1];
                      const email = (byKey("email")?.url || "").replace(
                        /^mailto:/,
                        ""
                      );
                      const website = byKey("website")?.url || "";
                      setProfile((p) => ({
                        ...p,
                        contactPhone: phone || p.contactPhone,
                        contactEmail: email || p.contactEmail,
                        contactWebsite: website || p.contactWebsite,
                      }));
                    }}
                  >
                    Rellenar desde enlaces
                  </Btn>
                  <Btn type="button" onClick={downloadVCard}>
                    📇 Descargar vCard
                  </Btn>
                </div>

                <TextInput
                  placeholder="Nombre completo"
                  value={profile.contactFullName}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      contactFullName: e.target.value,
                    }))
                  }
                />

                <div className="row" style={{ width: "100%" }}>
                  <TextInput
                    placeholder="Empresa / Organización"
                    value={profile.contactOrg}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, contactOrg: e.target.value }))
                    }
                  />
                  <TextInput
                    placeholder="Cargo"
                    value={profile.contactTitle}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactTitle: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="row" style={{ width: "100%" }}>
                  <TextInput
                    placeholder="Teléfono (solo números ej. +51999999999)"
                    value={profile.contactPhone}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactPhone: e.target.value,
                      }))
                    }
                  />
                  <TextInput
                    placeholder="Email"
                    value={profile.contactEmail}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactEmail: e.target.value,
                      }))
                    }
                  />
                  <TextInput
                    placeholder="Website (https://...)"
                    value={profile.contactWebsite}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactWebsite: e.target.value,
                      }))
                    }
                  />
                </div>

                <TextInput
                  placeholder="Calle y número"
                  value={profile.contactStreet}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, contactStreet: e.target.value }))
                  }
                />
                <div className="row" style={{ width: "100%" }}>
                  <TextInput
                    placeholder="Ciudad"
                    value={profile.contactCity}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, contactCity: e.target.value }))
                    }
                  />
                  <TextInput
                    placeholder="Región/Provincia"
                    value={profile.contactRegion}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactRegion: e.target.value,
                      }))
                    }
                  />
                  <TextInput
                    placeholder="C.P."
                    value={profile.contactPostalCode}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactPostalCode: e.target.value,
                      }))
                    }
                  />
                  <TextInput
                    placeholder="País"
                    value={profile.contactCountry}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactCountry: e.target.value,
                      }))
                    }
                  />
                </div>

                <TextArea
                  placeholder="Nota (observaciones)"
                  value={profile.contactNote}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, contactNote: e.target.value }))
                  }
                />
              </StepBody>
            )}
          </Step>
        </EditorCol>
      </Grid>
    </Wrap>
  );
}
