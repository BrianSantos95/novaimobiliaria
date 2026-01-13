
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BedDouble, Bath, Square, Car, MapPin, 
  ChevronLeft, Share2, Heart, Send, CheckCircle2 
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Finalidade, Lead } from '../types';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { imoveis, addLead } = useAppState();
  const property = imoveis.find(i => i.id === id);

  // Fix: Form state updated to use 'whatsapp' and 'tipo_imovel' to comply with Lead interface
  const [contactForm, setContactForm] = React.useState({
    nome: '',
    whatsapp: '',
    tipo_imovel: property?.tipoImovel || 'Casa',
    mensagem: `Olá, tenho interesse no imóvel "${property?.titulo}". Gostaria de agendar uma visita.`
  });
  const [sent, setSent] = React.useState(false);

  if (!property) return <div className="p-20 text-center">Imóvel não encontrado.</div>;

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Added missing regiao_id property from the property object
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      nome: contactForm.nome,
      whatsapp: contactForm.whatsapp,
      tipo_imovel: contactForm.tipo_imovel,
      regiao_id: property.regiao_id,
      imovelId: property.id,
      imovelTitulo: property.titulo,
      dataEnvio: new Date().toISOString()
    };
    addLead(newLead);
    setSent(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-100 py-4 sticky top-20 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium">Voltar para a busca</span>
          </Link>
          <div className="flex gap-4">
            <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Share2 size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Heart size={20} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="col-span-3 row-span-2">
                <img src={property.imagens[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1">
                <img src={property.imagens[1] || 'https://picsum.photos/400/300'} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-1 row-span-1 relative">
                <img src={property.imagens[2] || 'https://picsum.photos/400/301'} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold cursor-pointer">
                  + Ver Todas
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full">
                  {property.tipoImovel}
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-black uppercase px-3 py-1 rounded-full">
                  {property.finalidade}
                </span>
              </div>
              
              <h1 className="text-4xl font-black text-slate-900 mb-4">{property.titulo}</h1>
              <div className="flex items-center gap-2 text-slate-400 mb-8">
                <MapPin size={18} className="text-emerald-500" />
                <span className="text-lg">{property.bairro}, {property.cidade}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-y border-slate-50">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Área Útil</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <Square size={20} className="text-emerald-500" />
                    {property.area} m²
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Quartos</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <BedDouble size={20} className="text-emerald-500" />
                    {property.quartos}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Banheiros</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <Bath size={20} className="text-emerald-500" />
                    {property.banheiros}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Vagas</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <Car size={20} className="text-emerald-500" />
                    {property.vagas}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Sobre este imóvel</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {property.descricao}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-40">
              <div className="mb-8">
                <p className="text-slate-400 font-bold uppercase text-xs mb-1">Preço do Imóvel</p>
                <div className="text-4xl font-black text-slate-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.preco)}
                  {property.finalidade === Finalidade.ALUGUEL && <span className="text-base text-slate-500 font-normal"> /mês</span>}
                </div>
              </div>

              {!sent ? (
                <form onSubmit={handleContact} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                      value={contactForm.nome}
                      onChange={e => setContactForm({ ...contactForm, nome: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Seu WhatsApp"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-colors"
                      value={contactForm.whatsapp}
                      onChange={e => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Mensagem"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 transition-all resize-none"
                      value={contactForm.mensagem}
                      onChange={e => setContactForm({ ...contactForm, mensagem: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Enviar Proposta
                  </button>
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-bold mt-4">
                    Responderemos em até 24 horas úteis.
                  </p>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Lead enviado com sucesso!</h3>
                  <p className="text-slate-500">Obrigado pelo contato. Nossa equipe entrará em contato em breve.</p>
                  <button 
                    onClick={() => setSent(false)}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
