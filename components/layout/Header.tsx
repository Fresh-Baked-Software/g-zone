"use client";

import Link from "next/link";
import styled from "styled-components";

// import { ThemeToggle } from "../theme/ThemeToggle";
import { NavigationItem } from "../../types/contentful";
import InstagramIcon from "../../public/icons/instagram-brands.svg";
import Image from "next/image";

const HeaderContainer = styled.header`
  box-shadow: 0 4px 6px hsl(var(--box-shadow-color));
  background-color: hsl(var(--color-bg));
  position: sticky;
  top: 0;
  z-index: 50;
  padding: var(--space-4) var(--space-8);
  @media (color-scheme: dark) {
    background-color: hsl(var(--color-bg-dark));
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  margin-bottom: 0;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LogoImg = styled.img`
  width: 33px;
  height: 53px;
  object-fit: cover;
  `;

export default function Header({ header }: { header: NavigationItem }) {
  if (!header) return null;

  const { logo, linksCollection } = header;

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Link href="/" passHref>
            {logo && (
              <LogoImg
                src={logo.image.url}
                alt={logo.altText}
              />
            )}
          </Link>
        </LogoContainer>
        <FlexContainer>
          {/* <ThemeToggle /> */}
          <nav>
            <NavList>
              {linksCollection?.items?.map((l, idx) => (
                <li key={l.slug ?? l.socialUrl ?? `link-${idx}`}>
                  <Link href={l.socialUrl ?? (l.slug ? `/${l.slug}` : "#")} passHref>
                    {l.icon ? (
                      <Image src={InstagramIcon} alt={l.name || 'instagram icon'} width={20}/>
                    ) : (
                      l.displayText
                    )}
                  </Link>
                </li>
              ))}
            </NavList>
          </nav>
        </FlexContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
