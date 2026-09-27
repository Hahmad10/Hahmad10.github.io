import { ArrowUpRight } from 'lucide-react'
import { EMAIL, EXPERIENCE, GITHUB_URL, LINKEDIN_URL, PROJECTS, RESUME_URL } from '../data'
import { Chip, Label, PixelWord, externalProps } from './ui'

const SECTION = 'border-t border-white/10 px-5 sm:px-6 md:px-10 lg:px-14 py-20 lg:py-28'
const HEADING =
  'text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] tracking-wide uppercase font-normal'

const pad = (n: number) => String(n + 1).padStart(2, '0')

export function Experience() {
  return (
    <section id="experience" className={SECTION}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
        <Label>01 / Experience</Label>
        <h2 className={`${HEADING} lg:col-span-3`} style={{ lineHeight: 0.95 }}>
          WHERE I&apos;VE <PixelWord>WORKED</PixelWord>
        </h2>
      </div>

      {EXPERIENCE.map((job) => (
        <article
          key={job.org}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 border-t border-white/10 py-10"
        >
          <div className="font-mono text-sm text-white/60 leading-relaxed">
            {job.dates}
            <br />
            {job.location}
          </div>
          <div>
            <h3 className="text-xl uppercase tracking-wide leading-tight">{job.org}</h3>
            <p className="mt-2 text-base text-white/60">{job.role}</p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-base md:text-lg text-white/90 leading-relaxed">{job.highlight}</p>
            <ul className="mt-5 space-y-3 text-sm md:text-base text-white/70 leading-relaxed">
              {job.bullets.map((b) => (
                <li key={b} className="relative pl-5">
                  <span aria-hidden="true" className="absolute left-0.5 top-[calc(0.8125em-1px)] size-1 bg-white/40" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" className={SECTION}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
        <Label>02 / Projects</Label>
        <h2 className={`${HEADING} lg:col-span-3`} style={{ lineHeight: 0.95 }}>
          THINGS I&apos;VE <PixelWord>BUILT</PixelWord>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12">
        {PROJECTS.map((p, i) => (
          <article key={p.title} className="flex flex-col border-t border-white/10 pt-6 pb-12">
            <div className="flex items-baseline justify-between gap-4 font-mono text-sm text-white/60">
              <span>{pad(i)}</span>
              <span>{p.dates}</span>
            </div>
            <h3 className="mt-3 text-xl uppercase tracking-wide leading-tight">{p.title}</h3>
            <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed flex-1">{p.description}</p>
            <p className="mt-4 font-mono text-sm text-white/90">{p.metric}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const CONTACT_LINKS = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Resume (PDF)', href: RESUME_URL },
]

export function Contact() {
  return (
    <section id="contact" className={SECTION}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <Label>03 / Contact</Label>
        <div className="lg:col-span-3">
          <h2 className={HEADING} style={{ lineHeight: 0.95 }}>
            LET&apos;S BUILD
            <br />
            <PixelWord>SOMETHING</PixelWord>
          </h2>
          <p className="mt-8 max-w-[560px] text-base text-white/70 leading-relaxed">
            I&apos;m looking for co-op roles in embedded systems, hardware and software engineering. Available
            January 2027 for a 4 to 12 month term. Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 inline-block text-xl sm:text-2xl md:text-3xl tracking-wide text-red-500 hover:text-red-400 transition-colors break-all"
          >
            {EMAIL}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...externalProps(true)}
                className="flex items-center gap-2 border border-white/30 px-5 py-2.5 text-sm tracking-wider backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
              >
                {l.label.toUpperCase()}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 sm:px-6 md:px-10 lg:px-14 py-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white/50">
      <p>© 2026 Huzaifa Ahmad · Victoria, BC</p>
      <p className="sm:text-right">
        Pixel font from{' '}
        <a
          href="http://www.onlinewebfonts.com/fonts"
          {...externalProps(true)}
          className="underline hover:text-white/80 transition-colors"
        >
          Web Fonts
        </a>{' '}
        (CC BY 4.0)
      </p>
    </footer>
  )
}
