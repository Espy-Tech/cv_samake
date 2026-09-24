import React, { useEffect, useRef, useState } from 'react';
import {
  Cpu,
  Code2,
  Layers,
  Globe2,
  GraduationCap,
  ExternalLink,
  Download,
  Mail,
  Github,
  Linkedin,
  Youtube,
  Code,
  Zap,
  Newspaper,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import PublicationsSection from './components/PublicationsSection';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

    :root {
      --gold: #D4AF37;
      --bg-dark: #0a0a0c;
      --text: #e6e6e6;
      --muted: #9ca3af;
    }

    html { scroll-behavior: smooth; }

    body {
      background:
        radial-gradient(circle at 15% 0%, rgba(212,175,55,0.14), transparent 22%),
        radial-gradient(circle at 85% 15%, rgba(96,165,250,0.10), transparent 18%),
        linear-gradient(180deg, #050608 0%, #0a0a0c 32%, #08090b 100%);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      min-height: 100vh;
    }

    .page-shell {
      position: relative;
      min-height: 100vh;
      background:
        linear-gradient(180deg, rgba(7,8,10,0.82), rgba(10,10,12,0.94)),
        radial-gradient(circle at center, rgba(212,175,55,0.06), transparent 45%);
      overflow: hidden;
      isolation: isolate;
    }

    .page-shell::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
        radial-gradient(circle at center, rgba(255,255,255,0.04), transparent 60%);
      background-size: 28px 28px, 28px 28px, 100% 100%;
      mask-image: radial-gradient(circle at center, black 35%, transparent 100%);
      pointer-events: none;
      opacity: 0.75;
    }

    .page-shell::after {
      content: '';
      position: absolute;
      inset: 10% 8% auto 8%;
      height: 55%;
      background: radial-gradient(circle at center, rgba(212,175,55,0.08), transparent 55%);
      filter: blur(40px);
      pointer-events: none;
    }

    .page-shell > * {
      position: relative;
      z-index: 1;
    }

    .font-serif { font-family: 'Playfair Display', serif; }

    .vision-copy {
      text-wrap: pretty;
      color: rgba(161, 161, 170, 0.88);
    }

    .vision-copy strong {
      color: rgba(212, 212, 216, 0.92);
    }

    .vision-copy .text-\[\#D4AF37\] {
      color: rgba(190, 151, 42, 0.9);
    }

    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.active { opacity: 1; transform: translateY(0); }

    .stack-marquee-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-top: 1px solid rgba(255,255,255,0.08);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      background: linear-gradient(90deg, rgba(10,10,12,0.9), rgba(18,18,20,0.8), rgba(10,10,12,0.9));
      box-shadow: inset 0 0 30px rgba(212,175,55,0.04);
    }

    .tech-marquee-separator {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
      transform: none;
      overflow: hidden;
    }

    .stack-marquee-wrap::before,
    .stack-marquee-wrap::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 2;
      width: clamp(5rem, 22vw, 18rem);
      pointer-events: none;
    }

    .stack-marquee-wrap::before {
      left: 0;
      background: linear-gradient(90deg, rgba(10,10,12,0.98) 0%, rgba(10,10,12,0.78) 22%, rgba(10,10,12,0.35) 58%, rgba(10,10,12,0) 100%);
    }

    .stack-marquee-wrap::after {
      right: 0;
      background: linear-gradient(270deg, rgba(10,10,12,0.98) 0%, rgba(10,10,12,0.78) 22%, rgba(10,10,12,0.35) 58%, rgba(10,10,12,0) 100%);
    }

    .stack-marquee-track {
      display: flex;
      align-items: center;
      width: max-content;
      padding: 1rem 0;
      white-space: nowrap;
      animation: stack-marquee 22s linear infinite;
    }

    .stack-marquee-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-right: 1rem;
      flex-shrink: 0;
    }

    .stack-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 9999px;
      padding: 0.8rem 1.1rem;
      color: #e5e7eb;
      font-size: 0.76rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      box-shadow: 0 10px 24px rgba(0,0,0,0.18);
      flex-shrink: 0;
    }

    .stack-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 0.8rem;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.04);
      box-shadow: inset 0 0 12px rgba(255,255,255,0.04);
      flex-shrink: 0;
    }

    .stack-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 0.3rem;
      filter: drop-shadow(0 0 8px rgba(255,255,255,0.12));
    }

    .mini-stats-shell {
      position: relative;
      width: 100%;
      min-width: 0;
      overflow: hidden;
      border-top: 1px solid rgba(255,255,255,0.08);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .mini-stats-shell::before,
    .mini-stats-shell::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 2;
      width: clamp(2.5rem, 8vw, 7rem);
      pointer-events: none;
    }

    .mini-stats-shell::before {
      left: 0;
      background: linear-gradient(90deg, rgba(10,10,12,0.98), rgba(10,10,12,0.65) 35%, rgba(10,10,12,0));
    }

    .mini-stats-shell::after {
      right: 0;
      background: linear-gradient(270deg, rgba(10,10,12,0.98), rgba(10,10,12,0.65) 35%, rgba(10,10,12,0));
    }

    .mini-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      width: 100%;
      min-width: 0;
    }

    .mini-stat {
      position: relative;
      min-height: 96px;
      padding: 0.9rem 1rem;
      background: rgba(12,12,14,0.7);
      overflow: hidden;
    }

    .mini-stat::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(212,175,55,0.03), transparent 35%, transparent 65%, rgba(212,175,55,0.03));
      pointer-events: none;
    }

    .mini-stat:not(:last-child) {
      border-right: 1px solid rgba(255,255,255,0.08);
    }

    .tech-marquee-separator {
      display: none;
    }

    #vision {
      margin-top: 5rem;
    }

    .profile-orb {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: clamp(190px, 27vw, 260px);
      height: clamp(190px, 27vw, 260px);
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212,175,55,0.32), rgba(212,175,55,0.1) 35%, rgba(255,255,255,0.02) 70%, transparent 100%);
      box-shadow: 0 0 36px rgba(212,175,55,0.18);
      padding: 0.8rem;
      border: 0;
      overflow: hidden;
    }

    .profile-orb::before {
      content: '';
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      border: 1px solid rgba(212,175,55,0.35);
      opacity: 0.8;
      pointer-events: none;
    }

    .profile-orb::after {
      content: '';
      position: absolute;
      inset: 24px;
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 50%;
      opacity: 0.75;
      pointer-events: none;
    }

    .profile-orb img {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center top;
      border: 2px solid rgba(212,175,55,0.5);
      object-fit: cover;
      object-position: center 28%;
      background: #f7f7f5;
      box-shadow: inset 0 0 25px rgba(0,0,0,0.22);
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.65rem 1.15rem;
      border-radius: 9999px;
      border: 1px solid rgba(212,175,55,0.42);
      background: linear-gradient(90deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02), rgba(212,175,55,0.08));
      box-shadow: inset 0 0 18px rgba(212,175,55,0.08), 0 10px 26px rgba(0,0,0,0.18);
      color: #f0c86a;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-size: 0.68rem;
    }

    .hero-name {
      font-size: clamp(2.4rem, 4vw, 4rem);
      line-height: 0.95;
      letter-spacing: -0.06em;
      font-weight: 800;
      margin: 0;
    }

    .hero-name .gold {
      color: var(--gold);
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-weight: 600;
    }

    .hero-name .white {
      color: #f5f5f5;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
    }

    .hero-subtitle {
      display: inline-block;
      margin-top: 0.7rem;
      font-size: clamp(0.92rem, 1.25vw, 1.15rem);
      color: rgba(255,255,255,0.8);
      line-height: 1.6;
      font-weight: 400;
    }

    .hero-subtitle strong {
      color: var(--gold);
      font-weight: 700;
    }

    .stack-pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.55rem;
      margin-top: 0.7rem;
    }

    .stack-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.4rem 0.7rem;
      border-radius: 9999px;
      border: 1px solid rgba(212,175,55,0.28);
      background: rgba(212,175,55,0.06);
      color: #f5f5f5;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .cert-card {
      background: rgba(18,18,20,0.8);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 1.25rem;
      padding: 1.4rem;
      transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 18px 30px rgba(0,0,0,0.12);
    }

    .cert-card:hover {
      border-color: rgba(212,175,55,0.4);
      transform: translateY(-2px);
      box-shadow: 0 16px 32px rgba(212,175,55,0.08);
    }

    .publication-card {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 250px;
      padding: 1.4rem;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 1rem;
      background: linear-gradient(145deg, rgba(20,20,22,0.9), rgba(12,12,14,0.72));
      box-shadow: 0 18px 30px rgba(0,0,0,0.12);
      transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }

    .publication-card:hover {
      border-color: rgba(212,175,55,0.45);
      transform: translateY(-4px);
      box-shadow: 0 20px 36px rgba(212,175,55,0.08);
    }

    .publication-marquee {
      position: relative;
      overflow: hidden;
      width: 100%;
      mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
    }

    .publication-marquee-track {
      display: flex;
      width: max-content;
      gap: 1rem;
      animation: publication-marquee 34s linear infinite;
    }

    .publication-marquee .publication-card {
      width: min(28rem, calc((100vw - 4rem) / 3));
      min-height: 250px;
      flex: 0 0 min(28rem, calc((100vw - 4rem) / 3));
    }

    .publication-more-button {
      display: none;
    }

    @keyframes publication-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    .publication-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 1.1rem;
      border: 1px solid rgba(212,175,55,0.28);
      border-radius: 0.75rem;
      color: var(--gold);
      background: rgba(212,175,55,0.08);
    }

    .publication-meta {
      color: #c7a43a;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .publication-content p { margin: 0 0 1.15rem; }
    .publication-content h2, .publication-content h3 {
      margin: 1.6rem 0 0.8rem;
      color: #fff;
      font-weight: 700;
      line-height: 1.3;
    }
    .publication-content ul, .publication-content ol {
      margin: 0 0 1.15rem 1.25rem;
      padding-left: 1rem;
    }
    .publication-content ul { list-style: disc; }
    .publication-content ol { list-style: decimal; }
    .publication-content img {
      display: block;
      width: 100%;
      max-height: 28rem;
      margin: 1.5rem 0;
      border-radius: 0.85rem;
      object-fit: contain;
      background: rgba(0,0,0,0.22);
    }

    .cert-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.4rem 0.7rem;
      border-radius: 9999px;
      background: rgba(212,175,55,0.08);
      border: 1px solid rgba(212,175,55,0.24);
      color: #f0c86a;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    @keyframes stack-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    .timeline-line { position: absolute; left: 11px; top: 24px; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--gold) 0%, transparent 100%); opacity: 0.3; }

    :focus { outline: none; }
    :focus-visible { outline: 3px solid rgba(212,175,55,0.18); outline-offset: 3px; }

    .btn-focus { transition: box-shadow .15s ease; }
    .btn-focus:focus-visible { box-shadow: 0 0 0 6px rgba(212,175,55,0.08); }

    .skip-link:focus, .skip-link:active { position: static; width: auto; height: auto; left: 1rem; top: 1rem; background: #111; color: var(--gold); padding: .5rem 1rem; border-radius: 6px; z-index: 9999; }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg-dark); }
    ::-webkit-scrollbar-thumb { background: #2b2b2b; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }

    @media (max-width: 768px) {
      .vision-copy {
        max-width: 34rem;
        font-size: 0.9rem;
        line-height: 1.75;
        text-align: left;
      }

      .profile-orb {
        width: min(62vw, 230px);
        height: min(62vw, 230px);
      }

      .mini-stat {
        min-height: 72px;
        padding: 0.5rem 0.2rem;
        min-width: 0;
      }

      .mini-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        width: 100%;
        min-width: 0;
        overflow: hidden;
      }

      .mini-stat:not(:last-child) {
        border-right: 1px solid rgba(255,255,255,0.08);
        border-bottom: none;
      }

      .mini-stats-shell::before,
      .mini-stats-shell::after {
        width: 1rem;
      }

      .mini-stat > span:first-child {
        font-size: 0.52rem;
        letter-spacing: 0.12em;
      }

      .mini-stat > .text-3xl {
        margin-top: 0.35rem;
        font-size: 1.65rem;
      }

      .mini-stat > .text-2xl {
        margin-top: 0.35rem;
        font-size: 0.9rem;
        white-space: nowrap;
      }

      .stack-pills {
        gap: 0.15rem;
        margin-top: 0.3rem;
      }

      .stack-pill {
        padding: 0.18rem 0.25rem;
        font-size: 0.48rem;
        letter-spacing: 0.02em;
      }

      .stack-badge {
        gap: 0.6rem;
        padding: 0.7rem 0.9rem;
        font-size: 0.62rem;
        letter-spacing: 0.06em;
      }

      .stack-icon {
        width: 1.8rem;
        height: 1.8rem;
      }

      .publication-marquee {
        display: none;
      }

      .publication-more-button {
        display: flex;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal { transition: none !important; transform: none !important; }
      .stack-marquee-track { animation: none !important; }
      .publication-marquee-track { animation: none !important; }
    }
  ` }} />
);

const RevealOnScroll = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const stackItems = [
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
];

const TechMarquee = () => {
  const renderItems = (isDuplicate = false) => (
    <div className="stack-marquee-group" aria-hidden={isDuplicate}>
      {stackItems.map((item, index) => (
        <div key={`${item.name}-${isDuplicate ? 'duplicate-' : ''}${index}`} className="stack-badge">
          <span className="stack-icon">
            <img src={item.logo} alt={`${item.name} logo`} />
          </span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="stack-marquee-wrap" aria-label="Technologies maîtrisées">
      <div className="stack-marquee-track">
        {renderItems()}
        {renderItems(true)}
      </div>
    </div>
  );
};

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-shell min-h-screen text-zinc-300 selection:bg-[#D4AF37] selection:text-black">
      <CustomStyles />

      <header role="banner" className="max-w-5xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
        <a href="#home" className="text-white font-serif text-lg">Ibrahim <span className="text-[#D4AF37]">Samake</span></a>
        <nav aria-label="Navigation principale" className="hidden sm:flex items-center gap-4 text-sm text-zinc-400">
          <a href="#experience" className="hover:text-white">Projets</a>
          <a href="#publications" className="hover:text-white">Publications</a>
          <a href="#education" className="hover:text-white">Parcours</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <main id="main" role="main" className="max-w-4xl mx-auto px-6 py-6 md:py-8 flex flex-col gap-20">
        <section id="home" className="flex flex-col items-center text-center mt-0 md:mt-1">
          <RevealOnScroll>
            <div className="profile-orb mb-4">
              <img
                src="/photo_profil.png"
                alt="Portrait d'Ibrahim Samake"
                className=""
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="hero-badge mb-5">
              <Zap size={14} className="animate-pulse" />
              Disponible pour de nouveaux défis
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="hero-name mb-3">
              <span className="gold">Ibrahim</span>{' '}
              <span className="white">Samake</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="hero-subtitle max-w-3xl mx-auto">
              Étudiant en Licence — <strong>Mathématiques Appliquées & Informatique</strong>
              <br />
              <span className="text-[#D4AF37] font-semibold">Scientific Computing Developer & Frontend Engineer</span>
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300} className="mini-stats-shell mt-5">
            <div className="mini-stats">
            <div className="mini-stat flex flex-col items-center justify-center text-center">
              <span className="text-[#D4AF37] text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">Projets</span>
              <span className="mt-3 text-3xl md:text-5xl font-bold text-white">3+</span>
            </div>

            <div className="mini-stat flex flex-col items-center justify-center text-center">
              <span className="text-[#D4AF37] text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">Stack</span>
              <div className="stack-pills">
                <span className="stack-pill">C++</span>
                <span className="stack-pill">JS</span>
                <span className="stack-pill">Python</span>
                <span className="stack-pill">Java</span>
              </div>
            </div>

            <div className="mini-stat flex flex-col items-center justify-center text-center">
              <span className="text-[#D4AF37] text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">Base</span>
              <span className="mt-3 text-2xl md:text-4xl font-semibold text-white">Krasnodar</span>
            </div>
            </div>
          </RevealOnScroll>

        </section>

        <div className="tech-marquee-separator" aria-label="Technologies maîtrisées">
          <TechMarquee />
        </div>

        <section id="vision" className="flex flex-col items-center text-center">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2">Vision Stratégique</h2>
            <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <p className="vision-copy text-zinc-300 text-sm md:text-base leading-loose max-w-2xl font-light text-left md:text-center">
              Étudiant ambitieux à la{' '}
              <span className="text-white font-medium">
                Faculté d'Informatique et de Technologie de l'Université d'État de Kouban (KUBSU)
              </span>
              . Passionné par l'ingénierie logicielle, le{' '}
              <span className="text-[#D4AF37]">calcul scientifique</span> et le développement web premium, je conçois des projets
              qui fusionnent précision mathématique, innovation technologique et design professionnel.
              <br />
              <br />
              Mon objectif est de bâtir des solutions puissantes à l'intersection des sciences appliquées, de la programmation
              avancée et de l'expérience digitale moderne.
            </p>
          </RevealOnScroll>
        </section>

        <PublicationsSection />

        <section id="experience">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2">
              Expériences <span className="text-white font-sans not-italic font-bold">Majeures</span>
            </h2>
            <div className="h-0.5 w-12 bg-[#D4AF37] mb-10 rounded-full" />
          </RevealOnScroll>

          <div className="relative flex flex-col gap-8">
            <div className="timeline-line hidden md:block" />

            <RevealOnScroll delay={100} className="relative pl-0 md:pl-10">
              <div className="hidden md:block absolute left-2 top-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span className="md:hidden w-1.5 h-1.5 bg-[#D4AF37] rounded-full inline-block" />
                  SnapLoad
                </h3>
              </div>
              <p className="text-[#D4AF37] text-sm font-medium mb-3">Fondateur & Développeur Full Stack</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">
                Développement d'une plateforme web premium de téléchargement multi-réseaux (TikTok, Instagram, Facebook). Focus sur une UX optimisée, un traitement asynchrone performant et un déploiement moderne.
              </p>
              <a
                href="https://telechargement.netlify.app/#accueil"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg transition-colors border border-zinc-700/50 w-fit"
              >
                Voir le projet <ExternalLink size={14} className="text-[#D4AF37]" />
              </a>
            </RevealOnScroll>

            <RevealOnScroll delay={200} className="relative pl-0 md:pl-10 mt-4">
              <div className="hidden md:block absolute left-2 top-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <div className="mb-2">
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span className="md:hidden w-1.5 h-1.5 bg-[#D4AF37] rounded-full inline-block" />
                  Projet de Fin d'Année
                </h3>
              </div>
              <p className="text-[#D4AF37] text-sm font-medium mb-3">Développeur Scientific Computing / C++ Engineer</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">
                Conception d'une étude mathématique complète autour de l'intégration numérique d'une fonction complexe. Moteur de calcul en C++ combiné à une interface web pour transformer un projet académique en véritable produit scientifique interactif.
              </p>
              <a
                href="https://samakescientific.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg transition-colors border border-zinc-700/50 w-fit"
              >
                Dashboard Scientifique <ExternalLink size={14} className="text-[#D4AF37]" />
              </a>
            </RevealOnScroll>

            <RevealOnScroll delay={300} className="relative pl-0 md:pl-10 mt-4">
              <div className="hidden md:block absolute left-2 top-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <div className="mb-2">
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span className="md:hidden w-1.5 h-1.5 bg-[#D4AF37] rounded-full inline-block" />
                  Développement Personnel
                </h3>
              </div>
              <p className="text-[#D4AF37] text-sm font-medium mb-3">Étudiant & Compétiteur Multidisciplinaire</p>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                Apprentissage continu et approfondissement des structures de données, de l'algorithmique compétitive, du design numérique (DaVinci Resolve) et des architectures logicielles modernes.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section id="tech">
          <RevealOnScroll className="text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2">
              Arsenal <span className="text-[#D4AF37] font-sans not-italic font-bold">Tech</span>
            </h2>
            <div className="h-0.5 w-12 bg-[#D4AF37] mb-10 rounded-full mx-auto md:mx-0" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RevealOnScroll delay={100}>
              <div className="bg-[#121214] border border-zinc-800/80 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all group h-full">
                <Cpu className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-white font-bold text-lg mb-2">C++ & Python</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Structures de données avancées, algorithmique, analyse numérique et calcul scientifique haute performance.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="bg-[#121214] border border-zinc-800/80 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all group h-full">
                <Code2 className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-white font-bold text-lg mb-2">Frontend Engineering</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  HTML, CSS, JavaScript . Création d'interfaces web "Pixel Perfect" et premium.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="bg-[#121214] border border-zinc-800/80 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all group h-full">
                <Layers className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-white font-bold text-lg mb-2">Outils & Design</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Git / GitHub pour le versioning. DaVinci Resolve et principes de design numérique pour la production visuelle.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="bg-[#121214] border border-zinc-800/80 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all group h-full">
                <Globe2 className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="text-white font-bold text-lg mb-2">Soft Skills</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                   Bambara (maternelle),Français (Excellent), Russe (Courant), Anglais (Pro). Vision scientifique, résolution de problèmes complexe.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section id="education">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2">
              Parcours <span className="text-white font-sans not-italic font-bold">Académique</span>
            </h2>
            <div className="h-0.5 w-12 bg-[#D4AF37] mb-10 rounded-full" />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="flex items-start gap-4 bg-[#121214] border border-zinc-800/80 rounded-2xl p-6">
              <div className="bg-[#D4AF37]/10 p-3 rounded-xl shrink-0">
                <GraduationCap className="text-[#D4AF37]" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Licence — Mathématiques Appliquées & Informatique</h3>
                <p className="text-zinc-400 text-sm mt-1 mb-2">Faculté d'Informatique et de Technologie - KUBSU</p>
                <span className="inline-block px-3 py-1 bg-zinc-800/50 text-xs font-medium text-[#D4AF37] rounded-md border border-zinc-700/50">
                  2025 — Présent
                </span>
                <br/>
                <br/>
                <h3 className="text-white font-bold text-lg">Pré-universitaire</h3>
                <p className="text-zinc-400 text-sm mt-1 mb-2">Certificat de langue russe B1 avec mention excellente - KUBSU</p>
                <span className="inline-block px-3 py-1 bg-zinc-800/50 text-xs font-medium text-[#D4AF37] rounded-md border border-zinc-700/50">
                  2024 — 2025
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section id="contact" className="mt-10 mb-20 text-center bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-4 relative z-10">Créons L'Avenir</h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto mb-8 font-light relative z-10">
              Un projet startup ? Une opportunité en ingénierie logicielle ? Je suis prêt à relever de nouveaux défis.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200} className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
              <a
                href="https://drive.google.com/uc?export=download&id=1JU8B0R8_AeArCpqi9oh0522vCaBginXR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-white text-black hover:bg-gray-100 font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)] btn-focus"
                >
                Télécharger CV PDF <Download size={18} />
              </a>
            
            <a
              href="mailto:ibrahimsamf23@gmail.com"
              className="w-full md:w-auto bg-transparent border border-zinc-700 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] font-medium py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              Envoyer un Email <Mail size={18} />
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={300} className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-zinc-800/50 relative z-10">
            <a href="https://github.com/Espy-Tech" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ibrahim-samake-18629038b/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#D4AF37] transition-colors" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://www.youtube.com/@Espy-tech" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors" aria-label="YouTube">
              <Youtube size={24} />
            </a>
            <a href="https://leetcode.com/u/espy09/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#D4AF37] transition-colors" aria-label="LeetCode">
              <Code size={24} />
            </a>
          </RevealOnScroll>
        </section>

        <footer role="contentinfo" className="max-w-4xl mx-auto px-6 pb-12 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Ibrahim Samake — Tous droits réservés.
        </footer>
      </main>
    </div>
  );
}
