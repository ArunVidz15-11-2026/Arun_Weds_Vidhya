import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'
import { useCountdown } from '../hooks/useCountdown'
import Sparkles from './Sparkles'

// Replace with the actual wedding date
const WEDDING_DATE = '2026-08-30'

export default function CountdownSlide() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <img
        src="/couple2.jpg"
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
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,8,2,0.45)' }} />

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
          30 August 2026
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
      </motion.div>
    </section>
  )
}
