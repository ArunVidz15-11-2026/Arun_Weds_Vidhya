import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, scaleIn } from '../animations'
import Sparkles from './Sparkles'

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

  return (
    <section ref={ref} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* PHOTO PANEL — sized on its own, so the caption below never sits on top of the photo/face */}
      <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 0, overflow: 'hidden' }}>
        <motion.img
          src={`${import.meta.env.BASE_URL}couple.jpg`}
          alt="Ravichandra and Rachana"
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

        <Sparkles />

        {/* TOP — monogram + subtitle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 2, padding: '36px 24px 0', textAlign: 'center' }}
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
            R&amp;R
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
          flexShrink: 0,
          background: 'linear-gradient(160deg, #1a0800, #3a1505)',
          padding: '22px 24px 30px',
          textAlign: 'center',
        }}
      >
        <motion.h1
          animate={{ backgroundPositionX: ['0%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: 46, margin: 0, ...goldShimmer }}
        >
          Rachana
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
          Ravichandra
        </motion.h1>
        <p
          style={{
            marginTop: 10,
            color: '#fdf8f0',
            fontSize: 13,
            letterSpacing: '0.15em',
            fontFamily: "'EB Garamond', serif",
          }}
        >
          Request the honour of your presence
        </p>
      </motion.div>
    </section>
  )
}
