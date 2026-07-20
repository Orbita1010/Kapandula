import { ArrowLeft, Calendar, Phone, MapPin } from 'lucide-react';
import { BRANDS, SERVICES, UPCOMING_EVENTS, WHATSAPP_CONFIG } from '../data';
import type { ServiceDetailItem, TikTokVideoItem, UpcomingEventItem } from '../types';

type BrandPageId = 'hotel' | 'eventos' | 'fitness' | 'barbearia';

interface BrandPageProps {
  brandId: BrandPageId;
  onBack: () => void;
  onBook: (serviceId: string) => void;
  onSelectBrand: (brandId: BrandPageId) => void;
  whatsappConfig: typeof WHATSAPP_CONFIG;
}

const brandHighlightsById: Record<BrandPageId, string[]> = {
  hotel: [
    'Check-in VIP 24 horas e serviço de quarto premium.',
    'Restaurante gastronomia com menu internacional e sabores locais.',
    'Quartos com ar condicionado, Wi-Fi de alta velocidade e experiência relaxante.'
  ],
  eventos: [
    'Espaço flexível para casamentos, conferências e festas de gala.',
    'Equipamento audiovisual profissional e equipe de coordenação dedicada.',
    'Decoração personalizada e catering exclusivo sob medida.'
  ],
  fitness: [
    'Treinos pessoais com equipamentos de última geração.',
    'Aulas em grupo HIIT, spinning e yoga com ambiente motivador.',
    'Avaliação física e planos de treino adaptados ao seu objetivo.'
  ],
  barbearia: [
    'Cortes clássicos e modernos com atendimento masculino premium.',
    'Tratamentos de barba com toalha quente e óleo aromático.',
    'Ambiente VIP com cuidados de grooming e estética masculina.'
  ]
};

const pricingDetailsById: Record<BrandPageId, Array<{ title: string; value: string }>> = {
  hotel: [
    { title: 'Preço local', value: '25.000 Kz / Noite' },
    { title: 'Cliente estrangeiro', value: '30 USD / Noite' },
    { title: 'Check-in', value: '24 horas com serviço personalizado' }
  ],
  eventos: [
    { title: 'Pacotes', value: 'Sob orçamento personalizado' },
    { title: 'Capacidade', value: 'Até 300 convidados sentados' },
    { title: 'Suporte', value: 'Coordenação de evento completa' }
  ],
  fitness: [
    { title: 'Planos', value: 'A partir de 15.000 Kz / Mês' },
    { title: 'Aulas', value: 'Spinning, HIIT, Yoga e treino funcional' },
    { title: 'Treino VIP', value: 'Sessões privadas e avaliação corporal' }
  ],
  barbearia: [
    { title: 'Cortes', value: 'A partir de 8.000 Kz' },
    { title: 'Barba', value: 'Ritual premium com toalha quente' },
    { title: 'Spa', value: 'Tratamentos faciais e grooming masculino' }
  ]
};

export default function BrandPage({ brandId, onBack, onBook, onSelectBrand, whatsappConfig }: BrandPageProps) {
  const brand = BRANDS.find((item) => item.id === brandId);
  if (!brand) return null;

  const brandServices = SERVICES.filter((service) => service.brandId === brandId);
  const isEvents = brandId === 'eventos';
  const ticketLink = `https://wa.me/${whatsappConfig.primary.replace('+', '')}?text=${encodeURIComponent(`Olá! Tenho interesse em ${brand.name}. Gostaria de obter mais informações.`)}`;

  const heroCta = () => {
    if (brandId === 'fitness') return 'ginasio';
    return brandId;
  };

  return (
    <div className="min-h-screen bg-black-deep text-white-warm selection:bg-gold selection:text-black-deep">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-10 pb-24 sm:pb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-black-card/80 px-4 py-2.5 text-sm font-bold text-neutral-300 hover:text-gold hover:border-gold/40 transition-all w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar à página inicial
          </button>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {BRANDS.map((item) => {
              const active = item.id === brandId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectBrand(item.id as BrandPageId)}
                  className={`whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${
                    active
                      ? 'border-gold bg-gold text-black-deep'
                      : 'border-neutral-800 bg-black-card/70 text-neutral-300 hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  {item.name.replace('Kapandula ', '')}
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-neutral-800 bg-black-card mb-10 shadow-2xl">
          <div className="relative h-72 md:h-96">
            <img
              src={brand.highlightImage}
              alt={brand.name}
              className="w-full h-full object-cover brightness-[0.7]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold font-bold">
                {brand.symbol} {brand.name}
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white-warm">{brand.name}</h1>
              <p className="max-w-2xl text-neutral-300 leading-relaxed text-sm md:text-base mt-3">{brand.description}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold font-bold">
                {brand.symbol} {brand.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white-warm">{brand.name}</h1>
              <p className="max-w-2xl text-neutral-300 leading-relaxed text-sm md:text-base">{brand.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl border border-gold/20 bg-gold/10 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.25em] text-gold shadow-xl shadow-gold/10 transition-all hover:bg-gold hover:text-black-deep"
              >
                Contactar por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onBook(heroCta())}
                className="w-full rounded-2xl bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black-deep transition-all hover:bg-[#ffdf7f]"
              >
                Reservar agora
              </button>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-black-card p-6">
              <h2 className="text-lg font-bold text-white-warm mb-4">Destaques {brand.name}</h2>
              <ul className="space-y-3 text-sm text-neutral-300">
                {brandHighlightsById[brandId].map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isEvents ? (
              <div className="rounded-3xl border border-neutral-800 bg-black-card p-6">
                <h2 className="text-xl font-bold text-white-warm mb-4">Próximos eventos</h2>
                <div className="space-y-4">
                  {UPCOMING_EVENTS.map((event) => (
                    <div key={event.id} className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-white-warm text-lg">{event.title}</h3>
                          <p className="text-neutral-400 text-sm mt-1">{event.date} · {event.time} · {event.location}</p>
                        </div>
                        <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-gold font-bold">{event.status}</span>
                      </div>
                      <p className="mt-4 text-neutral-300 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-neutral-800 bg-black-card p-6">
                <h2 className="text-xl font-bold text-white-warm mb-4">Serviços {brand.name}</h2>
                <div className="grid gap-4">
                  {brandServices.map((service) => (
                    <div key={service.id} className="rounded-3xl border border-neutral-800 bg-neutral-950/60 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-white-warm text-lg">{service.title}</h3>
                          <p className="text-neutral-400 text-sm mt-1">{service.subtitle}</p>
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.35em] text-neutral-400">{service.pricingRange || 'Sob consulta'}</span>
                      </div>
                      <p className="mt-4 text-neutral-300 text-sm leading-relaxed">{service.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span key={feature} className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] text-neutral-300">{feature}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border border-neutral-800 bg-black-card p-6 shadow-2xl">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm uppercase tracking-[0.35em] text-neutral-500">Destaque</h3>
                <p className="mt-3 text-neutral-300 text-sm leading-relaxed">Conteúdo profissional para clientes estrangeiros, reservas premium e experiências sob medida no Kapandula Group.</p>
              </div>
              <div className="rounded-3xl border border-neutral-800 bg-[#090909] p-5 space-y-3">
                {pricingDetailsById[brandId].map((item) => (
                  <div key={item.title} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">{item.title}</p>
                      <p className="text-white-warm font-semibold text-lg">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Contacto rápido</p>
                    <p className="text-sm text-neutral-300">{whatsappConfig.primary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Localização</p>
                    <p className="text-sm text-neutral-300">Zango 8, Luanda</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Horário</p>
                    <p className="text-sm text-neutral-300">Todos os dias 07:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-50 flex gap-2 rounded-2xl border border-gold/20 bg-black-card/95 p-2 shadow-2xl backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-neutral-800 px-4 py-3 text-sm font-bold uppercase tracking-[0.25em] text-neutral-300"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => onBook(heroCta())}
          className="flex-1 rounded-xl bg-gold px-4 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black-deep"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
