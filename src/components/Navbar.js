import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  width: 100%;
  padding: 16px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(244, 249, 247, 0.95)' : 'rgba(255, 255, 255, 0.5)'};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 6px 20px rgba(0, 0, 0, 0.12)' : 'none'};
  transition: all 0.3s ease-in-out;
`;

const Logo = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #00a86a;
  cursor: pointer;
  user-select: none;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    ${({ $open }) =>
      $open
        ? css`
            display: flex;
          `
        : css`
            display: none;
          `};
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 16px;
    backdrop-filter: blur(14px);
    box-shadow: 0px 8px 30px rgba(0, 168, 106, 0.2);
    animation: fadeIn 0.3s ease-in-out;
  }
`;

const NavLink = styled.li`
  a {
    color: ${({ $active }) => ($active ? '#00a86a' : '#101815')};
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    position: relative;
    padding: 8px 12px;
    transition: all 0.3s ease;

    &:hover {
      color: #00a86a;
    }

    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: ${({ $active }) => ($active ? '100%' : '0')};
      background: #00a86a;
      left: 0;
      bottom: -4px;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 2rem;
  color: #00a86a;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };


  const handleNavClick = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav
      $scrolled={scrolled}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo onClick={() => handleNavClick('/')}>Dhrumil</Logo>

      <MenuIcon onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? '✖' : '☰'}
      </MenuIcon>

      <NavLinks $open={isOpen}>
        <NavLink $active={router.pathname === '/'}>
          <a onClick={() => handleNavClick('/')}>Home</a>
        </NavLink>
        <NavLink $active={router.pathname === '/projects'}>
          <a onClick={() => handleNavClick('/projects')}>Projects</a>
        </NavLink>
        <NavLink $active={router.pathname === '/services'}>
          <a onClick={() => handleNavClick('/services')}>Services</a>
        </NavLink>
        <NavLink $active={router.pathname === '/contact'}>
          <a onClick={() => handleNavClick('/contact')}>Contact</a>
        </NavLink>
        
        <NavLink>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </NavLink>
        <NavLink>
          <a href="https://github.com/DhrumilGajjar2" target="_blank" rel="noopener noreferrer">GitHub</a>
        </NavLink>
        
      </NavLinks>

    </Nav>
  );
}
