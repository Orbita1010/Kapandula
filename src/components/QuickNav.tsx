import { BRANDS } from '../data';

interface QuickNavProps {
  activeBrand: string;
  onBrandChange: (brandId: string) => void;
}

export default function QuickNav({ activeBrand, onBrandChange }: QuickNavProps) {
  return (
    <div className="sticky top-[72px] z-40 bg-black-deep/90 backdrop-blur-md border-y border-gold/15 shadow-xl">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3.5">
        {/* Horizontal container with forced scroll hides scrollbars for beautiful clean interface */}
        <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
          {/* "Ver Todos" filter chip to reset */}
          <button
            onClick={() => onBrandChange('all')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-all duration-300 border cursor-pointer whitespace-nowrap shrink-0 ${
              activeBrand === 'all'
                ? 'bg-gold text-black-deep border-gold shadow-lg shadow-gold/15 font-semibold'
                : 'bg-black-deep text-neutral-300 border-neutral-800 hover:border-gold/50 hover:text-white-warm'
            }`}
          >
            Ver Todos os Serviços
          </button>

          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onBrandChange(brand.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-all duration-300 border cursor-pointer whitespace-nowrap shrink-0 ${
                activeBrand === brand.id
                  ? 'bg-gold text-black-deep border-gold shadow-lg shadow-gold/15 font-semibold'
                  : 'bg-black-deep text-neutral-300 border-neutral-800 hover:border-gold/50 hover:text-white-warm'
              }`}
            >
              <span>{brand.symbol}</span>
              <span>{brand.name.replace('Kapandula ', '')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
