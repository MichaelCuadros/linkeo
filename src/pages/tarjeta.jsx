// // src/pages/Menu.jsx
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import styled from "styled-components";
// import { Rnd } from "react-rnd";
// import { toPng } from "html-to-image";


// /* ---------------- Helpers de unidades + estándar ID-1 ---------------- */
// const CSS_DPI = 96; // 1in CSS = 96px
// const mmToPx = (mm, dpi = CSS_DPI) => (mm / 25.4) * dpi;
// const pxToMm = (px, dpi = CSS_DPI) => (px / dpi) * 25.4;

// // Tarjeta plástica tipo bancaria (ID-1)
// const ID1 = { widthMm: 85.60, heightMm: 53.98, cornerMm: 3.175 };

// /* ---------------- UI base ---------------- */
// const Wrap = styled.div`
//   max-width: 1100px; margin: 0 auto; padding: 18px;
//   font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
// `;
// const Row = styled.div` display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap; `;
// const CardSide = styled.div` flex: 0 0 auto; `;
// const PanelSide = styled.div` flex: 1 1 360px; min-width: 320px; `;

// const Btn = styled.button`
//   padding:8px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer;
//   &:hover{ box-shadow:0 2px 10px rgba(0,0,0,.08); }
// `;
// const Pill = styled.span`
//   display:inline-flex; align-items:center; gap:8px; padding:6px 10px; background:#f3f4f6; border:1px solid #e5e7eb; border-radius:999px; font-size:12px;
// `;

// const Group = styled.div`
//   border:1px solid #e5e7eb; border-radius:14px; background:#fff; box-shadow:0 6px 22px rgba(0,0,0,.06); margin-bottom:14px;
//   > header{ padding:12px 14px; border-bottom:1px solid #eef2f7; font-weight:600; display:flex; justify-content:space-between; align-items:center; }
//   > div{ padding:12px; display:grid; gap:10px; }
// `;
// const LabelRow = styled.label`
//   display:grid; grid-template-columns:140px 1fr 160px; gap:10px; align-items:center; font-size:14px;
// `;
// const Val = styled.span`
//   justify-self:end; min-width:120px; text-align:center; font-variant-numeric:tabular-nums;
//   background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 8px; border-radius:10px; color:#0f172a;
// `;

// /* --------------- Tipografías (muchas) --------------- */
// // Para Google Fonts: familyQuery tal como va en la URL (sin &display=swap)
// const FONTS = [
//   { label: "System", google: false, familyQuery: "", css: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
//   { label: "Inter", google: true, familyQuery: "Inter:wght@300;400;500;600;700" },
//   { label: "Poppins", google: true, familyQuery: "Poppins:wght@300;400;500;600;700" },
//   { label: "Montserrat", google: true, familyQuery: "Montserrat:wght@300;400;500;600;700" },
//   { label: "Raleway", google: true, familyQuery: "Raleway:wght@300;400;500;600;700" },
//   { label: "Playfair Display", google: true, familyQuery: "Playfair+Display:wght@400;600;700" },
//   { label: "Roboto", google: true, familyQuery: "Roboto:wght@300;400;500;700" },
//   { label: "Lato", google: true, familyQuery: "Lato:wght@300;400;700;900" },
//   { label: "Oswald", google: true, familyQuery: "Oswald:wght@300;400;500;700" },
//   { label: "Roboto Slab", google: true, familyQuery: "Roboto+Slab:wght@300;400;600;700" },
//   { label: "Merriweather", google: true, familyQuery: "Merriweather:wght@300;400;700;900" },
//   { label: "Bebas Neue", google: true, familyQuery: "Bebas+Neue" },
//   { label: "Pacifico", google: true, familyQuery: "Pacifico" },
//   { label: "Dancing Script", google: true, familyQuery: "Dancing+Script:wght@400;600;700" },
//   { label: "Nunito", google: true, familyQuery: "Nunito:wght@300;400;600;700;800" },
//   { label: "Abril Fatface", google: true, familyQuery: "Abril+Fatface" },
//   { label: "Rubik", google: true, familyQuery: "Rubik:wght@300;400;500;700" },
//   { label: "Open Sans", google: true, familyQuery: "Open+Sans:wght@300;400;600;700" },
//   { label: "Source Sans 3", google: true, familyQuery: "Source+Sans+3:wght@300;400;600;700" },
//   { label: "Noto Serif", google: true, familyQuery: "Noto+Serif:wght@400;600;700" },
// ];

// const getCssFamily = (label) => {
//   if (label === "System") return 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
//   return `"${label}", system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
// };

// /* --------------- Iconos SVG (sin libs) --------------- */
// const ICONS = {
//   User: (p) => (
//     <svg viewBox="0 0 24 24" {...p}>
//       <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.5 0-8 2.2-8 5v1h16v-1c0-2.8-3.5-5-8-5Z"/>
//     </svg>
//   ),
//   Phone: (p) => (
//     <svg viewBox="0 0 24 24" {...p}>
//       <path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2.2.7 3.4.7.7 0 1.2.5 1.2 1.2V20c0 1.1-.9 2-2 2C9.7 22 2 14.3 2 4c0-1.1.9-2 2-2h3.1c.7 0 1.2.5 1.2 1.2 0 1.2.2 2.4.7 3.4.2.4.1.9-.2 1.2L6.6 10.8Z"/>
//     </svg>
//   ),
//   Mail: (p) => (
//     <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
//   ),
//   Link: (p) => (
//     <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm7-1h2v2h-2v-2Zm4-4h-3v2h3a3 3 0 1 1 0 6h-3v2h3a5 5 0 0 0 0-10Z"/></svg>
//   ),
//   Location: (p) => (
//     <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>
//   ),
//   QR: (p) => (
//     <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M3 3h8v8H3V3Zm2 2v4h4V5H5Zm6 0h2v2h-2V5Zm0 4h2v2h-2V9ZM3 13h2v2H3v-2Zm0 4h2v2H3v-2Zm4-4h2v2H7v-2Zm0 4h2v2H7v-2Zm4 0h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2ZM13 3h2v2h-2V3Zm4 0h4v4h-4V3Zm2 2v0h0Z"/></svg>
//   ),
//   Wifi: (p) => (
//     <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-6.3-3.5 1.4 1.4a8 8 0 0 1 11.3 0l1.4-1.4a10 10 0 0 0-14.1 0Zm-2.8-2.8 1.4 1.4a12 12 0 0 1 16.9 0l1.4-1.4a14 14 0 0 0-19.8 0Zm-2.8-2.8 1.4 1.4a16 16 0 0 1 22.6 0l1.4-1.4a18 18 0 0 0-25.4 0Z"/></svg>
//   ),
// };

// /* ---------------- Estado por defecto ---------------- */
// const STORAGE_KEY = "nfc_designer_dual_v1";

// // Ajustes base por lado
// const defaultCard = () => ({
//   width: Math.round(mmToPx(ID1.widthMm)),
//   height: Math.round(mmToPx(ID1.heightMm)),
//   radius: Math.round(mmToPx(ID1.cornerMm)),
//   bgColor: "#111827",
//   bgImageDataUrl: "",
//   showGrid: true,
//   exportDPI: 300,
//   safeMm: 3,
// });

// // un elemento puede ser text | image | icon
// const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// /* ----------------- Componente ----------------- */
// export default function Menu() {
//   // lado actual
//   const [side, setSide] = useState("front"); // 'front' | 'back'

//   // tarjeta por lado
//   const [cards, setCards] = useState({ front: defaultCard(), back: defaultCard() });

//   // elementos por lado
//   const [elementsBySide, setElementsBySide] = useState({ front: [], back: [] });

//   const elements = elementsBySide[side];
//   const setElementsCurrent = (updater) =>
//     setElementsBySide((prev) => ({ ...prev, [side]: typeof updater === "function" ? updater(prev[side]) : updater }));

//   const card = cards[side];
//   const setCard = (updater) =>
//     setCards((prev) => ({ ...prev, [side]: typeof updater === "function" ? updater(prev[side]) : updater }));

//   // selección por lado
//   const [selectedId, setSelectedId] = useState(null);

//   // refs de stage por lado (usamos uno según lado actual)
//   const stageRef = useRef(null);
//   const imgInputRef = useRef(null);

//   // flag de exportación (para limpiar bordes en render)
//   const [exporting, setExporting] = useState(false);

//   /* ------------ persistencia local ------------ */
//   useEffect(() => {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return;
//     try {
//       const data = JSON.parse(raw);
//       // Soportar formato antiguo {card,elements} y nuevo {cards:{front,back}, elementsBySide:{front,back}}
//       if (data.cards && data.elementsBySide) {
//         setCards({
//           front: { ...defaultCard(), ...(data.cards.front || {}) },
//           back: { ...defaultCard(), ...(data.cards.back || {}) },
//         });
//         setElementsBySide({
//           front: Array.isArray(data.elementsBySide.front) ? data.elementsBySide.front : [],
//           back: Array.isArray(data.elementsBySide.back) ? data.elementsBySide.back : [],
//         });
//       } else {
//         // fallback
//         if (data.card) setCards({ front: { ...defaultCard(), ...data.card }, back: defaultCard() });
//         if (Array.isArray(data.elements)) setElementsBySide({ front: data.elements, back: [] });
//       }
//     } catch (e) {
//       console.log("No se pudo cargar layout guardado", e);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(
//       STORAGE_KEY,
//       JSON.stringify({ cards, elementsBySide })
//     );
//   }, [cards, elementsBySide]);

//   // elemento seleccionado
//   const selected = useMemo(
//     () => elements.find((e) => e.id === selectedId) || null,
//     [elements, selectedId]
//   );

//   /* --------------- Google Fonts loader (por elementos) --------------- */
//   const usedGoogleFamilies = useMemo(() => {
//     const fams = new Set(
//       elementsBySide.front
//         .concat(elementsBySide.back)
//         .filter((e) => e.type === "text" && e.fontFamily && e.fontFamily !== "System")
//         .map((e) => e.fontFamily)
//     );
//     // Convertir a familyQuery
//     const queries = [];
//     fams.forEach((label) => {
//       const f = FONTS.find((x) => x.label === label);
//       if (f?.google && f.familyQuery) queries.push(f.familyQuery);
//     });
//     return queries;
//   }, [elementsBySide]);

//   useEffect(() => {
//     const id = "nfc-google-fonts-link";
//     const existing = document.getElementById(id);
//     if (!usedGoogleFamilies.length) {
//       if (existing) existing.remove();
//       return;
//     }
//     const familyParams = usedGoogleFamilies.map((q) => `family=${q}`).join("&");
//     const href = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
//     if (existing) existing.setAttribute("href", href);
//     else {
//       const l = document.createElement("link");
//       l.id = id;
//       l.rel = "stylesheet";
//       l.href = href;
//       document.head.appendChild(l);
//     }
//   }, [usedGoogleFamilies]);

//   /* ------------- Acciones: añadir ------------- */
//   const addTitle = () => {
//     setElementsCurrent((els) => [
//       ...els,
//       {
//         id: newId(),
//         type: "text",
//         text: "Título",
//         x: 24, y: 24, w: 260, h: 64,
//         color: "#ffffff",
//         align: "left",
//         weight: 700,
//         fontSize: 28,
//         fontFamily: "Inter",
//         rotate: 0,
//         bg: "transparent",
//         radius: 0,
//       },
//     ]);
//   };
//   const addSubtitle = () => {
//     setElementsCurrent((els) => [
//       ...els,
//       {
//         id: newId(),
//         type: "text",
//         text: "Subtítulo",
//         x: 24, y: 96, w: 260, h: 48,
//         color: "#e5e7eb",
//         align: "left",
//         weight: 500,
//         fontSize: 18,
//         fontFamily: "Inter",
//         rotate: 0,
//         bg: "transparent",
//         radius: 0,
//       },
//     ]);
//   };
//   const addImage = () => imgInputRef.current?.click();
//   const onPickImage = (file) => {
//     const r = new FileReader();
//     r.onload = () => {
//       setElementsCurrent((els) => [
//         ...els,
//         {
//           id: newId(),
//           type: "image",
//           src: r.result,
//           objectFit: "cover",
//           x: 24, y: 170, w: 200, h: 120,
//           rotate: 0,
//           radius: 12,
//           bg: "transparent",
//         },
//       ]);
//     };
//     r.readAsDataURL(file);
//   };
//   const addIcon = () => {
//     setElementsCurrent((els) => [
//       ...els,
//       {
//         id: newId(),
//         type: "icon",
//         iconName: "User",
//         x: card.width - 90,
//         y: 20,
//         w: 64,
//         h: 64,
//         color: "#ffffff",
//         rotate: 0,
//         bg: "transparent",
//         radius: 0,
//       },
//     ]);
//   };

//   /* ------------- Acciones: selección ------------- */
//   const updateSelected = (patch) => {
//     if (!selectedId) return;
//     setElementsCurrent((els) => els.map((e) => (e.id === selectedId ? { ...e, ...patch } : e)));
//   };
//   const deleteSelected = () => {
//     if (!selectedId) return;
//     setElementsCurrent((els) => els.filter((e) => e.id !== selectedId));
//     setSelectedId(null);
//   };
//   const duplicateSelected = () => {
//     if (!selectedId) return;
//     setElementsCurrent((els) => {
//       const idx = els.findIndex((e) => e.id === selectedId);
//       if (idx === -1) return els;
//       const c = JSON.parse(JSON.stringify(els[idx]));
//       c.id = newId();
//       c.x += 12; c.y += 12;
//       return [...els.slice(0, idx + 1), c, ...els.slice(idx + 1)];
//     });
//   };
//   const moveZ = (dir) => {
//     if (!selectedId) return;
//     setElementsCurrent((els) => {
//       const i = els.findIndex((e) => e.id === selectedId);
//       if (i === -1) return els;
//       const copy = [...els];
//       if (dir === "front" && i < copy.length - 1) [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
//       if (dir === "back" && i > 0) [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
//       return copy;
//     });
//   };

//   /* ------------- Exportar ------------- */
//   const doExport = useCallback(
//     async (whichSide = side) => {
//       // activar modo clean
//       setExporting(true);
//       // cambiar lado si hace falta
//       const prevSide = side;
//       if (whichSide !== side) setSide(whichSide);

//       // esperar a que el DOM se actualice
//       await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

//       const node = stageRef.current;
//       if (!node) {
//         setExporting(false);
//         if (whichSide !== prevSide) setSide(prevSide);
//         return;
//       }

//       try {
//         const ratio = (cards[whichSide].exportDPI || 300) / CSS_DPI;

//         const dataUrl = await toPng(node, {
//           pixelRatio: ratio,
//           cacheBust: true,
//           // Filtrar: quita cuadrícula, guías, y handles de resize
//           filter: (n) => {
//             const el = n;
//             // ocultar nodos marcados como no imprimibles
//             if (el?.dataset?.noprint === "true") return false;
//             const cls = typeof el?.className === "string" ? el.className : "";
//             if (cls.includes("react-resizable-handle")) return false;
//             return true;
//           },
//         });
//         const a = document.createElement("a");
//         a.href = dataUrl;
//         a.download = `tarjeta_nfc_${whichSide}_${cards[whichSide].exportDPI || 300}dpi.png`;
//         a.click();
//       } catch (e) {
//         alert("No se pudo exportar PNG");
//         console.log(e);
//       } finally {
//         setExporting(false);
//         if (whichSide !== prevSide) setSide(prevSide);
//       }
//     },
//     [side, cards]
//   );

//   const exportBoth = async () => {
//     await doExport("front");
//     await doExport("back");
//   };

//   /* ------------- Importar/Exportar JSON ------------- */
//   const exportJSON = () => {
//     const blob = new Blob([JSON.stringify({ cards, elementsBySide }, null, 2)], {
//       type: "application/json",
//     });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "tarjeta_nfc_dual_layout.json";
//     a.click();
//     URL.revokeObjectURL(a.href);
//   };
//   const importJSON = (file) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onerror = () => {
//       alert("❌ No se pudo leer el archivo.");
//     };
//     reader.onload = () => {
//       try {
//         const text = typeof reader.result === "string"
//           ? reader.result
//           : new TextDecoder().decode(reader.result);
//         const data = JSON.parse(text);

//         if (data.cards && data.elementsBySide) {
//           setCards({
//             front: { ...defaultCard(), ...(data.cards.front || {}) },
//             back: { ...defaultCard(), ...(data.cards.back || {}) },
//           });
//           setElementsBySide({
//             front: Array.isArray(data.elementsBySide.front) ? data.elementsBySide.front : [],
//             back: Array.isArray(data.elementsBySide.back) ? data.elementsBySide.back : [],
//           });
//         } else {
//           // soporte de JSON antiguos
//           const cardIn = data.card || null;
//           const elsIn = Array.isArray(data.elements) ? data.elements : null;
//           if (!cardIn && !elsIn) {
//             alert("❌ El JSON no contiene datos reconocibles");
//             return;
//           }
//           setCards({ front: { ...defaultCard(), ...(cardIn || {}) }, back: defaultCard() });
//           setElementsBySide({ front: elsIn || [], back: [] });
//         }
//         alert("✅ Layout importado");
//       } catch (e) {
//         console.error(e);
//         alert("❌ JSON inválido: " + (e?.message || e));
//       }
//     };
//     reader.readAsText(file, "utf-8");
//   };

//   /* ------------- Resets / Presets ------------- */
//   const resetAll = () => {
//     if (!confirm("¿Resetear ambas caras y los elementos?")) return;
//     setCards({ front: defaultCard(), back: defaultCard() });
//     setElementsBySide({ front: [], back: [] });
//     setSelectedId(null);
//     localStorage.removeItem(STORAGE_KEY);
//   };
//   const applyPresetID1 = () => {
//     setCard((c) => ({
//       ...c,
//       width: Math.round(mmToPx(ID1.widthMm)),
//       height: Math.round(mmToPx(ID1.heightMm)),
//       radius: Math.round(mmToPx(ID1.cornerMm))
//     }));
//   };
//   const toggleOrientation = () => {
//     setCard((c) => ({ ...c, width: c.height, height: c.width }));
//   };

//   // cálculos útiles para UI
//   const widthMm = useMemo(() => pxToMm(card.width), [card.width]);
//   const heightMm = useMemo(() => pxToMm(card.height), [card.height]);
//   const radiusMm = useMemo(() => pxToMm(card.radius), [card.radius]);
//   const safePx = useMemo(() => mmToPx(card.safeMm || 0), [card.safeMm]);
//   const outW = Math.round((card.width / CSS_DPI) * (card.exportDPI || 300));
//   const outH = Math.round((card.height / CSS_DPI) * (card.exportDPI || 300));

//   /* ------------- Render ------------- */
//   return (
//     <Wrap>
//       <h2 style={{ margin: 0, marginBottom: 12 }}>Diseñador de Tarjeta NFC</h2>

//       {/* Selector de cara */}
//       <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
//         <Pill>Vista</Pill>
//         <div style={{ display: "inline-flex", border: "1px solid #e5e7eb", borderRadius: 999, overflow: "hidden" }}>
//           {["front", "back"].map((s) => (
//             <button
//               key={s}
//               onClick={() => { setSide(s); setSelectedId(null); }}
//               style={{
//                 padding: "8px 12px",
//                 border: 0,
//                 cursor: "pointer",
//                 background: side === s ? "#111827" : "#fff",
//                 color: side === s ? "#fff" : "#111827",
//               }}
//             >
//               {s === "front" ? "Anverso" : "Reverso"}
//             </button>
//           ))}
//         </div>
//         <Btn onClick={() => doExport()}>⬇️ Exportar PNG ({side})</Btn>
//         <Btn onClick={exportBoth}>⬇️⬇️ Exportar ambas</Btn>
//       </div>

//       <Row>
//         {/* Lienzo */}
//         <CardSide>
//           <div
//             ref={stageRef}
//             style={{
//               width: card.width,
//               height: card.height,
//               position: "relative",
//               borderRadius: card.radius,
//               overflow: "hidden",
//               background: card.bgImageDataUrl ? undefined : card.bgColor,
//               backgroundImage: card.bgImageDataUrl ? `url(${card.bgImageDataUrl})` : "none",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               outline: "1px solid #e5e7eb",
//               boxShadow: "0 12px 32px rgba(0,0,0,.18)",
//             }}
//             onMouseDown={(e) => {
//               if (e.target === stageRef.current) setSelectedId(null);
//             }}
//           >
//             {/* cuadrícula (fuera de export) */}
//             {card.showGrid && !exporting && (
//               <div
//                 data-noprint="true"
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   backgroundImage:
//                     "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
//                   backgroundSize: "20px 20px, 20px 20px",
//                   pointerEvents: "none",
//                 }}
//               />
//             )}

//             {/* guía de corte (fuera de export) */}
//             {!exporting && (
//               <div
//                 data-noprint="true"
//                 aria-hidden
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   borderRadius: card.radius,
//                   boxShadow: "inset 0 0 0 1px rgba(255,255,255,.45)",
//                   pointerEvents: "none",
//                 }}
//                 title="Línea de corte (trim)"
//               />
//             )}

//             {/* zona segura (fuera de export) */}
//             {!exporting && card.safeMm > 0 && (
//               <div
//                 data-noprint="true"
//                 aria-hidden
//                 style={{
//                   position: "absolute",
//                   left: safePx, top: safePx, right: safePx, bottom: safePx,
//                   borderRadius: Math.max(0, card.radius - safePx),
//                   boxShadow: "inset 0 0 0 1px rgba(16,185,129,.9)",
//                   pointerEvents: "none",
//                 }}
//                 title="Zona segura"
//               />
//             )}

//             {elements.map((el, idx) => (
//               <Rnd
//                 key={el.id}
//                 bounds="parent"
//                 size={{ width: el.w, height: el.h }}
//                 position={{ x: el.x, y: el.y }}
//                 onDragStop={(e, d) =>
//                   setElementsCurrent((arr) => arr.map((x) => (x.id === el.id ? { ...x, x: d.x, y: d.y } : x)))
//                 }
//                 onResizeStop={(e, dir, ref, delta, pos) =>
//                   setElementsCurrent((arr) =>
//                     arr.map((x) =>
//                       x.id === el.id
//                         ? { ...x, w: ref.offsetWidth, h: ref.offsetHeight, x: pos.x, y: pos.y }
//                         : x
//                     )
//                   )
//                 }
//                 style={{
//                   zIndex: idx + 1,
//                   border: !exporting && selectedId === el.id ? "1px dashed #38bdf8" : "1px dashed transparent",
//                   borderRadius: 8,
//                 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedId(el.id);
//                 }}
//               >
//                 {el.type === "text" ? (
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       padding: 6,
//                       color: el.color,
//                       background: el.bg,
//                       borderRadius: el.radius,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent:
//                         el.align === "center" ? "center" : el.align === "right" ? "flex-end" : "flex-start",
//                       transform: `rotate(${el.rotate || 0}deg)`,
//                       fontSize: (el.fontSize || 18) + "px",
//                       fontWeight: el.weight || 500,
//                       userSelect: "none",
//                       textAlign: el.align,
//                       lineHeight: 1.2,
//                       overflow: "hidden",
//                       whiteSpace: "pre-wrap",
//                       fontFamily: getCssFamily(el.fontFamily || "System"),
//                     }}
//                   >
//                     {el.text}
//                   </div>
//                 ) : el.type === "image" ? (
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       transform: `rotate(${el.rotate || 0}deg)`,
//                       borderRadius: el.radius || 0,
//                       overflow: "hidden",
//                       background: el.bg || "transparent",
//                     }}
//                   >
//                     <img
//                       src={el.src}
//                       alt=""
//                       draggable={false}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: el.objectFit || "cover",
//                         display: "block",
//                         pointerEvents: "none",
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   // icon
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       transform: `rotate(${el.rotate || 0}deg)`,
//                       color: el.color || "#fff",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       background: el.bg || "transparent",
//                       borderRadius: el.radius || 0,
//                     }}
//                   >
//                     {(() => {
//                       const Comp = ICONS[el.iconName || "User"] || ICONS.User;
//                       return <Comp width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />;
//                     })()}
//                   </div>
//                 )}
//               </Rnd>
//             ))}
//           </div>

//           <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
//             <Btn onClick={addTitle}>🅰️ Título</Btn>
//             <Btn onClick={addSubtitle}>🅱️ Subtítulo</Btn>
//             <Btn onClick={addImage}>🖼️ Imagen</Btn>
//             <Btn onClick={addIcon}>🔣 Icono</Btn>
//           </div>

//           {/* input oculto para imagen */}
//           <input
//             ref={imgInputRef}
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => e.target.files?.[0] && onPickImage(e.target.files[0])}
//           />
//         </CardSide>

//         {/* Panel derecho */}
//         <PanelSide>
//           <Group>
//             <header>
//               <span>Tarjeta ({side === "front" ? "Anverso" : "Reverso"})</span>
//               <Pill>Salida ≈ {outW}×{outH}px @{card.exportDPI} dpi</Pill>
//             </header>
//             <div>
//               <LabelRow>
//                 Presets
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   <Btn onClick={applyPresetID1}>ID-1 85.60×53.98 mm</Btn>
//                   <Btn onClick={toggleOrientation}>↕️ Rotar H/V</Btn>
//                 </div>
//                 <Val>—</Val>
//               </LabelRow>

//               <LabelRow>
//                 Ancho
//                 <input
//                   type="number"
//                   value={card.width}
//                   onChange={(e) => setCard((c) => ({ ...c, width: Math.max(200, Number(e.target.value || 0)) }))}
//                 />
//                 <Val>{card.width}px · {widthMm.toFixed(2)} mm</Val>
//               </LabelRow>

//               <LabelRow>
//                 Alto
//                 <input
//                   type="number"
//                   value={card.height}
//                   onChange={(e) => setCard((c) => ({ ...c, height: Math.max(200, Number(e.target.value || 0)) }))}
//                 />
//                 <Val>{card.height}px · {heightMm.toFixed(2)} mm</Val>
//               </LabelRow>

//               <LabelRow>
//                 Radio
//                 <input
//                   type="range" min="0" max="40" value={card.radius}
//                   onChange={(e) => setCard((c) => ({ ...c, radius: Number(e.target.value) }))}
//                 />
//                 <Val>{card.radius}px · {radiusMm.toFixed(2)} mm</Val>
//               </LabelRow>

//               <LabelRow>
//                 Fondo
//                 <input
//                   type="color"
//                   value={card.bgColor}
//                   onChange={(e) => setCard((c) => ({ ...c, bgColor: e.target.value }))}
//                 />
//                 <Val><Pill>color</Pill></Val>
//               </LabelRow>

//               <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={card.showGrid}
//                     onChange={(e) => setCard((c) => ({ ...c, showGrid: e.target.checked }))}
//                   />{" "}
//                   Mostrar grilla
//                 </label>

//                 <label style={{ display: "inline-block" }}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={(e) => {
//                       const f = e.target.files?.[0];
//                       if (!f) return;
//                       const r = new FileReader();
//                       r.onload = () => setCard((c) => ({ ...c, bgImageDataUrl: r.result }));
//                       r.readAsDataURL(f);
//                     }}
//                   />
//                   <Btn>Fondo con imagen…</Btn>
//                 </label>

//                 {card.bgImageDataUrl && (
//                   <Btn onClick={() => setCard((c) => ({ ...c, bgImageDataUrl: "" }))}>Quitar imagen</Btn>
//                 )}
//               </div>

//               <LabelRow>
//                 Zona segura
//                 <input
//                   type="number" min="0" step="0.5"
//                   value={card.safeMm}
//                   onChange={(e) => setCard((c) => ({ ...c, safeMm: Math.max(0, Number(e.target.value || 0)) }))}
//                 />
//                 <Val>{card.safeMm} mm</Val>
//               </LabelRow>

//               <LabelRow>
//                 DPI de exportación
//                 <select
//                   value={card.exportDPI}
//                   onChange={(e) => setCard((c) => ({ ...c, exportDPI: Number(e.target.value) }))}
//                 >
//                   <option value={150}>150</option>
//                   <option value={300}>300</option>
//                   <option value={450}>450</option>
//                   <option value={600}>600</option>
//                 </select>
//                 <Val>{card.exportDPI} dpi</Val>
//               </LabelRow>

//               <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                 <Btn onClick={exportJSON}>💾 Exportar JSON (ambas caras)</Btn>
//                 <label style={{ display: "inline-block" }}>
//                   <input
//                     type="file"
//                     accept="application/json"
//                     style={{ display: "none" }}
//                     onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])}
//                   />
//                   <Btn>📂 Importar JSON</Btn>
//                 </label>
//                 <Btn onClick={resetAll} style={{ color: "#dc2626" }}>Resetear</Btn>
//               </div>
//             </div>
//           </Group>

//           <Group>
//             <header>Elemento seleccionado {selected ? <Pill>id {selected.id}</Pill> : null}</header>
//             <div>
//               {!selected ? (
//                 <div style={{ color: "#6b7280" }}>Toca un elemento en la tarjeta para editarlo.</div>
//               ) : selected.type === "text" ? (
//                 <>
//                   <LabelRow>
//                     Texto
//                     <input
//                       type="text"
//                       value={selected.text}
//                       onChange={(e) => updateSelected({ text: e.target.value })}
//                     />
//                     <Val>—</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Fuente
//                     <select
//                       value={selected.fontFamily || "System"}
//                       onChange={(e) => updateSelected({ fontFamily: e.target.value })}
//                     >
//                       {FONTS.map((f) => (
//                         <option key={f.label} value={f.label}>{f.label}</option>
//                       ))}
//                     </select>
//                     <Val>{selected.fontFamily || "System"}</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Tamaño
//                     <input
//                       type="number"
//                       value={selected.fontSize || 18}
//                       onChange={(e) => updateSelected({ fontSize: Number(e.target.value || 0) })}
//                     />
//                     <Val>{selected.fontSize || 18}px</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Peso
//                     <input
//                       type="range" min="300" max="900" step="100"
//                       value={selected.weight || 500}
//                       onChange={(e) => updateSelected({ weight: Number(e.target.value) })}
//                     />
//                     <Val>{selected.weight || 500}</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Color
//                     <input
//                       type="color"
//                       value={selected.color || "#ffffff"}
//                       onChange={(e) => updateSelected({ color: e.target.value })}
//                     />
//                     <Val><Pill>texto</Pill></Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Alineación
//                     <select
//                       value={selected.align || "left"}
//                       onChange={(e) => updateSelected({ align: e.target.value })}
//                     >
//                       <option value="left">Izquierda</option>
//                       <option value="center">Centro</option>
//                       <option value="right">Derecha</option>
//                     </select>
//                     <Val>{selected.align || "left"}</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Fondo
//                     <input
//                       type="color"
//                       value={selected.bg || "transparent"}
//                       onChange={(e) => updateSelected({ bg: e.target.value })}
//                     />
//                     <Val><Pill>fondo</Pill></Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Radio
//                     <input
//                       type="range" min="0" max="40"
//                       value={selected.radius || 0}
//                       onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
//                     />
//                     <Val>{selected.radius || 0}px</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Rotación
//                     <input
//                       type="range" min="-180" max="180"
//                       value={selected.rotate || 0}
//                       onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
//                     />
//                     <Val>{selected.rotate || 0}°</Val>
//                   </LabelRow>

//                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                     <Btn onClick={() => moveZ("back")}>⬇️ Enviar atrás</Btn>
//                     <Btn onClick={() => moveZ("front")}>⬆️ Traer al frente</Btn>
//                     <Btn onClick={duplicateSelected}>🧬 Duplicar</Btn>
//                     <Btn onClick={deleteSelected} style={{ color: "#dc2626" }}>🗑️ Eliminar</Btn>
//                   </div>
//                 </>
//               ) : selected.type === "image" ? (
//                 <>
//                   <LabelRow>
//                     Ajuste
//                     <select
//                       value={selected.objectFit || "cover"}
//                       onChange={(e) => updateSelected({ objectFit: e.target.value })}
//                     >
//                       <option value="cover">Cover</option>
//                       <option value="contain">Contain</option>
//                       <option value="fill">Fill</option>
//                     </select>
//                     <Val>{selected.objectFit || "cover"}</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Fondo
//                     <input
//                       type="color"
//                       value={selected.bg || "transparent"}
//                       onChange={(e) => updateSelected({ bg: e.target.value })}
//                     />
//                     <Val><Pill>fondo</Pill></Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Radio
//                     <input
//                       type="range" min="0" max="60"
//                       value={selected.radius || 0}
//                       onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
//                     />
//                     <Val>{selected.radius || 0}px</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Rotación
//                     <input
//                       type="range" min="-180" max="180"
//                       value={selected.rotate || 0}
//                       onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
//                     />
//                     <Val>{selected.rotate || 0}°</Val>
//                   </LabelRow>

//                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                     <Btn onClick={() => moveZ("back")}>⬇️ Enviar atrás</Btn>
//                     <Btn onClick={() => moveZ("front")}>⬆️ Traer al frente</Btn>
//                     <Btn onClick={duplicateSelected}>🧬 Duplicar</Btn>
//                     <Btn onClick={deleteSelected} style={{ color: "#dc2626" }}>🗑️ Eliminar</Btn>
//                   </div>
//                 </>
//               ) : (
//                 // ICON
//                 <>
//                   <LabelRow>
//                     Icono
//                     <select
//                       value={selected.iconName || "User"}
//                       onChange={(e) => updateSelected({ iconName: e.target.value })}
//                     >
//                       {Object.keys(ICONS).map((k) => (
//                         <option key={k} value={k}>{k}</option>
//                       ))}
//                     </select>
//                     <Val>{selected.iconName || "User"}</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Color
//                     <input
//                       type="color"
//                       value={selected.color || "#ffffff"}
//                       onChange={(e) => updateSelected({ color: e.target.value })}
//                     />
//                     <Val><Pill>trazo</Pill></Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Fondo
//                     <input
//                       type="color"
//                       value={selected.bg || "transparent"}
//                       onChange={(e) => updateSelected({ bg: e.target.value })}
//                     />
//                     <Val><Pill>fondo</Pill></Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Radio
//                     <input
//                       type="range" min="0" max="60"
//                       value={selected.radius || 0}
//                       onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
//                     />
//                     <Val>{selected.radius || 0}px</Val>
//                   </LabelRow>

//                   <LabelRow>
//                     Rotación
//                     <input
//                       type="range" min="-180" max="180"
//                       value={selected.rotate || 0}
//                       onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
//                     />
//                     <Val>{selected.rotate || 0}°</Val>
//                   </LabelRow>

//                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                     <Btn onClick={() => moveZ("back")}>⬇️ Enviar atrás</Btn>
//                     <Btn onClick={() => moveZ("front")}>⬆️ Traer al frente</Btn>
//                     <Btn onClick={duplicateSelected}>🧬 Duplicar</Btn>
//                     <Btn onClick={deleteSelected} style={{ color: "#dc2626" }}>🗑️ Eliminar</Btn>
//                   </div>
//                 </>
//               )}
//             </div>
//           </Group>
//         </PanelSide>
//       </Row>
//     </Wrap>
//   );
// }
// src/pages/Menu.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

/* ---------------- Helpers de unidades + estándar ID-1 ---------------- */
const CSS_DPI = 96; // 1in CSS = 96px
const mmToPx = (mm, dpi = CSS_DPI) => (mm / 25.4) * dpi;
const pxToMm = (px, dpi = CSS_DPI) => (px / dpi) * 25.4;

// Tarjeta plástica tipo bancaria (ID-1)
const ID1 = { widthMm: 85.60, heightMm: 53.98, cornerMm: 3.175 };

/* ---------------- UI base ---------------- */
const Wrap = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 18px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
`;
const Row = styled.div` display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap; `;
const CardSide = styled.div` flex: 0 0 auto; `;
const PanelSide = styled.div` flex: 1 1 360px; min-width: 320px; `;

const Btn = styled.button`
  padding:8px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer;
  &:hover{ box-shadow:0 2px 10px rgba(0,0,0,.08); }
`;
const Pill = styled.span`
  display:inline-flex; align-items:center; gap:8px; padding:6px 10px; background:#f3f4f6; border:1px solid #e5e7eb; border-radius:999px; font-size:12px;
`;

const Group = styled.div`
  border:1px solid #e5e7eb; border-radius:14px; background:#fff; box-shadow:0 6px 22px rgba(0,0,0,.06); margin-bottom:14px;
  > header{ padding:12px 14px; border-bottom:1px solid #eef2f7; font-weight:600; display:flex; justify-content:space-between; align-items:center; }
  > div{ padding:12px; display:grid; gap:10px; }
`;
const LabelRow = styled.label`
  display:grid; grid-template-columns:140px 1fr 160px; gap:10px; align-items:center; font-size:14px;
`;
const Val = styled.span`
  justify-self:end; min-width:120px; text-align:center; font-variant-numeric:tabular-nums;
  background:#f1f5f9; border:1px solid #e5e7eb; padding:6px 8px; border-radius:10px; color:#0f172a;
`;

/* --------------- Tipografías (muchas) --------------- */
// Para Google Fonts: familyQuery tal como va en la URL (sin &display=swap)
const FONTS = [
  { label: "System", google: false, familyQuery: "", css: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' },
  { label: "Inter", google: true, familyQuery: "Inter:wght@300;400;500;600;700" },
  { label: "Poppins", google: true, familyQuery: "Poppins:wght@300;400;500;600;700" },
  { label: "Montserrat", google: true, familyQuery: "Montserrat:wght@300;400;500;600;700" },
  { label: "Raleway", google: true, familyQuery: "Raleway:wght@300;400;500;600;700" },
  { label: "Playfair Display", google: true, familyQuery: "Playfair+Display:wght@400;600;700" },
  { label: "Roboto", google: true, familyQuery: "Roboto:wght@300;400;500;700" },
  { label: "Lato", google: true, familyQuery: "Lato:wght@300;400;700;900" },
  { label: "Oswald", google: true, familyQuery: "Oswald:wght@300;400;500;700" },
  { label: "Roboto Slab", google: true, familyQuery: "Roboto+Slab:wght@300;400;600;700" },
  { label: "Merriweather", google: true, familyQuery: "Merriweather:wght@300;400;700;900" },
  { label: "Bebas Neue", google: true, familyQuery: "Bebas+Neue" },
  { label: "Pacifico", google: true, familyQuery: "Pacifico" },
  { label: "Dancing Script", google: true, familyQuery: "Dancing+Script:wght@400;600;700" },
  { label: "Nunito", google: true, familyQuery: "Nunito:wght@300;400;600;700;800" },
  { label: "Abril Fatface", google: true, familyQuery: "Abril+Fatface" },
  { label: "Rubik", google: true, familyQuery: "Rubik:wght@300;400;500;700" },
  { label: "Open Sans", google: true, familyQuery: "Open+Sans:wght@300;400;600;700" },
  { label: "Source Sans 3", google: true, familyQuery: "Source+Sans+3:wght@300;400;600;700" },
  { label: "Noto Serif", google: true, familyQuery: "Noto+Serif:wght@400;600;700" },
];

const getCssFamily = (label) => {
  if (label === "System") return 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
  return `"${label}", system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
};

/* --------------- Iconos SVG (sin libs) --------------- */
const ICONS = {
  User: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.5 0-8 2.2-8 5v1h16v-1c0-2.8-3.5-5-8-5Z"/>
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2.2.7 3.4.7.7 0 1.2.5 1.2 1.2V20c0 1.1-.9 2-2 2C9.7 22 2 14.3 2 4c0-1.1.9-2 2-2h3.1c.7 0 1.2.5 1.2 1.2 0 1.2.2 2.4.7 3.4.2.4.1.9-.2 1.2L6.6 10.8Z"/>
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
  ),
  Link: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm7-1h2v2h-2v-2Zm4-4h-3v2h3a3 3 0 1 1 0 6h-3v2h3a5 5 0 0 0 0-10Z"/></svg>
  ),
  Location: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>
  ),
  QR: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M3 3h8v8H3V3Zm2 2v4h4V5H5Zm6 0h2v2h-2V5Zm0 4h2v2h-2V9ZM3 13h2v2H3v-2Zm0 4h2v2H3v-2Zm4-4h2v2H7v-2Zm0 4h2v2H7v-2Zm4 0h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2ZM13 3h2v2h-2V3Zm4 0h4v4h-4V3Zm2 2v0h0Z"/></svg>
  ),
  Wifi: (p) => (
    <svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-6.3-3.5 1.4 1.4a8 8 0 0 1 11.3 0l1.4-1.4a10 10 0 0 0-14.1 0Zm-2.8-2.8 1.4 1.4a12 12 0 0 1 16.9 0l1.4-1.4a14 14 0 0 0-19.8 0Zm-2.8-2.8 1.4 1.4a16 16 0 0 1 22.6 0l1.4-1.4a18 18 0 0 0-25.4 0Z"/></svg>
  ),
};

/* ---------------- Estado por defecto ---------------- */
const STORAGE_KEY = "nfc_designer_dual_v1";

// Ajustes base por lado
const defaultCard = () => ({
  width: Math.round(mmToPx(ID1.widthMm)),
  height: Math.round(mmToPx(ID1.heightMm)),
  radius: Math.round(mmToPx(ID1.cornerMm)),
  bgColor: "#111827",
  bgImageDataUrl: "",
  showGrid: true,
  exportDPI: 300,
  safeMm: 3,
});

// un elemento puede ser text | image | icon
const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/* ----------------- Componente ----------------- */
export default function Tarjeta() {
  // lado actual
  const [side, setSide] = useState("front"); // 'front' | 'back'

  // tarjeta por lado
  const [cards, setCards] = useState({ front: defaultCard(), back: defaultCard() });

  // elementos por lado
  const [elementsBySide, setElementsBySide] = useState({ front: [], back: [] });

  const elements = elementsBySide[side];
  const setElementsCurrent = (updater) =>
    setElementsBySide((prev) => ({ ...prev, [side]: typeof updater === "function" ? updater(prev[side]) : updater }));

  const card = cards[side];
  const setCard = (updater) =>
    setCards((prev) => ({ ...prev, [side]: typeof updater === "function" ? updater(prev[side]) : updater }));

  // selección por lado
  const [selectedId, setSelectedId] = useState(null);

  // refs de stage por lado (usamos uno según lado actual)
  const stageRef = useRef(null);
  const imgInputRef = useRef(null);

  // flag de exportación (para limpiar bordes en render)
  const [exporting, setExporting] = useState(false);

  /* ------------ persistencia local ------------ */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      // Soportar formato antiguo {card,elements} y nuevo {cards:{front,back}, elementsBySide:{front,back}}
      if (data.cards && data.elementsBySide) {
        setCards({
          front: { ...defaultCard(), ...(data.cards.front || {}) },
          back: { ...defaultCard(), ...(data.cards.back || {}) },
        });
        setElementsBySide({
          front: Array.isArray(data.elementsBySide.front) ? data.elementsBySide.front : [],
          back: Array.isArray(data.elementsBySide.back) ? data.elementsBySide.back : [],
        });
      } else {
        // fallback
        if (data.card) setCards({ front: { ...defaultCard(), ...data.card }, back: defaultCard() });
        if (Array.isArray(data.elements)) setElementsBySide({ front: data.elements, back: [] });
      }
    } catch (e) {
      console.log("No se pudo cargar layout guardado", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cards, elementsBySide })
    );
  }, [cards, elementsBySide]);

  // elemento seleccionado
  const selected = useMemo(
    () => elements.find((e) => e.id === selectedId) || null,
    [elements, selectedId]
  );

  /* --------------- Google Fonts loader (por elementos) --------------- */
  const usedGoogleFamilies = useMemo(() => {
    const fams = new Set(
      elementsBySide.front
        .concat(elementsBySide.back)
        .filter((e) => e.type === "text" && e.fontFamily && e.fontFamily !== "System")
        .map((e) => e.fontFamily)
    );
    // Convertir a familyQuery
    const queries = [];
    fams.forEach((label) => {
      const f = FONTS.find((x) => x.label === label);
      if (f?.google && f.familyQuery) queries.push(f.familyQuery);
    });
    return queries;
  }, [elementsBySide]);

  useEffect(() => {
    const id = "nfc-google-fonts-link";
    const existing = document.getElementById(id);
    if (!usedGoogleFamilies.length) {
      if (existing) existing.remove();
      return;
    }
    const familyParams = usedGoogleFamilies.map((q) => `family=${q}`).join("&");
    const href = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
    if (existing) existing.setAttribute("href", href);
    else {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    }
  }, [usedGoogleFamilies]);

  /* ------------- Acciones: añadir ------------- */
  const addTitle = () => {
    setElementsCurrent((els) => [
      ...els,
      {
        id: newId(),
        type: "text",
        text: "Título",
        x: 24, y: 24, w: 260, h: 64,
        color: "#ffffff",
        align: "left",
        weight: 700,
        fontSize: 28,
        fontFamily: "Inter",
        rotate: 0,
        bg: "transparent",
        radius: 0,
      },
    ]);
  };
  const addSubtitle = () => {
    setElementsCurrent((els) => [
      ...els,
      {
        id: newId(),
        type: "text",
        text: "Subtítulo",
        x: 24, y: 96, w: 260, h: 48,
        color: "#e5e7eb",
        align: "left",
        weight: 500,
        fontSize: 18,
        fontFamily: "Inter",
        rotate: 0,
        bg: "transparent",
        radius: 0,
      },
    ]);
  };
  const addImage = () => imgInputRef.current?.click();
  const onPickImage = (file) => {
    const r = new FileReader();
    r.onload = () => {
      setElementsCurrent((els) => [
        ...els,
        {
          id: newId(),
          type: "image",
          src: r.result,
          objectFit: "cover",
          x: 24, y: 170, w: 200, h: 120,
          rotate: 0,
          radius: 12,
          bg: "transparent",
        },
      ]);
    };
    r.readAsDataURL(file);
  };
  const addIcon = () => {
    setElementsCurrent((els) => [
      ...els,
      {
        id: newId(),
        type: "icon",
        iconName: "User",
        x: card.width - 90,
        y: 20,
        w: 64,
        h: 64,
        color: "#ffffff",
        rotate: 0,
        bg: "transparent",
        radius: 0,
      },
    ]);
  };

  /* ------------- Acciones: selección ------------- */
  const updateSelected = (patch) => {
    if (!selectedId) return;
    setElementsCurrent((els) => els.map((e) => (e.id === selectedId ? { ...e, ...patch } : e)));
  };
  const deleteSelected = () => {
    if (!selectedId) return;
    setElementsCurrent((els) => els.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  };
  const duplicateSelected = () => {
    if (!selectedId) return;
    setElementsCurrent((els) => {
      const idx = els.findIndex((e) => e.id === selectedId);
      if (idx === -1) return els;
      const c = JSON.parse(JSON.stringify(els[idx]));
      c.id = newId();
      c.x += 12; c.y += 12;
      return [...els.slice(0, idx + 1), c, ...els.slice(idx + 1)];
    });
  };
  const moveZ = (dir) => {
    if (!selectedId) return;
    setElementsCurrent((els) => {
      const i = els.findIndex((e) => e.id === selectedId);
      if (i === -1) return els;
      const copy = [...els];
      if (dir === "front" && i < copy.length - 1) [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
      if (dir === "back" && i > 0) [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
      return copy;
    });
  };

  /* ---------------- Filtro común para exportación ---------------- */
  const exportFilter = (n) => {
    const el = n;
    if (el?.dataset?.noprint === "true") return false; // oculta guías/grilla
    const cls = typeof el?.className === "string" ? el.className : "";
    if (cls.includes("react-resizable-handle")) return false; // quita handles
    return true;
  };

  /* ------------- Exportar helpers ------------- */
  // Exporta un lado a PNG (dataURL) sin descargar
  const exportSideToPng = useCallback(async (whichSide) => {
    setExporting(true);
    const prevSide = side;
    if (whichSide !== side) setSide(whichSide);

    // esperar re-render de la UI
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const node = stageRef.current;
    if (!node) {
      setExporting(false);
      if (whichSide !== prevSide) setSide(prevSide);
      return null;
    }

    try {
      const ratio = (cards[whichSide].exportDPI || 300) / CSS_DPI;
      const dataUrl = await toPng(node, {
        pixelRatio: ratio,
        cacheBust: true,
        filter: exportFilter,
      });
      return dataUrl;
    } catch (e) {
      console.error(e);
      alert("No se pudo exportar PNG");
      return null;
    } finally {
      setExporting(false);
      if (whichSide !== prevSide) setSide(prevSide);
    }
  }, [side, cards]);

  // Descarga PNG del lado actual (o el que se indique)
  const doExport = useCallback(async (whichSide = side) => {
    const dataUrl = await exportSideToPng(whichSide);
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `tarjeta_nfc_${whichSide}_${cards[whichSide].exportDPI || 300}dpi.png`;
    a.click();
  }, [exportSideToPng, side, cards]);

  // Exporta PDF A4 con anverso y reverso en la misma hoja
  const exportPDFBoth = useCallback(async () => {
    const frontPng = await exportSideToPng("front");
    const backPng  = await exportSideToPng("back");
    if (!frontPng || !backPng) return;

    // PDF A4 (210x297 mm)
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const margin = 10; // mm
    const gap = 8;     // mm entre anverso y reverso

    // Tamaños físicos de cada cara (basado en px del lienzo)
    const fWmm = pxToMm(cards.front.width);
    const fHmm = pxToMm(cards.front.height);
    const bWmm = pxToMm(cards.back.width);
    const bHmm = pxToMm(cards.back.height);

    // Escala para que quepan ambas verticalmente con márgenes
    const scaleW = (pageW - 2 * margin) / Math.max(fWmm, bWmm);
    const scaleH = (pageH - 2 * margin - gap) / (fHmm + bHmm);
    const scale = Math.min(scaleW, scaleH, 1);

    const drawFW = fWmm * scale;
    const drawFH = fHmm * scale;
    const drawBW = bWmm * scale;
    const drawBH = bHmm * scale;

    // centrar horizontalmente tomando el ancho mayor
    const drawWMax = Math.max(drawFW, drawBW);
    const x = margin + ((pageW - 2 * margin) - drawWMax) / 2;

    // posiciones Y (una arriba, otra abajo)
    const yFront = margin;
    const yBack  = margin + drawFH + gap;

    pdf.addImage(frontPng, "PNG", x + (drawWMax - drawFW) / 2, yFront, drawFW, drawFH);
    pdf.addImage(backPng,  "PNG", x + (drawWMax - drawBW) / 2, yBack,  drawBW, drawBH);

    pdf.save("tarjeta_nfc_anverso_reverso.pdf");
  }, [cards, exportSideToPng]);

  /* ------------- Importar/Exportar JSON ------------- */
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ cards, elementsBySide }, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tarjeta_nfc_dual_layout.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importJSON = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => {
      alert("❌ No se pudo leer el archivo.");
    };
    reader.onload = () => {
      try {
        const text = typeof reader.result === "string"
          ? reader.result
          : new TextDecoder().decode(reader.result);
        const data = JSON.parse(text);

        if (data.cards && data.elementsBySide) {
          setCards({
            front: { ...defaultCard(), ...(data.cards.front || {}) },
            back: { ...defaultCard(), ...(data.cards.back || {}) },
          });
          setElementsBySide({
            front: Array.isArray(data.elementsBySide.front) ? data.elementsBySide.front : [],
            back: Array.isArray(data.elementsBySide.back) ? data.elementsBySide.back : [],
          });
        } else {
          // soporte de JSON antiguos
          const cardIn = data.card || null;
          const elsIn = Array.isArray(data.elements) ? data.elements : null;
          if (!cardIn && !elsIn) {
            alert("❌ El JSON no contiene datos reconocibles");
            return;
          }
          setCards({ front: { ...defaultCard(), ...(cardIn || {}) }, back: defaultCard() });
            setElementsBySide({ front: elsIn || [], back: [] });
        }
        alert("✅ Layout importado");
      } catch (e) {
        console.error(e);
        alert("❌ JSON inválido: " + (e?.message || e));
      }
    };
    reader.readAsText(file, "utf-8");
  };

  /* ------------- Resets / Presets ------------- */
  const resetAll = () => {
    if (!confirm("¿Resetear ambas caras y los elementos?")) return;
    setCards({ front: defaultCard(), back: defaultCard() });
    setElementsBySide({ front: [], back: [] });
    setSelectedId(null);
    localStorage.removeItem(STORAGE_KEY);
  };
  const applyPresetID1 = () => {
    setCard((c) => ({
      ...c,
      width: Math.round(mmToPx(ID1.widthMm)),
      height: Math.round(mmToPx(ID1.heightMm)),
      radius: Math.round(mmToPx(ID1.cornerMm))
    }));
  };
  const toggleOrientation = () => {
    setCard((c) => ({ ...c, width: c.height, height: c.width }));
  };

  // cálculos útiles para UI
  const widthMm = useMemo(() => pxToMm(card.width), [card.width]);
  const heightMm = useMemo(() => pxToMm(card.height), [card.height]);
  const radiusMm = useMemo(() => pxToMm(card.radius), [card.radius]);
  const safePx = useMemo(() => mmToPx(card.safeMm || 0), [card.safeMm]);
  const outW = useMemo(() => Math.round((card.width / CSS_DPI) * (card.exportDPI || 300)), [card.width, card.exportDPI]);
  const outH = useMemo(() => Math.round((card.height / CSS_DPI) * (card.exportDPI || 300)), [card.height, card.exportDPI]);

  /* ------------- Render ------------- */
  return (
    <Wrap>
      <h2 style={{ margin: 0, marginBottom: 12 }}>Diseñador de Tarjeta NFC</h2>

      {/* Selector de cara */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <Pill>Vista</Pill>
        <div style={{ display: "inline-flex", border: "1px solid #e5e7eb", borderRadius: 999, overflow: "hidden" }}>
          {["front", "back"].map((s) => (
            <button
              key={s}
              onClick={() => { setSide(s); setSelectedId(null); }}
              style={{
                padding: "8px 12px",
                border: 0,
                cursor: "pointer",
                background: side === s ? "#111827" : "#fff",
                color: side === s ? "#fff" : "#111827",
              }}
            >
              {s === "front" ? "Anverso" : "Reverso"}
            </button>
          ))}
        </div>
        <Btn onClick={() => doExport()}>⬇️ Exportar PNG ({side})</Btn>
        <Btn onClick={exportPDFBoth}>📄 Exportar PDF (ambas en 1 hoja)</Btn>
      </div>

      <Row>
        {/* Lienzo */}
        <CardSide>
          <div
            ref={stageRef}
            style={{
              width: card.width,
              height: card.height,
              position: "relative",
              borderRadius: card.radius,
              overflow: "hidden",
              background: card.bgImageDataUrl ? undefined : card.bgColor,
              backgroundImage: card.bgImageDataUrl ? `url(${card.bgImageDataUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              outline: "1px solid #e5e7eb",
              boxShadow: "0 12px 32px rgba(0,0,0,.18)",
            }}
            onMouseDown={(e) => {
              if (e.target === stageRef.current) setSelectedId(null);
            }}
          >
            {/* cuadrícula (fuera de export) */}
            {card.showGrid && !exporting && (
              <div
                data-noprint="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                  backgroundSize: "20px 20px, 20px 20px",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* guía de corte (fuera de export) */}
            {!exporting && (
              <div
                data-noprint="true"
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: card.radius,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,.45)",
                  pointerEvents: "none",
                }}
                title="Línea de corte (trim)"
              />
            )}

            {/* zona segura (fuera de export) */}
            {!exporting && card.safeMm > 0 && (
              <div
                data-noprint="true"
                aria-hidden
                style={{
                  position: "absolute",
                  left: safePx, top: safePx, right: safePx, bottom: safePx,
                  borderRadius: Math.max(0, card.radius - safePx),
                  boxShadow: "inset 0 0 0 1px rgba(16,185,129,.9)",
                  pointerEvents: "none",
                }}
                title="Zona segura"
              />
            )}

            {elements.map((el, idx) => (
              <Rnd
                key={el.id}
                bounds="parent"
                size={{ width: el.w, height: el.h }}
                position={{ x: el.x, y: el.y }}
                onDragStop={(e, d) =>
                  setElementsCurrent((arr) => arr.map((x) => (x.id === el.id ? { ...x, x: d.x, y: d.y } : x)))
                }
                onResizeStop={(e, dir, ref, delta, pos) =>
                  setElementsCurrent((arr) =>
                    arr.map((x) =>
                      x.id === el.id
                        ? { ...x, w: ref.offsetWidth, h: ref.offsetHeight, x: pos.x, y: pos.y }
                        : x
                    )
                  )
                }
                style={{
                  zIndex: idx + 1,
                  border: !exporting && selectedId === el.id ? "1px dashed #38bdf8" : "1px dashed transparent",
                  borderRadius: 8,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(el.id);
                }}
              >
                {el.type === "text" ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 6,
                      color: el.color,
                      background: el.bg,
                      borderRadius: el.radius,
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        el.align === "center" ? "center" : el.align === "right" ? "flex-end" : "flex-start",
                      transform: `rotate(${el.rotate || 0}deg)`,
                      fontSize: (el.fontSize || 18) + "px",
                      fontWeight: el.weight || 500,
                      userSelect: "none",
                      textAlign: el.align,
                      lineHeight: 1.2,
                      overflow: "hidden",
                      whiteSpace: "pre-wrap",
                      fontFamily: getCssFamily(el.fontFamily || "System"),
                    }}
                  >
                    {el.text}
                  </div>
                ) : el.type === "image" ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: `rotate(${el.rotate || 0}deg)`,
                      borderRadius: el.radius || 0,
                      overflow: "hidden",
                      background: el.bg || "transparent",
                    }}
                  >
                    <img
                      src={el.src}
                      alt=""
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: el.objectFit || "cover",
                        display: "block",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                ) : (
                  // icon
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: `rotate(${el.rotate || 0}deg)`,
                      color: el.color || "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: el.bg || "transparent",
                      borderRadius: el.radius || 0,
                    }}
                  >
                    {(() => {
                      const Comp = ICONS[el.iconName || "User"] || ICONS.User;
                      return <Comp width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />;
                    })()}
                  </div>
                )}
              </Rnd>
            ))}
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn onClick={addTitle}>🅰️ Título</Btn>
            <Btn onClick={addSubtitle}>🅱️ Subtítulo</Btn>
            <Btn onClick={addImage}>🖼️ Imagen</Btn>
            <Btn onClick={addIcon}>🔣 Icono</Btn>
          </div>

          {/* input oculto para imagen */}
          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && onPickImage(e.target.files[0])}
          />
        </CardSide>

        {/* Panel derecho */}
        <PanelSide>
          <Group>
            <header>
              <span>Tarjeta ({side === "front" ? "Anverso" : "Reverso"})</span>
              <Pill>Salida ≈ {outW}×{outH}px @{card.exportDPI} dpi</Pill>
            </header>
            <div>
              <LabelRow>
                Presets
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Btn onClick={applyPresetID1}>ID-1 85.60×53.98 mm</Btn>
                  <Btn onClick={toggleOrientation}>↕️ Rotar H/V</Btn>
                </div>
                <Val>—</Val>
              </LabelRow>

              <LabelRow>
                Ancho
                <input
                  type="number"
                  value={card.width}
                  onChange={(e) => setCard((c) => ({ ...c, width: Math.max(200, Number(e.target.value || 0)) }))}
                />
                <Val>{card.width}px · {widthMm.toFixed(2)} mm</Val>
              </LabelRow>

              <LabelRow>
                Alto
                <input
                  type="number"
                  value={card.height}
                  onChange={(e) => setCard((c) => ({ ...c, height: Math.max(200, Number(e.target.value || 0)) }))}
                />
                <Val>{card.height}px · {heightMm.toFixed(2)} mm</Val>
              </LabelRow>

              <LabelRow>
                Radio
                <input
                  type="range" min="0" max="40" value={card.radius}
                  onChange={(e) => setCard((c) => ({ ...c, radius: Number(e.target.value) }))}
                />
                <Val>{card.radius}px · {radiusMm.toFixed(2)} mm</Val>
              </LabelRow>

              <LabelRow>
                Fondo
                <input
                  type="color"
                  value={card.bgColor}
                  onChange={(e) => setCard((c) => ({ ...c, bgColor: e.target.value }))}
                />
                <Val><Pill>color</Pill></Val>
              </LabelRow>

              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={card.showGrid}
                    onChange={(e) => setCard((c) => ({ ...c, showGrid: e.target.checked }))}
                  />{" "}
                  Mostrar grilla
                </label>

                <label style={{ display: "inline-block" }}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const r = new FileReader();
                      r.onload = () => setCard((c) => ({ ...c, bgImageDataUrl: r.result }));
                      r.readAsDataURL(f);
                    }}
                  />
                  <Btn>Fondo con imagen…</Btn>
                </label>

                {card.bgImageDataUrl && (
                  <Btn onClick={() => setCard((c) => ({ ...c, bgImageDataUrl: "" }))}>Quitar imagen</Btn>
                )}
              </div>

              <LabelRow>
                Zona segura
                <input
                  type="number" min="0" step="0.5"
                  value={card.safeMm}
                  onChange={(e) => setCard((c) => ({ ...c, safeMm: Math.max(0, Number(e.target.value || 0)) }))}
                />
                <Val>{card.safeMm} mm</Val>
              </LabelRow>

              <LabelRow>
                DPI de exportación
                <select
                  value={card.exportDPI}
                  onChange={(e) => setCard((c) => ({ ...c, exportDPI: Number(e.target.value) }))}
                >
                  <option value={150}>150</option>
                  <option value={300}>300</option>
                  <option value={450}>450</option>
                  <option value={600}>600</option>
                </select>
                <Val>{card.exportDPI} dpi</Val>
              </LabelRow>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Btn onClick={exportJSON}>💾 Exportar JSON (ambas caras)</Btn>
                <label style={{ display: "inline-block" }}>
                  <input
                    type="file"
                    accept="application/json"
                    style={{ display: "none" }}
                    onChange={(e) => e.target.files?.[0] && importJSON(e.target.files[0])}
                  />
                  <Btn>📂 Importar JSON</Btn>
                </label>
                <Btn onClick={resetAll} style={{ color: "#dc2626" }}>Resetear</Btn>
              </div>
            </div>
          </Group>

          <Group>
            <header>Elemento seleccionado {selected ? <Pill>id {selected.id}</Pill> : null}</header>
            <div>
              {!selected ? (
                <div style={{ color: "#6b7280" }}>Toca un elemento en la tarjeta para editarlo.</div>
              ) : selected.type === "text" ? (
                <>
                  <LabelRow>
                    Texto
                    <input
                      type="text"
                      value={selected.text}
                      onChange={(e) => updateSelected({ text: e.target.value })}
                    />
                    <Val>—</Val>
                  </LabelRow>

                  <LabelRow>
                    Fuente
                    <select
                      value={selected.fontFamily || "System"}
                      onChange={(e) => updateSelected({ fontFamily: e.target.value })}
                    >
                      {FONTS.map((f) => (
                        <option key={f.label} value={f.label}>{f.label}</option>
                      ))}
                    </select>
                    <Val>{selected.fontFamily || "System"}</Val>
                  </LabelRow>

                  <LabelRow>
                    Tamaño
                    <input
                      type="number"
                      value={selected.fontSize || 18}
                      onChange={(e) => updateSelected({ fontSize: Number(e.target.value || 0) })}
                    />
                    <Val>{selected.fontSize || 18}px</Val>
                  </LabelRow>

                  <LabelRow>
                    Peso
                    <input
                      type="range" min="300" max="900" step="100"
                      value={selected.weight || 500}
                      onChange={(e) => updateSelected({ weight: Number(e.target.value) })}
                    />
                    <Val>{selected.weight || 500}</Val>
                  </LabelRow>

                  <LabelRow>
                    Color
                    <input
                      type="color"
                      value={selected.color || "#ffffff"}
                      onChange={(e) => updateSelected({ color: e.target.value })}
                    />
                    <Val><Pill>texto</Pill></Val>
                  </LabelRow>

                  <LabelRow>
                    Alineación
                    <select
                      value={selected.align || "left"}
                      onChange={(e) => updateSelected({ align: e.target.value })}
                    >
                      <option value="left">Izquierda</option>
                      <option value="center">Centro</option>
                      <option value="right">Derecha</option>
                    </select>
                    <Val>{selected.align || "left"}</Val>
                  </LabelRow>

                  <LabelRow>
                    Fondo
                    <input
                      type="color"
                      value={selected.bg || "transparent"}
                      onChange={(e) => updateSelected({ bg: e.target.value })}
                    />
                    <Val><Pill>fondo</Pill></Val>
                  </LabelRow>

                  <LabelRow>
                    Radio
                    <input
                      type="range" min="0" max="40"
                      value={selected.radius || 0}
                      onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
                    />
                    <Val>{selected.radius || 0}px</Val>
                  </LabelRow>

                  <LabelRow>
                    Rotación
                    <input
                      type="range" min="-180" max="180"
                      value={selected.rotate || 0}
                      onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
                    />
                    <Val>{selected.rotate || 0}°</Val>
                  </LabelRow>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Btn onClick={() => moveZ("back")}>⬇️ Enviar atrás</Btn>
                    <Btn onClick={() => moveZ("front")}>⬆️ Traer al frente</Btn>
                    <Btn onClick={duplicateSelected}>🧬 Duplicar</Btn>
                    <Btn onClick={deleteSelected} style={{ color: "#dc2626" }}>🗑️ Eliminar</Btn>
                  </div>
                </>
              ) : selected.type === "image" ? (
                <>
                  <LabelRow>
                    Ajuste
                    <select
                      value={selected.objectFit || "cover"}
                      onChange={(e) => updateSelected({ objectFit: e.target.value })}
                    >
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                      <option value="fill">Fill</option>
                    </select>
                    <Val>{selected.objectFit || "cover"}</Val>
                  </LabelRow>

                  <LabelRow>
                    Fondo
                    <input
                      type="color"
                      value={selected.bg || "transparent"}
                      onChange={(e) => updateSelected({ bg: e.target.value })}
                    />
                    <Val><Pill>fondo</Pill></Val>
                  </LabelRow>

                  <LabelRow>
                    Radio
                    <input
                      type="range" min="0" max="60"
                      value={selected.radius || 0}
                      onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
                    />
                    <Val>{selected.radius || 0}px</Val>
                  </LabelRow>

                  <LabelRow>
                    Rotación
                    <input
                      type="range" min="-180" max="180"
                      value={selected.rotate || 0}
                      onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
                    />
                    <Val>{selected.rotate || 0}°</Val>
                  </LabelRow>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Btn onClick={() => moveZ("back")}>⬇️ Enviar atrás</Btn>
                    <Btn onClick={() => moveZ("front")}>⬆️ Traer al frente</Btn>
                    <Btn onClick={duplicateSelected}>🧬 Duplicar</Btn>
                    <Btn onClick={deleteSelected} style={{ color: "#dc2626" }}>🗑️ Eliminar</Btn>
                  </div>
                </>
              ) : (
                // ICON
                <>
                  <LabelRow>
                    Icono
                    <select
                      value={selected.iconName || "User"}
                      onChange={(e) => updateSelected({ iconName: e.target.value })}
                    >
                      {Object.keys(ICONS).map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                    <Val>{selected.iconName || "User"}</Val>
                  </LabelRow>

                  <LabelRow>
                    Color
                    <input
                      type="color"
                      value={selected.color || "#ffffff"}
                      onChange={(e) => updateSelected({ color: e.target.value })}
                    />
                    <Val><Pill>trazo</Pill></Val>
                  </LabelRow>

                  <LabelRow>
                    Fondo
                    <input
                      type="color"
                      value={selected.bg || "transparent"}
                      onChange={(e) => updateSelected({ bg: e.target.value })}
                    />
                    <Val><Pill>fondo</Pill></Val>
                  </LabelRow>

                  <LabelRow>
                    Radio
                    <input
                      type="range" min="0" max="60"
                      value={selected.radius || 0}
                      onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
                    />
                    <Val>{selected.radius || 0}px</Val>
                  </LabelRow>

                  <LabelRow>
                    Rotación
                    <input
                      type="range" min="-180" max="180"
                      value={selected.rotate || 0}
                      onChange={(e) => updateSelected({ rotate: Number(e.target.value) })}
                    />
                    <Val>{selected.rotate || 0}°</Val>
                  </LabelRow>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Btn onClick={() => moveZ("back")}>⬇️ Enviar atrás</Btn>
                    <Btn onClick={() => moveZ("front")}>⬆️ Traer al frente</Btn>
                    <Btn onClick={duplicateSelected}>🧬 Duplicar</Btn>
                    <Btn onClick={deleteSelected} style={{ color: "#dc2626" }}>🗑️ Eliminar</Btn>
                  </div>
                </>
              )}
            </div>
          </Group>
        </PanelSide>
      </Row>
    </Wrap>
  );
}
