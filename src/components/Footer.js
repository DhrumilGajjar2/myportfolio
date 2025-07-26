import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled(motion.footer)`
  width: 100%;
  padding: 64px 24px 40px;
  background: linear-gradient(135deg, #0a0a0a, #101010);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1px;
`;

const ConnectHeading = styled.h3`
  font-size: 1.1rem;
  color: #cccccc;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 500px) {
    gap: 14px;
  }
`;

const Icon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: 1.3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 12px rgba(0, 168, 106, 0.1);

  &:hover {
    transform: scale(1.08) rotate(5deg);
    background: #00a86a;
    color: #ffffff;
    box-shadow: 0 0 18px rgba(0, 168, 106, 0.4), inset 0 0 6px rgba(0, 168, 106, 0.2);
  }

  &:focus {
    outline: 2px dashed #00a86a;
    outline-offset: 4px;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
`;

export default function Footer() {
  return (
    <FooterContainer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Divider />
      <ConnectHeading>Let’s Connect</ConnectHeading>
      <SocialIcons>
        <Icon
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </Icon>
        <Icon
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </Icon>
        <Icon
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </Icon>
      </SocialIcons>
      <Copyright>© {new Date().getFullYear()} Dhrumil 💻. All rights reserved.</Copyright>
    </FooterContainer>
  );
}
