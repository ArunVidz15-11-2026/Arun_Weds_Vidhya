import { motion } from 'framer-motion'
import { fadeUp } from '../animations'
import Divider from './Divider'
import SectionPopHearts from './SectionPopHearts'

export default function FinalSlide() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--cream), #f2e8d8)',
      }}
    >
      <SectionPopHearts opacity={0.78} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 26 }}
      >
        💛
        </motion.div>

        <h2
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 42,
          background: 'linear-gradient(90deg, #8B6210, #c9942a, #ffe8a0, #c9942a, #8B6210)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '8px 0 0',
        }}
      >
        Ravichandra &amp; Rachana
        </h2>

        <Divider />

        <p
        style={{
          marginTop: 14,
          fontFamily: "'EB Garamond', serif",
          color: 'var(--text-medium)',
          fontSize: 14,
          letterSpacing: '0.1em',
        }}
      >
        With love and gratitude, we look forward to celebrating with you.
        </p>
        <p
        style={{
          marginTop: 40,
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-medium)',
          opacity: 0.7,
        }}
      >
        #RavichandraWedsRachana
        </p>
      </div>
    </motion.section>
  )
}
