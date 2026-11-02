import { motion } from 'framer-motion'
import { scaleIn } from '../animations'

// Small ornamental divider — a diamond between two gold lines.
// Reused between sections so the page doesn't feel like flat blocks of text.
export default function Divider({ color = 'var(--gold)' }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        margin: '0 auto 20px',
        width: 140,
      }}
    >
      <span style={{ flex: 1, height: 1, background: color, opacity: 0.5 }} />
      <span
        style={{
          width: 8,
          height: 8,
          transform: 'rotate(45deg)',
          background: color,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span style={{ flex: 1, height: 1, background: color, opacity: 0.5 }} />
    </motion.div>
  )
}
