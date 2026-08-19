import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'
import Divider from './Divider'
import SectionPopHearts from './SectionPopHearts'

// Introduces the couple with their parents' names, inspired by the
// "Join us for the wedding" section of the my-beloved template.
export default function JoinUsSlide({ onJoinCelebration }) {
  const handleJoinCelebrationClick = () => {
    if (onJoinCelebration) {
      onJoinCelebration()
      return
    }

    const remainingSection = document.getElementById('remaining-pages-start')
    if (remainingSection) {
      remainingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
      <SectionPopHearts />

      <div style={{ position: 'relative', zIndex: 2 }}>
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
        Rachana
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
        Ravichandra
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
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ marginTop: 40, display: 'inline-block' }}
        >
          <motion.button
            variants={fadeUp}
            onClick={handleJoinCelebrationClick}
            aria-label="Go to next sections"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontSize: 12,
              color: 'var(--gold)',
              fontFamily: "'EB Garamond', serif",
              background: 'linear-gradient(160deg, rgba(26,8,0,0.95), rgba(58,21,5,0.9))',
              border: '1px solid rgba(201,148,42,0.7)',
              borderRadius: 999,
              padding: '10px 18px',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            Join Our Celebration
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
