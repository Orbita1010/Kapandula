import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowDown } from 'lucide-react';
import { BRANDS } from '../data';

interface HeroSectionProps {
  onOpenBooking: (brandId?: string) => void;
  onScrollToServices: () => void;
}

export default function HeroSection({ onOpenBooking, onScrollToServices }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Auto-play slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BRANDS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + BRANDS.length) % BRANDS.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % BRANDS.length);
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-black-deep flex items-center justify-center text-center select-none"
      id="hero_slider"
    >
      {/* Background Images with soft cross-fade animation */}
      {BRANDS.map((brand, idx) => (
        <div
          key={brand.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 1s ease-in-out' }}
        >
          {/* Imagem principal comprimida para webP de alta velocidade */}
          <img
            src={brand.highlightImage}
            alt={brand.name}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Luxury Golden base overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/60 to-black-deep/45 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black-deep to-transparent pointer-events-none" />

      {/* Decorative luxury vector lines (top & bottom border borders matching luxury guidelines) */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-4/5 max-w-lg border-t border-gold/15 py-1 text-center select-none">
        <span className="text-[10px] uppercase tracking-widest text-gold-light/80 font-display">
          Luanda · Centralidade do Zango 8
        </span>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto flex flex-col items-center">
        {/* Universal Brand Indicator Badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-black-deep/80 border border-gold/30 rounded-full scale-95 md:scale-100">
          <span className="text-gold font-bold text-xs">★</span>
          <span className="text-gold-light text-[10px] uppercase tracking-widest font-display font-medium">CONGLOMERADO PREMIUM ANGOLANO</span>
          <span className="text-gold font-bold text-xs">★</span>
        </div>

        {/* Dynamic header transition indicating each brand identity */}
        <h2 className="text-gold font-display text-sm md:text-base font-bold tracking-[0.25em] uppercase h-6 transition-all duration-500 mb-2">
          {BRANDS[currentSlide].name}
        </h2>

        {/* Main luxury company logo */}
        <h1 className="text-4xl md:text-7xl font-bold font-display tracking-tight text-white-warm drop-shadow-lg mb-4">
          Kapandula <span className="text-gold bg-clip-text">Group</span>
        </h1>

        {/* Elegant typography tagline */}
        <p className="font-serif italic text-lg md:text-2xl text-neutral-200/90 tracking-wide max-w-2xl mb-8 leading-relaxed">
          "{BRANDS[currentSlide].tagline}"
        </p>

        {/* Buttons matching design token guideline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Action */}
          <button
            onClick={() => onOpenBooking(BRANDS[currentSlide].id)}
            className="px-8 py-3.5 bg-gold hover:bg-gold-light text-black-deep rounded-lg font-bold font-display uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 group w-full sm:w-60 transition-all shadow-lg hover:shadow-gold/20 duration-300 transform active:scale-95 cursor-pointer border border-transparent"
          >
            <Calendar className="w-4 h-4 text-black-deep group-hover:scale-110 transition-transform" />
            Fazer Reserva
          </button>

          {/* Secondary Action */}
          <button
            onClick={onScrollToServices}
            className="px-8 py-3.5 bg-black-deep/80 hover:bg-neutral-900 text-white-warm rounded-lg font-bold font-display uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 w-full sm:w-60 transition-all border border-gold/30 hover:border-gold duration-300 transform active:scale-95 cursor-pointer"
          >
            Conhecer Serviços
            <ArrowDown className="w-4 h-4 text-gold animate-bounce" />
          </button>
        </div>
      </div>

      {/* Slide Navigator Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-gold transition-colors cursor-pointer bg-black-deep/45 hover:bg-black-deep p-2.5 rounded-full border border-gold/10 hover:border-gold/30"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-gold transition-colors cursor-pointer bg-black-deep/45 hover:bg-black-deep p-2.5 rounded-full border border-gold/10 hover:border-gold/30"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots/Indicators representing standard high end flow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {BRANDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3.5 h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide ? 'bg-gold w-8' : 'bg-neutral-600 hover:bg-gold/50'
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
