// src/pages/Register.jsx
import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const floatIn = keyframes`
  from { transform: translateY(12px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Page = styled.div`
  min-height: 100vh; display: grid; place-items: center; padding: 24px;
  background:
    radial-gradient(1200px 600px at -10% 0%, #60a5fa 0%, transparent 50%),
    radial-gradient(900px 500px at 110% 10%, #34d399 0%, transparent 45%),
    #0b1220;
`;
const Card = styled.div`
  width: 100%; max-width: 460px; background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px); border: 1px solid #e5e7eb; border-radius: 20px;
  box-shadow: 0 30px 70px rgba(0,0,0,0.25); padding: 28px; animation: ${floatIn} .35s ease-out both;
`;
const Brand = styled.div`
  display: grid; gap: 6px; margin-bottom: 18px; text-align: center;
  h1 { margin: 0; font-size: 20px; font-weight: 800; color: #0f172a; }
  p { margin: 0; color: #475569; font-size: 14px; }
`;
const Form = styled.form` display: grid; gap: 14px; `;
const Field = styled.label` display: grid; gap: 8px; font-size: 13px; color: #0f172a; `;
const Input = styled.input`
  height: 46px; padding: 10px 14px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff;
  color: #0f172a; font-size: 14px; outline: none; transition: box-shadow .15s ease, border-color .15s ease;
  &::placeholder { color: #94a3b8; }
  &:hover { border-color: #d1d5db; }
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,.15); }
  &[aria-invalid="true"] { border-color: #ef4444; box-shadow: 0 0 0 4px rgba(239,68,68,.12); }
`;
const ErrorText = styled.div` color: #b91c1c; font-size: 12px; line-height: 1.2; margin-top: 4px; `;
const Submit = styled.button`
  height: 46px; border: 0; border-radius: 12px; background: #111827; color: white; font-weight: 700; font-size: 14px;
  letter-spacing: .3px; cursor: pointer; transition: transform .04s ease, box-shadow .15s ease, background .15s ease;
  box-shadow: 0 12px 24px rgba(17,24,39,.25); &:hover { background: #0b1220; } &:active { transform: translateY(1px); }
  &:disabled { opacity: .6; cursor: not-allowed; box-shadow: none; }
`;
const Secondary = styled.button`
  height: 46px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff; color: #0f172a; font-weight: 700; font-size: 14px;
  letter-spacing: .2px; cursor: pointer; margin-top: 8px; &:hover { background: #f8fafc; } &:active { transform: translateY(1px); }
`;

export default function Register() {
  const nav = useNavigate();
  const { register: registerUser } = useAuth();

  const [values, setValues] = useState({ username: "", email: "", pass: "", pass2: "" });
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!values.username.trim() || values.username.trim().length < 2) e.username = "Mínimo 2 caracteres";
    if (!values.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = "Correo inválido";
    if (!values.pass) e.pass = "Ingresa una contraseña";
    else if (values.pass.length < 6) e.pass = "Mínimo 6 caracteres";
    if (values.pass2 !== values.pass) e.pass2 = "Las contraseñas no coinciden";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;
  const update = (k) => (ev) => setValues((v) => ({ ...v, [k]: ev.target.value }));

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerErr("");
    if (!isValid) return;

    try {
      setLoading(true);
      await registerUser({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.pass,
        remember: true, // guarda en localStorage
      });
      nav("/dashboard", { replace: true });
    } catch (e) {
      setServerErr(e.message || "Error de registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card role="dialog" aria-labelledby="register-title">
        <Brand>
          <h1 id="register-title">Crear cuenta</h1>
          <p>Regístrate para empezar</p>
        </Brand>

        <Form onSubmit={onSubmit} noValidate>
          <Field>
            Usuario (linkeo.com/usuario)
            <Input
              type="text"
              name="username"
              placeholder="tu_usuario"
              value={values.username}
              onChange={update("username")}
              aria-invalid={!!errors.username}
              autoComplete="username"
            />
            {errors.username && <ErrorText>{errors.username}</ErrorText>}
          </Field>

          <Field>
            Correo
            <Input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              value={values.email}
              onChange={update("email")}
              aria-invalid={!!errors.email}
              autoComplete="email"
              inputMode="email"
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>

          <Field>
            Contraseña
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={values.pass}
              onChange={update("pass")}
              aria-invalid={!!errors.pass}
              autoComplete="new-password"
            />
            {errors.pass && <ErrorText>{errors.pass}</ErrorText>}
          </Field>

          <Field>
            Repite la contraseña
            <Input
              type="password"
              name="password2"
              placeholder="••••••••"
              value={values.pass2}
              onChange={update("pass2")}
              aria-invalid={!!errors.pass2}
              autoComplete="new-password"
            />
            {errors.pass2 && <ErrorText>{errors.pass2}</ErrorText>}
          </Field>

          {serverErr && <ErrorText style={{ marginTop: 6 }}>{serverErr}</ErrorText>}

          <Submit type="submit" disabled={!isValid || loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Submit>

          <Secondary type="button" onClick={() => nav("/login")}>
            Ya tengo cuenta
          </Secondary>
        </Form>
      </Card>
    </Page>
  );
}
