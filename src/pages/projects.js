import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// === Animation Variants ===
const containerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// === Styled Components ===
const Container = styled(motion.section)`
  min-height: 100vh;
  background: #ffffff;
  padding: 100px 24px;
  color: #101815;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  text-align: center;
  color: #00a86a;
  margin-bottom: 50px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1080px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.article)`
  background: #f4f9f7;
  border-radius: 16px;
  padding: 32px 24px;
  border: 1px solid #e1eee9;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 168, 106, 0.15);
    transform: translateY(-6px);
  }

  &:focus {
    outline: 3px solid #00a86a;
    outline-offset: 4px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #00a86a;
  margin-bottom: 12px;
`;

const ProjectDesc = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #5e8d7c;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

export default function Projects() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: '1',
      title: 'Portfolio Website',
      description: 'A personal portfolio built with Next.js and styled-components.',
    },
    {
      id: '2',
      title: 'E-Commerce App',
      description: 'An online shopping platform with real-time payment integration.',
    },
    {
      id: '3',
      title: 'AI Chatbot',
      description: 'A smart chatbot using OpenAI API to provide automated responses.',
    },
   
  ];

  return (
    <Container
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      role="region"
      aria-labelledby="projects-heading"
    >
      <Title id="projects-heading" variants={containerVariants}>
        Featured Projects
      </Title>

      <ProjectGrid>
        {projects.map((project, index) => (
          <Link key={project.id} href={`/projects/${project.id}`} passHref legacyBehavior>
            <StyledLink aria-label={`Project: ${project.title}`}>
              <ProjectCard
                tabIndex={0}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDesc>{project.description}</ProjectDesc>
              </ProjectCard>
            </StyledLink>
          </Link>
        ))}
      </ProjectGrid>
    </Container>
  );
}
