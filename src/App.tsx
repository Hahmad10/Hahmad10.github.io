import { useEffect, useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import SignalTraces from './components/SignalTraces'
import { Contact, Experience, Footer, Projects } from './components/Sections'
import { EASE, Logo, PixelWord, externalProps } from './components/ui'
import { EMAIL, EXPERIENCE, FOCUS, HIGHLIGHTS, NAV_LINKS, PROJECTS, RESUME_URL } from './data'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <header className="relative min-h-screen w-full overflow-hidden flex flex-col">
        <SignalTraces className="absolute inset-0 h-full w-full" />

        <div className="relative z-10 flex flex-1 flex-col px-5 sm:px-6 md:px-10 lg:px-14">
          {/* Navbar */}
          <nav className="flex items-center justify-between py-6">
            <Logo />
            <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...externalProps(link.external)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 hover:opacity-70 transition-opacity"
            >
              <Menu size={24} />
            </button>
          </nav>

          {/* Meta grid */}
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div>
              <h2 className="text-lg md:text-xl tracking-wide leading-tight">
                <span className="block font-normal">HUZAIFA</span>
                <span className="block font-pixel text-[32px]">AHMAD</span>
              </h2>
              <div className="text-[10px] text-white/50 mt-3">*</div>
              <p className="mt-1 text-sm text-white/70 leading-relaxed">
                B.Eng. Computer Engineering
                <br />
                University of Victoria
                <br />
                Expected April 2028
                <br />
                Victoria, BC
              </p>
            </div>

            <div className="text-right lg:text-left">
              <h2 className="text-lg md:text-xl tracking-wide leading-tight">
                <span className="block font-normal">HARDWARE &amp;</span>
                <span className="block font-pixel text-[32px]">FIRMWARE</span>
              </h2>
            </div>

            <div>
              <div className="font-mono text-xs sm:text-sm tracking-widest text-white/60 uppercase mb-3">What I Do</div>
              <p className="text-sm xl:text-base text-white/90 leading-relaxed max-w-[280px]">
                PCBs from schematic to bring‑up, real‑time C on ARM Cortex‑M, and pipelined CPUs on FPGAs
              </p>
            </div>

            <div className="text-right lg:text-left">
              <div className="font-mono text-xs sm:text-sm tracking-widest text-white/60 uppercase mb-3">Focus</div>
              <ul className="text-sm xl:text-base text-white/90 leading-relaxed space-y-0.5">
                {FOCUS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 min-h-8" />

          {/* Bottom section */}
          <div className="pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-end">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-wide uppercase font-normal"
                style={{ lineHeight: 0.95 }}
              >
                I BUILD THE
                <br />
                <PixelWord>HARDWARE</PixelWord> THAT
                <br />
                FLIES &amp; THE
                <br />
                <PixelWord>FIRMWARE</PixelWord> ON IT
              </h1>

              <div className="flex flex-col gap-4 sm:gap-6 justify-end">
                <a
                  href={RESUME_URL}
                  {...externalProps(true)}
                  className="self-start flex items-center gap-3 border border-white/30 px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FileText size={14} />
                  <span className="text-sm tracking-wider">VIEW RESUME</span>
                </a>

                <div className="self-start lg:self-end flex flex-wrap items-stretch gap-2 sm:gap-3 text-sm text-white/80">
                  {HIGHLIGHTS.map((h, i) => (
                    <div
                      key={h.value}
                      className={`bg-[#0B0B0B] px-3 sm:px-4 py-2 items-center gap-2 ${i === 2 ? 'hidden sm:flex' : 'flex'}`}
                    >
                      <span className="font-bold text-sm sm:text-base tracking-tight">{h.value}</span>
                      <span className="text-white/50 text-xs">{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4">
              <p className="text-xs sm:text-sm text-white/60">
                Available January 2027 for a 4 to 12 month co-op term.{' '}
                <a href={`mailto:${EMAIL}`} className="text-red-500 hover:text-red-400 transition-colors">
                  Email me
                </a>
              </p>
              <p className="text-xs sm:text-sm text-white/60 sm:text-right">
                {EXPERIENCE.length} teams &bull; {PROJECTS.length} projects &bull; 1 satellite in orbit
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col transition-all duration-500 ${EASE} ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              {...externalProps(link.external)}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl tracking-widest transition-all duration-500 ${EASE} ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
