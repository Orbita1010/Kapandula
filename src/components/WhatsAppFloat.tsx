import { Phone } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data';

export default function WhatsAppFloat() {
  const handleClick = () => {
    window.open(WHATSAPP_CONFIG.buildUrl('geral'), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end group">
      {/* Expanded Tooltip (visible on desktop hover) */}
      <div className="mb-2 hidden md:flex flex-col items-center bg-black-card border border-gold/40 px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 text-center">
        <p className="text-white-warm text-xs font-semibold tracking-wide">Fale connosco agora</p>
        <small className="text-gold text-[10px] tracking-tight">Resposta em minutos · Luanda</small>
      </div>

      {/* Primary Floating Button */}
      <button
        onClick={handleClick}
        className="relative bg-emerald-600 hover:bg-emerald-500 text-white-warm w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pr-0.5 hover:scale-110 active:scale-95 cursor-pointer pulse-ring-gold"
        aria-label="Contactar via WhatsApp"
        id="whatsapp_floating_trigger"
      >
        {/* Lucide Phone Icon representing message connection */}
        <Phone className="w-6 h-6 animate-pulse" />
        
        {/* Glowing border ring decoration */}
        <span className="absolute inset-0 rounded-full border border-emerald-400 opacity-60 animate-ping pointer-events-none" />
        
        {/* Pulsing indicator dot */}
        <span className="absolute top-0 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-600 block shadow" />
      </button>
    </div>
  );
}
