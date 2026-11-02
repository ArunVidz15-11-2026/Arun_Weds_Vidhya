import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function EnvelopeIntro({ onComplete }) {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('invited')) onComplete()
  }, [])

  const handleTap = () => {
    setOpened(true)
    setTimeout(() => {
      sessionStorage.setItem('invited', 'true')
      onComplete()
    }, 2000)
  }

  return (
    <div
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#f5ece0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Soft pulsing gold glow behind the envelope, draws the eye to tap */}
      <motion.div
        animate={opened ? { opacity: 0, scale: 1 } : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,148,42,0.35), transparent 70%)',
          zIndex: 0,
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: opened ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 32,
          color: 'var(--gold)',
          marginBottom: 18,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Wedding Invitation
      </motion.p>

      {/* CSS-drawn envelope with wax seal — no image asset required */}
      <motion.div
        animate={opened ? { y: 90, opacity: 0, scale: 0.92 } : { y: [0, -8, 0] }}
        transition={
          opened
            ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ position: 'relative', width: 260, height: 172, zIndex: 1, perspective: 800 }}
      >
        {/* Envelope body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, #fffaf0, #f3e4c8)',
            border: '1px solid rgba(201,148,42,0.5)',
            borderRadius: 8,
            boxShadow: '0 18px 40px rgba(26,8,0,0.25)',
          }}
        />

        {/* Bottom V crease, purely decorative */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 8,
            background:
              'linear-gradient(135deg, transparent 49.5%, rgba(201,148,42,0.22) 50%, transparent 50.5%), linear-gradient(-135deg, transparent 49.5%, rgba(201,148,42,0.22) 50%, transparent 50.5%)',
            backgroundPosition: 'left bottom',
            backgroundSize: '100% 60%',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Top flap, tips open on tap */}
        <motion.div
          animate={opened ? { rotateX: 155, opacity: 0.6 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '58%',
            background: 'linear-gradient(160deg, #f3e4c8, #e6cd9c)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            border: '1px solid rgba(201,148,42,0.5)',
            borderBottom: 'none',
            zIndex: 3,
          }}
        />

        {/* Wax seal with initials, sits at the flap's tip */}
        <motion.div
          animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute',
            top: '54%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #e0ac4a, #a5761f 75%)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: 17,
              color: '#fffaf0',
              letterSpacing: '0.03em',
            }}
          >
            A&amp;V
          </span>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0 : [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          marginTop: 24,
          fontFamily: "'EB Garamond', serif",
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: 13,
          color: 'var(--text-medium)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Tap seal to open
      </motion.p>
    </div>
  )
}
