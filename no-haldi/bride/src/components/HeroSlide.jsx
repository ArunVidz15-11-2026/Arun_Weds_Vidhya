import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, scaleIn } from '../animations'
import { HeartsBackLayer, HeartsFrontLayer } from './HeartsPopout'
import { HERO_IMAGE } from '../media'

const goldShimmer = {
  backgroundImage:
    'linear-gradient(90deg, #8B6210, #c9942a, #ffe8a0, #c9942a, #8B6210)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export default function HeroSlide() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Slow, subtle zoom + drift on the photo as the user scrolls past — a
  // simple parallax touch so the hero doesn't feel like a static poster.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  // The foreground hearts fade out as the hero scrolls away, so they never
  // linger awkwardly over the sections below.
  const heartsFade = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0])
  // The "scroll down" hint fades out as soon as the user starts scrolling.
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const handleScrollDown = () => {
    const nextSection = ref.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Pointer-driven parallax — moving the mouse (or finger) shifts each heart
  // layer at a different rate, which is what sells the sense of depth/3D.
  const pointerX = useSpring(useMotionValue(0), { stiffness: 60, damping: 14 })
  const pointerY = useSpring(useMotionValue(0), { stiffness: 60, damping: 14 })

  const handlePointerMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    pointerX.set(px * 2 - 1)
    pointerY.set(py * 2 - 1)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        perspective: 1000,
      }}
    >
      {/* PHOTO PANEL — the "display" the hearts appear to float out of */}
      <div
        style={{
          position: 'relative',
          flex: '1 1 auto',
          minHeight: 0,
          overflow: 'hidden',
          margin: '14px 14px 0',
          borderRadius: 18,
          border: '1px solid rgba(201,148,42,0.55)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Arunvel and Vidhya"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            scale,
            y,
          }}
        />

        {/* Dark scrim at the top so the monogram/subtitle stay readable
            regardless of how bright the photo is */}
        <div
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: '30%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))',
            zIndex: 1,
          }}
        />

        {/* Soft scrim at the bottom of the photo so it blends into the caption panel below */}
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            height: '25%',
            background: 'linear-gradient(0deg, rgba(15,8,2,0.55), rgba(0,0,0,0))',
            zIndex: 1,
          }}
        />

        {/* Distant + half-emerged hearts — behind the names, in front of the photo */}
        <HeartsBackLayer pointerX={pointerX} pointerY={pointerY} style={{ zIndex: 2 }} />

        {/* TOP — monogram + subtitle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 3, padding: '36px 24px 0', textAlign: 'center' }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              margin: '0 auto 8px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: "'Great Vibes', cursive",
              fontSize: 22,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            A&amp;V
          </div>
          <p
            style={{
              color: '#fdf8f0',
              letterSpacing: '0.25em',
              fontSize: 11,
              textTransform: 'uppercase',
              fontFamily: "'EB Garamond', serif",
              margin: 0,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            Together with our families
          </p>
        </motion.div>
      </div>

      {/* CAPTION PANEL — its own solid background, always below the photo, never over a face */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 4,
          flexShrink: 0,
          background:
            'radial-gradient(circle at 50% 0%, rgba(255,127,166,0.16), transparent 60%), linear-gradient(160deg, #1a0800, #3a1505)',
          padding: '22px 24px 30px',
          textAlign: 'center',
        }}
      >
        <motion.h1
          animate={{ backgroundPositionX: ['0%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: 46, margin: 0, ...goldShimmer }}
        >
          Arunvel
        </motion.h1>
        <p
          style={{
            color: 'var(--gold)',
            margin: '4px 0',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
          }}
        >
          weds
        </p>
        <motion.h1
          animate={{ backgroundPositionX: ['0%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: 46, margin: 0, ...goldShimmer }}
        >
          Vidhya
        </motion.h1>
        <motion.p
          variants={fadeUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            marginTop: 10,
            color: '#f21d45',
            fontSize: 13,
            letterSpacing: '0.15em',
            fontFamily: "'EB Garamond', serif",
          }}
        >
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.55, 1, 0.65], scale: [0.9, 1.12, 0.9] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#ff3158', textShadow: '0 0 8px rgba(255,49,88,0.8)' }}
          >
            ♥
          </motion.span>
          <motion.span
            animate={{ backgroundPositionX: ['0%', '200%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'linear-gradient(100deg, #a50025, #ff3158, #fff2f4, #ff3158, #a50025)',
              backgroundSize: '220% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Request the honour of your presence
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.65, 1, 0.55], scale: [1.08, 0.9, 1.08] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            style={{ color: '#ff3158', textShadow: '0 0 8px rgba(255,49,88,0.8)' }}
          >
            ♥
          </motion.span>
        </motion.p>

        <motion.button
          onClick={handleScrollDown}
          aria-label="Scroll down"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 999,
            border: '1px solid rgba(201,148,42,0.7)',
            background: 'rgba(20,10,4,0.6)',
            color: 'var(--gold)',
            fontFamily: "'EB Garamond', serif",
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            fontSize: 10,
            cursor: 'pointer',
            opacity: scrollHintOpacity,
            position: 'relative',
            zIndex: 6,
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

      {/* FRONT HEARTS — float above everything, breaking past the frame's edges */}
      <HeartsFrontLayer pointerX={pointerX} pointerY={pointerY} fadeOpacity={heartsFade} style={{ zIndex: 50 }} />
    </section>
  )
}

