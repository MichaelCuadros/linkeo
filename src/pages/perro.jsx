import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

/* ==== Animación / Layout ==== */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

const Card = styled.div`
  width: 100%;
  max-width: 560px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(6px);
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,.22);
  animation: ${fadeUp} .35s ease-out both;
`;

const Title = styled.h1`
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 20px;
  letter-spacing: .2px;
`;

const Subtitle = styled.p`
  margin: 0 0 16px;
  color: #475569;
  font-size: 14px;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  font-size: 13px;
  color: #0f172a;
`;

const Input = styled.input`
  height: 46px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease;

  &::placeholder { color: #94a3b8; }
  &:hover { border-color: #d1d5db; }
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99,102,241,.15);
  }
  &[aria-invalid="true"] {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239,68,68,.12);
  }
`;

const ErrorText = styled.div`
  color: #b91c1c;
  font-size: 12px;
  line-height: 1.2;
  margin-top: -4px;
`;

const Row = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; align-items: center;
`;

const Ghost = styled.button`
  height: 42px; padding: 0 14px; border-radius: 12px; border: 1px solid #e5e7eb;
  background: #fff; color: #0f172a; cursor: pointer;
  &:hover { background: #f8fafc; }
`;

const Primary = styled.button`
  height: 42px; padding: 0 16px; border-radius: 12px; border: 0;
  background: #111827; color: #fff; font-weight: 700; cursor: pointer;
  box-shadow: 0 12px 24px rgba(17,24,39,.22);
  &:hover { background: #0b1220; }
  &:disabled { opacity: .6; cursor: not-allowed; box-shadow:none; }
`;

/* Vista previa */
const Preview = styled.a`
  display: grid; grid-template-columns: 44px 1fr; gap: 10px;
  align-items: center; text-decoration: none;
  border: 1px dashed #e5e7eb; border-radius: 14px; padding: 10px;
  background: #fafafa;
  color: #0f172a;
  &:hover { background: #f1f5f9; }
`;

const Favicon = styled.img`
  width: 44px; height: 44px; border-radius: 10px; background: #e2e8f0; object-fit: cover;
`;

const LabelSm = styled.div`
  font-size: 12px; color: #64748b;
`;

const Strong = styled.div`
  font-weight: 700; font-size: 14px; color: #0f172a;
`;

/* Icono */
const LinkIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M10.5 13.5a4.5 4.5 0 0 0 6.4.1l2.5-2.5a4.5 4.5 0 0 0-6.3-6.3l-1.5 1.5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M13.5 10.5a4.5 4.5 0 0 0-6.4-.1L4.6 12.9a4.5 4.5 0 0 0 6.3 6.3l1.5-1.5"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ==== helpers URL ==== */
function normalizeUrl(input) {
  const s = input.trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}
function validateUrl(u) {
  try {
    const { protocol } = new URL(u);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}
function hostnameFrom(u) {
  try { return new URL(u).hostname; } catch { return ""; }
}

/* ==== Componente ==== */
export default function LinkSingle({ initialUrl = "", initialTitle = "", onSave, onCancel }) {
  const [url, setUrl] = useState(initialUrl);
  const [title, setTitle] = useState(initialTitle);
  const [touched, setTouched] = useState({ url: false });

  const normalized = useMemo(() => normalizeUrl(url), [url]);
  const isValid = useMemo(() => validateUrl(normalized), [normalized]);
  const err = !touched.url ? "" : (isValid ? "" : "Ingresa una URL válida (http/https)");
  const host = useMemo(() => hostnameFrom(normalized), [normalized]);
  const displayTitle = title.trim() || host || "Vista previa";

  const favicon = host ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64` : "";

  const handleBlur = () => {
    setTouched((t) => ({ ...t, url: true }));
    if (url && !/^https?:\/\//i.test(url)) {
      setUrl((prev) => normalizeUrl(prev)); // autoprepend https://
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setTouched({ url: true });
    if (!isValid) return;
    const payload = { url: normalized, title: title.trim() };
    if (onSave) onSave(payload);
    else alert(`Guardado:\n${JSON.stringify(payload, null, 2)}`);
  };

  const testLink = () => {
    if (isValid) window.open(normalized, "_blank", "noopener,noreferrer");
  };

  return (
    <Page>
      <Card>
        <Title>Enlazar una sola página web</Title>
        <Subtitle><LinkIcon /> Ingresa el URL que abrirá tu tarjeta.</Subtitle>

        <Form onSubmit={submit} noValidate>
          <Field>
            URL del sitio
            <Input
              type="url"
              placeholder="https://tusitio.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={handleBlur}
              aria-invalid={!!err}
              inputMode="url"
              autoComplete="url"
            />
            {err && <ErrorText>{err}</ErrorText>}
          </Field>

          <Field>
            Título (opcional)
            <Input
              type="text"
              placeholder="Ej. Mi sitio principal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </Field>

          {/* Vista previa */}
          <Field style={{ marginTop: 6 }}>
            Vista previa
            <Preview href={isValid ? normalized : "#"} target="_blank" rel="noopener noreferrer" onClick={(e)=>!isValid && e.preventDefault()}>
              <Favicon src={favicon} alt="" onError={(e)=>{ e.currentTarget.style.visibility="hidden"; }} />
              <div>
                <Strong>{displayTitle}</Strong>
                <LabelSm>{isValid ? normalized : "URL inválida"}</LabelSm>
              </div>
            </Preview>
          </Field>

          <Row>
            <Ghost type="button" onClick={onCancel || (()=>history.back())}>Cancelar</Ghost>
            <Ghost type="button" onClick={testLink} disabled={!isValid}>Probar enlace</Ghost>
            <Primary type="submit" disabled={!isValid}>Guardar</Primary>
          </Row>
        </Form>
      </Card>
    </Page>
  );
}
