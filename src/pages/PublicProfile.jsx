// src/pages/PublicProfile.jsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { API } from "../lib/api";

/* ===== ICONOS ===== */
const Icons = {
  whatsapp: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.9-1.6A11 11 0 1 0 20.5 3.5Zm-8.9 16.4c-1.8 0-3.4-.5-4.8-1.5l-.3-.2-3.5.9.9-3.4-.2-.3a8.9 8.9 0 1 1 7.9 4.5Zm4.9-6.7c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.7.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.9.9-1.3 2.1-1.3 3.3 0 .4.1.8.2 1.1.3 1 .9 1.9 1.1 2.2.2.3 2.1 3.2 5.1 4.5 3 .1 3.6.1 5.8-2.1.3-.4.4-.8.3-1-.2-.1-.5-.2-.9-.4Z"/></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2.2.7 3.4.7.7 0 1.2.5 1.2 1.2V20c0 1.1-.9 2-2 2C9.7 22 2 14.3 2 4c0-1.1.9-2 2-2h3.1c.7 0 1.2.5 1.2 1.2 0 1.2.2 2.4.7 3.4.2.4.1.9-.2 1.2L6.6 10.8Z"/></svg>),
  email: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>),
  instagram: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.5-8.9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM20 2H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm0 18H4V4h16v16Z"/></svg>),
  tiktok: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M19 7.8a6.6 6.6 0 0 1-4.2-2V14a5 5 0 1 1-5.6-5 4.9 4.9 0 0 1 1.6.1V11a3 3 0 1 0 2 2.8V2h2.2a4.3 4.3 0 0 0 4.1 3.3V7.8Z"/></svg>),
  facebook: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.8 1.8-1.8H17V2.1A25 25 0 0 0 14.6 2C12 2 10 3.8 10 7.1V10H7v4h3v8h3Z"/></svg>),
  linkedin: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M6.9 6.8A2.1 2.1 0 1 1 7 2.6a2.1 2.1 0 0 1-.1 4.2ZM3.9 8.7H9v12.4H3.9V8.7ZM13 8.7h4.7v1.8c.7-1.2 2-2.1 4.1-2.1v4.4H21c-2.4 0-2.8 1.1-2.8 2.8v5.6H13V8.7Z"/></svg>),
  youtube: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M22 12c0-2.1-.2-3.6-.6-4.5-.3-.8-1-1.4-1.8-1.7C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.6A3.1 3.1 0 0 0 2.6 7.5C2.2 8.4 2 9.9 2 12s.2 3.6.6 4.5c.3.8 1 1.4 1.8 1.7 1.7.6 7.6.6 7.6.6s5.9 0 7.6-.6c.8-.3 1.5-.9 1.8-1.7.4-.9.6-2.4.6-4.5ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>),
  website: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9H15c-.1-2.1-.7-4-1.6-5.6A8 8 0 0 1 18.9 11ZM9 11H5.1A8 8 0 0 1 10.6 5.4C9.7 7 9.1 8.9 9 11Zm0 2c.1 2.1.7 4 1.6 5.6A8 8 0 0 1 5.1 13H9Zm2 0h2c-.1 1.9-.6 3.6-1 4.7-.4-1.1-.9 2.8-1 4.7Zm0-2c.1-1.9.6-3.6 1-4.7.4 1.1.9 2.8 1 4.7h-2Zm2.4 7.6c.9-1.6 1.5-3.5 1.6-5.6h3.9a8 8 0 0 1-5.5 5.6ZM14.9 11c-.1-2.1-.7-4-1.6-5.6A8 8 0 0 1 18.9 11h-4Z"/></svg>),
  x: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M4 3h5l3.6 5.1L17 3h3l-5.8 8.1L21 21h-5l-4-5.7L7 21H4l6.3-9L4 3Z"/></svg>),
  telegram: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M9.1 13.1 17.8 7 6.7 11.4l2.4 1.7v4.1l3.1-2.8 3.5 2.5c.4.2.8 0 .9-.5l2.2-10c.1-.6-.4-1.1-1-1L3.6 9.4c-.8.3-.7 1.5.1 1.7l5.4 1.4Z"/></svg>),
  pdf: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm2 18H8v-2h8v2Zm0-4H8v-2h8v2Zm-3-7V3.5L18.5 9H13Z"/></svg>),
  custom: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" {...p}><path fill="currentColor" d="M12 2 9.5 8H3l5.2 3.8L6.6 18 12 14.4 17.4 18l-1.6-6.2L21 8h-6.5L12 2Z"/></svg>),
};
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

/* ===== Helpers ===== */
const normalizeUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (!/^https?:\/\//i.test(url)) return `https://${url}`;
  return url;
};
const isValidUrl = (url) => {
  if (!url) return false;
  if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("data:") || url.startsWith("blob:")) return true;
  try { new URL(normalizeUrl(url)); return true; } catch { return false; }
};

/* ===== UI ===== */
const Wrap = styled.div`display:flex; justify-content:center; padding:24px 12px; font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;`;
const Phone = styled.div`width:${(p)=>p.$w}px; border-radius:36px; padding:12px; background:#e5e7eb; box-shadow:0 12px 35px rgba(0,0,0,.15); border:1px solid #d1d5db;`;
const Preview = styled.div`
  border-radius:28px; padding:${(p)=>p.$pad}px; padding-top:calc(${(p)=>p.$pad}px + ${(p)=>p.$offset}px); color:${(p)=>p.$color||"#111827"};
  ${(p)=> p.$bgImage ? `
    background-image:${p.$overlayCss ? p.$overlayCss + "," : ""} url(${p.$bgImage});
    background-size:${p.$bgZoom ? p.$bgZoom + "%" : "cover"};
    background-position:${p.$bgPosX||50}% ${(p.$bgPosY||50)}%;
    background-repeat:no-repeat;` : `background:${p.$bgCss || "#000"};`}
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);
  display:grid; gap:${(p)=>p.$gap}px; font-family:${(p)=>p.$fontFamily}; font-size:${(p)=>p.$fontSize}px;
`;
const Avatar = styled.div`
  display:flex; justify-content:${(p)=> p.$avatarAlign==="left"?"flex-start":p.$avatarAlign==="right"?"flex-end":"center"};
  img{width:96px; height:96px; border-radius:999px; object-fit:cover; border:3px solid rgba(0,0,0,.06);}
`;
const Heading = styled.div`text-align:${(p)=>p.$align}; h2{margin:8px 0 4px 0; font-size:24px; letter-spacing:.2px;} p{margin:0; opacity:.9;}`;
const LinkRow = styled.div`display:flex; justify-content:${(p)=> (p.$align==="center"?"center":"stretch")};`;
const LinkBtn = styled.a`
  display:flex; align-items:center; gap:10px; text-decoration:none; width:100%;
  padding:12px 14px; border-radius:${(p)=>p.$radius}px;
  border:${(p)=>`${p.$borderWidth}px solid ${p.$border}`};
  background:${(p)=> p.$variant==="filled" ? p.$bg : p.$variant==="glass" ? "rgba(255,255,255,.2)" : "transparent"};
  color:${(p)=>p.$text};
  backdrop-filter:${(p)=> p.$variant==="glass" ? "blur(6px)" : "none"};
  box-shadow:${(p)=> p.$shadow ? "0 6px 16px rgba(0,0,0,.15)" : "none"};
  flex-direction:${(p)=> p.$iconSide==="right" ? "row-reverse" : "row"};
  justify-content:${(p)=> p.$contentAlign==="center" ? "center" : p.$contentAlign==="right" ? "flex-end" : "flex-start"};
  text-align:${(p)=>p.$contentAlign};
  strong{flex:${(p)=> p.$contentAlign==="left" ? 1 : "initial"};}
  &:hover{opacity:.96;}
`;

/* ===== Componente ===== */
export default function PublicProfile() {
  const { username } = useParams();
  const [doc, setDoc] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1) Fetch SIEMPRE declarado en el tope (sin condicionales)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await API.getProfileByUsername(username);
        if (!alive) return;
        // si tu backend responde {ok, data}, descomenta:
        // const data = (raw && raw.data) || raw;
        setDoc(data);
        setNotFound(!data || !data.username);
      } catch {
        if (alive) setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [username]);

  // 2) Derivar profile SIEMPRE (aunque doc sea null) con useMemo
  const { profile, links } = useMemo(() => {
    const t = doc?.theme || {};
    return {
      profile: {
        title: t.title || doc?.displayName || username,
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
      },
      links: Array.isArray(doc?.links) ? doc.links : [],
    };
  }, [doc, username]);

  // 3) Hooks derivados SIEMPRE arriba (fuente Google)
  const cssFontFamily = useMemo(
    () =>
      profile.fontFamily === "System"
        ? "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        : `"${profile.fontFamily}", system-ui, -apple-system, Segoe UI, Roboto, sans-serif`,
    [profile.fontFamily]
  );

  useEffect(() => {
    const MAP = {
      Inter: "Inter:wght@400;600;700",
      Poppins: "Poppins:wght@400;600;700",
      Montserrat: "Montserrat:wght@400;600;700",
      Raleway: "Raleway:wght@400;600;700",
      "Playfair Display": "Playfair+Display:wght@400;600;700",
      Roboto: "Roboto:wght@400;700",
    };
    const css = MAP[profile.fontFamily];
    const id = "public-font-link";
    const existing = document.getElementById(id);
    if (!css) { if (existing) existing.remove(); return; }
    const href = `https://fonts.googleapis.com/css2?family=${css}&display=swap`;
    if (existing) existing.setAttribute("href", href);
    else {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet"; l.href = href;
      document.head.appendChild(l);
    }
  }, [profile.fontFamily]);

  // 4) Más derivados (no hooks condicionales)
  const overlayCss = useMemo(
    () =>
      profile.bgMode === "image"
        ? `linear-gradient(${profile.bgAngle}deg, rgba(0,0,0,${profile.overlayOpacity}) 0%, rgba(0,0,0,${profile.overlayOpacity}) 100%)`
        : null,
    [profile.bgMode, profile.bgAngle, profile.overlayOpacity]
  );

  const bgCss = useMemo(
    () =>
      profile.bgMode === "gradient"
        ? `linear-gradient(${profile.bgAngle}deg, ${profile.bgColor} 0%, ${profile.bgColor2} 100%)`
        : profile.bgMode === "solid"
        ? profile.bgColor
        : "#000",
    [profile.bgMode, profile.bgAngle, profile.bgColor, profile.bgColor2]
  );

  const visibleLinks = useMemo(
    () =>
      links
        .filter((i) => (i.visible ?? true) && isValidUrl(i.url))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((i) => ({ ...i, href: normalizeUrl(i.url) })),
    [links]
  );

  const btnColorsFor = (key) => {
    const brand = PLATFORMS.find((p) => p.key === key)?.brand || profile.btnBg;
    const bg = profile.btnUseBrand ? brand : profile.btnBg;
    const border = profile.btnUseBrand ? brand : profile.btnBorder;
    const text = profile.btnText;
    return { bg, border, text };
  };

  // 5) Render (los returns condicionales van DESPUÉS de todos los hooks)
  if (loading) return <Wrap><div>Cargando…</div></Wrap>;
  if (notFound) return <Wrap><div>Usuario no encontrado.</div></Wrap>;

  const titleText = profile.title?.trim() || username;
  const descText = profile.description?.trim() || "";

  return (
    <Wrap>
      <Phone $w={profile.phoneWidth}>
        <Preview
          $pad={profile.containerPadding}
          $offset={profile.heroOffset}
          $gap={profile.linksGap}
          $fontFamily={cssFontFamily}
          $fontSize={profile.fontSize}
          $color={profile.textColor}
          $bgCss={profile.bgMode !== "image" ? bgCss : undefined}
          $bgImage={profile.bgMode === "image" ? profile.bgImageDataUrl : ""}
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
            <h2 style={{ opacity: titleText ? 1 : .7 }}>{titleText}</h2>
            {descText ? <p>{descText}</p> : null}
          </Heading>

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
              <LinkRow key={`pub-${l.key}`} $align={profile.btnAlign}>
                <div style={{ width: profile.btnAlign === "center" ? `${profile.btnWidth}%` : "100%" }}>
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
                    <strong>{PLATFORMS.find((p) => p.key === l.key)?.name || l.key}</strong>
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
              style={{ textDecoration: "none", display: "inline-flex" }}
            >
              📄 Ver PDF{profile.pdfName ? `: ${profile.pdfName}` : ""}
            </a>
          )}
        </Preview>
      </Phone>
    </Wrap>
  );
}
