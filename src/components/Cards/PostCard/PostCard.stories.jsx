import { PostCard } from "./PostCard.jsx";

export default {
  component: PostCard,
  argTypes: {
    size: {
      description: "Tamaño de Tarjeta",
      control: "select",
      xs: "320px",
      options: ["xs", "md", "lg", "xl", "full"],
    },
  },
};

export const PostCardMediano = {
  args: {
    post: { id: "1", name: "Michael" },
    size: "md",
  },
};
