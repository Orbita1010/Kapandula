export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  symbol: string;
  stars?: number;
  highlightImage: string;
}

export interface ServiceDetailItem {
  id: string;
  brandId: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
  pricingRange?: string;
}

export interface UpcomingEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: 'Casa 300' | 'Kapandula Hotel' | 'Esplanada Lounge';
  description: string;
  imageUrl: string;
  status: 'Confirmado' | 'Esgotado' | 'Últimas Vagas';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  stars: number;
  comment: string;
  avatarText: string;
  brandTarget: string;
}

export interface TikTokVideoItem {
  id: string;
  title: string;
  views: string;
  likes: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface BookingFormState {
  serviceType: string;
  fullName: string;
  phone: string;
  date: string;
  participants: number;
  message: string;
}
