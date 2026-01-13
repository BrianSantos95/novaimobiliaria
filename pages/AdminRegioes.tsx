
import React from 'react';
import { Plus, Trash2, MapPin, Image as ImageIcon, Star } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Regiao } from '../types';

const AdminRegioes: React.FC = () => {
  const { regioes, addRegiao, deleteRegiao } = useAppState();
  const [formData, setFormData] = React.useState({
    nome: '',
    imagem: '',
    destaque: false
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome) return;
    const reg: Regiao = {
      id: Math.random().toString(36).substr(2, 9),
      nome: formData.nome,
      imagem: formData.imagem || 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763',
      cidade: 'Maceió',
      estado: 'AL',
      destaque: formData.destaque,
      ativo: true
    };
    addRegiao(reg);
    setFormData({ nome: '', imagem: '', destaque: false });
  };

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Regiões de Maceió</h1>
        <p className="text-slate-500 font-medium">Cadastre bairros com fotos para exibição no carrossel do site.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-10 py-6 text-left">Bairro</th>
                <th className="px-10 py-6 text-left">Destaque</th>
                <th className="px-10 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {regioes.map(reg => (
                <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <img src={reg.imagem} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div className="font-bold text-slate-900">{reg.nome}</div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    {reg.destaque ? <Star className="text-amber-500" size={18} fill="currentColor" /> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button onClick={() => deleteRegiao(reg.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <form onSubmit={handleAdd} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Plus size={20} className="text-emerald-500" /> Novo Bairro
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Nome do Bairro</label>
                <input 
                  type="text" 
                  placeholder="Ex: Ponta Verde"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">URL da Imagem</label>
                <div className="relative">
                  <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-medium"
                    value={formData.imagem}
                    onChange={e => setFormData({...formData, imagem: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="reg_destaque"
                  className="w-5 h-5 rounded border-slate-200 text-emerald-500" 
                  checked={formData.destaque}
                  onChange={e => setFormData({...formData, destaque: e.target.checked})}
                />
                <label htmlFor="reg_destaque" className="text-sm font-bold text-slate-600 cursor-pointer">Marcar como destaque</label>
              </div>
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
              Salvar Região
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegioes;
