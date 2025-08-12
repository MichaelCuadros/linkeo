import React from "react";
import styled, { css } from "styled-components";
import { Icon } from "@iconify/react";
import { PostCard } from "../components/Cards/PostCard/PostCard";

/* ===================================================================== */
/*  DESIGN TOKENS                                                        */
/* ===================================================================== */
const palette = {
  white: "#ffffff",
  black: "#000000",
  gray50: "#fdfdfd",
  gray100: "#fafafa",
  gray200: "#f3f3f3",
  gray300: "#e6e6e6",
  gray500: "#9e9e9e",
  gray700: "#4d4d4d",
  gray900: "#262626",
  accent: "#0095f6",
};

const shadowSm = "0 1px 3px rgba(0,0,0,.08)";
const radiusSm = "8px";

const fontSize = {
  base: "clamp(0.95rem, 0.9rem + 0.25vw, 1rem)",
  lg: "clamp(1.4rem, 1.15rem + 0.8vw, 1.75rem)",
  xl: "clamp(2rem, 1.8rem + 1vw, 2.5rem)",
};

/* ===================================================================== */
/*  LAYOUT WRAPPER                                                       */
/* ===================================================================== */
const Page = styled.main`
  max-width: 1280px;
  margin-inline: auto;
  padding: 0 1.25rem 6rem;
  color: ${palette.gray900};
  background: ${palette.gray50};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: ${fontSize.base};
  line-height: 1.6;
`;

/* ===================================================================== */
/*  UTILITIES                                                            */
/* ===================================================================== */
const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonStyle = css`
  appearance: none;
  border: 1px solid ${palette.gray300};
  background: ${palette.white};
  border-radius: ${radiusSm};
  padding: 0.6rem 1.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  &:hover {
    background: ${palette.gray200};
    box-shadow: ${shadowSm};
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px solid ${palette.accent};
    outline-offset: 2px;
  }
`;

/* ===================================================================== */
/*  COMPONENTS                                                           */
/* ===================================================================== */
const CoverWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: ${radiusSm} ${radiusSm} 0 0;
  overflow: hidden;
  @media (max-width: 640px) {
    height: 200px;
  }
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
 
  display: block;
`;

const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    rgba(0, 0, 0, 0.05) 100%
  );
`;

/* Avatar */
const AvatarWrapper = styled.div`
  position: relative;
  width: 180px;
  aspect-ratio: 1/1;
  margin-top: -160px;
  margin-left: 10px;
  z-index: 2;
  @media (max-width: 640px) {
    width: 120px;
    margin-top: -110px;
  }
`;

const Ring = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 3px;
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

/* Heading */
const Heading = styled.header`
  display: grid;

  align-items: center;
  margin-top: 1rem;

`;

const Username = styled.h1`
  font-size: ${fontSize.lg};
  font-weight: 500;
  margin: 0;
  word-break: break-word;
`;

/* Bio & Details */
const DisplayName = styled.p`
  font-weight: 600;
  margin: 0.15rem 0;
`;

const Handle = styled.span`
  display: inline-block;
  padding: 0.25rem 0.7rem;
  background: ${palette.gray200};
  font-size: 0.75rem;
  border-radius: ${radiusSm};
  color: ${palette.gray700};
`;

const Bio = styled.p`
  margin: 0.5rem 0 0.9rem;
  max-width: 60ch;
`;

/* Social Links */
const SocialLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin: 1.2rem 0 1.8rem;
  li {
    list-style: none;
  }
  a {
    color: ${palette.gray900};
    font-size: 1.5rem;
    transition: color 0.2s;
  }
  a:hover,
  a:focus-visible {
    color: ${palette.accent};
  }
`;

/* Highlights */
const HighlightRow = styled.section`
  margin-top: 3rem;
  display: flex;
  gap: 1.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const HighlightBase = css`
  width: 105px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
`;

const AddHighlight = styled.button`
  ${buttonStyle};
  ${HighlightBase};
  border: 2px dashed ${palette.gray300};
  padding: 0;
  color: ${palette.gray500};
`;

const SocialCircle = styled.a`
  ${HighlightBase};
  border: 1px solid ${palette.gray300};
  background: ${palette.white};
  color: ${palette.gray900};
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover,
  &:focus-visible {
    background: ${palette.gray200};
    color: ${palette.accent};
    box-shadow: ${shadowSm};
  }
`;

/* Posts Placeholder */
const PostsGrid = styled.section`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.75rem;
`;

/* ===================================================================== */
/*  VIEW                                                                 */
/* ===================================================================== */
export default function ProfileCard() {
  return (
    <Page>
      <CoverWrapper>
        <CoverImg
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=60"
          alt="Mountain sunrise cover"
        />
        <CoverOverlay />
      </CoverWrapper>

      <Heading>
        <AvatarWrapper>
          <Ring />
          <Avatar src="https://i.pravatar.cc/300?img=56" alt="Michael Cuadros avatar" />
        </AvatarWrapper>
        <div>
          <FlexBetween>
            <Username>mike_santana1524</Username>
          </FlexBetween>

          <DisplayName>Mike Santana</DisplayName>
          <Handle>@mike_santana1524</Handle>
          <Bio>
            Full-stack developer building with Next.js & Spring Boot. Coffee-driven,
            open-source advocate, lifelong learner.
          </Bio>
        </div>
      </Heading>

      <HighlightRow>
        <AddHighlight aria-label="Add highlight">
          <Icon icon="mdi:plus" />
        </AddHighlight>
        <SocialCircle
          href="https://www.linkedin.com/in/mikesantana"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Icon icon="mdi:linkedin" width={32} />
        </SocialCircle>
        <SocialCircle
          href="https://github.com/mikesantana"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Icon icon="mdi:github" width={32} />
        </SocialCircle>
        <SocialCircle
          href="https://instagram.com/mike_santana1524"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <Icon icon="mdi:instagram" width={32} />
        </SocialCircle>
        <SocialCircle
          href="https://twitter.com/mike_codes"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <Icon icon="mdi:twitter" width={32} />
        </SocialCircle>
        <SocialCircle
          href="https://youtube.com/@mikesantana"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          <Icon icon="mdi:youtube" width={32} />
        </SocialCircle>
      </HighlightRow>

      <PostsGrid>
        {Array.from({ length: 9 }).map((_, i) => (
          <PostCard size="sm" key={i} />
        ))}
      </PostsGrid>
    </Page>
  );
}
