import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';


const fadeIn = keyframes`
  from { opacity: 0.2; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(-5px); }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 100px 20px;
  background: linear-gradient(135deg, #ffffff, #ffffff);
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #00a86a;
  margin-bottom: 16px;
  text-shadow: 0 0 10px rgba(0, 168, 106, 0.4);
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-top: 10px;
  color: #00a86a;
  max-width: 760px;
  text-align: center;
  line-height: 1.7;
  opacity: 0.85;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  color: #00a86a;
  font-weight: 600;
  animation: ${fadeIn} 1.5s ease-in-out infinite alternate;
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 60, 60, 0.1);
  color: #ff3c3c;
  padding: 18px 24px;
  margin-top: 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(255, 60, 60, 0.3);
  border: 1px solid rgba(255, 60, 60, 0.3);
`;

const projects = [
  { id: '1', title: 'Portfolio Website', description: 'A personal portfolio built with Next.js and Styled Components.' },
  { id: '2', title: 'E-Commerce App', description: 'An online shopping platform with real-time payment integration.' },
  { id: '3', title: 'AI Chatbot', description: 'A smart chatbot using OpenAI API to provide automated responses.' },
];

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return (
      <Container>
        <LoadingText>Loading project details...</LoadingText>
      </Container>
    );
  }

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Container>
        <ErrorMessage>Project Not Found</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
    </Container>
  );
}
