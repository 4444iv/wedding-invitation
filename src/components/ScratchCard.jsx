import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="w-16 h-px bg-primary/30" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-primary opacity-50">
        <path
          d="M5 1 C5 1 1 3 1 5 C1 7 5 9 5 9 C5 9 9 7 9 5 C9 3 5 1 5 1Z"
          fill="currentColor"
        />
      </svg>
      <div className="w-16 h-px bg-primary/30" />
    </div>
  )
}

function formatTime(time24) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

function ScratchCard({ weddingDate, weddingTime }) {
  const canvasRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [scratching, setScratching] = useState(false)
  const isDrawing = useRef(false)
  const lastPoint = useRef(null)

  const date = weddingDate ? new Date(weddingDate + 'T12:00:00') : new Date()
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
  const fullDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = formatTime(weddingTime)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, 'hsl(40, 70%, 58%)')
    gradient.addColorStop(0.5, 'hsl(42, 75%, 62%)')
    gradient.addColorStop(1, 'hsl(40, 55%, 40%)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < 3000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1)
    }

    ctx.font = "bold 14px 'Cormorant Garamond', serif"
    ctx.fillStyle = 'hsla(40, 33%, 96%, 0.7)'
    ctx.textAlign = 'center'
    ctx.fillText('✦ Scratch to Reveal ✦', width / 2, height / 2 + 5)
  }, [])

  const getPoint = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY
    if (clientX == null) return null
    return { x: clientX - rect.left, y: clientY - rect.top }
  }, [])

  const scratch = useCallback(
    (e) => {
      if (!isDrawing.current) return
      if (!scratching) setScratching(true)

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const point = getPoint(e)
      if (!point) return

      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 44
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      if (lastPoint.current) {
        ctx.beginPath()
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 22, 0, Math.PI * 2)
        ctx.fill()
      }
      lastPoint.current = point

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let transparent = 0
      for (let i = 3; i < imageData.data.length; i += 16) {
        if (imageData.data[i] === 0) transparent++
      }
      if (transparent / (imageData.data.length / 16) > 0.45) {
        setRevealed(true)
      }
    },
    [getPoint, scratching]
  )

  const startScratch = useCallback(
    (e) => {
      e.preventDefault()
      isDrawing.current = true
      lastPoint.current = getPoint(e)
    },
    [getPoint]
  )

  const endScratch = useCallback(() => {
    isDrawing.current = false
    lastPoint.current = null
  }, [])

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-calligraphy text-4xl md:text-5xl text-primary mb-3">
              Our forever begins
            </h2>
            <GoldDivider />
          </motion.div>
        ) : (
          <motion.div
            key="pre"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="font-calligraphy text-4xl md:text-5xl text-primary mb-3"
              animate={scratching ? {} : { scale: [1, 1.02, 1] }}
              transition={scratching ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Scratch to Reveal
            </motion.h2>
            <GoldDivider />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative inline-block w-80 h-48 mx-auto rounded-xl overflow-hidden shadow-gold"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-6">
          <motion.p
            className="font-calligraphy text-2xl text-primary mb-2"
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }}
          >
            You&apos;re Invited!
          </motion.p>
          <p className="font-cinzel text-2xl font-bold text-foreground">{fullDate}</p>
          <p className="font-calligraphic text-lg text-primary">{weekday}</p>
          {timeStr && (
            <p className="text-sm text-muted-foreground mt-1">
              {timeStr}
            </p>
          )}
        </div>

        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer rounded-xl touch-none"
            animate={scratching ? {} : { rotate: [0, 0.5, 0, -0.5, 0], scale: [1, 1.005, 1] }}
            transition={scratching ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onMouseDown={startScratch}
            onMouseUp={endScratch}
            onMouseLeave={endScratch}
            onMouseMove={scratch}
            onTouchStart={startScratch}
            onTouchEnd={endScratch}
            onTouchMove={scratch}
          />
        )}

        {revealed && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[80]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 3, delay: 1.5 }}
          >
            {[...Array(40)].map((_, i) => {
              const colors = [
                'hsl(40, 70%, 58%)',
                'hsl(0, 70%, 55%)',
                'hsl(210, 70%, 55%)',
                'hsl(120, 50%, 50%)',
                'hsl(280, 60%, 55%)',
              ]
              const isStream = i < 8
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${-5 - Math.random() * 10}%`,
                    width: isStream ? 3 : 6 + Math.random() * 6,
                    height: isStream ? 20 + Math.random() * 30 : 6 + Math.random() * 6,
                    borderRadius: isStream ? 2 : '50%',
                    background: colors[Math.floor(Math.random() * colors.length)],
                  }}
                  animate={{
                    y: [0, window.innerHeight * 1.2],
                    x: [(Math.random() - 0.5) * 200],
                    rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1) * (isStream ? 2 : 3)],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.8,
                    ease: 'easeOut',
                  }}
                />
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ScratchCard
