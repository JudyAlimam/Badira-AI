import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Activity, BrainCircuit, ChevronDown, CircleCheck, Clock3, FileText, Gauge, HeartPulse, Languages, Menu, Share2, ShieldCheck, Sparkles, Stethoscope, UsersRound, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Team', href: '#team' },
];

const riskPillars = [
  {
    number: '01',
    title: 'Risk',
    question: 'What does the available information suggest?',
    detail: 'Badira considers available pregnancy and health information to estimate screening priority.',
    icon: Activity,
    color: 'bg-[#e9d4d8]',
  },
  {
    number: '02',
    title: 'Reliability',
    question: 'How reliable is the assessment?',
    detail: 'Badira considers the completeness and consistency of the available information and communicates when important information is missing.',
    icon: ShieldCheck,
    color: 'bg-[#d9e2d6]',
  },
  {
    number: '03',
    title: 'Time',
    question: 'When might professional assessment be appropriate?',
    detail: 'Badira considers gestational stage when communicating how promptly professional assessment may be needed.',
    icon: Clock3,
    color: 'bg-[#e8dfc9]',
  },
];

const steps = [
  { number: '01', title: 'Tell Badira about your pregnancy', detail: 'Provide your gestational week and basic pregnancy context.' },
  { number: '02', title: 'Add what you know', detail: 'Share relevant medical history, previous pregnancies, family history, symptoms, and any available health measurements or clinical information.' },
  { number: '03', title: 'AI evaluates the information', detail: 'Badira considers potential risk while also evaluating the completeness and reliability of the available information.' },
  { number: '04', title: 'Understand Risk × Reliability × Time', detail: 'Receive a clear explanation of screening priority, reliability and timing.' },
  { number: '05', title: 'Share a concise summary', detail: 'Organize the provided information into a concise summary that can support a conversation with a healthcare professional.' },
];

const features = [
  { title: 'Arabic + English', detail: 'Information should meet people in the language they think in.', icon: Languages },
  { title: 'AI-powered awareness', detail: 'Uses a multi-model AI approach to analyze maternal health and pregnancy-related information and support personalized screening priority.', icon: BrainCircuit },
  { title: 'Reliability-aware', detail: 'Makes room for what is missing, uncertain or inconsistent.', icon: ShieldCheck },
  { title: 'Time-aware', detail: 'Puts pregnancy stage alongside the information available.', icon: Clock3 },
  { title: 'Explainable results', detail: 'Turns a black box into a starting point for questions.', icon: FileText },
  { title: 'Shareable summary', detail: 'A simple handoff for a more informed clinical conversation.', icon: Share2 },
];

const teamMembers = [
  {
    name: 'Judy Al Imam',
    role: 'Founder',
    discipline: 'Computer Science — Artificial Intelligence',
    detail: 'Creator of Badira, contributing to its research, AI concept, and development.',
  },
  {
    name: 'Dana Al Mounayer',
    role: 'Co-Founder',
    discipline: 'Computer Science — Artificial Intelligence',
    detail: 'Co-creator of Badira, contributing to its research, AI concept, and development.',
  },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      data-testid="link-brand"
      className={`group inline-flex items-center gap-3 ${light ? 'text-[#f7f4ef]' : 'text-[#372f48]'}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-current/30">
        <span className="h-2.5 w-2.5 rounded-full bg-[#b88e9b]" />
        <span className="absolute h-5 w-5 rounded-full border border-current/45" />
      </span>
      <span className="leading-none">
        <span className="wordmark-english block text-[18px] leading-none">Badira</span>
        <span className="wordmark-arabic mt-1 block text-[12px] opacity-75" dir="rtl">بادرة</span>
      </span>
    </a>
  );
}

function SectionEyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${light ? 'text-[#b8cdb4]' : 'text-[#8a6c77]'}`}>
      {children}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top" className="noise site-shell min-h-[100dvh] text-[#372f48]">
      <header className="sticky top-0 z-40 border-b border-[#372f48]/10 bg-[#f7f4ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Brand />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                className="text-[12px] font-semibold text-[#5b5262] transition-colors hover:text-[#372f48]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            data-testid="link-nav-contact"
            className="hidden rounded-full bg-[#372f48] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#f7f4ef] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Meet Badira
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#372f48]/15 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#372f48]/10 bg-[#f7f4ef] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col">
              {[...navItems, { label: 'Contact', href: '#contact' }].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                  className="border-b border-[#372f48]/10 py-4 text-sm font-semibold last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section className="relative overflow-hidden bg-[#372f48] text-[#f7f4ef]" aria-labelledby="hero-title">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-[#b88e9b]/20" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full border border-[#b8cdb4]/20" />
        <div className="relative mx-auto grid min-h-[690px] max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <div className="reveal mb-8 flex items-center gap-3 text-[#b8cdb4]">
              <span className="h-px w-10 bg-[#b8cdb4]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.23em]">A university AI healthcare concept</span>
            </div>
            <h1 id="hero-title" className="reveal reveal-delay-1 max-w-[760px] text-[clamp(3.7rem,8vw,7.5rem)] leading-[.86] tracking-[-0.065em]">
              Know earlier.
              <span className="font-display mt-3 block text-[#d8b7be]">Act at the right time.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-9 max-w-[540px] text-[17px] leading-7 text-[#ddd7db] sm:text-[19px]">
              Badira is an AI Early Awareness Companion for Preeclampsia — designed to help pregnant women recognize when their pregnancy and health information may warrant earlier professional assessment.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#how-it-works"
                data-testid="link-hero-how-it-works"
                className="group inline-flex items-center gap-3 rounded-full bg-[#b8cdb4] px-6 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-[#372f48] transition-transform hover:-translate-y-1"
              >
                Learn how it works
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#about"
                data-testid="link-hero-about"
                className="inline-flex items-center gap-2 px-3 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-[#e5d7da] hover:text-[#b8cdb4]"
              >
                Explore the concept <ArrowDown size={14} />
              </a>
            </div>
          </div>
          <div className="reveal reveal-delay-3 relative mx-auto h-[390px] w-full max-w-[440px] sm:h-[450px]">
            <div className="absolute inset-[10%] rounded-[48%_52%_56%_44%/50%_44%_56%_50%] bg-[#b88e9b]/15" />
            <div className="orbital float-slow absolute inset-[6%] rotate-[-22deg]" />
            <div className="orbital absolute inset-[18%] rotate-[30deg] border-[#b8cdb4]/30" />
            <div className="absolute left-[17%] top-[18%] rounded-full border border-[#f7f4ef]/20 bg-[#f7f4ef]/[.06] px-4 py-3 backdrop-blur-sm">
              <div className="font-mono text-[9px] uppercase tracking-[.16em] text-[#b8cdb4]">Signal 01</div>
              <div className="mt-1 text-sm text-[#f7f4ef]">Awareness</div>
            </div>
            <div className="absolute bottom-[18%] right-[8%] rounded-full border border-[#f7f4ef]/20 bg-[#f7f4ef]/[.06] px-4 py-3 backdrop-blur-sm">
              <div className="font-mono text-[9px] uppercase tracking-[.16em] text-[#d8b7be]">Signal 02</div>
              <div className="mt-1 text-sm text-[#f7f4ef]">Context</div>
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f4ef] text-center text-[#372f48] shadow-[0_18px_60px_rgba(0,0,0,.22)] sm:h-36 sm:w-36">
              <div>
                <HeartPulse className="mx-auto mb-2 text-[#8a6c77]" size={25} strokeWidth={1.5} />
                <span className="font-display text-[20px]">Badira</span>
                <span className="mt-1 block font-mono text-[8px] uppercase tracking-[.16em] text-[#8a6c77]">Early awareness</span>
              </div>
            </div>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 500 500" fill="none" aria-hidden="true">
              <path className="signal-line" d="M42 326 C130 225, 170 370, 250 250 S365 160, 454 240" stroke="#b8cdb4" strokeOpacity=".7" />
              <path className="signal-line" d="M62 170 C150 280, 196 110, 280 228 S390 330, 445 155" stroke="#d8b7be" strokeOpacity=".6" />
            </svg>
          </div>
        </div>
        <div className="relative mx-auto max-w-[1240px] border-t border-[#f7f4ef]/15 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#b8cdb4]">A companion, not a clinician</span>
            <span className="font-display text-xl italic text-[#d8b7be]">Risk <span className="font-sans not-italic text-sm">×</span> Reliability <span className="font-sans not-italic text-sm">×</span> Time</span>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-28">
            <div>
              <SectionEyebrow>01 / The problem</SectionEyebrow>
              <div className="mt-8 h-px w-20 bg-[#b88e9b]" />
              <p className="mt-6 max-w-[260px] text-sm leading-6 text-[#766c78]">Pregnancy can be full of information — and still leave a person unsure what deserves attention now.</p>
            </div>
            <div>
              <h2 className="max-w-[800px] text-[clamp(2.4rem,5vw,5rem)] leading-[.98] tracking-[-.05em]">
                Early recognition can change the conversation.
              </h2>
              <p className="mt-8 max-w-[690px] text-[18px] leading-8 text-[#655c69]">
                Preeclampsia is a serious pregnancy complication where early risk identification matters. However, pregnant women may not always recognize when their medical history, pregnancy factors, or available measurements suggest a need for earlier professional assessment.
              </p>
              <blockquote className="mt-12 border-l-2 border-[#b88e9b] pl-6 text-[24px] leading-[1.18] tracking-[-.025em] text-[#8a6c77] sm:text-[30px]">
                “The challenge is not only identifying risk — it is recognizing it early enough to act.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9dfe0] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_.85fr]">
            <div>
              <SectionEyebrow>02 / The solution</SectionEyebrow>
              <h2 className="mt-7 max-w-[720px] text-[clamp(2.5rem,5vw,5.2rem)] leading-[.94] tracking-[-.055em]">
                Early awareness, built around the information you have.
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="text-[17px] leading-7 text-[#5e5260]">
                Badira is a bilingual, mobile-first AI companion designed to support early awareness of preeclampsia. It uses information a woman can readily provide — gestational week, medical history, previous pregnancies, family history and available measurements — to make the next question easier to ask.
              </p>
            </div>
          </div>
          <div className="mt-20 grid gap-5 sm:grid-cols-3">
            {[
              { label: 'Bilingual by design', value: 'عربي / English', icon: Languages },
              { label: 'Built for real context', value: 'Mobile-first', icon: Activity },
              { label: 'Designed around care', value: 'Not a diagnosis', icon: Stethoscope },
            ].map((item) => (
              <div key={item.label} className="border-t border-[#372f48]/20 pt-5">
                <item.icon size={21} strokeWidth={1.5} className="text-[#8a6c77]" />
                <div className="mt-7 font-mono text-[10px] uppercase tracking-[.16em] text-[#766c78]">{item.label}</div>
                <div className="mt-2 text-xl font-semibold tracking-[-.03em]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#372f48] px-5 py-24 text-[#f7f4ef] sm:px-8 lg:px-10 lg:py-32" aria-labelledby="risk-heading">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <SectionEyebrow light>03 / The lens</SectionEyebrow>
              <h2 id="risk-heading" className="mt-6 max-w-[720px] text-[clamp(2.7rem,5.5vw,5.4rem)] leading-[.92] tracking-[-.06em]">
                Risk <span className="font-display text-[#d8b7be]">×</span> Reliability <span className="font-display text-[#d8b7be]">×</span> Time
              </h2>
            </div>
            <p className="max-w-[300px] text-sm leading-6 text-[#c6bec7]">Three signals. One more considered way to understand what may deserve a conversation.</p>
          </div>
          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {riskPillars.map((item) => (
              <article key={item.title} className={`card-lift relative min-h-[330px] rounded-[28px] p-7 text-[#372f48] ${item.color}`}>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-[.16em] opacity-60">{item.number}</span>
                  <item.icon size={25} strokeWidth={1.5} />
                </div>
                <div className="mt-24">
                  <h3 className="text-3xl font-semibold tracking-[-.05em]">{item.title}</h3>
                  <p className="mt-3 text-[17px] font-medium leading-6">{item.question}</p>
                  <p className="mt-4 text-sm leading-6 opacity-70">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <SectionEyebrow>04 / How it works</SectionEyebrow>
              <h2 className="mt-7 max-w-[390px] text-[clamp(2.7rem,5vw,5.2rem)] leading-[.93] tracking-[-.06em]">From your information to a clearer next step.</h2>
              <p className="mt-8 max-w-[360px] text-[16px] leading-7 text-[#6a606e]">A simple sequence for organizing information — and making room for a better-informed next step.</p>
            </div>
            <div className="divide-y divide-[#372f48]/15 border-y border-[#372f48]/15">
              {steps.map((step) => (
                <div key={step.number} className="group grid gap-5 py-7 sm:grid-cols-[64px_1fr_1fr] sm:items-start">
                  <span className="font-mono text-[11px] font-bold text-[#8a6c77]">{step.number}</span>
                  <h3 className="text-[20px] font-semibold leading-tight tracking-[-.03em] group-hover:text-[#8a6c77]">{step.title}</h3>
                  <p className="text-sm leading-6 text-[#766c78]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 overflow-hidden rounded-[30px] bg-[#d9e2d6] p-7 sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#637660]">No black box</div>
                <p className="mt-4 max-w-[700px] text-[clamp(1.4rem,3vw,2.3rem)] leading-[1.1] tracking-[-.04em]">The output is a clearer starting point for a conversation — not a verdict.</p>
              </div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#637660]/40 text-[#637660]">
                <Sparkles size={23} strokeWidth={1.5} />
                <span className="absolute -right-4 top-3 font-mono text-[9px] uppercase tracking-[.12em]">Explainable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 bg-[#ede9e1] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionEyebrow>05 / What makes it considered</SectionEyebrow>
              <h2 className="mt-7 max-w-[580px] text-[clamp(2.7rem,5vw,5rem)] leading-[.94] tracking-[-.06em]">Designed around clarity and trust.</h2>
            </div>
            <p className="max-w-[280px] text-sm leading-6 text-[#766c78]">Every part of the concept is there to make awareness more accessible, understandable or timely.</p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[26px] border border-[#372f48]/15 bg-[#372f48]/15 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <article key={feature.title} className="card-lift min-h-[220px] bg-[#ede9e1] p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <feature.icon size={24} strokeWidth={1.5} className="text-[#8a6c77]" />
                  <span className="font-mono text-[10px] text-[#9a8f99]">0{index + 1}</span>
                </div>
                <h3 className="mt-12 text-[19px] font-semibold tracking-[-.03em]">{feature.title}</h3>
                <p className="mt-3 max-w-[260px] text-sm leading-6 text-[#766c78]">{feature.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-2 lg:gap-28">
          <div>
            <SectionEyebrow>06 / Who it is for</SectionEyebrow>
              <h2 className="mt-7 text-[clamp(2.7rem,5vw,5rem)] leading-[.93] tracking-[-.06em]">Built for pregnant women seeking clearer early awareness.</h2>
          </div>
          <div className="flex flex-col justify-end">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#e9d4d8] text-[#8a6c77]"><UsersRound size={28} strokeWidth={1.4} /></div>
            <p className="text-[17px] leading-7 text-[#766c78]">Supporting pregnant women with clearer, more accessible awareness of preeclampsia risk.</p>
            <p className="mt-6 text-[20px] leading-8 tracking-[-.025em] text-[#5e5362]">Pregnant women seeking a simple and accessible way to understand whether their pregnancy and health information may warrant earlier professional assessment for preeclampsia.</p>
            <div className="mt-10 border-l-2 border-[#b8cdb4] pl-5">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[.17em] text-[#637660]">For healthcare professionals</div>
              <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#6a606e]">Badira can also support healthcare professionals by providing a structured summary of the information and risk factors identified by the user before or during a consultation.</p>
            </div>
            <div className="mt-10 section-rule" />
            <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.17em] text-[#8a6c77]"><CircleCheck size={14} /> Designed for understanding, not alarm</div>
          </div>
        </div>
      </section>

      <section className="bg-[#d9e2d6] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div id="project" className="mx-auto max-w-[1240px] scroll-mt-20">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-28">
            <div>
              <SectionEyebrow>07 / About the project</SectionEyebrow>
            </div>
            <div>
              <h2 className="max-w-[780px] text-[clamp(2.4rem,4.5vw,4.7rem)] leading-[.96] tracking-[-.055em]">Trustworthy AI should feel like a handrail, not a wall.</h2>
              <p className="mt-8 max-w-[700px] text-[17px] leading-8 text-[#536252]">Badira grew from our exploration of trustworthy AI in women’s health. For the hackathon, we transformed that research direction into a focused concept centered on one goal: helping women recognize potential preeclampsia risk earlier and connect with professional care at the right time.</p>
              <p className="mt-5 max-w-[700px] text-[17px] leading-8 text-[#536252]">We are interested in the space between a person noticing something and knowing what to do next — with care, context and humility built into the experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionEyebrow>08 / The team</SectionEyebrow>
              <h2 className="mt-7 text-[clamp(2.7rem,5vw,5rem)] leading-[.94] tracking-[-.06em]">A thoughtful idea is a team sport.</h2>
            </div>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {teamMembers.map((member, index) => (
              <article key={member.name} data-testid={`card-team-member-${index + 1}`} className="card-lift rounded-[24px] border border-[#372f48]/15 bg-[#ede9e1] p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#8a6c77]/35 font-display text-2xl text-[#8a6c77]">ب</div>
                <h3 className="mt-12 text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[.16em] text-[#8a6c77]">{member.role}</p>
                <p className="mt-5 text-sm font-medium leading-6 text-[#5e5362]">{member.discipline}</p>
                <div className="mt-7 h-px bg-[#372f48]/10" />
                <p className="mt-4 text-xs leading-5 text-[#766c78]">{member.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 rounded-[28px] border border-[#8a6c77]/35 bg-[#e9d4d8] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-5">
            <ShieldCheck className="mt-1 shrink-0 text-[#8a6c77]" size={28} strokeWidth={1.5} />
            <div>
              <SectionEyebrow>Medical responsibility</SectionEyebrow>
              <h2 className="mt-4 max-w-[650px] text-[clamp(1.5rem,3vw,2.2rem)] leading-tight tracking-[-.035em]">Badira is not a diagnostic or treatment system and does not replace professional medical care.</h2>
              <p className="mt-4 max-w-[740px] text-sm leading-6 text-[#665763]">It supports early awareness and informed conversations with healthcare professionals. It does not provide diagnosis or replace clinical screening.</p>
            </div>
          </div>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[.14em] text-[#8a6c77]">Always seek professional care</span>
        </div>
      </section>

      <footer id="contact" className="scroll-mt-20 bg-[#372f48] px-5 pb-8 pt-20 text-[#f7f4ef] sm:px-8 lg:px-10 lg:pt-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_.7fr] lg:gap-28">
            <div>
              <SectionEyebrow light>09 / Stay in touch</SectionEyebrow>
              <h2 className="mt-7 max-w-[760px] text-[clamp(3rem,7vw,7rem)] leading-[.85] tracking-[-.07em]">Earlier awareness.<span className="font-display block pt-3 text-[#d8b7be]">Better conversations.</span><span className="block pt-3">At the right time.</span></h2>
            </div>
            <div className="lg:pt-8">
              <p className="text-[17px] leading-7 text-[#d0c8d0]">Student AI Healthcare Project</p>
              <p className="mt-2 text-[15px] leading-7 text-[#b8cdb4]">Effat University · 2026</p>
            </div>
          </div>
          <div className="mt-24 border-t border-[#f7f4ef]/15 pt-6">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <Brand light />
              <div className="font-display text-lg italic text-[#d8b7be]">Risk <span className="font-sans not-italic text-xs">×</span> Reliability <span className="font-sans not-italic text-xs">×</span> Time</div>
              <div className="font-mono text-[9px] uppercase tracking-[.15em] text-[#a89da9]">Universities challenge · 2026</div>
            </div>
            <p className="mt-8 text-[11px] leading-5 text-[#a89da9]">For concept presentation only. Badira is not a diagnostic or treatment system.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;