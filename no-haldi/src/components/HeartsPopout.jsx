import { motion, useTransform } from 'framer-motion'
import Heart from './Heart'

// Depth-sorted heart fields. x/y are percentages relative to the section's
// (deliberately oversized) overlay box, so values <0 or >100 push a heart
// past the edge of the "screen" — the core of the pop-out illusion.

// BACK — small, blurred, low-contrast: reads as distant/behind-the-glass.
const BACK_HEARTS = [
  { id: 'b1', x: 16, y: 10, size: 15, rotate: -12, palette: 'gold', blur: 3, opacity: 0.32, dur: 7 },
  { id: 'b2', x: 76, y: 16, size: 19, rotate: 10, palette: 'rose', blur: 2.5, opacity: 0.28, dur: 8.5 },
  { id: 'b3', x: 46, y: 6, size: 13, rotate: 6, palette: 'blush', blur: 3, opacity: 0.26, dur: 6.5 },
  { id: 'b4', x: 30, y: 34, size: 17, rotate: -8, palette: 'gold', blur: 2, opacity: 0.3, dur: 9 },
  { id: 'b5', x: 86, y: 42, size: 14, rotate: 14, palette: 'rose', blur: 3, opacity: 0.28, dur: 7.5 },
  { id: 'b6', x: 10, y: 48, size: 16, rotate: -4, palette: 'blush', blur: 2.5, opacity: 0.26, dur: 8 },
]

// MID — sit right around the frame's edge, half-emerging.
const MID_HEARTS = [
  { id: 'm1', x: -2, y: 24, size: 32, rotate: -18, palette: 'rose', blur: 0.4, opacity: 0.75, dur: 6 },
  { id: 'm2', x: 101, y: 30, size: 36, rotate: 16, palette: 'gold', blur: 0.4, opacity: 0.8, dur: 6.5 },
  { id: 'm3', x: 22, y: 60, size: 28, rotate: 10, palette: 'blush', blur: 0, opacity: 0.72, dur: 5.5 },
  { id: 'm4', x: 82, y: 64, size: 30, rotate: -14, palette: 'rose', blur: 0, opacity: 0.75, dur: 7 },
  { id: 'm5', x: 8, y: 80, size: 26, rotate: 8, palette: 'gold', blur: 0.4, opacity: 0.7, dur: 6 },
]

// FRONT — large, sharp, glowing: these are the ones that "break the glass".
const FRONT_HEARTS = [
  { id: 'f1', x: -13, y: 46, size: 60, rotate: -16, palette: 'rose', opacity: 1, dur: 5 },
  { id: 'f2', x: 111, y: 22, size: 54, rotate: 14, palette: 'gold', opacity: 1, dur: 5.5 },
  { id: 'f3', x: -9, y: 90, size: 46, rotate: 10, palette: 'blush', opacity: 0.96, dur: 4.5 },
  { id: 'f4', x: 107, y: 84, size: 62, rotate: -12, palette: 'rose', opacity: 1, dur: 6 },
  { id: 'f5', x: 5, y: 2, size: 38, rotate: 18, palette: 'gold', opacity: 0.92, dur: 5 },
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
        y: [0, -16, 0],
        rotate: [h.rotate - 5, h.rotate + 5, h.rotate - 5],
      }}
      transition={{ duration: h.dur, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Heart size={h.size} palette={h.palette} glow={!h.blur || h.blur < 1} />
    </motion.div>
  )
}

// Sits ABOVE the photo but BELOW the caption text — distant + half-emerged hearts.
export function HeartsBackLayer({ pointerX, pointerY, style }) {
  const backX = useTransform(pointerX, [-1, 1], [-6, 6])
  const backY = useTransform(pointerY, [-1, 1], [-4, 4])
  const midX = useTransform(pointerX, [-1, 1], [-18, 18])
  const midY = useTransform(pointerY, [-1, 1], [-11, 11])

  return (
    <div style={{ position: 'absolute', inset: '-8% -18% -8% -18%', pointerEvents: 'none', ...style }}>
      <motion.div style={{ position: 'absolute', inset: 0, x: backX, y: backY }}>
        {BACK_HEARTS.map((h) => (
          <FloatingHeart key={h.id} h={h} />
        ))}
      </motion.div>
      <motion.div style={{ position: 'absolute', inset: 0, x: midX, y: midY }}>
        {MID_HEARTS.map((h) => (
          <FloatingHeart key={h.id} h={h} />
        ))}
      </motion.div>
    </div>
  )
}

// Sits ABOVE everything, including the caption panel — the hearts that
// visibly float out past the invitation's edges, closest to the viewer.
export function HeartsFrontLayer({ pointerX, pointerY, fadeOpacity, style }) {
  const frontX = useTransform(pointerX, [-1, 1], [-34, 34])
  const frontY = useTransform(pointerY, [-1, 1], [-22, 22])

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: '-8% -18% -8% -18%',
        pointerEvents: 'none',
        opacity: fadeOpacity,
        ...style,
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0, x: frontX, y: frontY }}>
        {FRONT_HEARTS.map((h) => (
          <FloatingHeart key={h.id} h={h} />
        ))}
      </motion.div>
    </motion.div>
  )
}
