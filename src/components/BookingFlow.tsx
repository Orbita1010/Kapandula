import React, { useEffect, useState } from 'react';
import { X, Check, Calendar, Users, Phone, User, MessageSquare, ArrowRight, ArrowLeft, Building2, Coffee, CalendarDays, Briefcase, Dumbbell, Scissors, Sparkles } from 'lucide-react';
import { BookingFormState, ServiceDetailItem } from '../types';
import { WHATSAPP_CONFIG } from '../data';

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingFlow({ isOpen, onClose, initialService = 'hotel' }: BookingFlowProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormState>({
    serviceType: initialService,
    fullName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    participants: 1,
    message: ''
  });
  const [phoneError, setPhoneError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setPhoneError('');
    setFormData({
      serviceType: initialService === 'fitness' ? 'ginasio' : initialService,
      fullName: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      participants: 1,
      message: ''
    });
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, serviceType: serviceId }));
    setStep(2);
  };

  const validatePhone = (num: string): boolean => {
    // Basic validation of Angola phone number (+244 or just 9 digits starting with 9, 2, etc.)
    const cleanNum = num.replace(/\D/g, '');
    if (cleanNum.length === 0) {
      setPhoneError('Por favor insira o seu contacto telefónico.');
      return false;
    }
    // Angola standard mobile numbers usually have 9 digits. If containing country code 244, they are 12 digits.
    if (cleanNum.length !== 9 && cleanNum.length !== 12) {
      setPhoneError('Insira um número angolano válido (geralmente com 9 dígitos).');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleNextStep = () => {
    if (step === 2) {
      if (!formData.fullName.trim()) {
        alert('Por favor, indique o seu nome completo.');
        return;
      }
      if (!validatePhone(formData.phone)) {
        return;
      }
      setStep(3);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, phone: val }));
    if (phoneError) setPhoneError('');
  };

  const getServiceLabel = (id: string) => {
    const labels: Record<string, string> = {
      hotel: 'Kapandula Hotel — Hospedagem 4★',
      gastronomia: 'Kapandula Hotel — Almoço / Jantar',
      eventos: 'Casa 300 — Salão de Festas & Banquetes',
      conferencia: 'Casa 300 — Sala de Conferências',
      fitness: 'Ginásio V119 — Plano de Treino',
      ginasio: 'Ginásio V119 — Plano de Treino',
      barbearia: 'Kapandula Barbearia — Corte & Estilo',
      salao: 'Kapandula Beleza — Tratamento Estético'
    };
    return labels[id] || id;
  };

  // Generates the customized preloaded text message to launch on Whatsapp
  const buildWhatsAppLink = () => {
    const serviceLabel = getServiceLabel(formData.serviceType);
    const dateFormatted = formData.date.split('-').reverse().join('/');
    const messagePart = formData.message ? `\n*Mensagem:* ${formData.message}` : '';
    const textStr = `Olá! Gostaria de fazer uma reserva no *Kapandula Group*.\n\n` + 
      `*Serviço:* ${serviceLabel}\n` +
      `*Nome:* ${formData.fullName}\n` +
      `*Telefone:* ${formData.phone}\n` +
      `*Data Pretendida:* ${dateFormatted}\n` +
      `*Nº de Participantes:* ${formData.participants}` + 
      messagePart;
    
    const plainPhone = WHATSAPP_CONFIG.primary.replace('+', '');
    return `https://wa.me/${plainPhone}?text=${encodeURIComponent(textStr)}`;
  };

  const servicesList = [
    { id: 'hotel', name: 'Hotelaria - Quarto Deluxe 4★', icon: Building2, desc: 'Conforto e sofisticação no Zango' },
    { id: 'gastronomia', name: 'Restaurante & Lounge Gourmet', icon: Coffee, desc: 'Pratos tradicionais refinados e cocktails' },
    { id: 'eventos', name: 'Casa 300 — Salão de Festas', icon: CalendarDays, desc: 'O seu casamento ou banquete de sonho' },
    { id: 'conferencia', name: 'Casa 300 — Sala de Conferência', icon: Briefcase, desc: 'Infraestrutura audiovisual de alto nível' },
    { id: 'ginasio', name: 'Ginásio V119 — Treino', icon: Dumbbell, desc: 'Planos mensais e acompanhamento personalizado' },
    { id: 'barbearia', name: 'Barbearia — Marcação Mensal', icon: Scissors, desc: 'Corte degradê e rituais com toalha quente' },
    { id: 'salao', name: 'Salão de Beleza & Estética', icon: Sparkles, desc: 'Tratamentos dermocosméticos avançados' }
  ];

  const SelectedServiceIcon = servicesList.find(s => s.id === formData.serviceType)?.icon || Sparkles;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black-deep/95 backdrop-blur-md">
      {/* Modal Container */}
      <div 
        className="relative bg-black-card border-2 border-gold/35 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-grain flex flex-col max-h-[90vh]"
        id="booking_flow_modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-flow-title"
      >
        {/* Golden top progress indicator bar */}
        <div className="h-1.5 w-full bg-neutral-800 relative">
          <div 
            className="absolute top-0 left-0 h-full gold-shimmer-bg transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gold/15">
          <div>
            <span className="text-gold text-[10px] uppercase tracking-widest font-display block mb-1">Passo {step} de 3</span>
            <h3 id="booking-flow-title" className="text-white-warm text-lg font-bold font-display tracking-wide">
              {step === 1 && 'Selecione o Serviço Desejado'}
              {step === 2 && 'Detalhes do Seu Agendamento'}
              {step === 3 && 'Tudo pronto para Enviar!'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body & Step Swapper */}
        <div className="p-6 overflow-y-auto flex-1 text-sm">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-neutral-300 text-xs mb-4">
                Selecione qual das prestigiadas marcas do Kapandula Group quer reservar ou contactar. A confirmação é direta e gratuita.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {servicesList.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleServiceSelect(srv.id)}
                    className={`flex items-start p-3 w-full rounded-xl border transition-all text-left group cursor-pointer ${
                      formData.serviceType === srv.id
                        ? 'bg-gold/15 border-gold shadow-lg'
                        : 'bg-neutral-900/60 border-neutral-700/50 hover:border-gold/50 hover:bg-neutral-800/40'
                    }`}
                  >
                    <span className="text-neutral-300 mr-3 bg-black-deep/60 w-10 h-10 rounded-lg flex items-center justify-center border border-gold/10 group-hover:border-gold/30">
                      <srv.icon className="w-5 h-5 text-gold" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white-warm text-sm group-hover:text-gold transition-colors truncate">
                          {srv.name}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-gold opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-neutral-400 text-xs mt-0.5 line-clamp-1">
                        {srv.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: FILL INFORMATION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-neutral-900/80 rounded-xl border border-gold/15 flex items-center mb-1">
                <span className="text-xl mr-3">
                  <SelectedServiceIcon className="w-6 h-6 text-gold" />
                </span>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase tracking-widest block font-medium">Serviço Selecionado:</span>
                  <span className="text-gold font-bold text-sm">
                    {servicesList.find(s => s.id === formData.serviceType)?.name}
                  </span>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="ml-auto text-neutral-400 hover:text-gold text-xs underline cursor-pointer"
                >
                  Alterar
                </button>
              </div>

              {/* Input Name */}
              <div>
                <label className="block text-xs text-neutral-300 font-semibold mb-1">Nome Completo *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                    <User className="w-4 h-4 text-gold/65" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Manuel Francisco do Nascimento"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg py-2.5 pl-10 pr-4 text-white-warm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all placeholder:text-neutral-600 text-sm"
                  />
                </div>
              </div>

              {/* Input Phone */}
              <div>
                <label className="block text-xs text-neutral-300 font-semibold mb-1">Contacto de WhatsApp (Angola) *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500 text-xs font-bold font-display text-gold/70">
                    +244
                  </span>
                  <input
                    type="tel"
                    placeholder="Ex: 958 718 004"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg py-2.5 pl-14 pr-4 text-white-warm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all placeholder:text-neutral-600 text-sm"
                  />
                </div>
                {phoneError ? (
                  <p className="text-red-400 text-xs mt-1 font-medium">{phoneError}</p>
                ) : (
                  <p className="text-neutral-500 text-[11px] mt-1">Insira os 9 dígitos do seu número móvel Unitel, Movicel ou Africell.</p>
                )}
              </div>

              {/* Input Date & Participants Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-300 font-semibold mb-1">Data Pretendida *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                      <Calendar className="w-4 h-4 text-gold/65" />
                    </span>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg py-2.5 pl-10 pr-3 text-white-warm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-semibold mb-1">Nº de Pessoas</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                      <Users className="w-4 h-4 text-gold/65" />
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={formData.participants}
                      onChange={(e) => setFormData(prev => ({ ...prev, participants: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg py-2.5 pl-10 pr-3 text-white-warm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-neutral-300 font-semibold mb-1">Observações ou Pedidos Especiais</label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-neutral-500">
                    <MessageSquare className="w-4 h-4 text-gold/65" />
                  </span>
                  <textarea
                    rows={3}
                    placeholder="Diga-nos os pormenores (ex: quarto com vista, evento corporativo, corte específico de barba, etc.)"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-neutral-900 border border-neutral-700/80 rounded-lg py-2.5 pl-10 pr-4 text-white-warm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all placeholder:text-neutral-600 text-sm resize-none"
                    maxLength={300}
                  />
                </div>
                <div className="text-right text-neutral-500 text-[10px] mt-0.5">
                  {formData.message.length} / 300 caracteres
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUMMARY & SUBMIT */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-3 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-500 mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white-warm text-base font-display">Tudo Preparado para envio!</h4>
                <p className="text-neutral-400 text-xs mt-1">
                  Ao clicar no botão abaixo, irá abrir o chat oficial do Kapandula Group no seu WhatsApp com a mensagem pré-formatada com as informações da sua reserva.
                </p>
              </div>

              {/* Summary Details Block */}
              <div className="bg-neutral-900/90 rounded-xl border border-gold/20 p-4 divide-y divide-neutral-800">
                <div className="pb-2.5 flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Serviço:</span>
                  <span className="text-gold font-bold">{getServiceLabel(formData.serviceType)}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Nome:</span>
                  <span className="text-white-warm font-semibold">{formData.fullName}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Contato:</span>
                  <span className="text-white-warm font-semibold">{formData.phone}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Data pretendida:</span>
                  <span className="text-white-warm font-semibold">{formData.date.split('-').reverse().join('/')}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Nº de Pessoas:</span>
                  <span className="text-white-warm font-semibold">{formData.participants} pessoas</span>
                </div>
                {formData.message && (
                  <div className="pt-2.5 text-xs">
                    <span className="text-neutral-400 font-medium block mb-1">Nota Adicional:</span>
                    <p className="text-neutral-300 italic bg-black-deep/40 p-2 rounded border border-neutral-800 line-clamp-2">
                      "{formData.message}"
                    </p>
                  </div>
                )}
              </div>

              {/* VIP Response Guarantee Card */}
              <div className="p-3 bg-gold/5 rounded-lg border border-gold/15 text-center text-[11px] text-neutral-300 text-center">
                🇦🇴 <span className="text-gold font-bold">Garantia Kapandula:</span> Entraremos em contacto de volta para confirmar o agendamento em até <span className="text-white-warm font-bold">2 horas</span>.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-gold/15 flex items-center justify-between bg-neutral-950/40">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="flex items-center text-neutral-400 hover:text-gold text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </button>
            )}
          </div>

          <div>
            {step === 1 && (
              <span className="text-[11px] text-neutral-400 italic">
                Selecione acima para prosseguir
              </span>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-gold hover:bg-gold-light text-black-deep px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center transition-all cursor-pointer shadow-lg shadow-gold/10"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            )}

            {step === 3 && (
              <div className="flex gap-2">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white-warm px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center transition-all cursor-pointer shadow-xl shadow-emerald-900/10"
                >
                  Confirmar via WhatsApp  
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
