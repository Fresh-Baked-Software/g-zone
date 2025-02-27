"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from 'next/image';
import Cookies from "js-cookie";
import styled from "styled-components";

import Sun from '../../public/icons/sun-sharp-light.svg'
import Moon from '../../public/icons/moon-sharp-light.svg'

const StyledButton = styled.button<{ theme: string | undefined }>`
  position: relative;
  width: 4rem;
  height: 2rem;
  border-radius: 9999px;
  transition: background-color 300ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-1);
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const ToggleKnob = styled.div<{ $isDark: boolean }>`
  position: absolute;
  z-index: 2;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: white;
  transition: transform 300ms ease-in-out;
  transform: translateX(${(props) => (props.$isDark ? "1.75rem" : "-.25rem")});
`

const IconSpan = styled.span`
  font-size: var(--text-xl);
  z-index: 1;
`


export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const savedTheme = Cookies.get("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    Cookies.set("theme", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <StyledButton onClick={toggleTheme} theme={theme}>
      <IconSpan><Image src={Moon} alt="a moon" width={20} height={20}/></IconSpan>
      <ToggleKnob $isDark={theme === "dark"} />
      <IconSpan><Image src={Sun} alt="a sun" width={20} height={20}/></IconSpan>
    </StyledButton>
  )
}
