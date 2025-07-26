import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// === Styled Components ===
const Container = styled(motion.section)`
  min-height: 100vh;
  background: #ffffff;
  padding: 100px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  background: #f4f9f7;
  padding: 48px 32px;
  border-radius: 20px;
  max-width: 540px;
  width: 100%;
  box-shadow: 0 12px 24px rgba(0, 168, 106, 0.05);
  border: 1px solid #e1eee9;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 2.5rem);
  font-weight: 700;
  color: #00a86a;
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #d5e3dd;
  background-color: #ffffff;
  font-size: 1rem;
  color: #101815;
  transition: border 0.2s;

  &:focus {
    border-color: #00a86a;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #d5e3dd;
  background-color: #ffffff;
  font-size: 1rem;
  color: #101815;
  resize: none;
  min-height: 120px;
  transition: border 0.2s;

  &:focus {
    border-color: #00a86a;
    outline: none;
  }
`;

const CharacterCount = styled.p`
  font-size: 0.8rem;
  color: #5e8d7c;
  text-align: right;
  margin-top: -10px;
`;

const Button = styled(motion.button)`
  padding: 14px;
  background: #00a86a;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #01945d;
  }

  &:disabled {
    background: #cfe5dd;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.success ? '#00a86a' : '#ff4d4d')};
  text-align: center;
  margin-top: 10px;
`;

// === Main Component ===
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Invalid email address');
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setResponseMessage('');
  setSuccess(false);

  if (!formData.name.trim() || !validateEmail(formData.email) || !formData.message.trim()) {
    setResponseMessage('Please fill all fields with valid data.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setResponseMessage('Message sent successfully!');
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setResponseMessage(data.error || 'Something went wrong.');
    }
  } catch (error) {
    setResponseMessage('Server error. Try again later.');
  }

  setLoading(false);
};

 
  useEffect(() => {
    if (responseMessage) {
      const timeout = setTimeout(() => setResponseMessage(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [responseMessage]);

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <Wrapper>
        <Title>Let’s Connect</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {emailError && <Message success={false}>{emailError}</Message>}
          <TextArea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            maxLength={500}
            required
          />
          <CharacterCount>{formData.message.length}/500</CharacterCount>
          <Button whileTap={{ scale: 0.95 }} type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
          {responseMessage && <Message success={success}>{responseMessage}</Message>}
        </Form>
      </Wrapper>
    </Container>
  );
}
