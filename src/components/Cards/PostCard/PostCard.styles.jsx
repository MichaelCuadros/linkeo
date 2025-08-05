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

  background: #d9d9d9;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
`;
