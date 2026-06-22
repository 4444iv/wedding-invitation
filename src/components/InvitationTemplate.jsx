import { motion } from 'framer-motion'
import { ChevronDown, Clock, MapPin, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import OpeningAnimation from './OpeningAnimation'
import ScratchCard from './ScratchCard'

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&q=80',
]

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="w-16 h-px bg-primary/30" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-primary opacity-50">
        <path d="M5 1 C5 1 1 3 1 5 C1 7 5 9 5 9 C5 9 9 7 9 5 C9 3 5 1 5 1Z" fill="currentColor" />
      </svg>
      <div className="w-16 h-px bg-primary/30" />
    </div>
  )
}

function OrnateCorner({ className }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path
        d="M5 5 L5 30 Q5 50 25 60 L50 70"
        stroke="hsl(40, 50%, 55%)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M8 5 L8 25 Q8 40 20 48"
        stroke="hsl(40, 50%, 55%)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />
      <circle cx="5" cy="5" r="2" fill="hsl(40, 50%, 55%)" opacity="0.4" />
    </svg>
  )
}

function DecorativeLine({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(40, 40%, 45%))' }}
      />
      <div
        className="w-2 h-2 rotate-45 border"
        style={{ borderColor: 'hsl(40, 40%, 45%)' }}
      />
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(270deg, transparent, hsl(40, 40%, 45%))' }}
      />
    </div>
  )
}

function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
            fontSize: `${10 + Math.random() * 8}px`,
            color: `hsla(40, 50%, 65%, ${0.15 + Math.random() * 0.1})`,
          }}
          animate={{
            y: [0, window.innerHeight + 40],
            x: [0, (Math.random() - 0.5) * 60],
            rotate: [0, 360],
            opacity: [0.25, 0.1, 0],
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

function PhotoSlideshow({ images }) {
  const [active, setActive] = useState(0)
  const slides = images?.length ? images : DEFAULT_IMAGES

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative w-full max-w-3xl mx-auto h-64 md:h-96 rounded-xl overflow-hidden shadow-elegant">
      {slides.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt={`Wedding moment ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          loading="lazy"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? 'bg-primary w-4' : 'bg-foreground/30 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function Countdown({ weddingDate, weddingTime }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = weddingDate
      ? new Date(`${weddingDate}T${weddingTime || '00:00'}:00`)
      : new Date('2026-08-01T19:00:00')

    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [weddingDate, weddingTime])

  const units = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Minutes' },
    { key: 'seconds', label: 'Seconds' },
  ]

  return (
    <div className="text-center relative">
      <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-3">
        Counting Down to Forever
      </h2>
      <GoldDivider />
      <div className="flex justify-center gap-4 md:gap-8">
        {units.map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="px-4 py-3 md:px-6 md:py-4 mb-2 rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm">
              <motion.div
                key={timeLeft[key]}
                className="font-cinzel text-3xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(timeLeft[key]).padStart(2, '0')}
              </motion.div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnimatedSection({ children, className = '' }) {
  return (
    <motion.section
      className={`py-16 md:py-20 px-6 relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  )
}

function WaveBorder({ className = '' }) {
  const dots = [50, 100, 150, 200, 250, 300, 350]

  return (
    <svg
      viewBox="0 0 400 40"
      className={`w-full text-primary ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
      {dots.map((x) => (
        <circle
          key={x}
          cx={x}
          cy={20 + Math.sin(x * 0.03) * 8}
          r="2"
          fill="currentColor"
          opacity="0.25"
        />
      ))}
    </svg>
  )
}

function WelcomeSection({ message }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  const line = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <AnimatedSection>
      <motion.div
        className="max-w-lg mx-auto text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={line} className="origin-center mb-8 md:mb-10">
          <WaveBorder />
        </motion.div>

        <motion.p
          variants={item}
          className="font-calligraphic text-lg md:text-2xl text-foreground leading-relaxed italic whitespace-pre-wrap break-words px-2"
        >
          {message}
        </motion.p>

        <motion.div
          variants={line}
          className="origin-center mt-8 md:mt-10 rotate-180"
        >
          <WaveBorder />
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}

const DEFAULT_MUSIC_URL = './music/track1.mp3'

function InvitationTemplate({ data }) {
  const audioRef = useRef(null)
  const [showAnimation, setShowAnimation] = useState(true)
  const [invitationOpen, setInvitationOpen] = useState(false)
  const [muted, setMuted] = useState(true)

  const musicUrl = data.musicUrl || DEFAULT_MUSIC_URL

  const startMusic = useCallback(() => {
    const audio = audioRef.current
    if (!data.musicEnabled || !audio) return

    audio.muted = false
    setMuted(false)
    audio.play().catch(() => {
      audio.muted = true
      setMuted(true)
    })
  }, [data.musicEnabled])

  const handleInvitationOpen = useCallback(() => {
    setShowAnimation(false)
    setInvitationOpen(true)
    startMusic()
  }, [startMusic])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const nextMuted = !muted
    setMuted(nextMuted)
    audio.muted = nextMuted

    if (!nextMuted) {
      audio.play().catch(() => {
        setMuted(true)
        audio.muted = true
      })
    }
  }, [muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = muted
  }, [muted])

  const programTimeline = data.programTimeline || [
    { title: 'Reception of Guests', time: 'Aug 01, 2026, 7:00 PM' },
    { title: 'Dinner', time: 'Aug 01, 2026, 8:00 PM' },
  ]

  const venueQuery = [data.venueName, data.venueAddress].filter(Boolean).join(', ')
  const mapsEmbed = venueQuery
    ? `https://maps.google.com/maps?q=${encodeURIComponent(venueQuery)}&t=m&z=14&output=embed`
    : null
  const mapsLink = venueQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueQuery)}`
    : null

  const backgroundImage = data.backgroundImage

  return (
    <div
      className="min-h-screen"
      style={{ background: 'hsl(160, 25%, 8%)', color: 'hsl(40, 30%, 85%)' }}
      data-invitation-page
    >
      {showAnimation && <OpeningAnimation onComplete={handleInvitationOpen} />}

      {invitationOpen && <FloatingPetals />}

      {data.musicEnabled && (
        <>
          <audio ref={audioRef} loop preload="auto" src={musicUrl} />
          <button
            onClick={toggleMute}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full border border-primary/40 text-primary bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          aria-label={muted ? 'Unmute music' : 'Mute music'}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </>
      )}

      {/* Hero */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: invitationOpen ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: 'hsla(160, 25%, 8%, 0.75)' }}
            />
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, hsla(40, 50%, 50%, 0.06), transparent 60%)',
          }}
        />

        <OrnateCorner className="absolute top-6 left-6 w-20 h-20 opacity-25 z-10" />
        <OrnateCorner className="absolute top-6 right-6 w-20 h-20 opacity-25 z-10 -scale-x-100" />
        <OrnateCorner className="absolute bottom-6 left-6 w-20 h-20 opacity-25 z-10 -scale-y-100" />
        <OrnateCorner className="absolute bottom-6 right-6 w-20 h-20 opacity-25 z-10 -scale-x-100 -scale-y-100" />

        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-64 md:w-80 z-10">
          <DecorativeLine />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.p
            className="whitespace-pre-line font-calligraphic text-xs tracking-[0.4em] uppercase mb-10"
            style={{ color: 'hsl(40, 35%, 55%)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            data-invitation-message
          >
            {data.message || "We're getting married"}
          </motion.p>

          <motion.h1
            className="font-cinzel text-4xl md:text-6xl font-light tracking-[0.1em] mb-3 uppercase"
            style={{ color: 'hsl(40, 40%, 72%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {data.groomName}
          </motion.h1>

          <motion.p
            className="font-calligraphic text-sm md:text-base italic tracking-[0.25em] uppercase my-5"
            style={{ color: 'hsl(40, 35%, 55%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            with
          </motion.p>

          <motion.h1
            className="font-cinzel text-4xl md:text-6xl font-light tracking-[0.1em] mb-10 uppercase"
            style={{ color: 'hsl(40, 40%, 72%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {data.brideName}
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="w-8 h-px" style={{ background: 'hsl(40, 35%, 40%)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(40, 40%, 50%)' }} />
            <div className="w-8 h-px" style={{ background: 'hsl(40, 35%, 40%)' }} />
          </motion.div>

          <motion.p
            className="font-calligraphic text-sm tracking-[0.15em]"
            style={{ color: 'hsl(40, 25%, 50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Request the honour of your presence
          </motion.p>
        </div>

        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-64 md:w-80 z-10">
          <DecorativeLine />
        </div>

        <motion.div
          className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'hsl(40, 25%, 45%)' }}
          >
            Scroll
          </span>
          <ChevronDown size={16} style={{ color: 'hsl(40, 30%, 50%)' }} />
        </motion.div>
      </motion.section>

      {/* Welcome Message */}
      {data.welcomeMessage && (
        <WelcomeSection message={data.welcomeMessage} />
      )}

      {/* Scratch to Reveal */}
      <AnimatedSection>
        <ScratchCard weddingDate={data.weddingDate} weddingTime={data.weddingTime} />
      </AnimatedSection>

      {/* Wedding Moments */}
      <AnimatedSection>
        <GoldDivider />
        <PhotoSlideshow images={data.slideshowImages} />
      </AnimatedSection>

      {/* Countdown */}
      <AnimatedSection>
        <Countdown weddingDate={data.weddingDate} weddingTime={data.weddingTime} />
      </AnimatedSection>

      {/* Program Timeline */}
      <AnimatedSection>
        <div className="text-center">
          <Clock className="mx-auto text-primary mb-3" size={28} />
          <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2">
            Program Timeline
          </h2>
          <GoldDivider />
        </div>
        <div className="max-w-md mx-auto">
          {programTimeline.map((event, index) => (
            <motion.div
              key={event.title}
              className="flex gap-4 mb-6 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center pt-1.5">
                <div className="w-3 h-3 rounded-full bg-primary shadow-gold" />
                {index < programTimeline.length - 1 && (
                  <div className="w-px flex-1 bg-primary/30 mt-1" />
                )}
              </div>
              <div className="pb-4 flex-1">
                <p className="text-primary font-cinzel font-semibold text-lg leading-tight">
                  {event.title}
                </p>
                <p className="text-sm text-foreground mt-1">{event.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Venue */}
      <AnimatedSection>
        <MapPin className="mx-auto text-primary mb-4" size={28} />
        <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-2 text-center">
          Venue
        </h2>
        <GoldDivider />
        <div className="text-center mb-8">
          <p className="font-cinzel text-xl font-semibold mb-2">{data.venueName}</p>
          <p className="text-muted-foreground">{data.venueAddress}</p>
        </div>
        {mapsEmbed && (
          <div className="max-w-2xl mx-auto rounded-xl overflow-hidden shadow-elegant mb-8">
            <iframe
              src={mapsEmbed}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            />
          </div>
        )}
        {mapsLink && (
          <div className="max-w-sm mx-auto text-center">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer">
              <button
                type="button"
                className="px-6 py-3 rounded-lg font-cinzel text-sm transition-opacity hover:opacity-90"
                style={{
                  background: 'hsl(40, 50%, 55%)',
                  color: 'hsl(160, 25%, 8%)',
                }}
              >
                View on Google Maps
              </button>
            </a>
          </div>
        )}
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-border relative">
        <OrnateCorner className="absolute top-2 left-2 w-12 h-12 text-primary opacity-15" />
        <OrnateCorner className="absolute top-2 right-2 w-12 h-12 text-primary opacity-15 -scale-x-100" />
        <p className="font-calligraphy text-xl text-primary">
          {data.groomName} & {data.brideName}
        </p>
      </footer>
    </div>
  )
}

export default InvitationTemplate
