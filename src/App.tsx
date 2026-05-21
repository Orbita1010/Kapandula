import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight, 
  Play, 
  Instagram, 
  ExternalLink, 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  CheckCircle, 
  Star,
  PartyPopper,
  ShieldAlert,
  Search,
  ChevronRight
} from 'lucide-react';
import { BRANDS, SERVICES, UPCOMING_EVENTS, TESTIMONIALS, TIKTOK_VIDEOS, WHATSAPP_CONFIG } from './data';
import type { ServiceDetailItem, UpcomingEventItem, TestimonialItem, TikTokVideoItem } from './types';
import BookingFlow from './components/BookingFlow';
import WhatsAppFloat from './components/WhatsAppFloat';
import HeroSection from './components/HeroSection';
import QuickNav from './components/QuickNav';
import KLogo from './components/KLogo';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';


export default function App() {
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('hotel');
  
  // Custom navigation category filtering state
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'hotel', 'eventos', 'conferencia', 'ginasio', 'barbearia', 'salao'
  
  // Gallery Lightbox state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeGalleryImg, setActiveGalleryImg] = useState('');
  const [galleryTitle, setGalleryTitle] = useState('');

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Success toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [events, setEvents] = useState<UpcomingEventItem[]>([]);
  const [services, setServices] = useState<ServiceDetailItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [tiktokVideos, setTiktokVideos] = useState<TikTokVideoItem[]>([]);
  const [whatsappConfig, setWhatsAppConfigState] = useState<typeof WHATSAPP_CONFIG>(WHATSAPP_CONFIG);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const ADMIN_STORAGE_KEY = 'kapandula_admin_logged_in';
  const EVENTS_KEY = 'kapandula_events';
  const SERVICES_KEY = 'kapandula_services';
  const TESTIMONIALS_KEY = 'kapandula_testimonials';
  const TIKTOK_KEY = 'kapandula_tiktok_videos';
  const WHATSAPP_KEY = 'kapandula_whatsapp_config';

  useEffect(() => {
    const loadFromStorage = <T,>(key: string, fallback: T): T => {
      try {
        const saved = window.localStorage.getItem(key);
        return saved ? (JSON.parse(saved) as T) : fallback;
      } catch {
        return fallback;
      }
    };

    setEvents(loadFromStorage(EVENTS_KEY, UPCOMING_EVENTS));
    setServices(loadFromStorage(SERVICES_KEY, SERVICES));
    setTestimonials(loadFromStorage(TESTIMONIALS_KEY, TESTIMONIALS));
    setTiktokVideos(loadFromStorage(TIKTOK_KEY, TIKTOK_VIDEOS));
    setWhatsAppConfigState(loadFromStorage(WHATSAPP_KEY, WHATSAPP_CONFIG));

    const adminFlag = window.sessionStorage.getItem(ADMIN_STORAGE_KEY) === 'true' || window.localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    setIsAdminLoggedIn(adminFlag);
  }, []);

  const saveToStorage = <T,>(key: string, data: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore storage failures
    }
  };

  const handleSaveEvents = (nextEvents: UpcomingEventItem[]) => {
    setEvents(nextEvents);
    saveToStorage(EVENTS_KEY, nextEvents);
  };

  const handleSaveServices = (nextServices: ServiceDetailItem[]) => {
    setServices(nextServices);
    saveToStorage(SERVICES_KEY, nextServices);
  };

  const handleSaveTestimonials = (nextTestimonials: TestimonialItem[]) => {
    setTestimonials(nextTestimonials);
    saveToStorage(TESTIMONIALS_KEY, nextTestimonials);
  };

  const handleSaveTikTokVideos = (nextVideos: TikTokVideoItem[]) => {
    setTiktokVideos(nextVideos);
    saveToStorage(TIKTOK_KEY, nextVideos);
  };

  const handleSaveWhatsAppConfig = (nextConfig: typeof WHATSAPP_CONFIG) => {
    setWhatsAppConfigState(nextConfig);
    saveToStorage(WHATSAPP_KEY, nextConfig);
  };

  const handleAdminAccess = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
      return;
    }
    setIsAdminModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminModalOpen(false);
    setIsAdminDashboardOpen(true);
    try {
      window.sessionStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      window.localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    triggerToast('Bem-vindo ao painel administrativo!');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
    try {
      window.sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // ignore
    }
    triggerToast('Sessão administrativa encerrada.');
  };

  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const eventsSectionRef = useRef<HTMLDivElement>(null);
  const contactsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenBooking = (serviceId: string = 'hotel') => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOpenGallery = (imgUrl: string, title: string) => {
    setActiveGalleryImg(imgUrl);
    setGalleryTitle(title);
    setIsGalleryOpen(true);
  };

  // Pre-configured gallery list of rich African/Angolan hotelier premium photos
  const premiumGallery = [
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', title: 'Fachada do Kapandula Hotel', tag: 'Hotel' },
    { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', title: 'Suíte Presidencial Deluxe 4★', tag: 'Hotel' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80', title: 'Restaurante Gourmet Almoço de Negócios', tag: 'Gastronomia' },
    { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80', title: 'Salão de Festas Casa 300 Decorado', tag: 'Eventos' },
    { url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80', title: 'Banquete de Casamento Estilo Real', tag: 'Eventos' },
    { url: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=1200&q=80', title: 'Sala de Conferências Multimédia', tag: 'Eventos' },
    { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', title: 'Área Wellness & Treino Pesado V119', tag: 'Fitness' },
    { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80', title: 'Ritual de Barba com Vaporizadores de Ozono', tag: 'Beleza' },
  ];

  // Helper function to map design categorizations from image QuickNav
  const mapNavToCategoryKey = (category: string) => {
    switch(category) {
      case 'Hotel': return 'hotel';
      case 'Eventos': return 'eventos';
      case 'Conferências': return 'conferencia';
      case 'Ginásio': return 'minas_ginasio'; // custom fitness
      case 'Barbearia': return 'barbearia';
      case 'Salão de Beleza': return 'salao';
      default: return 'all';
    }
  };

  return (
    <div className="min-h-screen bg-black-deep text-white-warm flex flex-col selection:bg-gold selection:text-black-deep bg-grain font-sans antialiased">
      {/* Toast Alert popup indicator */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[10001] bg-black-card border-2 border-gold text-white-warm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-gold shrink-0" />
          <span className="text-xs font-bold font-display uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* HEADER / NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black-deep/90 backdrop-blur-md border-b border-gold/15 transition-all duration-300">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo with exact punctuation style: KAPANDULA. */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-xl md:text-2xl font-black font-display tracking-widest text-white-warm group-hover:text-gold transition-colors">
              KAPANDULA<span className="text-[#FF4F4F]">.</span>
            </span>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-gold transition-colors text-gold font-semibold cursor-pointer"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection(eventsSectionRef)}
              className="hover:text-gold transition-colors text-neutral-300 cursor-pointer"
            >
              Eventos
            </button>
            <button 
              onClick={() => scrollToSection(servicesSectionRef)}
              className="hover:text-gold transition-colors text-neutral-300 cursor-pointer"
            >
              Serviços
            </button>
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="hover:text-gold transition-colors text-neutral-300 cursor-pointer"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection(contactsSectionRef)}
              className="hover:text-gold transition-colors text-neutral-300 cursor-pointer"
            >
              Contactos
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={handleAdminAccess}
              className="text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-gold px-4 py-2 transition-colors cursor-pointer border border-transparent"
            >
              Entrar
            </button>
            <button 
              onClick={() => handleOpenBooking('hotel')}
              className="text-xs font-bold uppercase tracking-widest text-white-warm hover:text-black-deep bg-neutral-900 hover:bg-gold px-5 py-2.5 rounded-lg border border-gold/30 hover:border-gold transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            >
              Reservar
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-gold hover:text-gold-light p-1.5 cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {isAdminDashboardOpen && (
        <AdminDashboard
          events={events}
          services={services}
          testimonials={testimonials}
          tiktokVideos={tiktokVideos}
          whatsappConfig={whatsappConfig}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={handleLogout}
          onSaveEvents={handleSaveEvents}
          onSaveServices={handleSaveServices}
          onSaveTestimonials={handleSaveTestimonials}
          onSaveVideos={handleSaveTikTokVideos}
          onSaveWhatsApp={handleSaveWhatsAppConfig}
        />
      )}

      {/* MOBILE FULLSCREEN SIDE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1001] bg-black-deep flex flex-col justify-between p-6 animate-fade-in">
          {/* Header row in mobile drawer */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold font-display tracking-widest text-white-warm">
              KAPANDULA<span className="text-[#FF4F4F]">.</span>
            </span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gold p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Big responsive center links matching luxury Angola standard */}
          <div className="flex flex-col items-center gap-6 text-lg font-bold font-display uppercase tracking-widest my-auto text-center">
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
              className="text-gold py-2 cursor-pointer"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection(eventsSectionRef)}
              className="text-neutral-300 hover:text-gold py-2 cursor-pointer"
            >
              Eventos
            </button>
            <button 
              onClick={() => scrollToSection(servicesSectionRef)}
              className="text-neutral-300 hover:text-gold py-2 cursor-pointer"
            >
              Serviços
            </button>
            <button 
              onClick={() => { setIsGalleryOpen(true); setIsMobileMenuOpen(false); }}
              className="text-neutral-300 hover:text-gold py-2 cursor-pointer"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection(contactsSectionRef)}
              className="text-neutral-300 hover:text-gold py-2 cursor-pointer"
            >
              Contactos
            </button>
            <button 
              onClick={() => { handleAdminAccess(); setIsMobileMenuOpen(false); }}
              className="text-neutral-400 hover:text-gold py-2 text-sm italic normal-case cursor-pointer"
            >
              Portal Administrativo (Entrar)
            </button>
          </div>

          {/* Large, prominent WhatsApp button footer inside navigation drawer */}
          <div className="flex flex-col gap-3 mt-auto">
            <a
              href={`https://wa.me/${whatsappConfig.primary.replace('+', '')}?text=${encodeURIComponent('Olá! Visitei o vosso website corporativo e gostaria de falar com a vossa recepção central do Zango.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white-warm py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm tracking-wider uppercase transition-all shadow-xl active:scale-95"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Oficial Angola
            </a>
            <button
              onClick={() => { handleOpenBooking('hotel'); setIsMobileMenuOpen(false); }}
              className="w-full bg-gold text-black-deep py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md text-center active:scale-95 cursor-pointer"
            >
              Fazer Reserva Online
            </button>
            <p className="text-[10px] text-neutral-500 text-center mt-2 font-display">
              CENTRALIDADE DO ZANGO 8 · LUANDA · ANGOLA
            </p>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <HeroSection 
        onOpenBooking={handleOpenBooking} 
        onScrollToServices={() => scrollToSection(servicesSectionRef)} 
      />

      {/* QUICKNAV NAVIGATION CHIPS ("OU NAVEGUE POR CATEGORIA") */}
      <QuickNav activeBrand={activeCategory} onBrandChange={setActiveCategory} />

      {/* VIP STATS BAR */}
      <section className="border-b border-gold/10 bg-black-deep/40 py-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center space-y-1 group">
            <span className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white-warm">
              4<span className="text-[#FD4F4F]">★</span>
            </span>
            <span className="text-[10px] md:text-xs font-bold font-display uppercase tracking-[0.2em] text-neutral-500 group-hover:text-gold transition-colors">
              HOTEL
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center space-y-1 group">
            <span className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white-warm">
              300<span className="text-[#FD4F4F]">+</span>
            </span>
            <span className="text-[10px] md:text-xs font-bold font-display uppercase tracking-[0.2em] text-neutral-500 group-hover:text-gold transition-colors">
              EVENTOS/ANO
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center space-y-1 group">
            <span className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white-warm">
              <span className="text-[#FD4F4F]">V</span>119
            </span>
            <span className="text-[10px] md:text-xs font-bold font-display uppercase tracking-[0.2em] text-neutral-500 group-hover:text-gold transition-colors">
              GINÁSIO
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center text-center space-y-1 group">
            <span className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white-warm">
              24<span className="text-[#FD4F4F]">h</span>
            </span>
            <span className="text-[10px] md:text-xs font-bold font-display uppercase tracking-[0.2em] text-neutral-500 group-hover:text-gold transition-colors">
              ATENDIMENTO
            </span>
          </div>

        </div>
      </section>

      {/* SERVICES DISPLAY AREA ("OS NOSSOS SERVIÇOS") */}
      <section 
        ref={servicesSectionRef}
        className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-10"
        id="servicos"
      >
        {/* Header segment */}
        <div className="flex items-end justify-between border-b border-neutral-800 pb-5">
          <div>
            <span className="text-gold text-[10px] uppercase font-display tracking-widest block mb-1">CAPACIDADES EXCLUSIVAS</span>
            <h2 className="text-xl md:text-3xl font-extrabold font-display uppercase tracking-widest text-white-warm">
              OS NOSSOS SERVIÇOS
            </h2>
          </div>
          <button 
            onClick={() => setIsGalleryOpen(true)}
            className="text-neutral-400 hover:text-gold text-xs font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer transition-colors group"
          >
            Ver todos <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-gold transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Dynamic Service Grid Cards matching photo format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CARD 1: Kapandula Hotel */}
          <div 
            onClick={() => handleOpenBooking('hotel')}
            className={`bg-zinc-950 hover:bg-zinc-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${
              activeCategory !== 'all' && activeCategory !== 'hotel' ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center text-2xl border border-neutral-800/80 mb-6 group-hover:border-gold/30 transition-all">
                🏨
              </div>
              <h3 className="text-base font-bold font-display text-white-warm group-hover:text-gold transition-colors mb-2">
                Kapandula Hotel
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Quartos e suítes de alto padrão e luxo executivo no coração do Zango 8.
              </p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-red-950/40 text-[#FD4F4F] border border-red-900/30">
                4 Estrelas
              </span>
            </div>
          </div>

          {/* CARD 2: Casa 300 */}
          <div 
            onClick={() => handleOpenBooking('eventos')}
            className={`bg-zinc-950 hover:bg-zinc-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${
              activeCategory !== 'all' && activeCategory !== 'eventos' ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center text-2xl border border-neutral-800/80 mb-6 group-hover:border-gold/30 transition-all">
                🎉
              </div>
              <h3 className="text-base font-bold font-display text-white-warm group-hover:text-gold transition-colors mb-2">
                Casa 300
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Salão nobre de casamentos e eventos corporativos de classe mundial.
              </p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-950/40 text-emerald-400 border border-emerald-900/30">
                Eventos
              </span>
            </div>
          </div>

          {/* CARD 3: Ginásio V119 */}
          <div 
            onClick={() => handleOpenBooking('ginasio')}
            className={`bg-zinc-950 hover:bg-zinc-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${
              activeCategory !== 'all' && activeCategory !== 'fitness' ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center text-2xl border border-neutral-800/80 mb-6 group-hover:border-gold/30 transition-all">
                💪
              </div>
              <h3 className="text-base font-bold font-display text-white-warm group-hover:text-gold transition-colors mb-2">
                Ginásio V119
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Equipamentos modernos, spinning de alta energia e personal trainers.
              </p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-950/40 text-amber-400 border border-amber-900/30">
                Fitness
              </span>
            </div>
          </div>

          {/* CARD 4: Barbearia */}
          <div 
            onClick={() => handleOpenBooking('barbearia')}
            className={`bg-zinc-950 hover:bg-zinc-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group ${
              activeCategory !== 'all' && activeCategory !== 'barbearia' ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center text-2xl border border-neutral-800/80 mb-6 group-hover:border-gold/30 transition-all">
                ✂️
              </div>
              <h3 className="text-base font-bold font-display text-white-warm group-hover:text-gold transition-colors mb-2">
                Barbearia
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Cortes degradê impecáveis, barba à toalha quente e estética masculina.
              </p>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-purple-950/40 text-purple-400 border border-purple-900/30">
                Beleza
              </span>
            </div>
          </div>

        </div>

        {/* Expanded Details Accordion Sub-Grid */}
        <div className="bg-zinc-950/70 border border-neutral-800 rounded-xl p-6 mt-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FD4F4F] mb-4">
            Detalhes Adicionais por Categoria Filtrada
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-400">
            <div>
              <p className="font-semibold text-white-warm mb-1">⭐ Excelência e Atendimento</p>
              <p>Os serviços Kapandula funcionam sob regulação estrita de hotelaria premium 4 estrelas. O nosso staff é formado para fornecer a melhor experiência de Luanda.</p>
            </div>
            <div>
              <p className="font-semibold text-white-warm mb-1">📍 Reservas via Web</p>
              <p>Qualquer reserva efetuada gera uma mensagem otimizada que é encaminhada de forma expedita para o nosso staff principal via WhatsApp Business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DETALHADO DE SERVIÇOS CARDS COM FOTOS E DETALHES DE PREÇOS */}
      <section className="bg-neutral-950/40 py-16 border-y border-gold/15">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#FD4F4F] text-[10px] uppercase font-display tracking-[0.25em] font-bold">CONHEÇA OS DETALHES</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display uppercase tracking-widest text-white-warm mt-1">
              Catálogo de Experiências
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Explore o menu com toda a informação relevante de alojamento, casamentos na Casa 300, saúde no V119 e estética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.filter(s => activeCategory === 'all' || s.brandId === activeCategory).map((service) => (
              <div 
                key={service.id} 
                className="bg-black-card border border-neutral-800 rounded-xl overflow-hidden flex flex-col h-full hover:border-[#FD4F4F]/30 transition-all duration-300 group"
              >
                {/* Photo frame with zoom */}
                <div className="h-48 md:h-64 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-card to-transparent pointer-events-none" />
                  
                  {/* Brand Tag of parent brand */}
                  <span className="absolute top-4 right-4 bg-black-deep/80 text-gold text-[9px] font-bold font-display uppercase tracking-widest px-3 py-1 rounded border border-gold/20">
                    {BRANDS.find(b => b.id === service.brandId)?.name.replace('Kapandula ', '') || 'Serviço'}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <span className="text-gold text-[10px] font-mono tracking-wider block mb-1">
                      {service.pricingRange || 'Sob Consulta'}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white-warm mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-2">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center text-[11px] text-neutral-300">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mr-2" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <button 
                      onClick={() => handleOpenGallery(service.imageUrl, service.title)}
                      className="text-neutral-400 hover:text-white-warm text-[11px] underline cursor-pointer"
                    >
                      Ampliar Foto
                    </button>
                    <button 
                      onClick={() => handleOpenBooking(service.brandId)}
                      className="bg-[#FD4F4F] hover:bg-[#ff6464] text-white text-[10px] font-bold font-display uppercase tracking-wider px-4 py-2 rounded transition-all cursor-pointer shadow"
                    >
                      Agendar Agora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRÓXIMOS EVENTOS SECTION */}
      <section 
        ref={eventsSectionRef}
        className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-10"
        id="eventos"
      >
        {/* Header segment */}
        <div className="flex items-end justify-between border-b border-neutral-800 pb-5">
          <div>
            <span className="text-[#FD4F4F] text-[10px] uppercase font-display tracking-widest block mb-1">AGENDA REQUISITADA</span>
            <h2 className="text-xl md:text-3xl font-extrabold font-display uppercase tracking-widest text-white-warm">
              PRÓXIMOS EVENTOS
            </h2>
          </div>
          <button 
            onClick={() => triggerToast('Mais eventos serão anunciados em breve!')}
            className="text-neutral-400 hover:text-gold text-xs font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer transition-colors group"
          >
            Ver todos <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-gold transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Vertical List stack matching precisely */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="rounded-3xl border border-neutral-800 bg-black-deep p-6 text-neutral-400">Ainda não há eventos registados.</div>
          ) : (
            events.map((event) => {
              const dateDisplay = (() => {
                const parsed = new Date(event.date + 'T00:00:00');
                if (Number.isNaN(parsed.getTime())) return { day: '??', month: '??' };
                return {
                  day: parsed.toLocaleString('pt-PT', { day: '2-digit' }),
                  month: parsed.toLocaleString('pt-PT', { month: 'short' }).toUpperCase()
                };
              })();

              const bookingService = event.location.includes('Hotel') ? 'hotel' : 'eventos';

              return (
                <div key={event.id} className="bg-zinc-950 hover:bg-zinc-900 border border-neutral-800/80 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 group">
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="text-center bg-[#FD4F4F]/10 border border-[#FD4F4F]/30 w-16 h-16 rounded-lg flex flex-col justify-center shrink-0">
                      <span className="text-2xl font-bold font-display text-[#FD4F4F] leading-none">{dateDisplay.day}</span>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mt-1">{dateDisplay.month}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white-warm group-hover:text-gold transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {event.location} · {event.description.length > 55 ? `${event.description.slice(0, 55)}...` : event.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <span className="px-3 py-1 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 text-[10px] uppercase tracking-wider font-semibold">
                      {event.status}
                    </span>
                    <button
                      onClick={() => handleOpenBooking(bookingService)}
                      className="bg-transparent hover:bg-white text-white-warm hover:text-black-deep border border-neutral-700 hover:border-white px-5 py-2 rounded text-xs font-bold font-display uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* FEEDBACK & TESTISTIMONIALS (ESTILO LUXO AFRICANO) */}
      <section className="bg-black/60 py-16 border-t border-neutral-800">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center space-y-12">
          
          <div className="max-w-xl mx-auto">
            <span className="text-gold text-[10px] uppercase font-display tracking-[0.25em] block mb-1">TESTEMUNHOS DE EXCELÊNCIA</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display uppercase tracking-widest text-white-warm">
              A OPINIÃO DOS NOSSOS CLIENTES
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Feedback real e fidedigno de empresários e residentes ilustres que frequentam os nossos espaços hoteleiros e sociais no Zango.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {testimonials.map((test) => (
              <div 
                key={test.id} 
                className="bg-black-card border border-neutral-800 p-6 rounded-xl flex flex-col justify-between space-y-4 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-gold text-xs">
                    {Array.from({ length: test.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold shrink-0" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 italic leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/60">
                  <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-bold text-xs text-gold font-display shrink-0">
                    {test.avatarText}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white-warm">{test.name}</h4>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider mt-0.5">{test.role}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SIGA-NOS NO TIKTOK SECTION */}
      <section className="border-t border-neutral-800 py-16 bg-[#050505]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
          
          {/* Header row exactly replicating styling and red dot identifier icon */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
            <div className="flex items-center gap-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FD4F4F] animate-ping" />
              <h2 className="text-sm md:text-base font-bold font-display uppercase tracking-[0.2em] text-white-warm">
                SIGA-NOS NO TIKTOK
              </h2>
            </div>
            <a 
              href="https://vt.tiktok.com/ZS9tHa4Dg/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FD4F4F] hover:text-[#ff6464] text-xs font-bold tracking-wider hover:underline"
            >
              @kapandulagroup →
            </a>
          </div>

          {/* 6 Grid items like the picture */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tiktokVideos.map((vid, index) => (
              <a 
                key={vid.id || index}
                href={vid.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#12100E] border border-neutral-800 rounded-xl overflow-hidden aspect-[9/16] block"
              >
                {/* Visual Thumbnail */}
                <img 
                  src={vid.thumbnailUrl} 
                  alt={vid.title} 
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-60 transition-opacity duration-500"
                  loading="lazy"
                />

                {/* Overlaps and Play icon */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black-deep/95 via-black-deep/50 to-transparent p-3 flex flex-col justify-end space-y-1 text-left min-h-[50%]">
                  <p className="text-[10px] text-neutral-300 leading-tight font-sans line-clamp-2">
                    {vid.title}
                  </p>
                  <p className="text-[9px] text-[#FD4F4F] font-semibold">
                    {vid.views} visualizações
                  </p>
                </div>

                {/* Big centered hover play vector */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#FD4F4F] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 pl-1">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>

                {/* Brand Logo Stamp overlay */}
                <span className="absolute top-2 left-2 bg-black-deep/80 text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded text-neutral-400">
                  K
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* DETAILED ABOUT STORY / HISTORY SECTION */}
      <section className="bg-zinc-950/60 py-16 border-t border-neutral-800">
        <div className="max-w-[760px] mx-auto px-6 text-center space-y-6">
          <span className="text-gold text-[10px] font-bold font-display uppercase tracking-widest">SOBRE O GRUPO</span>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white-warm uppercase">
            COMPROMISSO COM O SUPREMO PADRÃO ANGOLANO
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
            "O Kapandula Group nasceu com uma missão simples: trazer qualidade, sofisticação e excelência de serviço ao coração da Centralidade do Zango. Somos um grupo angolano que acredita que Luanda merece o melhor — e é isso que entregamos todos os dias, em cada detalhe, em cada sorriso, em cada serviço. Do hotel 4 estrelas ao salão de beleza, do ginásio moderno às festas inesquecíveis — o Kapandula Group é o seu lar de excelência em Luanda."
          </p>
          <div className="pt-4 flex flex-col items-center">
            <KLogo subtitle="Administração" size="md" />
          </div>
        </div>
      </section>

      {/* LOCATION & CONTACT SECTION FOOTER BAR */}
      <section 
        ref={contactsSectionRef}
        className="bg-black-card border-t border-gold/15 py-10"
        id="location-footer"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Left Column Address & Core details */}
          <div className="space-y-3">
            <h3 className="text-white-warm text-base md:text-lg font-bold font-display tracking-wide">
              Centralidade do Zango 8, Quarteirão V · Luanda, Angola
            </h3>
            <p className="text-xs text-neutral-400 leading-loose">
              <span className="text-gold">📞 Telefone:</span> +244 958 718 004 · +244 950 515 134 <br className="hidden sm:inline" />
              <span className="text-gold">⏰ Atendimento:</span> Aberto todos os dias da semana (Serviço de Quarto do hotel disponível 24 Horas)
            </p>
          </div>

          {/* Right Column Interactive Action Buttons strictly matching visual layout */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <a
              href={`https://wa.me/${whatsappConfig.primary.replace('+', '')}?text=${encodeURIComponent('Olá! Gostaria de falar com o suporte geral do Kapandula Group Luanda.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-white-warm rounded-lg text-xs font-bold font-display uppercase tracking-widest text-center border border-neutral-700 hover:border-gold transition-all duration-300 cursor-pointer"
            >
              WhatsApp
            </a>
            
            <a 
              href="https://maps.google.com/?q=Zango+8+Luanda+Angola"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white-warm rounded-lg text-xs font-bold font-display uppercase tracking-widest text-center border border-neutral-700 hover:border-gold transition-all duration-300"
            >
              Como Chegar
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER COPYRIGHT BAR */}
      <footer className="bg-black-deep border-t border-neutral-800 py-8">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          
          {/* Logo Name */}
          <div className="flex items-center gap-1.5">
            <KLogo subtitle="Kapandula" size="sm" />
          </div>

          {/* Copyright description */}
          <div className="text-center font-display">
            © 2026 Kapandula Group · Todos os direitos reservados
          </div>

          {/* Local Angolan reference */}
          <div className="flex items-center gap-1 hover:text-white-warm transition-colors font-semibold">
            <span>Feito com orgulho em Angola 🇦🇴</span>
          </div>

        </div>
      </footer>

      {/* GALLERY LIGHTBOX MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[10001] bg-black-deep/95 backdrop-blur-md flex flex-col justify-between p-4">
          
          {/* Close command */}
          <div className="flex items-center justify-between p-4">
            <span className="text-gold uppercase tracking-widest font-display text-xs">Coleção & Portfolio Kapandula</span>
            <button 
              onClick={() => setIsGalleryOpen(false)}
              className="text-neutral-400 hover:text-gold p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Active central image */}
          <div className="max-w-4xl mx-auto my-auto p-2">
            {activeGalleryImg ? (
              <div className="space-y-3">
                <img 
                  src={activeGalleryImg} 
                  alt={galleryTitle} 
                  className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain mx-auto border border-gold/20"
                />
                <h4 className="text-center font-bold text-sm text-white-warm font-display">{galleryTitle}</h4>
              </div>
            ) : (
              // If none clicked yet, show initial slider overview grid
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto overflow-y-auto max-h-[75vh] p-4">
                {premiumGallery.map((p, index) => (
                  <div 
                    key={index}
                    onClick={() => { setActiveGalleryImg(p.url); setGalleryTitle(p.title); }}
                    className="group cursor-pointer bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-gold/40 transition-all text-left"
                  >
                    <div className="h-32 overflow-hidden">
                      <img src={p.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3">
                      <span className="text-gold text-[8px] font-mono uppercase tracking-widest block">{p.tag}</span>
                      <h5 className="font-bold text-[11px] text-white-warm tracking-tight mt-1 line-clamp-1">{p.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="text-center p-4">
            {activeGalleryImg && (
              <button 
                onClick={() => { setActiveGalleryImg(''); setGalleryTitle(''); }}
                className="text-gold hover:text-white-warm text-xs underline font-display cursor-pointer"
              >
                ← Voltar para Todos os Registos
              </button>
            )}
          </div>

        </div>
      )}

      {/* WHATSAPP FLOATING BADGE */}
      <WhatsAppFloat />

      {/* FULL IN-FLOW BOOKING MODAL */}
      <BookingFlow 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialService={selectedServiceId}
      />
    </div>
  );
}
