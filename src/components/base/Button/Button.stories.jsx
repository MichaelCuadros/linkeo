import { Button } from "./Button";

export default {
  component: Button,
  argTypes: {
    label: {
      description: "Texto que se muestra dentro del botón",
      control: "text",
    },
    color: {
      description: "Color del botón: red, yellow, green, purple, blue",
      control: "select",
      options: ["red", "yellow", "green", "purple", "blue"],
    },
  },
};

export const BotonAzul = {
  args: {
    label: "boton azul",
    color: "blue",
  },
};

export const BotonVerde = {
  args:{
    label:"boton verde",
    color:"green"
  }
};

export const BotonRojo = {
  args:{
    label:"boton rojo",
    color:"red"
  }
};

export const BotonAmarillo = {
  args:{
    label:"boton amarillo",
    color:"yellow"
  }
};

export const BotonPurpura = {
  args:{
    label:"boton purpura",
    color:"purple"
  }
};
