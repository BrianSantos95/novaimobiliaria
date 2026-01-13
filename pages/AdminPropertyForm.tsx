
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft, Save, Plus, Trash2,
  Sparkles, AlertCircle, Info, MapPin, Image as ImageIcon, LayoutList, Wallet, X, Building2, ChevronDown
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Imovel, TipoImovel, Finalidade, ImovelStatus } from '../types';
import { GoogleGenAI } from '@google/genai';

const AdminPropertyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { imoveis, regioes, addImovel, updateImovel } = useAppState();

  const isEdit = Boolean(id);
  const existingProperty = imoveis.find(i => i.id === id);

  const [formData, setFormData] = React.useState<Partial<Imovel>>(
    existingProperty || {
      titulo: '',
      descricao_curta: '',
      descricao_completa: '',
      tipoImovel: TipoImovel.APARTAMENTO,
      finalidade: Finalidade.VENDA,
      regiao_id: regioes[0]?.id || '',
      preco: 0,
      valor_condominio: 0,
      valor_iptu: 0,
      quartos: 0,
      banheiros: 0,
      vagas: 0,
      area: 0,
      cidade: 'Maceió',
      bairro: '',
      status: ImovelStatus.DISPONIVEL,
      destaque: false,
      lancamento: false,
      referencia: `PR-${Math.floor(Math.random() * 1000)}`,
      imagens: [],
      areas_privativas: [],
      areas_comuns: [],
      diferenciais: [],
      ativo: true,
      dataCriacao: new Date().toISOString()
    }
  );

  const [aiLoading, setAiLoading] = React.useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newItemValue, setNewItemValue] = React.useState('');
  const [activeListField, setActiveListField] = React.useState<'areas_privativas' | 'areas_comuns' | 'diferenciais' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleListInput = (field: 'areas_privativas' | 'areas_comuns' | 'diferenciais') => {
    setActiveListField(field);
    setNewItemValue('');
    setIsModalOpen(true);
  };

  const confirmAddItem = () => {
    if (newItemValue && activeListField) {
      setFormData(prev => ({
        ...prev,
        [activeListField]: [...(prev[activeListField] || []), newItemValue]
      }));
      setIsModalOpen(false);
    }
  };

  const removeListItem = (field: 'areas_privativas' | 'areas_comuns' | 'diferenciais', idx: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] || []).filter((_, i) => i !== idx) }));
  };

  const handleImageAdd = () => {
    const url = prompt('URL da imagem:');
    if (url) setFormData(prev => ({ ...prev, imagens: [...(prev.imagens || []), url] }));
  };

  const removeImage = (idx: number) => {
    setFormData(prev => ({ ...prev, imagens: (prev.imagens || []).filter((_, i) => i !== idx) }));
  };

  const generateAIDescription = async () => {
    if (!formData.titulo) return alert('Defina um título primeiro.');
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Escreva uma descrição atraente para o imóvel "${formData.titulo}" em Maceió. Foco em sofisticação e estilo de vida.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      if (response.text) setFormData(prev => ({ ...prev, descricao_completa: response.text }));
    } catch (err) { console.error(err); } finally { setAiLoading(false); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && id) updateImovel(formData as Imovel);
    else addImovel({ ...formData, id: Math.random().toString(36).substr(2, 9), dataCriacao: new Date().toISOString() } as Imovel);
    navigate('/admin/properties');
  };

  return (
    <div className="max-w-5xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6B7280] font-black uppercase text-[10px] tracking-[0.2em] hover:text-[#232323] transition-all">
          <ChevronLeft size={16} /> Voltar ao Portfólio
        </button>
        <button onClick={handleSubmit} className="bg-[#232323] text-white px-10 py-5 rounded-full font-black shadow-2xl shadow-black/10 hover:bg-[#4A5D4E] transition-all flex items-center gap-3 text-sm tracking-widest uppercase">
          <Save size={20} /> Salvar Imóvel
        </button>
      </div>

      <h1 className="text-5xl font-black text-[#232323] tracking-tighter mb-12">{isEdit ? 'Editar Detalhes' : 'Cadastrar Ativo'}</h1>

      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-[#232323] flex items-center gap-4 tracking-tight">
            <div className="w-10 h-10 bg-[#F1F1EE] rounded-xl flex items-center justify-center text-[#4A5D4E]"><Info size={20} /></div>
            Essenciais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-3 block">Título Principal</label>
              <input type="text" name="titulo" className="w-full bg-[#F1F1EE] border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-[#4A5D4E] font-bold text-[#232323]" value={formData.titulo} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-3 block">Referência</label>
              <input type="text" name="referencia" className="w-full bg-[#F1F1EE] border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-[#4A5D4E] font-bold text-[#232323]" value={formData.referencia} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-3 block">Região</label>
              <div className="relative">
                <select name="regiao_id" className="w-full bg-[#F1F1EE] border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-[#4A5D4E] font-bold text-[#232323] appearance-none" value={formData.regiao_id} onChange={handleChange}>
                  {regioes.map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={20} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-3 block">Status / Etiqueta</label>
              <div className="relative">
                <select name="status" className="w-full bg-[#F1F1EE] border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-[#4A5D4E] font-bold text-[#232323] appearance-none" value={formData.status} onChange={handleChange}>
                  {Object.values(ImovelStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-sm space-y-10">
          <h2 className="text-2xl font-black text-[#232323] flex items-center gap-4 tracking-tight">
            <div className="w-10 h-10 bg-[#F1F1EE] rounded-xl flex items-center justify-center text-[#4A5D4E]"><LayoutList size={20} /></div>
            Narrativa do Imóvel
          </h2>
          <div className="space-y-8">
            <button type="button" onClick={generateAIDescription} disabled={aiLoading} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white bg-[#4A5D4E] px-8 py-3 rounded-full hover:bg-[#232323] transition-all">
              <Sparkles size={16} /> {aiLoading ? 'Processando...' : 'Reescrever com IA'}
            </button>
            <textarea name="descricao_completa" rows={10} className="w-full bg-[#F1F1EE] border border-black/5 rounded-[2rem] px-8 py-8 outline-none focus:border-[#4A5D4E] font-medium text-[#232323] resize-none leading-relaxed" value={formData.descricao_completa} onChange={handleChange} placeholder="Descreva a experiência de viver neste imóvel..." />
          </div>
        </div>

        <div className="bg-[#232323] p-12 rounded-[3.5rem] space-y-10 text-white">
          <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-3 text-white"><Wallet size={20} /> Dados Financeiros & Métricas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">Preço (R$)</label>
              <input type="number" name="preco" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.preco} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">Condomínio (R$)</label>
              <input type="number" name="valor_condominio" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.valor_condominio} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">IPTU (R$)</label>
              <input type="number" name="valor_iptu" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.valor_iptu} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">Área (m²)</label>
              <input type="number" name="area" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.area} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">Quartos</label>
              <input type="number" name="quartos" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.quartos} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">Suítes/Banheiros</label>
              <input type="number" name="banheiros" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.banheiros} onChange={handleChange} />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 block">Vagas</label>
              <input type="number" name="vagas" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#4A5D4E] font-black text-xl text-white" value={formData.vagas} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-sm space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-[#232323] flex items-center gap-4 tracking-tight">
              <div className="w-10 h-10 bg-[#F1F1EE] rounded-xl flex items-center justify-center text-[#4A5D4E]"><Sparkles size={20} /></div>
              Características do Imóvel
            </h2>
            <button type="button" onClick={() => handleListInput('areas_privativas')} className="bg-[#F1F1EE] text-[#4A5D4E] p-4 rounded-full hover:bg-[#4A5D4E] hover:text-white transition-all"><Plus size={20} /></button>
          </div>
          <div className="flex flex-wrap gap-3">
            {(formData.areas_privativas || []).map((item, idx) => (
              <span key={idx} className="bg-[#F1F1EE] pl-6 pr-4 py-3 rounded-full text-xs font-bold text-[#6B7280] flex items-center gap-3 group hover:bg-rose-50 transition-colors">
                {item}
                <button onClick={() => removeListItem('areas_privativas', idx)} className="text-[#6B7280] group-hover:text-rose-500 transition-colors"><X size={14} /></button>
              </span>
            ))}
            {(formData.areas_privativas || []).length === 0 && <p className="text-[#6B7280] font-medium opacity-50 italic">Nenhuma característica adicionada. Clique no + para incluir itens.</p>}
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-sm space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-[#232323] flex items-center gap-4 tracking-tight">
              <div className="w-10 h-10 bg-[#F1F1EE] rounded-xl flex items-center justify-center text-[#4A5D4E]"><Building2 size={20} /></div>
              Características do Condomínio
            </h2>
            <button type="button" onClick={() => handleListInput('areas_comuns')} className="bg-[#F1F1EE] text-[#4A5D4E] p-4 rounded-full hover:bg-[#4A5D4E] hover:text-white transition-all"><Plus size={20} /></button>
          </div>
          <div className="flex flex-wrap gap-3">
            {(formData.areas_comuns || []).map((item, idx) => (
              <span key={idx} className="bg-[#F1F1EE] pl-6 pr-4 py-3 rounded-full text-xs font-bold text-[#6B7280] flex items-center gap-3 group hover:bg-rose-50 transition-colors">
                {item}
                <button onClick={() => removeListItem('areas_comuns', idx)} className="text-[#6B7280] group-hover:text-rose-500 transition-colors"><X size={14} /></button>
              </span>
            ))}
            {(formData.areas_comuns || []).length === 0 && <p className="text-[#6B7280] font-medium opacity-50 italic">Nenhuma característica do condomínio adicionada. Clique no + para incluir itens como "Piscina", "Academia", etc.</p>}
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-sm space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-[#232323] tracking-tight">Galeria Nova</h2>
            <button type="button" onClick={handleImageAdd} className="bg-[#F1F1EE] text-[#4A5D4E] p-4 rounded-full hover:bg-[#4A5D4E] hover:text-white transition-all"><Plus size={20} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(formData.imagens || []).map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-[2rem] overflow-hidden group">
                <img src={img} className="w-full h-full object-cover" alt="" />
                <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-rose-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={24} /></button>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full bg-[#232323] text-white py-8 rounded-full font-black text-2xl tracking-tighter hover:bg-[#4A5D4E] transition-all shadow-2xl">
          Publicar Portfólio Nova
        </button>
      </div>

      {/* Custom Modal for Inputs */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-[#232323] mb-6">Adicionar Novo Item</h3>
            <input
              autoFocus
              type="text"
              className="w-full bg-[#F1F1EE] border border-black/5 rounded-xl px-6 py-4 outline-none focus:border-[#4A5D4E] focus:ring-2 focus:ring-[#4A5D4E]/20 font-bold text-[#232323] mb-8 text-lg placeholder:text-gray-400"
              placeholder="Digite o nome do diferencial..."
              value={newItemValue}
              onChange={e => setNewItemValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && confirmAddItem()}
            />
            <div className="flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-xl font-bold text-[#6B7280] hover:bg-[#F1F1EE] hover:text-[#232323] transition-all">Cancelar</button>
              <button onClick={confirmAddItem} className="flex-1 py-4 rounded-xl font-bold text-white bg-[#232323] hover:bg-[#4A5D4E] transition-all shadow-lg">Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyForm;
