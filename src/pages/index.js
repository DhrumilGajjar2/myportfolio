import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  }),
};

const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="hero-section">
      {/* Decorative Glow */}
      <motion.div
        className="hero-glow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      <div className="hero-container">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="hero-card"
        >
          <motion.h2
            className="hero-subtitle"
            variants={fadeIn}
            custom={0.1}
            initial="hidden"
            animate="visible"
          >
            Web Developer & Freelancer
          </motion.h2>

          <motion.h1
            className="hero-title"
            variants={fadeIn}
            custom={0.2}
            initial="hidden"
            animate="visible"
          >
            Hi, I'm Dhrumil 👋
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={fadeIn}
            custom={0.3}
            initial="hidden"
            animate="visible"
          >
            I design and build creative, interactive web experiences using React, Next.js, and modern technologies. 🚀 Let’s build something awesome together.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={fadeIn}
            custom={0.4}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={() => router.push('/projects')}
              className="hero-button hero-button-primary"
            >
              View Projects
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="hero-button hero-button-secondary"
            >
              Hire Me
            </button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="hero-features">
          {[0.6, 0.7, 0.8].map((delay, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              custom={delay}
              initial="hidden"
              animate="visible"
              className="feature-card"
            >
              {idx === 0 && (
                <>
                  <h3>2+ Years</h3>
                  <p>Experience in Frontend & Full-Stack</p>
                </>
              )}
              {idx === 1 && (
                <>
                  <h3>10+ Projects</h3>
                  <p>Real-world websites and SaaS apps</p>
                </>
              )}
              {idx === 2 && (
                <>
                  <h3>React | Next.js | Node.js</h3>
                  <p>Modern stack + clean code principles</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
