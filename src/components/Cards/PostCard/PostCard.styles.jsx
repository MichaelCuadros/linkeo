import styled from "styled-components";
import { cardSizes } from "../../../styles/cards";

export const Post = styled.article`
 width: ${(props) => cardSizes[props.size]?.width || cardSizes.md.width};
  height: ${(props) => cardSizes[props.size]?.height || cardSizes.md.height};
  max-width: 100%;
  background: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const PostHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  background: #ccc;
  border-radius: 50%;
`;

export const Username = styled.span`
  color: black;
  font-weight: 600;
`;

export const PostImage = styled.div`
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background-image: url(${(props) =>
    props.imageUrl ||
    "https://imagenes.20minutos.es/uploads/imagenes/2024/05/15/una-imagen-creada-por-la-herramienta-imagen-3-de-google.jpeg"});
  background-size: cover;
  background-position: center;
  background-color: #d9d9d9;
  border-radius: 8px;
  position: relative;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
`;
