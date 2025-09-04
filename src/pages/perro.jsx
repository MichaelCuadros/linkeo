// src/pages/Step2.jsx
import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ====== UI ====== */
const floatIn = keyframes`
  from { transform: translateY(12px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(1200px 600px at 10% -10%, #6366f1 0%, transparent 50%),
    radial-gradient(1000px 520px at 110% 10%, #22c55e 0%, transparent 40%),
    #0b1220;
  color: #0f172a;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  box-shadow: 0 30px 70px rgba(0,0,0,0.25);
  padding: 28px;
  animation: ${floatIn} .35s ease-out both;
`;

const Brand = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 18px;
  text-align: center;
  h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: .2px; color: #0f172a; }
  p { margin: 0; color: #475569; font-size: 14px; }
`;

const Form = styled.form` display: grid; gap: 14px; `;
const Field = styled.label` display: grid; gap: 8px; font-size: 13px; color: #0f172a; `;
const InputWrap = styled.div` position: relative; display: grid; `;

const Input = styled.input`
  height: 46px;
  padding: 10px 40px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease;
  &::placeholder { color: #94a3b8; }
  &:hover { border-color: #d1d5db; }
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,.15); }
  &[aria-invalid="true"] { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239,68,68,.12); }
`;

const LeftIcon = styled.span`
  position: absolute; inset: 0 auto 0 12px;
  display: grid; place-items: center; pointer-events: none; color: #64748b;
`;

const RightBtn = styled.button`
  position: absolute; right: 8px; top: 50%; translate: 0 -50%;
  border: 0; background: transparent; padding: 6px 10px; border-radius: 10px;
  color: #475569; cursor: pointer;
  &:hover { background: #f1f5f9; }
`;

const ErrorText = styled.div` color: #b91c1c; font-size: 12px; line-height: 1.2; margin-top: 4px;`;

const Row = styled.div` display: flex; align-items: center; justify-content: space-between; margin-top: 4px; `;
const Check = styled.label` display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #334155;
  input { width: 16px; height: 16px; }`;
const LinkA = styled.a` font-size: 13px; color: #6366f1; text-decoration: none; &:hover { text-decoration: underline; }`;

const Submit = styled.button`
  height: 46px; border: 0; border-radius: 12px; background: #111827; color: white;
  font-weight: 700; font-size: 14px; letter-spacing: .3px; cursor: pointer;
  transition: transform .04s ease, box-shadow .15s ease, background .15s ease;
  box-shadow: 0 12px 24px rgba(17,24,39,.25);
  &:hover { background: #0b1220; }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: .6; cursor: not-allowed; box-shadow: none; }
`;

const Secondary = styled.button`
  height: 46px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff; color: #0f172a;
  font-weight: 700; font-size: 14px; letter-spacing: .2px; cursor: pointer;
  transition: transform .04s ease, box-shadow .15s ease, background .15s ease;
  margin-top: 8px;
  &:hover { background: #f8fafc; }
  &:active { transform: translateY(1px); }
`;

const Footer = styled.p` margin: 14px 0 0; text-align: center; color: #64748b; font-size: 12px; `;

/* Icons */
const UserIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const LockIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const EyeIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const EyeOffIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12s3.5-7 10-7c2.1 0 4-.7 5.6 1.7M22 12s-3.5 7-10 7c-2.1 0-4-.7-5.6-1.7" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function Step2() {
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { login } = useAuth();

  const [values, setValues] = useState({ user: "", pass: "", remember: true });
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState({ user: false, pass: false });
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!values.user.trim()) e.user = "Ingresa tu usuario o correo";
    if (!values.pass) e.pass = "Ingresa tu contraseña";
    else if (values.pass.length < 6) e.pass = "Mínimo 6 caracteres";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const update = (key) => (ev) => {
    const value = key === "remember" ? ev.target.checked : ev.target.value;
    setValues((v) => ({ ...v, [key]: value }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setTouched({ user: true, pass: true });
    setServerErr("");
    if (!isValid) return;

    try {
      setLoading(true);
      await login({ user: values.user, pass: values.pass, remember: values.remember });
      nav(from, { replace: true }); // vuelve a la ruta solicitada o /dashboard
    } catch (e) {
      setServerErr(e.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card role="dialog" aria-labelledby="login-title">
        <Brand>
          <h1 id="login-title">Iniciar sesión</h1>
          <p>Accede con tu usuario y contraseña</p>
        </Brand>

        <Form onSubmit={onSubmit} noValidate>
          <Field>
            Usuario o correo
            <InputWrap>
              <LeftIcon><UserIcon /></LeftIcon>
              <Input
                type="text"
                name="username"
                placeholder="tu@correo.com"
                value={values.user}
                onChange={update("user")}
                onBlur={() => setTouched((t) => ({ ...t, user: true }))}
                aria-invalid={touched.user && !!errors.user}
                autoComplete="username"
                inputMode="email"
              />
            </InputWrap>
            {touched.user && errors.user && <ErrorText>{errors.user}</ErrorText>}
          </Field>

          <Field>
            Contraseña
            <InputWrap>
              <LeftIcon><LockIcon /></LeftIcon>
              <Input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={values.pass}
                onChange={update("pass")}
                onBlur={() => setTouched((t) => ({ ...t, pass: true }))}
                aria-invalid={touched.pass && !!errors.pass}
                autoComplete="current-password"
              />
              <RightBtn
                type="button"
                aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShow((s) => !s)}
                title={show ? "Ocultar" : "Mostrar"}
              >
                {show ? <EyeOffIcon /> : <EyeIcon />}
              </RightBtn>
            </InputWrap>
            {touched.pass && errors.pass && <ErrorText>{errors.pass}</ErrorText>}
          </Field>

          <Row>
            <Check>
              <input type="checkbox" checked={values.remember} onChange={update("remember")} />
              Recordarme
            </Check>
            <LinkA href="#" onClick={(e)=>e.preventDefault()}>¿Olvidaste tu contraseña?</LinkA>
          </Row>

          {serverErr && <ErrorText style={{ marginTop: 6 }}>{serverErr}</ErrorText>}

          <Submit type="submit" disabled={!isValid || loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Submit>

          <Secondary type="button" onClick={() => nav("/register")}>
            Crear cuenta
          </Secondary>

          <Footer>LINKEO OFICIAL</Footer>
        </Form>
      </Card>
    </Page>
  );
}
