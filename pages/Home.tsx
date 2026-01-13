
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle2, MapPin, ChevronRight, ChevronLeft, Building2, MoveRight, X, BedDouble, Square, ChevronDown, Car, Bath, Wallet
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Imovel, Finalidade, Banner } from '../types';
import PropertyCard from '../components/PropertyCard';

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SectionBanner: React.FC<{ banners: Banner[], id: string, fullWidth?: boolean }> = ({ banners, id, fullWidth = true }) => {
  const activeBanners = banners.filter(b => b.ativo);
  if (activeBanners.length === 0) return null;

  return (
    <section id={id} className={`w-full overflow-hidden ${fullWidth ? '' : 'max-w-7xl mx-auto px-4 rounded-xl'}`}>
      {activeBanners.map(banner => (
        <a key={banner.id} href={banner.link_acao || '#'} className="block w-full">
          <picture>
            <source media="(max-width: 768px)" srcSet={banner.imagem_mobile} />
            <img
              src={banner.imagem_desktop}
              alt={banner.texto_alt}
              className={`w-full object-cover ${fullWidth ? 'h-auto max-h-[500px]' : 'rounded-xl shadow-xl'}`}
            />
          </picture>
        </a>
      ))}
    </section>
  );
};

const useCountUp = (end: number, duration: number = 2000, startAnimation: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startAnimation) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easedValue = percentage === 1 ? end : end * (1 - Math.pow(2, -10 * percentage));
      setCount(Math.floor(easedValue));
      if (progress < duration) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startAnimation]);
  return count;
};

const MetricItem: React.FC<{ label: string, value: number, start: boolean }> = ({ label, value, start }) => {
  const count = useCountUp(value, 2000, start);
  return (
    <div className="flex flex-col items-start p-8 rounded-xl bg-white w-full">
      <div className="text-5xl font-black tracking-tighter text-[#232323] flex items-center gap-0.5">
        <span className="text-[#4A5D4E] font-medium">+</span>{count}
      </div>
      <p className="text-[#6B7280] font-bold uppercase text-[9px] tracking-widest mt-3 leading-tight">{label}</p>
    </div>
  );
};

const PropertyModal: React.FC<{
  property: Imovel | null,
  onClose: () => void,
  whatsappNumber: string
}> = ({ property, onClose, whatsappNumber }) => {
  if (!property) return null;

  const [activeImage, setActiveImage] = useState(0);
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.preco);

  const whatsappMessage = `Olá! Tenho interesse no imóvel ${property.titulo}, localizado em ${property.bairro}, Maceió – AL. Gostaria de mais informações. (Ref: ${property.referencia})`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow || 'unset'; };
  }, []);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.imagens.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.imagens.length) % property.imagens.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:p-10">
      <div className="absolute inset-0 bg-[#232323]/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#F1F1EE] w-full max-w-6xl max-h-full overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
        <div className="w-full md:w-1/2 h-[40vh] md:h-auto bg-slate-200 relative overflow-hidden shrink-0">
          <img src={property.imagens[activeImage]} className="w-full h-full object-cover transition-all duration-700" alt="" />
          <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#232323] shadow-lg"><ChevronLeft size={24} /></button>
          <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#232323] shadow-lg"><ChevronRight size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-14 no-scrollbar bg-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4A5D4E] mb-2 block">{property.tipoImovel}</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#232323] leading-tight">{property.titulo}</h2>
            </div>
            <button onClick={onClose} className="p-3 bg-[#F1F1EE] rounded-full hover:bg-black hover:text-white transition-all"><X size={24} /></button>
          </div>
          <div className="bg-[#F1F1EE] p-8 rounded-xl mb-10">
            <span className="text-[10px] font-black uppercase text-[#6B7280] tracking-widest block mb-2">Investimento</span>
            <div className="text-4xl font-black text-[#232323]">{formattedPrice}</div>
          </div>
          <p className="text-[#6B7280] leading-relaxed mb-12 text-lg">{property.descricao_completa}</p>
          {/* Detalhes Físicos - Estilo Clean */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#232323] mb-8">Detalhes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <Square className="text-[#9CA3AF] mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <span className="text-xs text-[#6B7280] font-medium block mb-1">Área útil</span>
                  <span className="text-xl font-bold text-[#232323]">{property.area}m²</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BedDouble className="text-[#9CA3AF] mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <span className="text-xs text-[#6B7280] font-medium block mb-1">Quartos</span>
                  <span className="text-xl font-bold text-[#232323]">{property.quartos}</span>
                </div>
              </div>
              {property.banheiros > 0 && (
                <div className="flex items-start gap-4">
                  <Bath className="text-[#9CA3AF] mt-1" size={24} strokeWidth={1.5} />
                  <div>
                    <span className="text-xs text-[#6B7280] font-medium block mb-1">Banheiros</span>
                    <span className="text-xl font-bold text-[#232323]">{property.banheiros}</span>
                  </div>
                </div>
              )}
              {property.vagas > 0 && (
                <div className="flex items-start gap-4">
                  <Car className="text-[#9CA3AF] mt-1" size={24} strokeWidth={1.5} />
                  <div>
                    <span className="text-xs text-[#6B7280] font-medium block mb-1">Vagas na garagem</span>
                    <span className="text-xl font-bold text-[#232323]">{property.vagas}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dados Financeiros */}
          {(property.valor_condominio || property.valor_iptu) && (
            <div className="mb-12 p-6 bg-[#F8F9FA] rounded-2xl border border-black/5">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#6B7280] mb-6">Custos Mensais & Anuais</h3>
              <div className="flex flex-wrap gap-10">
                {property.valor_condominio && (
                  <div className="flex items-center gap-3">
                    <Building2 className="text-[#4A5D4E]" size={20} />
                    <div>
                      <span className="text-xs text-[#6B7280] block">Condomínio</span>
                      <span className="text-lg font-bold text-[#232323]">R$ {property.valor_condominio}</span>
                    </div>
                  </div>
                )}
                {property.valor_iptu && (
                  <div className="flex items-center gap-3">
                    <Wallet className="text-[#4A5D4E]" size={20} />
                    <div>
                      <span className="text-xs text-[#6B7280] block">IPTU</span>
                      <span className="text-lg font-bold text-[#232323]">R$ {property.valor_iptu}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Características */}
          {property.areas_privativas.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-[#232323] mb-6">Características do imóvel</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.areas_privativas.map((area, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F8F9FA] p-4 rounded-xl">
                    <CheckCircle2 size={18} className="text-[#9CA3AF] shrink-0" />
                    <span className="text-sm font-medium text-[#4B5563]">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {property.areas_comuns.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-[#232323] mb-6">Características do condomínio</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.areas_comuns.map((area, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F8F9FA] p-4 rounded-xl">
                    <Building2 size={18} className="text-[#9CA3AF] shrink-0" />
                    <span className="text-sm font-medium text-[#4B5563]">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full bg-[#232323] text-white py-4 rounded-full font-bold text-base flex items-center justify-center gap-4 hover:bg-[#4A5D4E] transition-all shadow-xl shadow-black/10">
            <WhatsAppIcon size={26} />
            Iniciar Conversa
          </a>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { imoveis, regioes, settings, financiamento, provaSocial, localizacao, bannersPromocionais, bannersEmBreve, addLead } = useAppState();
  const location = useLocation();
  const [selectedRegiao, setSelectedRegiao] = useState('');
  const [selectedFinalidade, setSelectedFinalidade] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Imovel | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadForm, setLeadForm] = useState({ nome: '', whatsapp: '', tipo_imovel: 'Casa', regiao_id: '' });
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/venda') {
      setSelectedFinalidade(Finalidade.VENDA);
      setTimeout(() => {
        document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (path === '/aluguel') {
      setSelectedFinalidade(Finalidade.ALUGUEL);
      setTimeout(() => {
        document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (path === '/sobre') {
      document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setShowMetrics(true); observer.unobserve(entry.target); } }, { threshold: 0.3 });
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredImoveis = imoveis
    .filter(i => i.ativo)
    .filter(i => !selectedRegiao || i.regiao_id === selectedRegiao)
    .filter(i => !selectedFinalidade || i.finalidade === selectedFinalidade);

  const activeRegioes = regioes.filter(r => r.ativo);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({ id: Date.now().toString(), ...leadForm, dataEnvio: new Date().toISOString() });
    setLeadSent(true);
  };

  const generalWhatsappLink = `https://wa.me/${settings.contactWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor sobre imóveis em Maceió.')}`;

  return (
    <div className="bg-[#F1F1EE] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 md:px-10 lg:px-12">
        <div className="max-w-[1400px] mx-auto relative h-[75vh] md:h-[85vh] rounded-[3rem] overflow-hidden group shadow-2xl">
          <img
            src={settings.heroBackgroundImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            alt="Arquitetura de Luxo em Maceió"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>
          <div className="absolute inset-y-0 left-0 w-full p-10 md:p-20 flex flex-col justify-center items-start z-10">
            <div className="max-w-4xl space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter drop-shadow-2xl">
                Abra a porta para <br /><span className="text-[#A5B49D]">novos</span> momentos!
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-md">
                {settings.heroSubheadline || 'Conte com a Nova Imobiliária para iniciar um novo capítulo na capital alagoana com design e excelência.'}
              </p>
              <div className="pt-6">
                <a
                  href={generalWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-[#232323] text-white px-8 md:px-10 py-4 rounded-full font-bold text-base hover:bg-[#4A5D4E] transition-all shadow-2xl shadow-black/40 hover:-translate-y-1 active:scale-95"
                >
                  <WhatsAppIcon size={24} className="text-white" />
                  Fale com um consultor
                </a>
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] text-white hidden md:block">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Maceió / Alagoas</div>
            <div className="text-xl font-bold">Ponta Verde</div>
          </div>
        </div>
      </section>

      {/* 2. PROVA SOCIAL (HISTÓRIA) */}
      {provaSocial.ativo && (
        <section id="historia" className="py-32 bg-white" ref={metricsRef}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="h-[600px]">
                  <img
                    src={provaSocial.imagens[0] || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800'}
                    className="w-full h-full object-cover"
                    alt="Nossa História"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-[#4A5D4E] text-[11px] font-black uppercase tracking-[0.3em] mb-6 block">Nossa História</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#232323] mb-8 leading-[1.1] tracking-tighter">{provaSocial.titulo}</h2>
                <p className="text-xl text-[#6B7280] mb-12 font-medium leading-relaxed">{provaSocial.subtitulo}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {provaSocial.metricas.map((m, i) => <MetricItem key={i} label={m.label} value={m.valor} start={showMetrics} />)}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. BAIRROS SELECIONADOS (MARQUEE) */}
      <section className="py-32 bg-[#F1F1EE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-[#232323]">Bairros <span className="text-[#4A5D4E]">Selecionados</span></h2>
          <p className="text-[#6B7280] font-medium text-lg">As localizações mais premium de Maceió – AL.</p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#F1F1EE] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#F1F1EE] to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee">
            {[...activeRegioes, ...activeRegioes, ...activeRegioes].map((reg, idx) => (
              <div key={`${reg.id}-${idx}`} className="w-[320px] h-[320px] flex-shrink-0 pr-5 relative">
                <div className="w-full h-full relative rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-black/5">
                  <img src={reg.imagem} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={reg.nome} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#232323]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10">
                    <h4 className="text-2xl font-black text-white">{reg.nome}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 5. IMÓVEIS DISPONÍVEIS */}
      <section id="imoveis" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Custom Header Image for Properties Section */}
          {settings.propertiesHeaderImage && (
            <div className="w-full mb-12 rounded-3xl overflow-hidden shadow-lg border border-black/5 h-[200px] md:h-[300px]">
              <img src={settings.propertiesHeaderImage} className="w-full h-full object-cover" alt="Destaques" />
            </div>
          )}

          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <div className="text-left">
              <span className="text-[#4A5D4E] text-[11px] font-black uppercase tracking-[0.3em] mb-4 block">Portfólio Premium</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#232323]">Destaques da <span className="text-[#4A5D4E]">Semana</span></h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="flex gap-1.5 bg-[#F1F1EE] p-1.5 rounded-full border border-black/5 shadow-sm shrink-0">
                <button onClick={() => setSelectedFinalidade('')} className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all flex-shrink-0 ${!selectedFinalidade ? 'bg-[#232323] text-white shadow-lg' : 'text-[#6B7280] hover:text-[#232323]'}`}>TODAS</button>
                <button onClick={() => setSelectedFinalidade(Finalidade.VENDA)} className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all flex-shrink-0 ${selectedFinalidade === Finalidade.VENDA ? 'bg-[#232323] text-white shadow-lg' : 'text-[#6B7280] hover:text-[#232323]'}`}>VENDA</button>
                <button onClick={() => setSelectedFinalidade(Finalidade.ALUGUEL)} className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all flex-shrink-0 ${selectedFinalidade === Finalidade.ALUGUEL ? 'bg-[#232323] text-white shadow-lg' : 'text-[#6B7280] hover:text-[#232323]'}`}>ALUGUEL</button>
              </div>
              <div className="relative group min-w-[220px]">
                <div className="flex items-center justify-between bg-[#F1F1EE] px-6 py-3 rounded-full border border-black/5 cursor-pointer hover:border-[#4A5D4E] transition-all h-[54px]"><span className="text-sm font-bold text-[#232323] tracking-wide truncate">{selectedRegiao ? activeRegioes.find(r => r.id === selectedRegiao)?.nome : 'Todas as Regiões'}</span><ChevronDown size={16} className="text-[#6B7280] ml-2" /></div>
                <div className="absolute top-full right-0 mt-3 w-full bg-white border border-black/5 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] p-3">
                  <button onClick={() => setSelectedRegiao('')} className="w-full text-left px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#F1F1EE] tracking-wide">Todos</button>
                  {activeRegioes.map(r => <button key={r.id} onClick={() => setSelectedRegiao(r.id)} className="w-full text-left px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#F1F1EE] tracking-wide">{r.nome}</button>)}
                </div>
              </div>
            </div>
          </div>
          {filteredImoveis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">{filteredImoveis.map(imovel => (<PropertyCard key={imovel.id} property={imovel} regiao={regioes.find(r => r.id === imovel.regiao_id)} onViewDetails={(prop) => setSelectedProperty(prop)} />))}</div>
          ) : (
            <div className="py-24 text-center bg-[#F1F1EE]/50 rounded-xl border border-dashed border-black/10">
              <div className="max-w-md mx-auto px-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-8 shadow-sm"><Building2 size={32} className="text-[#4A5D4E] opacity-30" /></div>
                <h3 className="text-3xl font-black text-[#232323] mb-4">Portfólio em atualização</h3>
                <p className="text-[#6B7280] font-medium text-lg mb-10 leading-relaxed">Não encontramos imóveis para os filtros selecionados no momento.</p>
                <button onClick={() => { setSelectedRegiao(''); setSelectedFinalidade(''); }} className="bg-[#232323] text-white px-8 py-4 rounded-full font-bold text-base uppercase tracking-wider hover:bg-[#4A5D4E] transition-all">Limpar Filtros</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. FINANCIAMENTO IMOBILIÁRIO */}
      {financiamento.ativo && (
        <section className="py-40 bg-[#4A5D4E] relative overflow-hidden text-white">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-[1.1]">{financiamento.titulo}</h2>
                <p className="text-xl text-white/70 mb-12 font-medium max-w-xl mx-auto lg:mx-0">
                  {financiamento.descricao}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12">
                  {financiamento.texto_destaque.split('•').map((item, i) => (
                    <span key={i} className="bg-white/10 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/20">
                      {item.trim()}
                    </span>
                  ))}
                </div>
                <a href={generalWhatsappLink} className="inline-flex bg-white text-[#4A5D4E] px-10 py-5 rounded-full font-bold text-base hover:bg-[#F1F1EE] transition-all shadow-2xl shadow-black/20 group">
                  Simular Agora
                  <MoveRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
              <div className="relative">
                <img
                  src={financiamento.imagem}
                  className="aspect-square rounded-xl object-cover"
                  alt="Financiamento"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. FORMULÁRIO DE CONTATO */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#F1F1EE] p-12 md:p-20 rounded-xl text-center border border-black/5 shadow-inner">
            <h2 className="text-4xl md:text-5xl font-black text-[#232323] mb-8 tracking-tighter">Não achou o que precisava? Sua busca termina aqui</h2>
            <p className="text-[#6B7280] font-medium text-lg mb-12">Preencha os campos abaixo e entraremos em contato via WhatsApp com uma seleção exclusiva.</p>
            {!leadSent ? (
              <form onSubmit={handleLeadSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" required placeholder="Seu Nome Completo" className="w-full bg-white border border-black/5 rounded-xl px-8 py-5 outline-none focus:ring-2 focus:ring-[#4A5D4E] font-bold text-[#232323]" value={leadForm.nome} onChange={e => setLeadForm({ ...leadForm, nome: e.target.value })} />
                  <input type="tel" required placeholder="Seu WhatsApp (com DDD)" className="w-full bg-white border border-black/5 rounded-xl px-8 py-5 outline-none focus:ring-2 focus:ring-[#4A5D4E] font-bold text-[#232323]" value={leadForm.whatsapp} onChange={e => setLeadForm({ ...leadForm, whatsapp: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <select className="w-full bg-white border border-black/5 rounded-xl px-8 py-5 outline-none focus:ring-2 focus:ring-[#4A5D4E] font-bold text-[#232323] appearance-none" value={leadForm.tipo_imovel} onChange={e => setLeadForm({ ...leadForm, tipo_imovel: e.target.value })}>
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Studio">Studio</option>
                      <option value="Comercial">Sala Comercial</option>
                      <option value="Terreno">Terreno</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={20} />
                  </div>
                  <div className="relative">
                    <select className="w-full bg-white border border-black/5 rounded-xl px-8 py-5 outline-none focus:ring-2 focus:ring-[#4A5D4E] font-bold text-[#232323] appearance-none" value={leadForm.regiao_id} onChange={e => setLeadForm({ ...leadForm, regiao_id: e.target.value })} required>
                      <option value="">Região de Interesse</option>
                      {activeRegioes.map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={20} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#232323] text-white font-bold py-5 rounded-full shadow-2xl hover:bg-[#4A5D4E] transition-all text-base flex items-center justify-center gap-4 group">
                  <WhatsAppIcon size={28} />
                  Solicitar Curadoria Especializada
                </button>
              </form>
            ) : (
              <div className="py-20 flex flex-col items-center bg-white rounded-xl animate-in zoom-in-95 duration-500">
                <CheckCircle2 size={72} className="text-[#4A5D4E] mb-8" />
                <h3 className="text-4xl font-black text-[#232323]">Solicitação enviada!</h3>
                <p className="text-[#6B7280] font-bold text-xl mt-4">Nossos especialistas entrarão em contato em breve.</p>
                <button onClick={() => setLeadSent(false)} className="mt-10 text-[#4A5D4E] font-bold hover:underline">Enviar novo contato</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. LOCALIZAÇÃO */}
      {localizacao.ativo && (
        <section className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 text-[#232323] leading-tight">
                  {localizacao.headline || 'Onde estamos localizados'}
                </h2>
                <p className="text-xl text-[#6B7280] mb-16 font-medium max-w-lg leading-relaxed">
                  {localizacao.subheadline || 'Atendimento presencial com toda a infraestrutura para receber você e sua família.'}
                </p>

                <div className="space-y-6 mb-16">
                  <div className="bg-[#F1F1EE] p-8 rounded-xl flex gap-6 items-center border border-black/5 hover:border-[#4A5D4E] transition-all">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <MapPin size={24} className="text-[#4A5D4E]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] block mb-1">Nosso Endereço</span>
                      <span className="font-bold text-lg text-[#232323]">{localizacao.endereco}</span>
                    </div>
                  </div>
                </div>

                <a href={`https://www.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-[#232323] text-white px-10 py-5 rounded-full font-bold text-base shadow-xl shadow-black/10 hover:bg-[#4A5D4E] transition-all group">
                  Traçar Rota no Google Maps <MoveRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
              <div className="h-[650px] rounded-xl overflow-hidden shadow-2xl border-8 border-white">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  title="Localização"
                  src={`https://maps.google.com/maps?q=${localizacao.latitude},${localizacao.longitude}&z=16&output=embed`}
                  className="grayscale hover:grayscale-0 transition-all duration-1000 contrast-125"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. CTA FINAL */}
      <section className="pt-40 pb-20 bg-white px-4">
        <div className="max-w-6xl mx-auto bg-[#232323] rounded-xl p-16 md:p-32 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A5D4E]/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[1.1]">O próximo capítulo da sua vida começa aqui.</h2>
            <p className="text-white/60 mb-16 text-xl max-w-2xl mx-auto font-medium">Não deixe para amanhã o imóvel que pode ser o cenário dos seus melhores momentos hoje.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href={generalWhatsappLink} className="bg-[#4A5D4E] text-white px-10 py-5 rounded-full font-bold text-base hover:bg-[#5a6e5e] transition-all shadow-2xl flex items-center justify-center gap-4 group">
                <WhatsAppIcon size={28} className="group-hover:scale-110 transition-transform" />
                Iniciar no WhatsApp
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white/5 border border-white/20 text-white px-10 py-5 rounded-full font-bold text-base hover:bg-white/10 transition-all"
              >
                Voltar ao Topo
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          whatsappNumber={settings.contactWhatsapp}
        />
      )}
    </div>
  );
};

export default Home;
