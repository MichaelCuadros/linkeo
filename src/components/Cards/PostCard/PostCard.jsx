import { Icon } from "@iconify/react";
import {
  Post,
  PostHeader,
  Avatar,
  Username,
  PostActions,
  PostImage,
} from "./PostCard.styles.jsx";

export const PostCard = ({ post, size="md" }) => {
  const { id, name } = post || {};
  return (
    <Post size={size} key={id}>
      <PostHeader>
        <Avatar />
        <Username>{name}</Username>
      </PostHeader>
      <PostImage />
      <PostActions>
        <Icon icon="mdi:heart-outline" width="24" />
        <Icon icon="mdi:message-outline" width="24" />
      </PostActions>
    </Post>
  );
};
