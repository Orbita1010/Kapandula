import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle, Edit3, ExternalLink, LogOut, Plus, Save, Settings, Star, Trash2, X } from 'lucide-react';
import type { ServiceDetailItem, UpcomingEventItem, TestimonialItem, TikTokVideoItem } from '../types';
import { BRANDS } from '../data';

interface AdminDashboardProps {
  events: UpcomingEventItem[];
  services: ServiceDetailItem[];
  testimonials: TestimonialItem[];
  tiktokVideos: TikTokVideoItem[];
  whatsappConfig: {
    primary: string;
    secondary: string;
    messages: Record<string, string>;
  };
  onClose: () => void;
  onLogout: () => void;
  onSaveEvents: (items: UpcomingEventItem[]) => void;
  onSaveServices: (items: ServiceDetailItem[]) => void;
  onSaveTestimonials: (items: TestimonialItem[]) => void;
  onSaveVideos: (items: TikTokVideoItem[]) => void;
  onSaveWhatsApp: (next: { primary: string; secondary: string; messages: Record<string, string> }) => void;
}

type AdminTab = 'events' | 'services' | 'videos' | 'testimonials' | 'settings';

const DEFAULT_EVENT: UpcomingEventItem = {
  id: '',
  title: '',
  date: '',
  time: '18:00',
  location: 'Casa 300',
  description: '',
  imageUrl: '',
  status: 'Confirmado'
};

const DEFAULT_SERVICE: ServiceDetailItem = {
  id: '',
  brandId: 'hotel',
  title: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  features: [],
  pricingRange: ''
};

const DEFAULT_TESTIMONIAL: TestimonialItem = {
  id: '',
  name: '',
  role: '',
  stars: 5,
  comment: '',
  avatarText: '',
  brandTarget: ''
};

const DEFAULT_VIDEO: TikTokVideoItem = {
  id: '',
  title: '',
  views: '0',
  likes: '0',
  thumbnailUrl: '',
  videoUrl: ''
};

export default function AdminDashboard({
  events,
  services,
  testimonials,
  tiktokVideos,
  whatsappConfig,
  onClose,
  onLogout,
  onSaveEvents,
  onSaveServices,
  onSaveTestimonials,
  onSaveVideos,
  onSaveWhatsApp
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('events');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'add' | 'edit'>('add');
  const [editorVehicle, setEditorVehicle] = useState<'events' | 'services' | 'testimonials' | 'videos' | 'settings'>('events');
  const [editorPayload, setEditorPayload] = useState<Record<string, any>>({ ...DEFAULT_EVENT });

  const [whatsappDraft, setWhatsAppDraft] = useState({ ...whatsappConfig });
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const activeCount = useMemo(() => {
    switch (activeTab) {
      case 'events': return events.length;
      case 'services': return services.length;
      case 'testimonials': return testimonials.length;
      case 'videos': return tiktokVideos.length;
      default: return 0;
    }
  }, [activeTab, events.length, services.length, testimonials.length, tiktokVideos.length]);

  const activeItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matches = (value: string | number | undefined) =>
      String(value || '').toLowerCase().includes(query);

    if (!query) {
      switch (activeTab) {
        case 'events': return events;
        case 'services': return services;
        case 'testimonials': return testimonials;
        case 'videos': return tiktokVideos;
        default: return [];
      }
    }

    switch (activeTab) {
      case 'events':
        return events.filter((item) =>
          matches(item.title) || matches(item.location) || matches(item.description) || matches(item.status)
        );
      case 'services':
        return services.filter((item) =>
          matches(item.title) || matches(item.subtitle) || matches(item.description) || matches(BRANDS.find((brand) => brand.id === item.brandId)?.name)
        );
      case 'testimonials':
        return testimonials.filter((item) =>
          matches(item.name) || matches(item.role) || matches(item.comment) || matches(item.brandTarget)
        );
      case 'videos':
        return tiktokVideos.filter((item) =>
          matches(item.title) || matches(item.videoUrl) || matches(item.thumbnailUrl) || matches(item.views) || matches(item.likes)
        );
      default:
        return [];
    }
  }, [activeTab, searchQuery, events, services, testimonials, tiktokVideos]);

  const formatCsvValue = (value: string | number | undefined) => `"${String(value || '').replace(/"/g, '""')}"`;

  const downloadCsv = (headers: string[], rows: string[][], fileName: string) => {
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    if (activeItems.length === 0) {
      setExportMessage('Nenhum item para exportar.');
      return;
    }

    setExportMessage(null);
    let headers: string[] = [];
    let rows: string[][] = [];
    let fileName = `kapandula-${activeTab}.csv`;

    if (activeTab === 'events') {
      headers = ['ID', 'Título', 'Data', 'Hora', 'Localização', 'Estado', 'Descrição', 'Imagem'];
      rows = activeItems.map((item) => [
        formatCsvValue(item.id),
        formatCsvValue(item.title),
        formatCsvValue(item.date),
        formatCsvValue(item.time),
        formatCsvValue(item.location),
        formatCsvValue(item.status),
        formatCsvValue(item.description),
        formatCsvValue(item.imageUrl),
      ]);
    }

    if (activeTab === 'services') {
      headers = ['ID', 'Marca', 'Título', 'Subtítulo', 'Descrição', 'Recursos', 'Preço', 'Imagem'];
      rows = activeItems.map((item) => [
        formatCsvValue(item.id),
        formatCsvValue(BRANDS.find((brand) => brand.id === item.brandId)?.name),
        formatCsvValue(item.title),
        formatCsvValue(item.subtitle),
        formatCsvValue(item.description),
        formatCsvValue(Array.isArray(item.features) ? item.features.join(' | ') : item.features),
        formatCsvValue(item.pricingRange),
        formatCsvValue(item.imageUrl),
      ]);
    }

    if (activeTab === 'testimonials') {
      headers = ['ID', 'Nome', 'Cargo', 'Estrelas', 'Comentário', 'Marca Associada', 'Avatar'];
      rows = activeItems.map((item) => [
        formatCsvValue(item.id),
        formatCsvValue(item.name),
        formatCsvValue(item.role),
        formatCsvValue(item.stars),
        formatCsvValue(item.comment),
        formatCsvValue(item.brandTarget),
        formatCsvValue(item.avatarText),
      ]);
    }

    if (activeTab === 'videos') {
      headers = ['ID', 'Título', 'Visualizações', 'Likes', 'Miniatura', 'URL do Vídeo'];
      rows = activeItems.map((item) => [
        formatCsvValue(item.id),
        formatCsvValue(item.title),
        formatCsvValue(item.views),
        formatCsvValue(item.likes),
        formatCsvValue(item.thumbnailUrl),
        formatCsvValue(item.videoUrl),
      ]);
    }

    downloadCsv(headers, rows, fileName);
    setExportMessage(`Exportado ${activeItems.length} item(s) como CSV.`);
  };

  const openPublicPreview = () => {
    window.open('/', '_blank');
  };

  const openEditor = (kind: AdminTab, mode: 'add' | 'edit', item?: Record<string, any>) => {
    setActiveTab(kind);
    setEditorVehicle(kind);
    setEditorMode(mode);
    setEditorPayload(item ? { ...item } : kind === 'services' ? { ...DEFAULT_SERVICE } : kind === 'testimonials' ? { ...DEFAULT_TESTIMONIAL } : kind === 'videos' ? { ...DEFAULT_VIDEO } : { ...DEFAULT_EVENT });
    setEditorOpen(true);
    setSavedMessage(null);
  };

  const buildId = () => `item-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

  const handleDelete = (kind: AdminTab, id: string) => {
    if (!window.confirm('Tem certeza de que deseja apagar este item?')) return;
    if (kind === 'events') onSaveEvents(events.filter((item) => item.id !== id));
    if (kind === 'services') onSaveServices(services.filter((item) => item.id !== id));
    if (kind === 'testimonials') onSaveTestimonials(testimonials.filter((item) => item.id !== id));
    if (kind === 'videos') onSaveVideos(tiktokVideos.filter((item) => item.id !== id));
    setSavedMessage('Item removido com sucesso.');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { ...editorPayload };

    if (editorVehicle === 'events') {
      const next = editorMode === 'edit'
        ? events.map((item) => (item.id === payload.id ? payload : item))
        : [{ ...payload, id: payload.id || buildId() }, ...events];
      onSaveEvents(next);
    }

    if (editorVehicle === 'services') {
      const next = editorMode === 'edit'
        ? services.map((item) => (item.id === payload.id ? { ...payload, features: String(payload.features).split(',').map((value: string) => value.trim()).filter(Boolean) } : item))
        : [{ ...payload, id: payload.id || buildId(), features: String(payload.features).split(',').map((value: string) => value.trim()).filter(Boolean) }, ...services];
      onSaveServices(next);
    }

    if (editorVehicle === 'testimonials') {
      const next = editorMode === 'edit'
        ? testimonials.map((item) => (item.id === payload.id ? payload : item))
        : [{ ...payload, id: payload.id || buildId() }, ...testimonials];
      onSaveTestimonials(next);
    }

    if (editorVehicle === 'videos') {
      const next = editorMode === 'edit'
        ? tiktokVideos.map((item) => (item.id === payload.id ? payload : item))
        : [{ ...payload, id: payload.id || buildId() }, ...tiktokVideos];
      onSaveVideos(next);
    }

    setEditorOpen(false);
    setSavedMessage('Alterações guardadas com sucesso.');
  };

  const handleWhatsAppSave = () => {
    onSaveWhatsApp(whatsappDraft);
    setSavedMessage('Configurações de contacto atualizadas.');
  };

  return (
    <div className="fixed inset-0 z-[19000] bg-black-deep/95 backdrop-blur-md overflow-y-auto">
      <div className="min-h-screen max-w-[1320px] mx-auto px-4 py-8 md:px-6">
        <div className="rounded-[2rem] border border-gold/20 bg-black-card shadow-2xl overflow-hidden">
          <div className="flex flex-col gap-6 border-b border-gold/20 bg-black-deep px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold font-bold">Admin</p>
              <h1 className="mt-3 text-3xl font-bold text-white-warm">Painel de Gestão Kapandula</h1>
              <p className="mt-2 text-sm text-neutral-400 max-w-2xl">Gerencie eventos, serviços, vídeos TikTok, depoimentos e contactos diretamente do navegador.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-bold text-neutral-200 hover:bg-neutral-900 transition-all"
              >
                <LogOut className="w-4 h-4" /> Sair
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-sm font-bold text-black-deep hover:bg-[#ffdf7f] transition-all"
              >
                <X className="w-4 h-4" /> Fechar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6 p-6">
            <aside className="space-y-4 rounded-3xl border border-neutral-800 bg-black-deep/80 p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-gold text-black-deep">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white-warm">Sessão</h2>
                  <p className="text-xs text-neutral-400">Activo como administrador</p>
                </div>
              </div>

              <div className="space-y-2">
                <button onClick={() => setActiveTab('events')} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'events' ? 'bg-gold text-black-deep' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}>
                  Eventos ({events.length})
                </button>
                <button onClick={() => setActiveTab('services')} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'services' ? 'bg-gold text-black-deep' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}>
                  Serviços ({services.length})
                </button>
                <button onClick={() => setActiveTab('videos')} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'videos' ? 'bg-gold text-black-deep' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}>
                  Vídeos TikTok ({tiktokVideos.length})
                </button>
                <button onClick={() => setActiveTab('testimonials')} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'testimonials' ? 'bg-gold text-black-deep' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}>
                  Depoimentos ({testimonials.length})
                </button>
                <button onClick={() => setActiveTab('settings')} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === 'settings' ? 'bg-gold text-black-deep' : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900'}`}>
                  Configurações
                </button>
              </div>

              <div className="rounded-3xl border border-neutral-800 bg-black-card p-4 text-xs text-neutral-400">
                <p className="font-semibold text-white-warm uppercase tracking-[0.2em] mb-2">Dica</p>
                <p>Guarde as alterações e atualize o browser para verificar a persistência imutável via localStorage.</p>
              </div>
            </aside>

            <main className="space-y-6">
              <div className="space-y-4 rounded-3xl border border-neutral-800 bg-black-card p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold font-bold">Gestão</p>
                    <h2 className="mt-2 text-2xl font-bold text-white-warm">{activeTab === 'events' && 'Eventos'}{activeTab === 'services' && 'Serviços'}{activeTab === 'videos' && 'Vídeos'}{activeTab === 'testimonials' && 'Depoimentos'}{activeTab === 'settings' && 'Configurações'}</h2>
                    <p className="mt-2 text-sm text-neutral-400">Filtre, exporte e edite conteúdo com precisão profissional.</p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={openPublicPreview}
                      className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-semibold text-neutral-200 hover:bg-neutral-900 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> Ver Prévia
                    </button>
                    {activeTab !== 'settings' && (
                      <button
                        type="button"
                        onClick={() => openEditor(activeTab, 'add')}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black-deep hover:bg-[#ffdf7f] transition-all"
                      >
                        <Plus className="w-4 h-4" /> Adicionar
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-3xl border border-neutral-800 bg-black-deep p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Itens Ativos</p>
                    <p className="mt-3 text-3xl font-bold text-white-warm">{activeCount}</p>
                    <p className="text-sm text-neutral-400 mt-1">Total de itens na aba atual.</p>
                  </div>
                  <div className="rounded-3xl border border-neutral-800 bg-black-deep p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Resultados</p>
                    <p className="mt-3 text-3xl font-bold text-white-warm">{activeItems.length}</p>
                    <p className="text-sm text-neutral-400 mt-1">Itens correspondentes à pesquisa.</p>
                  </div>
                  <div className="rounded-3xl border border-neutral-800 bg-black-deep p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Armazenamento</p>
                    <p className="mt-3 text-3xl font-bold text-white-warm">{new Date().toLocaleDateString('pt-PT')}</p>
                    <p className="text-sm text-neutral-400 mt-1">Data da última sessão administrativa.</p>
                  </div>
                  <div className="rounded-3xl border border-neutral-800 bg-black-deep p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Entrega</p>
                    <p className="mt-3 text-3xl font-bold text-white-warm">CSV</p>
                    <p className="text-sm text-neutral-400 mt-1">Exportações prontas para relatórios.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl border border-neutral-800 bg-black-card p-5 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-2/3">
                  <label className="sr-only" htmlFor="admin-search">Pesquisar</label>
                  <input
                    id="admin-search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Pesquisar por título, descrição, marca ou cliente..."
                    className="w-full rounded-2xl border border-neutral-800 bg-black-deep px-4 py-3 pr-12 text-sm text-white-warm outline-none focus:border-gold"
                  />
                  <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gold px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black-deep hover:bg-[#ffdf7f] transition-all"
                  >
                    <Save className="w-4 h-4" /> Exportar CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-semibold text-neutral-200 hover:bg-neutral-900 transition-all"
                  >
                    Limpar filtro
                  </button>
                </div>
              </div>

              {(savedMessage || exportMessage) && (
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  {exportMessage || savedMessage}
                </div>
              )}

              {activeTab === 'events' && (
                <div className="space-y-4">
                  {events.length === 0 ? (
                    <div className="rounded-3xl border border-neutral-800 bg-black-deep p-6 text-neutral-400">Nenhum evento registado ainda.</div>
                  ) : (
                    <div className="space-y-3">
                      {activeItems.map((event) => (
                        <div key={event.id} className="rounded-3xl border border-neutral-800 bg-black-deep p-5 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gold">{event.status}</p>
                            <h3 className="mt-2 text-lg font-bold text-white-warm">{event.title}</h3>
                            <p className="mt-2 text-sm text-neutral-400">{event.date} • {event.time} • {event.location}</p>
                          </div>
                          <div className="mt-4 flex gap-3 sm:mt-0">
                            <button type="button" onClick={() => openEditor('events', 'edit', event)} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900">
                              <Edit3 className="w-4 h-4" /> Editar
                            </button>
                            <button type="button" onClick={() => handleDelete('events', event.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20">
                              <Trash2 className="w-4 h-4" /> Apagar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-4">
                  {services.length === 0 ? (
                    <div className="rounded-3xl border border-neutral-800 bg-black-deep p-6 text-neutral-400">Nenhum serviço registado ainda.</div>
                  ) : (
                    <div className="grid gap-4">
                      {activeItems.map((service) => (
                        <div key={service.id} className="rounded-3xl border border-neutral-800 bg-black-deep p-5 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gold">{BRANDS.find((brand) => brand.id === service.brandId)?.name || service.brandId}</p>
                            <h3 className="mt-2 text-lg font-bold text-white-warm">{service.title}</h3>
                            <p className="mt-2 text-sm text-neutral-400">{service.subtitle}</p>
                          </div>
                          <div className="mt-4 flex gap-3 sm:mt-0">
                            <button type="button" onClick={() => openEditor('services', 'edit', service)} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900">
                              <Edit3 className="w-4 h-4" /> Editar
                            </button>
                            <button type="button" onClick={() => handleDelete('services', service.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20">
                              <Trash2 className="w-4 h-4" /> Remover
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'videos' && (
                <div className="space-y-4">
                  {tiktokVideos.length === 0 ? (
                    <div className="rounded-3xl border border-neutral-800 bg-black-deep p-6 text-neutral-400">Nenhum vídeo registado ainda.</div>
                  ) : (
                    <div className="grid gap-4">
                      {activeItems.map((video) => (
                        <div key={video.id} className="rounded-3xl border border-neutral-800 bg-black-deep p-5 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gold">{video.views} visualizações</p>
                            <h3 className="mt-2 text-lg font-bold text-white-warm">{video.title}</h3>
                            <p className="mt-2 text-sm text-neutral-400">{video.likes} likes</p>
                          </div>
                          <div className="mt-4 flex gap-3 sm:mt-0">
                            <button type="button" onClick={() => openEditor('videos', 'edit', video)} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900">
                              <Edit3 className="w-4 h-4" /> Editar
                            </button>
                            <button type="button" onClick={() => handleDelete('videos', video.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20">
                              <Trash2 className="w-4 h-4" /> Remover
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="space-y-4">
                  {testimonials.length === 0 ? (
                    <div className="rounded-3xl border border-neutral-800 bg-black-deep p-6 text-neutral-400">Nenhum depoimento registado ainda.</div>
                  ) : (
                    <div className="grid gap-4">
                      {activeItems.map((item) => (
                        <div key={item.id} className="rounded-3xl border border-neutral-800 bg-black-deep p-5 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gold">{item.brandTarget}</p>
                            <h3 className="mt-2 text-lg font-bold text-white-warm">{item.name}</h3>
                            <p className="mt-2 text-sm text-neutral-400">{item.role}</p>
                          </div>
                          <div className="mt-4 flex gap-3 sm:mt-0">
                            <button type="button" onClick={() => openEditor('testimonials', 'edit', item)} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-900">
                              <Edit3 className="w-4 h-4" /> Editar
                            </button>
                            <button type="button" onClick={() => handleDelete('testimonials', item.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20">
                              <Trash2 className="w-4 h-4" /> Remover
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 rounded-3xl border border-neutral-800 bg-black-deep p-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white-warm">Contactos e WhatsApp</h3>
                    <p className="text-sm text-neutral-400">Atualize os números de contacto e a mensagem padrão de comunicação do portal.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-white-warm">
                      Número Primário
                      <input
                        value={whatsappDraft.primary}
                        onChange={(event) => setWhatsAppDraft((prev) => ({ ...prev, primary: event.target.value }))}
                        className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none"
                        placeholder="+244958718004"
                      />
                    </label>
                    <label className="block text-sm text-white-warm">
                      Número Secundário
                      <input
                        value={whatsappDraft.secondary}
                        onChange={(event) => setWhatsAppDraft((prev) => ({ ...prev, secondary: event.target.value }))}
                        className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none"
                        placeholder="+244950515134"
                      />
                    </label>
                  </div>
                  <label className="block text-sm text-white-warm">
                    Mensagem Padrão de Contacto
                    <textarea
                      value={whatsappDraft.messages.hotel || ''}
                      onChange={(event) => setWhatsAppDraft((prev) => ({ ...prev, messages: { ...prev.messages, hotel: event.target.value } }))}
                      className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none min-h-[120px]"
                      placeholder="Olá! Gostaria de reservar um quarto no Kapandula Hotel."
                    />
                  </label>
                  <button type="button" onClick={handleWhatsAppSave} className="inline-flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black-deep hover:bg-[#ffdf7f] transition-all">
                    <Settings className="w-4 h-4" /> Guardar Configurações
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {editorOpen && (
        <div className="fixed inset-0 z-[19500] bg-black-deep/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-[2rem] border border-gold/20 bg-black-card p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold font-bold">Editor {editorMode === 'add' ? 'Novo' : 'Editar'}</p>
                <h2 className="mt-2 text-2xl font-bold text-white-warm">{editorVehicle === 'events' ? 'Evento' : editorVehicle === 'services' ? 'Serviço' : editorVehicle === 'videos' ? 'Vídeo TikTok' : editorVehicle === 'testimonials' ? 'Depoimento' : 'Item'}</h2>
              </div>
              <button type="button" onClick={() => setEditorOpen(false)} className="text-neutral-400 hover:text-white-warm">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {editorVehicle === 'events' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-white-warm">
                    Título
                    <input name="title" value={editorPayload.title || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, title: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Localização
                    <select name="location" value={editorPayload.location} onChange={(event) => setEditorPayload((prev) => ({ ...prev, location: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none">
                      <option>Casa 300</option>
                      <option>Kapandula Hotel</option>
                      <option>Esplanada Lounge</option>
                    </select>
                  </label>
                  <label className="block text-sm text-white-warm">
                    Data
                    <input type="date" name="date" value={editorPayload.date || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, date: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Hora
                    <input type="time" name="time" value={editorPayload.time || '18:00'} onChange={(event) => setEditorPayload((prev) => ({ ...prev, time: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    Estado
                    <select name="status" value={editorPayload.status} onChange={(event) => setEditorPayload((prev) => ({ ...prev, status: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none">
                      <option>Confirmado</option>
                      <option>Esgotado</option>
                      <option>Últimas Vagas</option>
                    </select>
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    Link da Imagem
                    <input name="imageUrl" value={editorPayload.imageUrl || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, imageUrl: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    Descrição
                    <textarea name="description" value={editorPayload.description || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, description: event.target.value }))} className="mt-2 w-full min-h-[120px] rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                </div>
              )}

              {editorVehicle === 'services' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-white-warm">
                    Título
                    <input name="title" value={editorPayload.title || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, title: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Marca
                    <select name="brandId" value={editorPayload.brandId} onChange={(event) => setEditorPayload((prev) => ({ ...prev, brandId: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none">
                      {BRANDS.map((brand) => (<option key={brand.id} value={brand.id}>{brand.name}</option>))}
                    </select>
                  </label>
                  <label className="block text-sm text-white-warm">
                    Subtítulo
                    <input name="subtitle" value={editorPayload.subtitle || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, subtitle: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Preço/Range
                    <input name="pricingRange" value={editorPayload.pricingRange || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, pricingRange: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    URL da Imagem
                    <input name="imageUrl" value={editorPayload.imageUrl || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, imageUrl: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    Características (separadas por vírgula)
                    <input
                      name="features"
                      value={Array.isArray(editorPayload.features) ? editorPayload.features.join(', ') : String(editorPayload.features || '')}
                      onChange={(event) => setEditorPayload((prev) => ({ ...prev, features: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none"
                    />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    Descrição
                    <textarea name="description" value={editorPayload.description || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, description: event.target.value }))} className="mt-2 w-full min-h-[120px] rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                </div>
              )}

              {editorVehicle === 'videos' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-white-warm">
                    Título
                    <input name="title" value={editorPayload.title || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, title: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Visualizações
                    <input name="views" value={editorPayload.views || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, views: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Likes
                    <input name="likes" value={editorPayload.likes || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, likes: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    URL da Miniatura
                    <input name="thumbnailUrl" value={editorPayload.thumbnailUrl || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, thumbnailUrl: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    URL do Vídeo
                    <input name="videoUrl" value={editorPayload.videoUrl || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, videoUrl: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                </div>
              )}

              {editorVehicle === 'testimonials' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-white-warm">
                    Nome
                    <input name="name" value={editorPayload.name || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, name: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Cargo
                    <input name="role" value={editorPayload.role || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, role: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Marca Associada
                    <input name="brandTarget" value={editorPayload.brandTarget || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, brandTarget: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Estrelas
                    <select name="stars" value={editorPayload.stars || 5} onChange={(event) => setEditorPayload((prev) => ({ ...prev, stars: Number(event.target.value) }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none">
                      {[1, 2, 3, 4, 5].map((value) => (<option key={value} value={value}>{value} estrela{value > 1 ? 's' : ''}</option>))}
                    </select>
                  </label>
                  <label className="block text-sm text-white-warm sm:col-span-2">
                    Resenha
                    <textarea name="comment" value={editorPayload.comment || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, comment: event.target.value }))} className="mt-2 w-full min-h-[120px] rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                  <label className="block text-sm text-white-warm">
                    Avatar / Sigla
                    <input name="avatarText" value={editorPayload.avatarText || ''} onChange={(event) => setEditorPayload((prev) => ({ ...prev, avatarText: event.target.value }))} className="mt-2 w-full rounded-2xl border border-neutral-800 bg-black-card px-4 py-3 text-white-warm outline-none" />
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setEditorOpen(false)} className="rounded-2xl border border-neutral-800 px-5 py-3 text-sm font-semibold text-neutral-300 hover:border-gold hover:text-white-warm transition-all">
                  Cancelar
                </button>
                <button type="submit" className="rounded-2xl bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black-deep hover:bg-[#ffdf7f] transition-all">
                  <Save className="w-4 h-4 inline-block mr-2" /> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
