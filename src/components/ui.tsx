export const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

export function externalProps(external: boolean) {
  return external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

// Pixel "HA" monogram on a 7×7 grid.
export function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-7"
      viewBox="0 0 7 7"
      fill="white"
      shapeRendering="crispEdges"
      aria-label="Huzaifa Ahmad"
    >
      <rect x="0" y="1" width="1" height="5" />
      <rect x="2" y="1" width="1" height="5" />
      <rect x="1" y="3" width="1" height="1" />
      <rect x="5" y="1" width="1" height="1" />
      <rect x="4" y="2" width="1" height="4" />
      <rect x="6" y="2" width="1" height="4" />
      <rect x="5" y="3" width="1" height="1" />
    </svg>
  )
}

export function PixelWord({ children }: { children: string }) {
  return (
    <span className="font-pixel font-normal text-[1.45em] inline-block leading-[0.5] align-baseline">
      {children}
    </span>
  )
}

export function Label({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`font-mono text-xs sm:text-sm tracking-widest text-white/60 uppercase ${className}`}>{children}</div>
  )
}

export function Chip({ children }: { children: string }) {
  return <span className="bg-[#0B0B0B] border border-white/10 px-2.5 py-1 text-xs text-white/70">{children}</span>
}
