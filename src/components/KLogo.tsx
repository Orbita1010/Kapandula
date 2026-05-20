interface KLogoProps {
  subtitle: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function KLogo({ subtitle, size = 'md' }: KLogoProps) {
  const sizeClasses = {
    sm: {
      box: 'w-10 h-10',
      letter: 'text-lg',
      sub: 'text-[7px]'
    },
    md: {
      box: 'w-16 h-16',
      letter: 'text-3xl',
      sub: 'text-[9px]'
    },
    lg: {
      box: 'w-24 h-24',
      letter: 'text-5xl',
      sub: 'text-[11px]'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex flex-col items-center text-center select-none">
      {/* Outer elegant golden border frame with slight rotating aura */}
      <div className={`relative ${currentSize.box} rounded-xl border border-gold/45 bg-black-deep/90 flex items-center justify-center p-1 shadow-lg shadow-gold/5`}>
        {/* Decorative thin accent ring */}
        <div className="absolute inset-[2px] rounded-lg border border-gold/15" />
        
        {/* Universal golden K in noble Cinzel font */}
        <span className={`${currentSize.letter} font-display font-medium text-gold select-none tracking-normal mb-1.5`}>
          K
        </span>

        {/* Four miniature luxury stars represent the 4 brands and hotel level */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-[2px] text-gold text-[7px] animate-pulse">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>

      {/* Customizable brand label underneath (as required: only descriptive labels change, never the icon K) */}
      <span className={`mt-1.5 text-gold-light uppercase tracking-[0.2em] font-display whitespace-nowrap ${currentSize.sub}`}>
        {subtitle}
      </span>
    </div>
  );
}
