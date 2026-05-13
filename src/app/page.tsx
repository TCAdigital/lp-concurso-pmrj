"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAboutSlide, setCurrentAboutSlide] = useState(0);

  const slides = [
    { bg: "/assets/hero_final_bg_2.jpg" },
    { bg: "/assets/hero_final_bg_3.jpg" },
    { bg: "/assets/hero_final_bg_4.jpg" }
  ];
  const aboutSlides = [
    "/assets/Fotos/671235803_18524025637074757_3015869201045570705_n.jpg",
    "/assets/Fotos/499552409_18461190649074757_2972682659379787270_n.jpg",
    "/assets/approved_student_2_1777926200853.png"
  ];
  const urgencySlides = [
    "/assets/Fotos/464222777_18425346595074757_3604659167413517835_n.jpg",
    "/assets/Fotos/Ela transformou cada desafio em conquista e cada limite em superação.Entre dezenas de homens, a .jpg",
    "/assets/Fotos/671235803_18524025637074757_3015869201045570705_n.jpg"
  ];
  
  const [currentUrgencySlide, setCurrentUrgencySlide] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    // Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.grid-card, .brutalist-card, .offer-wrapper, .hero-text-content, .hero-visual-v2');
    
    revealTargets.forEach((el: any) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });

    const revealVisible = (el: any) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    };

    const observerGlobal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealVisible(entry.target);
            }
        });
    }, observerOptions);

    revealTargets.forEach(el => observerGlobal.observe(el));

    // Sticky Header Logic
    const handleScroll = () => {
      if (window.scrollY > 400) {
          setIsStickyVisible(true);
      } else {
          setIsStickyVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Countdown Logic
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const updateCountdown = () => {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setDays(d.toString().padStart(2, '0'));
        setHours(h.toString().padStart(2, '0'));
        setMinutes(m.toString().padStart(2, '0'));
        setSeconds(s.toString().padStart(2, '0'));
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const aboutSlideInterval = setInterval(() => {
      setCurrentAboutSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 4000);

    const urgencySlideInterval = setInterval(() => {
      setCurrentUrgencySlide((prev) => (prev + 1) % urgencySlides.length);
    }, 3500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      clearInterval(slideInterval);
      clearInterval(aboutSlideInterval);
      clearInterval(urgencySlideInterval);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .btn-header-sticky.visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
      `}</style>
      
      {/* SVG Gradients Definition - Robust version for all browsers */}
      <svg 
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} 
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d03f" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>
      
    
    <div className="grain"></div>

    
    <header className="main-header">
        <div className="container">
            <div className="header-inner">
                
                <div className="brand">
                    <img src="/assets/Logo_Praticar-Colegio-Curso.png" alt="Praticar Ensino Logo" className="brand-logo" />
                </div>

                
                <div className="header-countdown">
                    <div className="countdown-label">OFERTA PRÉ-EDITAL ENCERRA EM:</div>
                    <div className="countdown-timer">
                        <div className="timer-box"><span id="days">{days}</span><small>DIAS</small></div>
                        <span className="sep">:</span>
                        <div className="timer-box"><span id="hours">{hours}</span><small>HRS</small></div>
                        <span className="sep">:</span>
                        <div className="timer-box"><span id="minutes">{minutes}</span><small>MIN</small></div>
                        <span className="sep">:</span>
                        <div className="timer-box"><span id="seconds">{seconds}</span><small>SEG</small></div>
                    </div>
                </div>

                
                <div className="header-actions">
                    <a href="https://pay.goexplosion.com/link/sdpmerj" className={`btn-header-sticky ${isStickyVisible ? "visible" : ""}`}>
                        <span>🔒</span> QUERO MINHA VAGA
                    </a>
                    <a href="https://instagram.com" className="social-icon" target="_blank">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                </div>
            </div>
        </div>
        <div className="gold-strip"></div>
    </header>

    <main>
        
        <section className="hero-v4" style={{ backgroundImage: `url('${slides[currentSlide].bg}')`, transition: 'background-image 0.8s ease-in-out' }}>
            <div className="hero-bg-overlay"></div>
            <div className="container">
                <div className="hero-content-v4">
                    <div className="hero-title-group">
                        <img src="/assets/Logotipo-Dourado-PMERJ-2026.png" alt="Logo PMERJ" className="hero-pmerj-logo"/>
                        <h1 className="hero-title-v4">
                            CONCURSO PMERJ <br/>
                            <span className="main-name">SOLDADO</span> <br/>
                            <span className="sub-name">MAIS DE <span className="highlight">2,1 MIL VAGAS</span> CONFIRMADAS!</span>
                        </h1>
                    </div>
                    
                    <p className="hero-lead-v4">Estude com quem já ajudou <span className="highlight">mais de 30 mil alunos a conquistar a aprovação!</span></p>

                    
                    <div className="social-proof-icons">
                        <div className="s-icon-item">
                            <span className="s-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </span>
                            <div className="s-text">
                                <strong>+16 ANOS</strong>
                                <span>DE HISTÓRIA</span>
                            </div>
                        </div>
                        <div className="s-icon-item">
                            <span className="s-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </span>
                            <div className="s-text">
                                <strong>+15.000</strong>
                                <span>APROVADOS</span>
                            </div>
                        </div>
                        <div className="s-icon-item">
                            <span className="s-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16"></path>
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                                </svg>
                            </span>
                            <div className="s-text">
                                <strong>LÍDER EM APROVAÇÃO</strong>
                                <span>NA PMERJ</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="offer-box-v4">
                        <div className="price-de">
                            <span>DE:</span>
                            <span className="strike">R$ 2.497,00</span>
                        </div>
                        <div className="price-por">
                            <span className="por-label">POR SOMENTE</span>
                            <div className="val-main">
                                <span className="x">12x de</span>
                                <span className="num">R$ 71,34</span>
                            </div>
                            <div className="vista">OU À VISTA <span className="gold">R$ 997,00</span></div>
                        </div>
                    </div>

                    
                    <div className="cta-wrapper-v4">
                        <a href="https://pay.goexplosion.com/link/sdpmerj" className="btn-yellow">
                            <span className="lock">🔒</span>
                            <div className="btn-t">
                                <strong>QUERO GARANTIR MINHA VAGA</strong>
                                <span className="btn-sub">INVESTA NO SEU FUTURO. MUDE SUA HISTÓRIA.</span>
                            </div>
                        </a>
                    </div>
                    <div className="slider-dots">
                        {slides.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`dot ${currentSlide === idx ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(idx)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        
        <section className="urgency-section">
            <div className="urgency-wrapper">
                
                <div className="urgency-image-slider">
                    {urgencySlides.map((img, idx) => (
                        <div 
                            key={idx}
                            className={`urgency-slide ${currentUrgencySlide === idx ? 'active' : ''}`}
                            style={{ backgroundImage: `url('${img}')` }}
                        ></div>
                    ))}
                    <div className="slider-overlay"></div>
                    <div className="slider-badge">
                        <span className="badge-dot"></span> IMAGENS REAIS
                    </div>
                </div>

                
                <div className="urgency-content">
                    <div className="urgency-tag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        ATENÇÃO CANDIDATO
                    </div>

                    <h2 className="urgency-title">
                        O silêncio do edital é a sua <span className="highlight-dark">MAIOR ARMADILHA...</span>
                    </h2>
                    
                    <p className="urgency-subtitle">
                        Está iminente a publicação do <strong>MELHOR CONCURSO DO ANO</strong> para <strong>SOLDADO DA PMERJ</strong>. Quem espera o edital sair para começar, já começa perdendo.
                    </p>

                    <div className="urgency-features">
                        <div className="u-feature">
                            <div className="u-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            </div>
                            <div className="u-text">
                                <strong>Tempo é o seu maior ativo</strong>
                                <span>Cada dia sem estudar é uma vaga a menos.</span>
                            </div>
                        </div>
                        <div className="u-feature">
                            <div className="u-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div className="u-text">
                                <strong>Preparação Blindada</strong>
                                <span>Antecipe-se à concorrência que está dormindo.</span>
                            </div>
                        </div>
                    </div>

                    <div className="question-highlight-v2">
                        <div className="q-line"></div>
                        <span>VOCÊ ESTÁ REALMENTE PRONTO?</span>
                        <div className="q-line"></div>
                    </div>

                    <h3 className="urgency-question">
                        VOCÊ VAI DEIXAR PASSAR MAIS UMA VEZ A CHANCE DE SER <span className="highlight-dark">POLICIAL MILITAR?</span>
                    </h3>

                    <div className="scroll-indicator-v2">
                        <p>Descubra como garantir sua farda abaixo</p>
                        <div className="mouse-icon">
                            <div className="wheel"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="about-contest">
            <div className="container">
                <div className="section-header-centered">
                    <div className="header-line"></div>
                    <h2 className="section-title-main">SOBRE O CONCURSO</h2>
                    <div className="header-line"></div>
                </div>

                <div className="info-grid">
                    
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <div className="info-text">
                            <h4>SALÁRIO INICIAL</h4>
                            <p className="salary-highlight">+ de R$ 5.000</p>
                            <span className="price-spelled">(cinco mil reais)</span>
                        </div>
                    </div>

                    
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        </div>
                        <div className="info-text">
                            <h4>ESCOLARIDADE</h4>
                            <p><strong>NÍVEL MÉDIO</strong><br/><small>COMPLETO</small></p>
                        </div>
                    </div>

                    
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2M15 12h2M7 16h10"/></svg>
                        </div>
                        <div className="info-text">
                            <h4>CNH</h4>
                            <p><strong>QUALQUER CATEGORIA</strong><br/><small>Exceto somente A</small></p>
                        </div>
                    </div>

                    
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-5-14a2 2 0 0 0-3.48 0l-5 14a2 2 0 0 0 1.74 3h10a2 2 0 0 0 1.74-3Z"/><path d="M7 21h10"/></svg>
                        </div>
                        <div className="info-text">
                            <h4>ALTURA MÍNIMA</h4>
                            <p><strong>1,65m (Masc.)</strong><br/><strong>1,60m (Fem.)</strong></p>
                        </div>
                    </div>

                    
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div className="info-text">
                            <h4>CONCORRÊNCIA ALTA</h4>
                            <p><strong>+100 MIL</strong><br/><small>Candidatos no último</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="stages-section">
            <div className="container">
                <div className="stages-wrapper">
                    
                    <div className="stages-visual-cascade">
                        <img src="assets/Fotos/464222777_18425346595074757_3604659167413517835_n.jpg" alt="Treinamento Praticar" className="cascade-img img-casc-1"/>
                        <img src="assets/Fotos/499552409_18461190649074757_2972682659379787270_n.jpg" alt="Aula Praticar" className="cascade-img img-casc-2"/>
                        <img src="assets/Fotos/514588928_18468510796074757_8241474929357435814_n.jpg" alt="Estudo Praticar" className="cascade-img img-casc-3"/>
                    </div>

                    
                    <div className="stages-info">
                        
                        <div className="stats-box">
                            <p>No último concurso, dos mais de <strong>60 mil</strong> presentes nas provas objetivas, somente <strong>11 mil</strong> atingiram a pontuação mínima e foram convocados para a discursiva, que consistiu em uma redação.</p>
                        </div>

                        
                        <div className="subjects-box">
                            <span className="box-label">CANDIDATOS SÃO AVALIADOS POR DIFERENTES ETAPAS E A PRINCIPAL:</span>
                            <h3 className="main-stage-title">PROVA OBJETIVA</h3>
                            
                            <ul className="subjects-list">
                                <li>
                                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Língua Portuguesa
                                </li>
                                <li>
                                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Matemática Básica
                                </li>
                                <li>
                                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Noções de Direitos Humanos
                                </li>
                                <li>
                                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Noções de Direito Administrativo e Legislação Aplicada à PMERJ
                                </li>
                                <li>
                                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Noções de Direito Penal e Processual Penal
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="photo-marquee-section">
            <div className="marquee-wrapper">
                <div className="marquee-content">
                    <img src="assets/Fotos/583890465_18492940387074757_5208289860019613088_n.jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/629823992_18509564932074757_7278433390907907001_n.jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/658051964_18518601910074757_302879703025276712_n.jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/671235803_18524025637074757_3015869201045570705_n.jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/Ela transformou cada desafio em conquista e cada limite em superação.Entre dezenas de homens, a  (1).jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/Ela transformou cada desafio em conquista e cada limite em superação.Entre dezenas de homens, a  (2).jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/Ela transformou cada desafio em conquista e cada limite em superação.Entre dezenas de homens, a .jpg" alt="Foto Praticar"/>
                    
                    <img src="assets/Fotos/583890465_18492940387074757_5208289860019613088_n.jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/629823992_18509564932074757_7278433390907907001_n.jpg" alt="Foto Praticar"/>
                    <img src="assets/Fotos/658051964_18518601910074757_302879703025276712_n.jpg" alt="Foto Praticar"/>
                </div>
            </div>
        </section>

        
        <section className="split-layout-section unified-split" style={{"background":"#ffffff"}}>
            
            <div className="midnight-bg-overlay" style={{"backgroundImage":"url('./assets/fundo-vaga.png')"}}></div>

            <div className="container">
                <div className="split-wrapper">
                    
                    
                    <div className="split-content-left">
                        
                        
                        <div className="act-wrapper dark-zone">
                            
                            <div className="content-block">
                                <h2 className="block-title title-left">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                        <path d="M4 22h16"></path>
                                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                                    </svg>
                                    LÍDER ABSOLUTO EM APROVAÇÃO
                                </h2>
                                <p className="block-lead">Há mais de 16 anos transformando civis em Policiais Militares no Estado do Rio de Janeiro.</p>
                                <div className="stats-row-premium">
                                    <div className="stat-item-p"><span className="s-val">+15.000</span><span className="s-lab">APROVADOS</span></div>
                                    <div className="stat-divider"></div>
                                    <div className="stat-item-p"><span className="s-val">+30.000</span><span className="s-lab">ALUNOS FORMADOS</span></div>
                                </div>
                                <div className="faces-grid">
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/police_officer_avatar_1_1777926214932.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/police_officer_avatar_2_1777926230005.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/approved_student_1_1777926185091.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/approved_student_2_1777926200853.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/hero_female_officer_cammo_1777917641559.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/hero_goggles_guy_1777916752089.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/hero_gold_tech_guy_1777916824446.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/hero_tactical_man_full_1777917381998.png')"}}></div>
                                    <div className="face-circle" style={{"backgroundImage":"url('./assets/police_officer_avatar_1_1777926214932.png')","filter":"hue-rotate(45deg)"}}></div>
                                    <div className="face-circle more-count">+15k</div>
                                </div>
                            </div>

                            
                            <div className="content-block">
                                <h2 className="block-title title-left">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                        <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"></path>
                                        <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"></path>
                                    </svg>
                                    PLATAFORMA COMPLETA
                                </h2>
                                <div className="features-elite-grid">
                                    <div className="feature-elite-card"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="m8 21 4-4 4 4"/><path d="m12 17v4"/></svg><span>AULAS GRAVADAS</span></div>
                                    <div className="feature-elite-card"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"/><path d="M17 12v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5"/><circle cx="12" cy="12" r="3"/></svg><span>AULAS AO VIVO</span></div>
                                    <div className="feature-elite-card"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 2h6"/><path d="m9 12 2 2 4-4"/></svg><span>SIMULADOS E EXERCÍCIOS</span></div>
                                    <div className="feature-elite-card"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg><span>PDFS E MATERIAIS</span></div>
                                    <div className="feature-elite-card"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>PLANEJAMENTO</span></div>
                                </div>
                            </div>

                            
                            <div className="content-block">
                                <div className="bonus-header-mini">
                                    <span className="bonus-label">PACOTE DE BÔNUS 2026</span>
                                    <h2 className="block-title title-left">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 12 20 22 4 22 4 12"></polyline>
                                            <rect x="2" y="7" width="20" height="5"></rect>
                                            <line x1="12" y1="22" x2="12" y2="7"></line>
                                            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                                            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                                        </svg>
                                        PRESENTES EXCLUSIVOS
                                    </h2>
                                </div>
                                
                                <div className="bonus-premium-list">
                                    <div className="bonus-premium-card">
                                        <div className="b-icon-box">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                                <line x1="8" y1="12" x2="16" y2="12"></line>
                                            </svg>
                                        </div>
                                        <div className="b-info-box">
                                            <h3>MATEMÁTICA DO ZERO</h3>
                                            <p>Aprenda do básico ao avançado com o método focado em quem tem dificuldade.</p>
                                            <span className="b-value">VALOR: <small>R$ 497,00</small> <strong>GRÁTIS</strong></span>
                                        </div>
                                    </div>
                                    <div className="bonus-premium-card">
                                        <div className="b-icon-box">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                            </svg>
                                        </div>
                                        <div className="b-info-box">
                                            <h3>REDAÇÃO NOTA MIL</h3>
                                            <p>O segredo da estrutura perfeita para garantir a pontuação máxima na sua prova.</p>
                                            <span className="b-value">VALOR: <small>R$ 297,00</small> <strong>GRÁTIS</strong></span>
                                        </div>
                                    </div>
                                    <div className="bonus-premium-card">
                                        <div className="b-icon-box">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                            </svg>
                                        </div>
                                        <div className="b-info-box">
                                            <h3>PORTUGUÊS PARA CONCURSOS</h3>
                                            <p>A base de tudo. Domine a gramática de forma tática e sem enrolação.</p>
                                            <span className="b-value">VALOR: <small>R$ 397,00</small> <strong>GRÁTIS</strong></span>
                                        </div>
                                    </div>
                                    <div className="bonus-premium-card">
                                        <div className="b-icon-box">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        </div>
                                        <div className="b-info-box">
                                            <h3>MENTORIAS EXCLUSIVAS</h3>
                                            <p>Encontros ao vivo com quem já passou para ajustar sua rota e mentalidade.</p>
                                            <span className="b-value">VALOR: <small>R$ 997,00</small> <strong>GRÁTIS</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="content-block price-anchoring-block">
                                <div className="anchoring-card">
                                    <p className="anchoring-text">SE VOCÊ COMPRASSE CADA UM DESSES PRODUTOS SEPARADAMENTE, O CUSTO TOTAL SERIA:</p>
                                    <div className="anchoring-value">R$ 5.400,00</div>
                                    <div className="anchoring-alert">
                                        <strong>MAS CALMA!</strong>
                                        <p>Você não precisará investir esse valor para ingressar na Turma Pré-Edital.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="act-wrapper light-zone" style={{"paddingTop":"80px"}}>
                            
                            <div className="content-block">
                                <h2 className="block-title light-text">QUEM PASSOU, RECOMENDA</h2>
                                <div className="testimonials-video-grid">
                                    <div className="video-placeholder-card" style={{ backgroundImage: "url('assets/Fotos/464222777_18425346595074757_3604659167413517835_n.jpg')" }}>
                                        <div className="play-content">
                                            <div className="play-btn-new">
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                            <div className="play-text">
                                                <strong>VER DEPOIMENTO</strong>
                                                <span>(vídeo real)</span>
                                            </div>
                                        </div>
                                        <div className="testimonial-footer">
                                            <div className="t-avatar" style={{ backgroundImage: "url('assets/police_officer_avatar_1_1777926214932.png')" }}></div>
                                            <div className="t-info">
                                                <strong>Marcos Oliveira</strong>
                                                <span>Niterói • Aprovado PMERJ 2024</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="video-placeholder-card" style={{ backgroundImage: "url('assets/Fotos/499552409_18461190649074757_2972682659379787270_n.jpg')" }}>
                                        <div className="play-content">
                                            <div className="play-btn-new">
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                            <div className="play-text">
                                                <strong>VER DEPOIMENTO</strong>
                                                <span>(vídeo real)</span>
                                            </div>
                                        </div>
                                        <div className="testimonial-footer">
                                            <div className="t-avatar" style={{ backgroundImage: "url('assets/approved_student_1_1777926185091.png')" }}></div>
                                            <div className="t-info">
                                                <strong>Amanda Silva</strong>
                                                <span>Rio de Janeiro • Aprovada PMERJ 2024</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="video-placeholder-card" style={{ backgroundImage: "url('assets/Fotos/Ela transformou cada desafio em conquista e cada limite em superação.Entre dezenas de homens, a .jpg')" }}>
                                        <div className="play-content">
                                            <div className="play-btn-new">
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                            <div className="play-text">
                                                <strong>VER DEPOIMENTO</strong>
                                                <span>(vídeo real)</span>
                                            </div>
                                        </div>
                                        <div className="testimonial-footer">
                                            <div className="t-avatar" style={{ backgroundImage: "url('assets/police_officer_avatar_2_1777926230005.png')" }}></div>
                                            <div className="t-info">
                                                <strong>Ricardo Santos</strong>
                                                <span>Nova Iguaçu • Aprovado PMERJ 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="content-block">
                                <div className="guarantee-full-card light-theme">
                                    <img src="./assets/garantia-7-dias.png" alt="Garantia 7 Dias" className="g-seal-img"/>
                                    <div className="g-content">
                                        <h3>GARANTIA TOTAL RISCO ZERO</h3>
                                        <p>Testou, aprovou, ficou! Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro sem perguntas.</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="content-block">
                                <h2 className="block-title light-text">DÚVIDAS FREQUENTES</h2>
                                <div className="faq-premium-grid">
                                    {[
                                        { q: "O curso é atualizado?", a: "Sim, todas as aulas são focadas no pré-edital 2026 e atualizadas conforme novas diretrizes." },
                                        { q: "Por quanto tempo tenho acesso?", a: "Seu acesso é vitalício até o dia da prova do concurso PMERJ 2026." },
                                        { q: "Posso parcelar no boleto?", a: "O parcelamento é feito via cartão de crédito em até 12x. À vista aceitamos PIX e Boleto." }
                                    ].map((faq, idx) => (
                                        <div 
                                            key={idx} 
                                            className="faq-premium-card" 
                                            onClick={() => toggleFaq(idx)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="faq-q">
                                                <span>{faq.q}</span>
                                                <div className="faq-icon" style={{ transform: openFaq === idx ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>+</div>
                                            </div>
                                            <div 
                                                className="faq-a" 
                                                style={{ 
                                                    maxHeight: openFaq === idx ? "500px" : "0", 
                                                    overflow: "hidden", 
                                                    transition: "all 0.3s ease",
                                                    marginTop: openFaq === idx ? "15px" : "0",
                                                    paddingTop: openFaq === idx ? "15px" : "0",
                                                    borderTop: openFaq === idx ? "1px solid rgba(0,0,0,0.05)" : "none",
                                                    opacity: openFaq === idx ? 1 : 0
                                                }}
                                            >
                                                <p style={{ margin: 0 }}>{faq.a}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="split-sidebar-right">
                        <div className="sticky-checkout-card">
                            <div className="badge-discount">CUPOM PM26 ATIVADO</div>
                            
                            <div className="price-original">
                                <span>DE: R$ 2.497,00</span>
                                <p>POR APENAS:</p>
                            </div>

                            <div className="price-installment">
                                <span className="prefix">12x de</span>
                                <span className="value">R$ 101,91</span>
                                <span className="obs">*</span>
                            </div>

                            <div className="coupon-box">
                                <div className="coupon-label">USE O CUPOM: <strong>PM26</strong></div>
                                <div className="coupon-applied">
                                    <span>VAI PAGAR APENAS</span>
                                    <div className="final-price">12x de R$ 71,34<span>*</span></div>
                                </div>
                            </div>

                            <a href="https://pay.goexplosion.com/link/sdpmerj" className="cta-button-gold" style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
                                <div className="cta-icon">🔒</div>
                                <div className="cta-text">
                                    <strong>QUERO MINHA VAGA</strong>
                                    <span>GARANTA JÁ A SUA</span>
                                </div>
                            </a>

                            <div className="card-footer-info">
                                <p>VAGAS LIMITADAS! GARANTA JÁ A SUA.</p>
                                <div className="guarantee-mini">
                                    <img src="./assets/garantia-7-dias.png" alt="Selo 7 Dias" style={{"width":"40px","height":"auto"}}/>
                                    <span>7 DIAS DE GARANTIA INCONDICIONAL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className="about-us-section" style={{"background":"#f9f9f9","padding":"100px 0"}}>
            <div className="container">
                <div className="about-grid" style={{ display: 'flex', alignItems: 'flex-start', gap: '60px' }}>
                    <div className="about-left">
                        <div className="about-image-container about-slider" style={{ height: '550px', position: 'relative' }}>
                            {aboutSlides.map((img, idx) => (
                                <img 
                                    key={idx}
                                    src={img} 
                                    alt={`Policial Praticar ${idx + 1}`} 
                                    className={`about-slide-img ${currentAboutSlide === idx ? 'active' : ''}`}
                                    style={{"position": "absolute", "top": 0, "left": 0, "opacity": currentAboutSlide === idx ? 1 : 0, "zIndex": currentAboutSlide === idx ? 1 : 0}}
                                />
                            ))}
                            <div className="about-floating-card card-1" style={{"position":"absolute","bottom":"30px","left":"-30px","background":"#0A1F2F","color":"#fff","padding":"15px 20px","borderRadius":"10px","boxShadow":"0 10px 30px rgba(0,0,0,0.2)","zIndex":2,"borderLeft":"4px solid var(--gold)","display":"flex","alignItems":"center","gap":"15px"}}>
                                <div style={{"fontSize":"24px"}}>🏆</div>
                                <div>
                                    <strong style={{"display":"block","fontSize":"16px","color":"var(--gold)"}}>Líder de Mercado</strong>
                                    <span style={{"fontSize":"12px","opacity":0.8}}>+16 anos de história</span>
                                </div>
                            </div>
                            <div className="about-floating-card card-2" style={{"position":"absolute","top":"40px","right":"-30px","background":"#fff","color":"#000","padding":"15px 20px","borderRadius":"10px","boxShadow":"0 10px 30px rgba(0,0,0,0.1)","zIndex":2,"display":"flex","alignItems":"center","gap":"15px"}}>
                                <div style={{"background":"rgba(212,175,55,0.2)","color":"var(--gold)","width":"40px","height":"40px","borderRadius":"50%","display":"flex","alignItems":"center","justifyContent":"center","fontWeight":900}}>+15k</div>
                                <div>
                                    <strong style={{"display":"block","fontSize":"16px"}}>Aprovados</strong>
                                    <span style={{"fontSize":"12px","color":"#666"}}>Na PMERJ e Forças Armadas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-right about-right-force-left">
                        <img src="/assets/Logo-Praticar-Azul.png" alt="Logo Praticar" style={{ height: '158px', width: 'auto', marginBottom: '25px', display: 'block' }} />
                        <div className="about-title-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', marginBottom: '30px' }}>
                            <h2 className="block-title light-text" style={{"color":"#0A1F2F", "margin": 0, "padding": 0, "textAlign": "left", "width": "100%"}}>QUEM SOMOS E O QUE NOS MOVE</h2>
                            <h3 style={{ fontSize: '24px', color: 'var(--gold)', fontWeight: 800, margin: 0, padding: 0 }}>Transformamos esforço em aprovação.</h3>
                        </div>
                        <div className="about-text-content" style={{ color: '#0A1F2F' }}>
                            <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '25px', color: '#0A1F2F' }}>Há mais de 16 anos, o Praticar prepara futuros Policiais Militares e integrantes das Forças Armadas para conquistarem sua vaga através de um método de ensino estratégico, disciplinado e focado em resultados reais.</p>
                            
                            <ul className="about-bullets" style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0' }}>
                                <li style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'rgba(212,175,55,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', padding: '8px' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                                    </div>
                                    <span style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>Já são mais de 15 mil alunos aprovados em concursos da Polícia Militar (Soldado e Oficial) e das Forças Armadas, formando uma trajetória marcada por excelência, comprometimento e transformação de vidas.</span>
                                </li>
                                <li style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'rgba(212,175,55,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', padding: '8px' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <span style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>Nossa missão é guiar cada aluno desde o início da preparação até a conquista da aprovação, oferecendo acompanhamento, direcionamento e um método validado por milhares de aprovados.</span>
                                </li>
                                <li style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: 'rgba(212,175,55,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', padding: '8px' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                                    </div>
                                    <span style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>Se você quer acelerar sua evolução e estudar with quem realmente entende o caminho da aprovação, o Praticar está pronto para levar você ao próximo nível.</span>
                                </li>
                            </ul>
                            
                            <a href="https://pay.goexplosion.com/link/sdpmerj" className="cta-button-gold">
                                <div className="cta-text">
                                    <strong>QUERO MINHA VAGA</strong>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    
    <a href="https://wa.me/5521995530773?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20o%20curso%20PMERJ" className="whatsapp-float" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#FFF"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .012 5.403.01 12.039a11.818 11.818 0 001.592 6.011L0 24l6.117-1.605a11.806 11.806 0 005.925 1.586h.005c6.634 0 12.038-5.402 12.04-12.039a11.791 11.791 0 00-3.535-8.503"/></svg>
    </a>

    <footer className="tactical-footer" style={{ padding: 0 }}>
        <div className="footer-gold-strip"></div>
        <div className="container">
            <div className="footer-inner">
                <div className="footer-brands">
                    <img src="/assets/Logo_Praticar-Colegio-Curso.png" alt="Logo Praticar" className="footer-logo footer-logo-praticar" />
                    <div className="footer-vertical-divider"></div>
                    <img src="/assets/Logotipo-Dourado-PMERJ-2026.png" alt="Logo PMERJ" className="footer-logo footer-logo-pmerj" />
                </div>
                
                <div className="f-copy">
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.8 }}>© 2026 Praticar Ensino. Todos os Direitos Reservados. O Segredo é Praticar!</p>
                </div>
                
                <div className="f-links">
                    <div style={{"display":"flex","gap":"20px","fontSize":"12px","opacity":"0.8"}}>
                        <span style={{"cursor":"pointer","transition":"color 0.3s"}} onMouseOver={(e) => e.currentTarget.style.color='#D4AF37'} onMouseOut={(e) => e.currentTarget.style.color='inherit'}>POLÍTICA DE PRIVACIDADE</span>
                        <span style={{"cursor":"pointer","transition":"color 0.3s"}} onMouseOver={(e) => e.currentTarget.style.color='#D4AF37'} onMouseOut={(e) => e.currentTarget.style.color='inherit'}>TERMOS DE USO</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    </>
  );
}
