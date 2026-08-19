import { useState, useRef, useEffect } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'
import EnvelopeIntro from './components/EnvelopeIntro'
import HeroSlide from './components/HeroSlide'
import JoinUsSlide from './components/JoinUsSlide'
import CountdownSlide from './components/CountdownSlide'
import EventSlide from './components/EventSlide'
import FinalSlide from './components/FinalSlide'
import { INVITE_AUDIO } from './media'

function App() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [remainingUnlocked, setRemainingUnlocked] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // Start music once the envelope opens
  useEffect(() => {
    if (inviteOpen && !musicStarted) {
      audioRef.current = new Audio(INVITE_AUDIO)
      // Manual loop — with loop=true, the browser restarts at 0 and never fires `ended`,
      // which would defeat our start-offset. Loop ourselves via the `ended` event instead.
      audioRef.current.loop = false
      audioRef.current.volume = 0.3
      // Skip the long intro — song's romantic hook kicks in around 0:26
      const startAt = 26
      const seekAndPlay = () => {
        try { audioRef.current.currentTime = startAt } catch {}
        audioRef.current.play().catch(() => {})
      }
      audioRef.current.addEventListener('ended', seekAndPlay)
      audioRef.current.addEventListener('loadedmetadata', seekAndPlay, { once: true })
      if (audioRef.current.readyState >= 1) seekAndPlay()
      setMusicStarted(true)
    }
  }, [inviteOpen, musicStarted])

  // Stop music when the tab/page closes
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleUnlockRemainingPages = () => {
    setRemainingUnlocked(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('remaining-pages-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  if (!inviteOpen) {
    return <EnvelopeIntro onComplete={() => setInviteOpen(true)} />
  }

  return (
    <>
      {/* Gold scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: '3px',
          height: '100vh',
          background: 'linear-gradient(180deg, #c9942a, #f0d080)',
          transformOrigin: 'top',
          scaleY,
          zIndex: 9999,
        }}
      />

      {/* Mute / unmute button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 99999,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <HeroSlide />
      <JoinUsSlide onJoinCelebration={handleUnlockRemainingPages} />

      {remainingUnlocked && (
        <>
          <CountdownSlide />

          <EventSlide
            icon="🌼"
            label="A GLOW BEFORE THE VOWS"
            heading="Haldi Ceremony"
            headingColor="#7a4e00"
            description="A joyful morning of turmeric, laughter and blessings."
            date="28 August 2026"
            time="10:00 AM onwards"
            venue="Chirala"
            dressCode="Yellow Traditional"
            mapsUrl="https://maps.app.goo.gl/jsj1uMhVY4Q2waiaA"
            contactPhone="8328132741"
          />

          <EventSlide
            icon="💍"
            label="THE BIG DAY"
            heading="The Wedding"
            headingColor="#5a3200"
            description="Join us as we begin our forever, Ravichandra & Rachana."
            date="30 August 2026"
            time="6:00 PM onwards"
            venue="Chirala"
            mapsUrl="https://maps.app.goo.gl/PcFHfXcuj5Af8TAWA"
            contactPhone="8328132741"
          />

          <FinalSlide />
        </>
      )}
    </>
  )
}

export default App
