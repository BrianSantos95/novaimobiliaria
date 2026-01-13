
import React, { useRef, useState } from 'react';
import { Save, Globe, MessageCircle, Type, Image as ImageIcon, Upload, Trash2, Loader2 } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { uploadImage } from '../services/supabaseService';
import { SiteSettings } from '../types';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAppState();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const headerImageInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof SiteSettings) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        const url = await uploadImage(file);
        setFormData(prev => ({
          ...prev,
          [field]: url
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Erro ao fazer upload da imagem. Tente novamente.');
      } finally {
        setUploading(false);
      }
    }
  };

  const removeHeaderImage = () => {
    setFormData(prev => ({ ...prev, propertiesHeaderImage: undefined }));
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Configurações Gerais</h1>
        <p className="text-slate-500 font-medium">Gerencie os textos e imagens de suporte da sua Landing Page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Type size={20} className="text-emerald-500" />
              Intro / Hero Section
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Headline</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                  value={formData.heroHeadline}
                  onChange={e => setFormData({ ...formData, heroHeadline: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Subheadline</label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium resize-none"
                  value={formData.heroSubheadline}
                  onChange={e => setFormData({ ...formData, heroSubheadline: e.target.value })}
                />
              </div>

              {/* Hero Image Upload */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Imagem de Fundo (Hero)</label>
                <div className="w-full h-64 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center relative group">
                  {formData.heroBackgroundImage ? (
                    <>
                      <img src={formData.heroBackgroundImage} className="w-full h-full object-cover" alt="Hero Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => heroImageInputRef.current?.click()}
                          className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                        >
                          <Upload size={16} /> Trocar
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, heroBackgroundImage: undefined }))}
                          className="bg-rose-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                        >
                          <Trash2 size={16} /> Remover
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <button
                        type="button"
                        onClick={() => heroImageInputRef.current?.click()}
                        className="bg-[#4A5D4E] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 mb-2"
                      >
                        <Upload size={18} /> Selecionar Imagem
                      </button>
                      <p className="text-xs text-slate-400 font-medium">Recomendado: 1920 x 1080 px (Alta Resolução)</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={heroImageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'heroBackgroundImage')}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <ImageIcon size={20} className="text-emerald-500" />
              Seção Destaques da Semana
            </h2>
            <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Banner da Seção (Opcional)</label>
              <div className="w-full h-48 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center relative group">
                {formData.propertiesHeaderImage ? (
                  <>
                    <img src={formData.propertiesHeaderImage} className="w-full h-full object-cover" alt="Header Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => headerImageInputRef.current?.click()}
                        className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Upload size={16} /> Trocar
                      </button>
                      <button
                        type="button"
                        onClick={removeHeaderImage}
                        className="bg-rose-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Trash2 size={16} /> Remover
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8">
                    <button
                      type="button"
                      onClick={() => headerImageInputRef.current?.click()}
                      className="bg-[#4A5D4E] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 mb-2"
                    >
                      <Upload size={18} /> Selecionar Imagem
                    </button>
                    <p className="text-xs text-slate-400 font-medium">Tamanho Ideal: 1400 x 300 px</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={headerImageInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'propertiesHeaderImage')}
              />
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <MessageCircle size={20} className="text-emerald-500" />
              Integração WhatsApp
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Número Geral (Com DDD)</label>
                <input
                  type="text"
                  placeholder="Ex: 5511999999999"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                  value={formData.contactWhatsapp}
                  onChange={e => setFormData({ ...formData, contactWhatsapp: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            <Save size={20} />
            Salvar Configurações
          </button>
          {saved && <span className="text-emerald-500 font-bold animate-pulse">Configurações salvas!</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
