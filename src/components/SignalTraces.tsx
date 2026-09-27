import { useEffect, useRef } from 'react'

// Animated PCB-style background: faint copper traces with signal pulses running along them.

type Pt = [number, number]

type Trace = {
  pts: Pt[]
  cum: number[] // cumulative length at each vertex
  total: number
  dist: number // head position of the pulse along the trace
  speed: number
}

const GRID = 24
const TAIL = 56
const DIRS: Pt[] = [
  [1, 0], [1, 1], [0, 1], [-1, 1],
  [-1, 0], [-1, -1], [0, -1], [1, -1],
]

const rand = (n: number) => Math.floor(Math.random() * n)

// Orthogonal runs joined by short 45° jogs, like routed copper.
function makePath(w: number, h: number): Pt[] {
  let x = rand(Math.ceil(w / GRID)) * GRID
  let y = rand(Math.ceil(h / GRID)) * GRID
  let d = rand(4) * 2
  const pts: Pt[] = [[x, y]]
  const segments = 2 + rand(4)
  for (let i = 0; i < segments; i++) {
    const n = d % 2 === 1 ? 1 + rand(3) : 3 + rand(10)
    x += DIRS[d][0] * GRID * n
    y += DIRS[d][1] * GRID * n
    pts.push([x, y])
    if (x < -GRID || x > w + GRID || y < -GRID || y > h + GRID) break
    d = (d + (Math.random() < 0.5 ? 1 : 7)) % 8
  }
  return pts
}

function makeTraces(w: number, h: number): Trace[] {
  const count = Math.min(120, Math.round((w * h) / 16000))
  return Array.from({ length: count }, () => {
    const pts = makePath(w, h)
    const cum = [0]
    for (let i = 1; i < pts.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
    }
    const total = cum[cum.length - 1]
    return { pts, cum, total, dist: -Math.random() * 2400, speed: 90 + Math.random() * 130 }
  })
}

function pointAt(t: Trace, s: number): Pt {
  for (let i = 1; i < t.pts.length; i++) {
    if (s <= t.cum[i]) {
      const seg = t.cum[i] - t.cum[i - 1]
      const k = seg === 0 ? 0 : (s - t.cum[i - 1]) / seg
      const [ax, ay] = t.pts[i - 1]
      const [bx, by] = t.pts[i]
      return [ax + (bx - ax) * k, ay + (by - ay) * k]
    }
  }
  return t.pts[t.pts.length - 1]
}

function drawBoard(ctx: CanvasRenderingContext2D, traces: Trace[]) {
  ctx.lineWidth = 1
  ctx.lineJoin = 'round'
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  for (const t of traces) {
    ctx.beginPath()
    ctx.moveTo(t.pts[0][0], t.pts[0][1])
    for (const [x, y] of t.pts.slice(1)) ctx.lineTo(x, y)
    ctx.stroke()
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'
  for (const t of traces) {
    for (const [x, y] of [t.pts[0], t.pts[t.pts.length - 1]]) {
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
}

function drawPulse(ctx: CanvasRenderingContext2D, t: Trace) {
  const head = Math.min(t.dist, t.total)
  const tail = Math.max(0, t.dist - TAIL)
  if (head <= 0 || tail >= t.total) return
  const start = pointAt(t, tail)
  const end = pointAt(t, head)
  const grad = ctx.createLinearGradient(start[0], start[1], end[0], end[1])
  grad.addColorStop(0, 'rgba(255,255,255,0)')
  grad.addColorStop(1, 'rgba(255,255,255,0.85)')
  ctx.strokeStyle = grad
  ctx.beginPath()
  ctx.moveTo(start[0], start[1])
  for (let i = 1; i < t.pts.length; i++) {
    if (t.cum[i] > tail && t.cum[i] < head) ctx.lineTo(t.pts[i][0], t.pts[i][1])
  }
  ctx.lineTo(end[0], end[1])
  ctx.stroke()
  if (t.dist <= t.total) {
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.beginPath()
    ctx.arc(end[0], end[1], 1.5, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function SignalTraces({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let traces: Trace[] = []
    let board = document.createElement('canvas')
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let visible = true

    const render = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(board, 0, 0, w, h)
      if (reduceMotion) return
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      for (const t of traces) {
        t.dist += t.speed * dt
        if (t.dist - TAIL > t.total) t.dist = -Math.random() * 2400
        drawPulse(ctx, t)
      }
    }

    const layout = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      traces = makeTraces(w, h)
      board = document.createElement('canvas')
      board.width = canvas.width
      board.height = canvas.height
      const b = board.getContext('2d')
      if (b) {
        b.scale(dpr, dpr)
        drawBoard(b, traces)
      }
      render(0)
    }

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      render(dt)
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reduceMotion || raf || !visible) return
      last = 0
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const resize = new ResizeObserver(layout)
    resize.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    layout()
    start()
    return () => {
      stop()
      resize.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
