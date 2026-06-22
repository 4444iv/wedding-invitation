import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

function SealButton({ onClick }) {
  const sealColor = 'hsl(160, 25%, 15%)'
  const sealHighlight = 'hsl(160, 20%, 28%)'
  const accentColor = 'hsl(40, 50%, 65%)'

  return (
    <motion.button
      onClick={onClick}
      className="relative w-28 h-28 md:w-36 md:h-36 rounded-full cursor-pointer focus:outline-none"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
      aria-label="Open invitation"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${sealHighlight}, ${sealColor})`,
          boxShadow:
            '0 8px 30px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.3)',
        }}
      />
      <div
        className="absolute inset-1 rounded-full"
        style={{
          background: `radial-gradient(circle at 40% 30%, ${sealHighlight}, ${sealColor})`,
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.1)',
        }}
      />
      <div
        className="absolute inset-3 md:inset-4 rounded-full border-2 opacity-30"
        style={{ borderColor: accentColor }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-calligraphy text-3xl md:text-4xl font-bold"
          style={{ color: accentColor, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
        >
          ♥
        </span>
        <span
          className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase mt-0.5"
          style={{ color: accentColor }}
        >
          tap to open
        </span>
      </div>
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </motion.button>
  )
}

function DoorPanel({ side, isOpen }) {
  const isLeft = side === 'left'
  const ornateCorner = (
    <>
      <svg
        className={`absolute top-4 ${isLeft ? 'right-4' : 'left-4'} w-16 h-16 opacity-30 ${isLeft ? '' : '-scale-x-100'}`}
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          d="M60 0 L60 20 Q60 40 40 50 L20 60"
          stroke="hsl(40, 50%, 55%)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M60 0 L60 15 Q60 30 45 40"
          stroke="hsl(40, 50%, 55%)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <svg
        className={`absolute bottom-4 ${isLeft ? 'right-4 rotate-90' : 'left-4 -scale-x-100 rotate-90'} w-16 h-16 opacity-30`}
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          d="M60 0 L60 20 Q60 40 40 50 L20 60"
          stroke="hsl(40, 50%, 55%)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
      <div
        className={`absolute top-8 bottom-8 ${isLeft ? 'right-6' : 'left-6'} w-px opacity-20`}
        style={{ background: 'hsl(40, 50%, 55%)' }}
      />
    </>
  )

  return (
    <motion.div
      className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-1/2 h-full`}
      style={{
        transformOrigin: isLeft ? 'left center' : 'right center',
        transformStyle: 'preserve-3d',
        background: isLeft
          ? 'linear-gradient(135deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)'
          : 'linear-gradient(225deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
        borderRight: isLeft ? '1px solid hsl(40, 40%, 35%)' : undefined,
        borderLeft: !isLeft ? '1px solid hsl(40, 40%, 35%)' : undefined,
      }}
      animate={isOpen ? { rotateY: isLeft ? -85 : 85 } : {}}
      transition={{ duration: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {ornateCorner}
    </motion.div>
  )
}

function OpeningAnimation({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        tx: (Math.random() - 0.5) * 500,
        ty: (Math.random() - 0.5) * 500,
        delay: Math.random() * 0.3,
        size: 2 + Math.random() * 4,
      })),
    []
  )

  const handleOpen = () => {
    setIsOpen(true)
    setShowParticles(true)
    setTimeout(() => onComplete?.(), 3600)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,163,85,0) 0%, rgba(15,25,20,1) 100%)',
        }}
        animate={
          isOpen
            ? {
                background:
                  'radial-gradient(ellipse at center, rgba(201,163,85,0.1) 0%, rgba(15,25,20,0.2) 100%)',
              }
            : {}
        }
        transition={{ duration: 2 }}
      />

      <DoorPanel side="left" isOpen={isOpen} />
      <DoorPanel side="right" isOpen={isOpen} />

      {!isOpen && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <SealButton onClick={handleOpen} />
        </div>
      )}

      {showParticles && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: `hsl(40, ${45 + Math.random() * 20}%, ${50 + Math.random() * 20}%)`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0 }}
              transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default OpeningAnimation
