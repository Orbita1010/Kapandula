import { BrandInfo, ServiceDetailItem, UpcomingEventItem, TestimonialItem, TikTokVideoItem } from './types';

export const BRANDS: BrandInfo[] = [
  {
    id: 'hotel',
    name: 'Kapandula Hotel',
    tagline: 'Conforto a 4 estrelas, no coração de Luanda',
    description: 'Um novo conceito de sofisticação hoteleira no Zango 8. Oferecemos quartos de alto padrão, executive lounges, salas de reuniões equipadas e uma gastronomia de fusão internacional e africana irresistível.',
    symbol: '🏨',
    stars: 4,
    highlightImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'eventos',
    name: 'Casa 300',
    tagline: 'O seu momento especial merece o melhor espaço',
    description: 'O salão de festas e eventos premium do Zango 8. Ideal para casamentos luxuosos, banquetes de gala, seminários corporativos e aniversários intimistas com equipamentos multimédia topo de gama.',
    symbol: '🎉',
    highlightImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'fitness',
    name: 'Ginásio V119',
    tagline: 'O seu corpo, a nossa missão de saúde',
    description: 'O mais bem equipado espaço fitness da região de Luanda. Treine com pesos de alta performance, zona de cardio de última geração, aulas de grupo guiadas e acompanhamento personalizado com treinadores certificados.',
    symbol: '💪',
    highlightImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'barbearia',
    name: 'Kapandula Barbearia',
    tagline: 'Visual impecável para o homem angolano moderno',
    description: 'Uma barbearia premium e spa masculino no Zango 8. Técnicas modernas de corte de cabelo, rituais tradicionais de barba com toalha quente, manicure e tratamentos capilares sob medida.',
    symbol: '✂️',
    highlightImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80'
  }
];

export const SERVICES: ServiceDetailItem[] = [
  // Hotel services
  {
    id: 'hospedagem',
    brandId: 'hotel',
    title: 'Suítes Deluxe & Quartos Clássicos',
    subtitle: 'Acomodação premium 4 estrelas no Zango 8',
    description: 'Quartos projetados com refinamento e conforto acústico. Camas king-size ortopédicas de qualidade superior, secretária de trabalho, ar-condicionado silencioso, frigobar abastecido com bebidas locais e importadas, casa de banho privativa com duche de massagem e Wi-Fi de alta velocidade ultra-veloz.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    features: ['Pequeno-almoço executivo incluído', 'Apoio de Quarto 24 Horas', 'Ar condicionado inteligente', 'Cofre eletrónico digital', 'Televisão por satélite Unitel/DSTV'],
    pricingRange: 'Desde 45.000 Kz / Noite'
  },
  {
    id: 'gastronomia',
    brandId: 'hotel',
    title: 'Restaurante & Lounge Gourmet',
    subtitle: 'Fusão de sabores angolanos e alta gastronomia internacional',
    description: 'A nossa cozinha funde com mestria ingredientes locais autênticos angolanos como o funge de carne de sol requintado, com a culinária contemporânea mundial. Desfrute ainda de um bar elegante com cocktails artesanais e carta de vinhos selecionados.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    features: ['Chef executivo de renome', 'Cocktails artesanais de assinatura', 'Espaço climatizado e esplanada exterior', 'Eventos de música ao vivo às sextas-feiras', 'Menu executivo para almoço de negócios'],
    pricingRange: 'Funge Gourmet no Sábado / Jantares à Carta'
  },
  
  // Casa 300 services
  {
    id: 'eventos-sociais',
    brandId: 'eventos',
    title: 'Casamentos & Banquetes de Sonho',
    subtitle: 'O maior e mais luxuoso espaço de festas do Zango',
    description: 'A Casa 300 destaca-se pela sua arquitetura imponente com teto decorado com luzes de fada e candeeiros de cristal, ideal para transformar o seu casamento num evento memorável. Serviço especializado de decoração em tons pastel e dourado, organização de buffet e coordenadores no local.',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    features: ['Capacidade até 300 convidados sentados', 'Estacionamento privativo vigiado', 'Palco ajustável com sonorização JBL', 'Catering exclusivo sob orientação', 'Serviço de buffet internacional com toques angolanos'],
    pricingRange: 'Menus Personalizados por Casamento'
  },
  {
    id: 'conferencias',
    brandId: 'eventos',
    title: 'Reuniões Corporativas & Conferências',
    subtitle: 'Infraestrutura completa para eventos de negócios',
    description: 'Nossa sala secundária adaptável e o salão principal oferecem excelente acústica e equipamentos audiovisuais avançados, incluindo projetores laser, microfones sem fios e rede Wi-Fi dedicada de alta performance corporativa.',
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=800&q=80',
    features: ['Infraestrutura audiovisual topo de gama', 'Serviço de Coffee Break executivo', 'Púlpito de discursos profissional', 'Climatização independente', 'Suporte técnico em tempo real'],
    pricingRange: 'Orçamento com base nos participantes'
  },

  // Fitness services
  {
    id: 'treino-musculacao',
    brandId: 'fitness',
    title: 'Musculação & Equipamento Bio-Mecânico',
    subtitle: 'Tecnologia de ponta para otimização de performance física',
    description: 'Equipamentos mecânicos de topo selecionados para treino de força, alta durabilidade e perfeita ergonomia. Área de pesos livres até 50kg, máquinas isoladas e polias reguláveis de última linha para todas as faixas e metas.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    features: ['Equipamentos profissionais certificados', 'Zona de pesos livres ampla', 'Treinadores presentes na sala', 'Balneários individuais de luxo climatizados', 'Avaliação de bioimpedância gratuita trimestral'],
    pricingRange: 'Planos a partir de 25.000 Kz / Mês'
  },
  {
    id: 'aulas-wellness',
    brandId: 'fitness',
    title: 'Lounge V119 - Spinning e Cardio',
    subtitle: 'Aulas em grupo cheias de energia angolana',
    description: 'Melhore a sua saúde cardiovascular nas nossas salas com som surround e instrutores de topo que criam percursos intensos e estimulantes que estimulam o foco mental e reduzem o estresse.',
    imageUrl: 'https://images.unsplash.com/photo-1518610011536-d62e666fcfbf?auto=format&fit=crop&w=800&q=80',
    features: ['Som dinâmico com DJs locais convidados', 'Ar condicionado dedicado de alta filtragem', 'Horários flexíveis diários', 'Sessões de alta intensidade HIIT', 'Hidratação e sumos naturais à discrição no bar'],
    pricingRange: 'Acesso VIP V119 Incluído'
  },

  // Barbearia & Esthetics
  {
    id: 'corte-barba',
    brandId: 'barbearia',
    title: 'Grooming Clássico & Terapia de Barba',
    subtitle: 'Cortes desenhados por mestres barbeiros',
    description: 'O ritual masculino por excelência no Zango. Desde o elegante corte degradê americano ao desenho de barba com navalha tradicional, combinado com exfoliante facial e finalização com bálsamos perfumados e óleo especial de sândalo.',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    features: ['Lounge exclusivo com bar e TVDSTV', 'Toalha quente com vapor de ozono relaxante', 'Cerveja gelada ou café de oferta no serviço', 'Barbeiros premiados de Luanda', 'Espaço ultra-higiénico premium'],
    pricingRange: 'Cortes com requinte sob marcação'
  },
  {
    id: 'estetica-facial',
    brandId: 'barbearia',
    title: 'Spa Facial & Tratamentos Estéticos',
    subtitle: 'Limpeza profunda e hidratação dermocosmética',
    description: 'Tratamentos estéticos revigorantes focados no homem moderno e público misto. Limpeza de pele com extração ultrassónica, peelings leves, massagem facial relaxante contra olheiras e hidratação com extratos orgânicos preciosos de plantas africanas.',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    features: ['Produtos de alta gama internacional', 'Cabines climatizadas reservadas', 'Drenagem linfática localizada', 'Máscaras de colagénio rejuvenescedoras', 'Profissionais titulados de estética facial'],
    pricingRange: 'Renove o seu bem-estar diário'
  }
];

export const UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    id: 'dinner-jazz',
    title: 'Noite de Fado & Jazz Angolano',
    date: '2026-05-29',
    time: '20:30',
    location: 'Kapandula Hotel',
    description: 'Uma noite sofisticada unindo o fado português nostálgico e o calor do jazz angolano clássico. Menu degustação de 3 pratos elaborado exclusivamente pelo nosso Chef Assinatura.',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    status: 'Últimas Vagas'
  },
  {
    id: 'gala-noivas',
    title: 'Wedding Showcase - Casa 300',
    date: '2026-06-12',
    time: '16:00',
    location: 'Casa 300',
    description: 'A maior feira de noivas da Centralidade do Zango. Venha conhecer as últimas tendências em vestidos de gala, catering de luxo, decoração dourada e pacotes exclusivos com descontos.',
    imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    status: 'Confirmado'
  },
  {
    id: 'fitness-masterclass',
    title: 'Masterclass HIIT & Nutrição V119',
    date: '2026-06-20',
    time: '08:00',
    location: 'Esplanada Lounge',
    description: 'Treino matinal coletivo de alta intensidade na esplanada exterior para celebrar o bem-estar, seguido por palestra enriquecedora sobre suplementação saudável e plano de nutrição angolano.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    status: 'Confirmado'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Dr. Sílvio Antunes',
    role: 'Empresário & Cliente VIP',
    stars: 5,
    comment: 'O Kapandula Hotel supera qualquer expectativa no Zango. Quartos imaculados, privacidade espetacular e atendimento que rivaliza com os hotéis do centro do Alvalade. Sempre que visito as minhas empresas na área, hospedo-me aqui.',
    avatarText: 'SA',
    brandTarget: 'Kapandula Hotel'
  },
  {
    id: 't2',
    name: 'Eliana de Sousa',
    role: 'Noiva Feliz - Casa 300',
    stars: 5,
    comment: 'Realizei o meu casamento na Casa 300 e foi um verdadeiro espetáculo. A iluminação de cristal com as flores douradas deu um ar requintado e luxuoso. Todos os meus convidados de Luanda elogiaram a comida fantástica do buffet.',
    avatarText: 'ES',
    brandTarget: 'Casa 300'
  },
  {
    id: 't3',
    name: 'Tenente Valter Silva',
    role: 'Membro Ativo V119',
    stars: 5,
    comment: 'Instalações excelentes no Ginásio V119 com máquinas modernas. O staff apoia constantemente nas posturas e no plano físico. Os balneários são extremamente limpos e bem climatizados. Nota dez!',
    avatarText: 'VS',
    brandTarget: 'Ginásio V119'
  },
  {
    id: 't4',
    name: 'Eng. Mauro Nascimento',
    role: 'Cliente Assíduo - Barbearia',
    stars: 5,
    comment: 'Frequento a Barbearia há mais de um ano. O corte degradê é sempre milimétrico e o ritual de toalha quente é ideal para descontrair depois de uma longa semana de obras e reuniões em Luanda. Recomendo de olhos fechados.',
    avatarText: 'MN',
    brandTarget: 'Kapandula Barbearia'
  }
];

export const TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    id: 'v1',
    title: 'Visita guiada ao Kapandula Hotel 4★: Descubra o luxo das nossas suites master no Zango',
    views: '45.2K',
    likes: '8.4K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://vt.tiktok.com/ZS9tHa4Dg/'
  },
  {
    id: 'v2',
    title: 'Decoração estonteante com tons dourados para Casamento Majestoso de Sábado na Casa 300',
    views: '28.9K',
    likes: '5.1K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://vt.tiktok.com/ZS9tHa4Dg/'
  },
  {
    id: 'v3',
    title: 'Energia contagiante no treino coletivo HIIT do Ginásio V119 — Junte-se à nossa comunidade',
    views: '19.4K',
    likes: '3.3K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://vt.tiktok.com/ZS9tHa4Dg/'
  },
  {
    id: 'v4',
    title: 'Ritual clássico de corte degradê e barba premium na Kapandula Barbearia. Detalhes contam',
    views: '33.1K',
    likes: '6.2K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://vt.tiktok.com/ZS9tHa4Dg/'
  },
  {
    id: 'v5',
    title: 'Pratos de Fim-de-Semana no restaurante Kapandula: Moqueca angolana com pirão e requinte',
    views: '12.8K',
    likes: '2.1K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://vt.tiktok.com/ZS9tHa4Dg/'
  },
  {
    id: 'v6',
    title: 'Os bastidores de serviço excelente do staff Kapandula: Paixão por servir com orgulho angolano',
    views: '21.7K',
    likes: '4.8K',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://vt.tiktok.com/ZS9tHa4Dg/'
  }
];

export const WHATSAPP_CONFIG = {
  primary: '+244958718004',
  secondary: '+244950515134',
  
  messages: {
    hotel: 'Olá! Gostaria de reservar um quarto no Kapandula Hotel.',
    eventos: 'Olá! Tenho interesse em reservar a Casa 300 para um evento especial.',
    conferencia: 'Olá! Gostaria de obter mais informações sobre a Sala de Conferências para empresas.',
    ginasio: 'Olá! Quero saber mais sobre os planos ativos e horários do Ginásio V119.',
    barbearia: 'Olá! Gostaria de marcar um horário de atendimento na Kapandula Barbearia.',
    salao: 'Olá! Quero marcar um serviço estético / salão no Kapandula Beleza.',
    geral: 'Olá! Gostaria de obter mais informações institucionais sobre os serviços do Kapandula Group.',
  } as Record<string, string>,
  
  buildUrl: (type: string) => {
    const rawMsg = WHATSAPP_CONFIG.messages[type] || WHATSAPP_CONFIG.messages.geral;
    const msg = encodeURIComponent(rawMsg);
    return `https://wa.me/${WHATSAPP_CONFIG.primary.replace('+', '')}?text=${msg}`;
  }
};
