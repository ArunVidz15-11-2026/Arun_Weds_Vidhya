import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'
import { useCountdown } from '../hooks/useCountdown'
import Sparkles from './Sparkles'
import SectionPopHearts from './SectionPopHearts'
import { COUNTDOWN_IMAGE } from '../media'

// Replace with the actual wedding date
const WEDDING_DATE = '2026-11-15'

export default function CountdownSlide() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)

  const handleScrollDown = (e) => {
    const section = e.currentTarget.closest('section')
    const nextSection = section?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <section id="remaining-pages-start" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <img
        src={COUNTDOWN_IMAGE}
        alt="Countdown background"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'saturate(1.1) contrast(1.04)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,8,2,0.30)' }} />

      <SectionPopHearts opacity={0.82} />

      <Sparkles />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <motion.p
          variants={fadeUp}
          style={{
            color: 'var(--gold)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontSize: 12,
            fontFamily: "'EB Garamond', serif",
          }}
        >
          Counting down to
        </motion.p>

        <motion.h2
          variants={fadeUp}
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: 40, color: '#fdf8f0', margin: '8px 0 28px' }}
        >
          15 November 2026
        </motion.h2>

        <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14 }}>
          {units.map((u) => (
            <motion.div
              key={u.label}
              animate={u.label === 'Seconds' ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                background: 'rgba(253,248,240,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(201,148,42,0.4)',
                borderRadius: 12,
                padding: '14px 10px',
                minWidth: 64,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: '#fdf8f0',
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {u.value ?? '--'}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginTop: 4,
                }}
              >
                {u.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          variants={fadeUp}
          onClick={handleScrollDown}
          aria-label="Scroll to next page"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 22,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 999,
            border: '1px solid rgba(201,148,42,0.7)',
            background: 'linear-gradient(160deg, rgba(26,8,0,0.92), rgba(58,21,5,0.86))',
            color: 'var(--gold)',
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            fontSize: 10,
            fontFamily: "'EB Garamond', serif",
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          Scroll Down
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </motion.div>
    </section>
  )
}
