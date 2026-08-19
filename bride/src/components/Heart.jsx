import { useId } from 'react'

// Romantic gradient palettes the floating hearts are drawn from —
// blush/rose tones plus the site's signature gold, so the effect feels
// like it belongs to this invitation rather than a generic stock overlay.
const PALETTES = {
  rose: ['#ffd9e2', '#ff7fa6', '#c9184a'],
  gold: ['#fff3d1', '#f0c869', '#a5761f'],
  blush: ['#ffeef2', '#f8a5c2', '#e75480'],
}

// A single glowing heart, drawn as an SVG so it stays crisp at any size.
export default function Heart({ size = 40, palette = 'rose', glow = true, style }) {
  const reactId = useId()
  const gradId = `heartGrad-${reactId}`
  const [c1, c2, c3] = PALETTES[palette] || PALETTES.rose

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{
        display: 'block',
        filter: glow ? `drop-shadow(0 4px ${Math.max(8, size * 0.22)}px ${c2}99)` : undefined,
        ...style,
      }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="55%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={`url(#${gradId})`}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="0.4"
      />
    </svg>
  )
}
