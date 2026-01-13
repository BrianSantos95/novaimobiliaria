
import React from 'react';
import { Save, Wallet, Type, AlignLeft, Info, Image as ImageIcon, Upload } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

const AdminFinanciamento: React.FC = () => {
  const { financiamento, updateFinanciamento } = useAppState();
  const [formData, setFormData] = React.useState(financiamento);
  const [saved, setSaved] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFinanciamento(formData);
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
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to JPEG with 70% quality
        };
      };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem é muito grande. O sistema tentará comprimi-la, mas recomenda-se usar imagens menores que 5MB.');
      }
      try {
        const compressedBase64 = await compressImage(file);
        setFormData(prev => ({ ...prev, imagem: compressedBase64 }));
      } catch (err) {
        console.error('Erro ao processar imagem', err);
        alert('Erro ao processar a imagem. Tente uma imagem menor.');
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2 text-emerald-500">Financiamento Imobiliário</h1>
        <p className="text-slate-500 font-medium">Gerencie a exibição e os textos da seção de soluções financeiras.</p>
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
                onChange={e => setFormData({ ...formData, ativo: e.target.checked })}
              />
              <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="space-y-8 pt-6 border-t border-slate-50">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Título da Seção</label>
              <div className="relative">
                <Type className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                  value={formData.titulo}
                  onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Descrição (Subtítulo)</label>
              <div className="relative">
                <AlignLeft className="absolute left-5 top-6 text-slate-400" size={18} />
                <textarea
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium resize-none"
                  value={formData.descricao}
                  onChange={e => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Destaques (Separados por • )</label>
              <textarea
                rows={3}
                placeholder="Item 1 • Item 2 • Item 3"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium resize-none"
                value={formData.texto_destaque}
                onChange={e => setFormData({ ...formData, texto_destaque: e.target.value })}
              />
              <p className="mt-3 text-xs text-slate-400 font-medium">Use o ponto central ( • ) para criar os tópicos automáticos.</p>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Imagem da Seção</label>

              <div className="flex flex-col gap-4">
                {/* Preview e Upload */}
                <div
                  onClick={() => document.getElementById('finance-image-upload')?.click()}
                  className="relative aspect-[3/4] w-full max-w-md mx-auto bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all overflow-hidden group"
                >
                  {formData.imagem ? (
                    <>
                      <img src={formData.imagem} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white font-bold gap-2">
                        <Upload size={24} /> Trocar Imagem
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <Upload size={32} />
                      <span className="font-bold">Clique para upload</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 font-medium text-center">
                  Recomendado: 800x1000px (Vertical) ou Quadrado. Jpg/Png.
                </p>

                <input
                  id="finance-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Fallback URL Input */}
                <div className="relative">
                  <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Ou cole uma URL externa..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium text-sm text-slate-500"
                    value={formData.imagem?.startsWith('data:') ? '' : formData.imagem}
                    onChange={e => setFormData({ ...formData, imagem: e.target.value })}
                  />
                </div>
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
            Salvar Configurações
          </button>
          {saved && <span className="text-emerald-500 font-bold animate-pulse">Solução financeira atualizada!</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminFinanciamento;
