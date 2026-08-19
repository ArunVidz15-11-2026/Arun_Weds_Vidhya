import { motion } from 'framer-motion'

// A handful of soft glowing dots drifting upward — adds a bit of
// premium "shimmer" life to a section without needing any assets.
const DOTS = Array.from({ length: 12 }, (_, i) => i)

export default function Sparkles({ color = '#ffe8a0' }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {DOTS.map((i) => {
        const left = `${(i * 8.3 + (i % 3) * 11) % 100}%`
        const size = 2 + (i % 3) * 2
        const duration = 6 + (i % 5) * 1.5
        const delay = i * 0.6

        return (
          <motion.span
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              left,
              width: size,
              height: size,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        )
      })}
    </div>
  )
}
