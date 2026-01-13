
import React, { useState, useRef } from 'react';
import { Save, Users, Image as ImageIcon, Plus, Trash2, Info, Upload } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Metrica } from '../types';

const AdminProvaSocial: React.FC = () => {
  const { provaSocial, updateProvaSocial } = useAppState();
  const [formData, setFormData] = useState(provaSocial);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProvaSocial(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          // Preservar transparência para PNG e fundo branco para outros
          if (file.type === 'image/png') {
            ctx?.clearRect(0, 0, width, height);
          } else {
            if (ctx) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, width, height);
            }
          }

          ctx?.drawImage(img, 0, 0, width, height);

          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          resolve(canvas.toDataURL(outputType, outputType === 'image/jpeg' ? 0.8 : undefined));
        };
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file);
        setFormData(prev => ({
          ...prev,
          imagens: [compressedBase64]
        }));
      } catch (err) {
        console.error('Erro ao comprimir imagem', err);
      }
    }
  };

  const handleAddMetrica = () => {
    setFormData(prev => ({
      ...prev,
      metricas: [...prev.metricas, { label: '', valor: 0 }]
    }));
  };

  const handleRemoveMetrica = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      metricas: prev.metricas.filter((_, i) => i !== idx)
    }));
  };

  const handleMetricaChange = (idx: number, field: keyof Metrica, value: string | number) => {
    const newMetricas = [...formData.metricas];
    newMetricas[idx] = { ...newMetricas[idx], [field]: value };
    setFormData({ ...formData, metricas: newMetricas });
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2 text-emerald-500">Gestão de História & Prova Social</h1>
        <p className="text-slate-500 font-medium">Configure a narrativa e a imagem de destaque da sua trajetória.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <Info size={20} className="text-emerald-500" />
              Exibição da Seção
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.ativo}
                onChange={e => setFormData({ ...formData, ativo: e.target.checked })}
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="space-y-8 pt-6 border-t border-slate-50">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Título Principal</label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                value={formData.titulo}
                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Subtítulo (Abaixo do título)</label>
              <textarea
                rows={3}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium resize-none"
                value={formData.subtitulo}
                onChange={e => setFormData({ ...formData, subtitulo: e.target.value })}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Imagem Principal</h3>
              <div className="w-full max-w-sm mx-auto aspect-[3/4] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 relative group">
                {formData.imagens[0] ? (
                  <img src={formData.imagens[0]} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon size={48} className="mx-auto mb-4 text-slate-300" />
                    <p className="text-slate-400 font-bold">Nenhuma imagem selecionada</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-slate-900 px-6 py-3 rounded-full font-black flex items-center gap-2 shadow-xl"
                  >
                    <Upload size={18} />
                    Trocar Imagem
                  </button>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <p className="mt-4 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                Tamanho Ideal: 800 x 1200 px (2:3) - Vertical
              </p>
            </div>

            <div className="pt-8 border-t border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <Users size={20} className="text-emerald-500" />
                  Métricas de Sucesso
                </h3>
                <button
                  type="button"
                  onClick={handleAddMetrica}
                  className="flex items-center gap-2 text-sm font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl"
                >
                  <Plus size={16} /> Adicionar Métrica
                </button>
              </div>

              <div className="space-y-4">
                {formData.metricas.map((m, idx) => (
                  <div key={idx} className="flex gap-4 items-end bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                    <div className="flex-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Texto descritivo</label>
                      <input
                        type="text"
                        className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-medium"
                        value={m.label}
                        onChange={e => handleMetricaChange(idx, 'label', e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Valor</label>
                      <input
                        type="number"
                        className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-medium"
                        value={m.valor}
                        onChange={e => handleMetricaChange(idx, 'valor', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMetrica(idx)}
                      className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10"
          >
            <Save size={20} />
            Salvar Conteúdo
          </button>
          {saved && <span className="text-emerald-500 font-bold animate-pulse">Conteúdo atualizado!</span>}
        </div>
      </form >
    </div >
  );
};

export default AdminProvaSocial;
