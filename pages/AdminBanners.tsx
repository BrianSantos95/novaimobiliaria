
import React, { useState } from 'react';
import { Save, Image as ImageIcon, Plus, Trash2, Info, Monitor, Smartphone, Layout, Upload, Loader } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Banner } from '../types';
import { uploadImage } from '../services/supabaseService';

const AdminBanners: React.FC = () => {
  const { bannersPromocionais, bannersEmBreve, setBannersPromocionais, setBannersEmBreve } = useAppState();
  const [activeTab, setActiveTab] = useState<'PROMO' | 'EMBREVE'>('PROMO');
  const [uploading, setUploading] = useState<string | null>(null);

  const handleSave = (type: 'PROMO' | 'EMBREVE', banners: Banner[]) => {
    if (type === 'PROMO') setBannersPromocionais(banners);
    else setBannersEmBreve(banners);
    alert('Banners atualizados com sucesso!');
  };

  const BannerManager = ({ type, data }: { type: 'PROMO' | 'EMBREVE', data: Banner[] }) => {
    const [localBanners, setLocalBanners] = useState(data);

    const addBanner = () => {
      const newBanner: Banner = {
        id: Math.random().toString(36).substr(2, 9),
        titulo: '',
        imagem_desktop: '',
        imagem_mobile: '',
        texto_alt: '',
        ativo: true,
        ordem: localBanners.length + 1
      };
      setLocalBanners([...localBanners, newBanner]);
    };

    const updateBanner = (idx: number, field: keyof Banner, value: any) => {
      const updated = [...localBanners];
      updated[idx] = { ...updated[idx], [field]: value };
      setLocalBanners(updated);
    };

    const removeBanner = (idx: number) => {
      setLocalBanners(localBanners.filter((_, i) => i !== idx));
    };

    const handleUpload = async (idx: number, field: 'imagem_desktop' | 'imagem_mobile', file: File) => {
      try {
        setUploading(`${idx}-${field}`);
        const url = await uploadImage(file);
        updateBanner(idx, field, url);
      } catch (error) {
        alert('Erro ao fazer upload da imagem.' + error);
      } finally {
        setUploading(null);
      }
    };

    return (
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
            {type === 'PROMO' ? 'Banners Promocionais' : 'Banners Em Breve'}
          </h2>
          <button onClick={addBanner} className="bg-[#4A5D4E] text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-[#232323] transition-all">
            <Plus size={20} /> Adicionar Banner
          </button>
        </div>

        <div className="space-y-6">
          {localBanners.map((banner, idx) => (
            <div key={banner.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400"># Banner {idx + 1}</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <input type="checkbox" checked={banner.ativo} onChange={e => updateBanner(idx, 'ativo', e.target.checked)} className="w-4 h-4 rounded text-emerald-500" /> Ativo
                  </label>
                  <button onClick={() => removeBanner(idx)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all"><Trash2 size={18} /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Desktop Image */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2"><Monitor size={14} /> Imagem Desktop (1920x400)</label>
                  <div className="flex gap-2">
                    <input type="text" value={banner.imagem_desktop} onChange={e => updateBanner(idx, 'imagem_desktop', e.target.value)} placeholder="https://..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-emerald-500 font-medium text-sm" />
                    <label className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-xl px-4 flex items-center justify-center transition-all min-w-[60px]">
                      {uploading === `${idx}-imagem_desktop` ? <Loader size={20} className="animate-spin text-emerald-600" /> : <Upload size={20} className="text-slate-500" />}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(idx, 'imagem_desktop', e.target.files[0])} disabled={!!uploading} />
                    </label>
                  </div>
                  {banner.imagem_desktop && <img src={banner.imagem_desktop} alt="Preview" className="mt-4 w-full h-24 object-cover rounded-xl" />}
                </div>

                {/* Mobile Image */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2"><Smartphone size={14} /> Imagem Mobile</label>
                  <div className="flex gap-2">
                    <input type="text" value={banner.imagem_mobile} onChange={e => updateBanner(idx, 'imagem_mobile', e.target.value)} placeholder="https://..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-emerald-500 font-medium text-sm" />
                    <label className="bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-xl px-4 flex items-center justify-center transition-all min-w-[60px]">
                      {uploading === `${idx}-imagem_mobile` ? <Loader size={20} className="animate-spin text-emerald-600" /> : <Upload size={20} className="text-slate-500" />}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(idx, 'imagem_mobile', e.target.files[0])} disabled={!!uploading} />
                    </label>
                  </div>
                  {banner.imagem_mobile && <img src={banner.imagem_mobile} alt="Preview" className="mt-4 w-full h-24 object-cover rounded-xl" />}
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Texto Alt / SEO</label>
                  <input type="text" value={banner.texto_alt} onChange={e => updateBanner(idx, 'texto_alt', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Link de Ação (Opcional)</label>
                  <input type="text" value={banner.link_acao} onChange={e => updateBanner(idx, 'link_acao', e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-emerald-500 font-medium" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => handleSave(type, localBanners)} className="bg-[#232323] text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-[#4A5D4E] transition-all shadow-xl shadow-black/10">
          <Save size={20} /> Salvar Alterações {type === 'PROMO' ? 'Promocionais' : 'Em Breve'}
        </button>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Gestão de Banners</h1>
        <p className="text-slate-500 font-medium">Controle os destaques visuais e lançamentos futuros da sua landing page.</p>
      </div>

      <div className="flex gap-4 mb-12 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <button onClick={() => setActiveTab('PROMO')} className={`px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'PROMO' ? 'bg-[#232323] text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}>Promocionais</button>
        <button onClick={() => setActiveTab('EMBREVE')} className={`px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'EMBREVE' ? 'bg-[#232323] text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}>Seção "Em Breve"</button>
      </div>

      {activeTab === 'PROMO' ? (
        <BannerManager type="PROMO" data={bannersPromocionais} />
      ) : (
        <BannerManager type="EMBREVE" data={bannersEmBreve} />
      )}
    </div>
  );
};

export default AdminBanners;
