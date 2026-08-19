import { motion } from 'framer-motion'
import { fadeUp } from '../animations'
import Divider from './Divider'
import SectionPopHearts from './SectionPopHearts'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// "29 August 2026" -> { day: '29', month: 'AUGUST', weekday: 'SATURDAY' }
function parseDateParts(dateStr) {
  const [day, month, year] = dateStr.split(' ')
  const monthIndex = MONTHS.indexOf(month)
  const weekday =
    monthIndex >= 0 && year
      ? new Date(Number(year), monthIndex, Number(day)).toLocaleDateString('en-US', { weekday: 'long' })
      : ''
  return { day, month: (month || '').toUpperCase(), weekday: weekday.toUpperCase() }
}

export default function EventSlide({
  icon = '✦',
  label,
  heading,
  headingColor,
  description,
  date,
  time,
  venue,
  dressCode,
  mapsUrl,
  contactPhone,
}) {
  const { day, month, weekday } = parseDateParts(date)

  const handleScrollDown = (e) => {
    const section = e.currentTarget.closest('section')
    const nextSection = section?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        position: 'relative',
        minHeight: '60vh',
        padding: '56px 28px',
        textAlign: 'center',
        background: 'var(--cream)',
        overflow: 'hidden',
      }}
    >
      {/* Soft radial tint in the event's own colour, breaks up the flat background */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${headingColor}22, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <SectionPopHearts opacity={0.82} />

      <div style={{ position: 'relative', zIndex: 2 }}>

        <div style={{ position: 'relative', fontSize: 22, marginBottom: 6 }}>{icon}</div>

        <p
        style={{
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontSize: 11,
          color: 'var(--text-medium)',
          fontFamily: "'EB Garamond', serif",
        }}
      >
        {label}
        </p>

        <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 44, color: headingColor, margin: '10px 0 16px' }}>
        {heading}
        </h2>

        <Divider color={headingColor} />

        <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17,
          color: 'var(--text-dark)',
          maxWidth: 320,
          margin: '0 auto 24px',
          lineHeight: 1.5,
        }}
      >
        {description}
        </p>

      {/* Stylised date card — month / weekday / big day number / time */}
        <div
        style={{
          display: 'inline-block',
          background: 'rgba(253,248,240,0.6)',
          border: `1px solid ${headingColor}55`,
          borderRadius: 14,
          padding: '18px 32px 16px',
          marginBottom: 22,
        }}
      >
          <p
          style={{
            margin: 0,
            fontFamily: "'EB Garamond', serif",
            letterSpacing: '0.2em',
            fontSize: 13,
            color: headingColor,
          }}
        >
          {month}
          </p>
          <p
          style={{
            margin: '2px 0 4px',
            fontFamily: "'EB Garamond', serif",
            letterSpacing: '0.15em',
            fontSize: 11,
            color: 'var(--text-medium)',
          }}
        >
          {weekday}
          </p>
          <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: 52,
            lineHeight: 1,
            color: headingColor,
          }}
        >
          {day}
          </div>
          <p
          style={{
            margin: '6px 0 0',
            fontFamily: "'EB Garamond', serif",
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: 12,
            color: 'var(--text-dark)',
          }}
        >
          {time}
          </p>
        </div>

        <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 6,
          fontFamily: "'EB Garamond', serif",
          fontSize: 15,
          color: 'var(--text-dark)',
        }}
      >
          <span>{venue}</span>
          {dressCode && (
            <span style={{ fontStyle: 'italic', color: 'var(--text-medium)' }}>Dress Code: {dressCode}</span>
          )}
        </div>

        {(mapsUrl || contactPhone) && (
          <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {mapsUrl && (
              <motion.a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: headingColor, color: '#fdf8f0' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-block',
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: `1px solid ${headingColor}`,
                  color: headingColor,
                  textDecoration: 'none',
                  fontSize: 13,
                  letterSpacing: '0.05em',
                }}
              >
                View on Map
              </motion.a>
            )}
            {contactPhone && (
              <motion.a
                href={`tel:${contactPhone}`}
                whileHover={{ scale: 1.05, backgroundColor: headingColor, color: '#fdf8f0' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-block',
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: `1px solid ${headingColor}`,
                  background: headingColor,
                  color: '#fdf8f0',
                  textDecoration: 'none',
                  fontSize: 13,
                  letterSpacing: '0.05em',
                }}
              >
                Contact Us
              </motion.a>
            )}
          </div>
        )}

        <motion.button
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
            border: `1px solid ${headingColor}`,
            background: 'linear-gradient(160deg, rgba(26,8,0,0.92), rgba(58,21,5,0.86))',
            color: 'var(--gold)',
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            fontSize: 10,
            fontFamily: "'EB Garamond', serif",
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.08)',
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
      </div>
    </motion.section>
  )
}
