import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

// ✅ Fix: Set correct root for accessibility in Next.js (client-only)
if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

// === Animation Variants ===
const containerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// === Styled Components ===
const Section = styled.section`
  background: #ffffff;
  padding: 100px 24px;
  text-align: center;
  color: #101815;
`;

const Heading = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  margin-bottom: 50px;
  color: #00a86a;
`;

const FilterContainer = styled.div`
  margin-bottom: 40px;
`;

const FilterButton = styled.button`
  margin: 0 8px;
  padding: 10px 16px;
  border: 1px solid #00a86a;
  background: ${(props) => (props.active ? '#00a86a' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#00a86a')};
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #00a86a;
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Card = styled(motion.article)`
  background: #f4f9f7;
  border: 1px solid #e1eee9;
  border-radius: 16px;
  padding: 32px 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 168, 106, 0.15);
  }

  &:focus {
    outline: 3px solid #00a86a;
    outline-offset: 4px;
  }
`;

const Icon = styled(motion.div)`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #00a86a;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #5e8d7c;
  line-height: 1.6;
`;

// === Tooltip ===
const Tooltip = styled.div`
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: #00a86a;
  color: white;
  padding: 6px 12px;
  font-size: 0.75rem;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

// === Data ===
const services = [
  {
    id: 1,
    icon: '💻',
    title: 'Web Development',
    description: 'Building fast and modern websites using Next.js and React.',
    category: 'Development',
  },
  {
    id: 2,
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating beautiful, user-friendly interfaces and experiences.',
    category: 'Design',
  },
  {
    id: 3,
    icon: '📈',
    title: 'SEO Optimization',
    description: 'Improving website ranking on search engines with best practices.',
    category: 'Marketing',
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'API Integration',
    description: 'Connecting third-party services to enhance website functionality.',
    category: 'Development',
  },
];

// === Main Component ===
export default function Services() {
  const [filter, setFilter] = useState('All');
  const [modalData, setModalData] = useState(null);

  const categories = ['All', 'Development', 'Design', 'Marketing'];

  const filteredServices =
    filter === 'All'
      ? services
      : services.filter((service) => service.category === filter);

  return (
    <Section
      as={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      role="region"
      aria-labelledby="services-heading"
    >
      <Heading id="services-heading" variants={containerVariants}>
        My Services
      </Heading>

      <FilterContainer>
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            active={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </FilterButton>
        ))}
      </FilterContainer>

      <Grid>
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            tabIndex={0}
            onClick={() => setModalData(service)}
          >
            <Tooltip>Click for more</Tooltip>
            <Icon
              role="img"
              aria-label={service.title}
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
            >
              {service.icon}
            </Icon>
            <Title>{service.title}</Title>
            <Description>{service.description}</Description>
          </Card>
        ))}
      </Grid>

      {/* Modal Popup */}
      {typeof window !== 'undefined' && modalData && (
        <Modal
          isOpen={!!modalData}
          onRequestClose={() => setModalData(null)}
          style={{
            content: {
              maxWidth: '500px',
              margin: 'auto',
              borderRadius: '16px',
              padding: '32px',
            },
          }}
        >
          <h2>{modalData.title}</h2>
          <p>{modalData.description}</p>
          <button
            onClick={() => setModalData(null)}
            style={{
              marginTop: '24px',
              padding: '10px 16px',
              border: 'none',
              background: '#00a86a',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </Modal>
      )}
    </Section>
  );
}
