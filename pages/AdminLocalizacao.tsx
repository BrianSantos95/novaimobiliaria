
import React, { useState } from 'react';
import { Save, MapPin, Type, AlignLeft, Info, Map as MapIcon } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

const AdminLocalizacao: React.FC = () => {
  const { localizacao, updateLocalizacao } = useAppState();
  const [formData, setFormData] = useState(localizacao);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLocalizacao(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2 text-emerald-500">Onde estamos localizados</h1>
        <p className="text-slate-500 font-medium">Configure as informações de endereço e coordenadas do mapa para a landing page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <Info size={20} className="text-emerald-500" />
              Visibilidade da Seção
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.ativo}
                onChange={e => setFormData({...formData, ativo: e.target.checked})}
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="space-y-8 pt-6 border-t border-slate-50">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Título Principal</label>
              <div className="relative">
                <Type className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                  value={formData.headline}
                  onChange={e => setFormData({...formData, headline: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Subheadline</label>
              <div className="relative">
                <AlignLeft className="absolute left-5 top-6 text-slate-400" size={18} />
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium resize-none"
                  value={formData.subheadline}
                  onChange={e => setFormData({...formData, subheadline: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Endereço Completo (inclua emoji se desejar)</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                    value={formData.endereco}
                    onChange={e => setFormData({...formData, endereco: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Latitude</label>
                <div className="relative">
                  <MapIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    step="0.000001"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                    value={formData.latitude}
                    onChange={e => setFormData({...formData, latitude: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Longitude</label>
                <div className="relative">
                  <MapIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    step="0.000001"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                    value={formData.longitude}
                    onChange={e => setFormData({...formData, longitude: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
              Dica: Você pode encontrar as coordenadas clicando com o botão direito no local desejado no Google Maps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10"
          >
            <Save size={20} />
            Salvar Localização
          </button>
          {saved && <span className="text-emerald-500 font-bold animate-pulse">Endereço e mapa atualizados!</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminLocalizacao;
