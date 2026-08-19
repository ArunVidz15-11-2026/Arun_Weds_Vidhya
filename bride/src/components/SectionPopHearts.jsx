import { motion } from 'framer-motion'
import Heart from './Heart'

const FAR_HEARTS = [
  { id: 'sf1', x: 12, y: 10, size: 18, rotate: -12, palette: 'gold', blur: 2.2, opacity: 0.28, dur: 7 },
  { id: 'sf2', x: 88, y: 18, size: 20, rotate: 10, palette: 'rose', blur: 2, opacity: 0.26, dur: 8 },
  { id: 'sf3', x: 7, y: 52, size: 16, rotate: 8, palette: 'blush', blur: 2.4, opacity: 0.24, dur: 7.5 },
  { id: 'sf4', x: 93, y: 58, size: 18, rotate: -10, palette: 'gold', blur: 2, opacity: 0.26, dur: 8.5 },
  { id: 'sf5', x: 16, y: 86, size: 17, rotate: 12, palette: 'rose', blur: 2.2, opacity: 0.24, dur: 7.8 },
  { id: 'sf6', x: 84, y: 90, size: 16, rotate: -8, palette: 'blush', blur: 2.2, opacity: 0.24, dur: 7.3 },
]

const POP_HEARTS = [
  { id: 'sp1', x: -8, y: 24, size: 40, rotate: -16, palette: 'rose', opacity: 0.86, dur: 6.2 },
  { id: 'sp2', x: 106, y: 20, size: 36, rotate: 14, palette: 'gold', opacity: 0.86, dur: 6.8 },
  { id: 'sp3', x: -10, y: 72, size: 44, rotate: 10, palette: 'blush', opacity: 0.82, dur: 5.8 },
  { id: 'sp4', x: 108, y: 70, size: 42, rotate: -13, palette: 'rose', opacity: 0.84, dur: 6.5 },
]

function FloatingHeart({ h }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${h.x}%`,
        top: `${h.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: h.opacity,
        filter: h.blur ? `blur(${h.blur}px)` : undefined,
      }}
      animate={{
        y: [0, -14, 0],
        rotate: [h.rotate - 4, h.rotate + 4, h.rotate - 4],
      }}
      transition={{ duration: h.dur, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Heart size={h.size} palette={h.palette} glow={!h.blur || h.blur < 1} />
    </motion.div>
  )
}

export default function SectionPopHearts({ zIndex = 1, opacity = 1 }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '-8% -18% -8% -18%',
        pointerEvents: 'none',
        zIndex,
        opacity,
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0 }}>
        {FAR_HEARTS.map((h) => (
          <FloatingHeart key={h.id} h={h} />
        ))}
      </motion.div>

      <motion.div style={{ position: 'absolute', inset: 0 }}>
        {POP_HEARTS.map((h) => (
          <FloatingHeart key={h.id} h={h} />
        ))}
      </motion.div>
    </div>
  )
}