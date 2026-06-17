import { useState } from 'react';
import { WHATSAPP_CONFIG } from '../data';

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.open(WHATSAPP_CONFIG.buildUrl('geral'), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`mb-3 flex flex-col items-start bg-neutral-900 border border-emerald-700/40 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 pointer-events-none min-w-[180px] ${
          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse block" />
          <p className="text-white text-xs font-semibold tracking-wide">Online agora</p>
        </div>
        <p className="text-neutral-400 text-[11px] leading-snug">Fale com a nossa equipa.<br/>Respondemos em minutos.</p>
        <span className="mt-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">WhatsApp · Luanda</span>
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Contactar via WhatsApp"
        id="whatsapp_floating_trigger"
      >
        {/* WhatsApp SVG logo */}
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.002 3C9.374 3 4 8.373 4 15c0 2.385.68 4.61 1.856 6.497L4 29l7.742-1.82A11.94 11.94 0 0 0 16.002 28C22.628 28 28 22.627 28 16S22.628 3 16.002 3zm0 2.1A10.9 10.9 0 0 1 25.9 16c0 6.01-4.89 10.9-10.898 10.9a10.87 10.87 0 0 1-5.54-1.515l-.397-.237-4.1.964.985-3.974-.261-.41A10.865 10.865 0 0 1 5.1 16c0-6.01 4.892-10.9 10.902-10.9zm-3.408 5.49c-.22-.001-.464.005-.693.258-.232.255-.884.863-.884 2.106 0 1.244.903 2.445 1.028 2.614.126.169 1.747 2.77 4.3 3.775 2.13.84 2.563.673 3.025.631.462-.041 1.49-.609 1.701-1.197.21-.588.21-1.092.147-1.197-.062-.104-.23-.166-.483-.29-.253-.125-1.495-.737-1.726-.822-.232-.084-.4-.126-.567.125-.168.253-.65.822-.796.99-.146.169-.294.19-.546.064-.253-.126-1.067-.393-2.033-1.254-.752-.67-1.259-1.496-1.406-1.749-.147-.253-.016-.39.11-.515.114-.113.253-.294.38-.44.123-.148.164-.253.246-.422.084-.169.042-.316-.02-.44-.063-.125-.56-1.37-.77-1.876-.197-.49-.4-.422-.546-.43a9.9 9.9 0 0 0-.467-.01z"/>
        </svg>

        {/* Subtle pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* Online indicator dot */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-300 rounded-full border-2 border-[#25D366] shadow-sm block" />
      </button>
    </div>
  );
}
