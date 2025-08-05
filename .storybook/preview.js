import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { createGlobalStyle, ThemeProvider } from "styled-components";

/* 🎨 Estilos globales */
const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

/* 🎨 Tema */
const lightTheme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: { light: lightTheme },
    defaultTheme: "light",
    GlobalStyles,
    Provider: ThemeProvider,
  }),
];

/* 🔧 Config preview */
const preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
