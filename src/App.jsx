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
  Zap,
} from 'lucide-react';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

    :root {
      --gold: #D4AF37;
      --bg-dark: #0a0a0c;
    }

    body {
      background-color: var(--bg-dark);
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      min-height: 100vh;
    }

    .font-serif {
      font-family: 'Playfair Display', serif;
    }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    .timeline-line {
      position: absolute;
      left: 11px;
      top: 24px;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, var(--gold) 0%, transparent 100%);
      opacity: 0.3;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-dark);
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--gold);
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

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-300 selection:bg-[#D4AF37] selection:text-black">
      <CustomStyles />

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-20">
        <section className="flex flex-col items-center text-center mt-8">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-xs font-medium text-[#D4AF37] mb-8 tracking-widest uppercase">
              <Zap size={14} className="animate-pulse" />
              Disponible pour de nouveaux défis
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
              <span className="font-serif text-[#D4AF37]">Ibrahim</span>{' '}
              <span className="font-sans text-white/90">Samake</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed mx-auto font-light">
              Étudiant en Licence 1 — Mathématiques Appliquées & Informatique
              <br />
              <span className="text-[#D4AF37] font-medium mt-1 inline-block">
                Développeur Scientific Computing & Frontend Engineer
              </span>
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300} className="w-full mt-12 grid grid-cols-3 gap-4 border-y border-zinc-800/50 py-8">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">Projets</span>
              <span className="text-xl md:text-2xl font-semibold text-white">3+</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-x border-zinc-800/50">
              <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">Stack</span>
              <span className="text-xl md:text-2xl font-semibold text-white">C++ / JS</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">Base</span>
              <span className="text-lg md:text-xl font-semibold text-white">Krasnodar</span>
            </div>
          </RevealOnScroll>
        </section>

        <section className="flex flex-col items-center text-center">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-2">Vision Stratégique</h2>
            <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <p className="text-zinc-300 text-sm md:text-base leading-loose max-w-2xl font-light text-justify md:text-center">
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

        <section>
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

        <section>
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
                  Français (Excellent), Russe (Courant), Anglais (Pro). Vision scientifique, résolution de problèmes complexe.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section>
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
                <h3 className="text-white font-bold text-lg">Licence 1 — Mathématiques Appliquées & Informatique</h3>
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

        <section className="mt-10 mb-20 text-center bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-4 relative z-10">Créons L'Avenir</h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto mb-8 font-light relative z-10">
              Un projet startup ? Une opportunité en ingénierie logicielle ? Je suis prêt à relever de nouveaux défis.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200} className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
              <a
                href="//cv_pdf/cv_samake.pdf"
                download="Samake_Ibrahim_CV.pdf"
                className="w-full md:w-auto bg-white text-black hover:bg-gray-100 font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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
            <a href="https://github.com/Espy-Tech" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ibrahim-samake-18629038b/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#D4AF37] transition-colors">
              <Linkedin size={24} />
            </a>
          </RevealOnScroll>
        </section>
      </main>
    </div>
  );
}
