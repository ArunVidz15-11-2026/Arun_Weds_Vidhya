import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'
import Divider from './Divider'

// Introduces the couple with their parents' names, inspired by the
// "Join us for the wedding" section of the my-beloved template.
export default function JoinUsSlide() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        position: 'relative',
        minHeight: '80vh',
        padding: '64px 28px 72px',
        textAlign: 'center',
        background:
          'radial-gradient(circle at 50% 0%, rgba(201,148,42,0.10), transparent 60%), var(--cream)',
        overflow: 'hidden',
      }}
    >
      <motion.p
        variants={fadeUp}
        style={{
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontSize: 11,
          color: 'var(--text-medium)',
          fontFamily: "'EB Garamond', serif",
          margin: 0,
        }}
      >
        Join us for the wedding of
      </motion.p>

      <motion.h2
        variants={fadeUp}
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 68,
          lineHeight: 1,
          color: 'var(--text-dark)',
          margin: '18px 0 4px',
        }}
      >
        Ravichandra
      </motion.h2>

      <motion.p
        variants={fadeUp}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 22,
          color: 'var(--gold)',
          margin: '2px 0',
        }}
      >
        &amp;
      </motion.p>

      <motion.h2
        variants={fadeUp}
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 68,
          lineHeight: 1,
          color: 'var(--text-dark)',
          margin: '4px 0 24px',
        }}
      >
        Rachana
      </motion.h2>

      <Divider />

      <motion.div
        variants={fadeUp}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          maxWidth: 340,
          margin: '10px auto 0',
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: 11,
              color: 'var(--gold)',
              fontFamily: "'EB Garamond', serif",
            }}
          >
            Son of
          </p>
          <p
            style={{
              margin: '6px 0 0',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              color: 'var(--text-dark)',
              lineHeight: 1.4,
            }}
          >
            Mr. Raghavarao Gottipati
            <br />
            &amp; Mrs. Vazzram <span style={{ fontStyle: 'italic', color: 'var(--text-medium)', fontSize: 15 }}>(Late)</span>
          </p>
        </div>

        <div>
          <p
            style={{
              margin: 0,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: 11,
              color: 'var(--gold)',
              fontFamily: "'EB Garamond', serif",
            }}
          >
            Daughter of
          </p>
          <p
            style={{
              margin: '6px 0 0',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              color: 'var(--text-dark)',
              lineHeight: 1.4,
            }}
          >
            Mr. Meruga Prabhakar
            <br />
            &amp; Mrs. Padma
          </p>
        </div>
      </motion.div>

      <motion.p
        variants={fadeUp}
        style={{
          marginTop: 40,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontSize: 12,
          color: 'var(--gold)',
          fontFamily: "'EB Garamond', serif",
        }}
      >
        Join Our Celebration
      </motion.p>
    </motion.section>
  )
}
