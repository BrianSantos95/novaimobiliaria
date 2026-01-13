
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Eye } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { Finalidade, ImovelStatus } from '../types';

const AdminProperties: React.FC = () => {
  const { imoveis, deleteImovel } = useAppState();
  const [search, setSearch] = React.useState('');

  const filtered = imoveis.filter(i => 
    i.titulo.toLowerCase().includes(search.toLowerCase()) || 
    i.bairro.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, titulo: string) => {
    if (confirm(`Remover definitivamente "${titulo}"?`)) {
      deleteImovel(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#232323] tracking-tighter mb-2">Imóveis</h1>
          <p className="text-[#6B7280] font-medium">Gestão detalhada do seu inventário imobiliário.</p>
        </div>
        <Link 
          to="/admin/properties/new"
          className="bg-[#232323] text-white px-10 py-4 rounded-full font-black shadow-2xl shadow-black/10 hover:bg-[#4A5D4E] transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
        >
          <Plus size={18} />
          Novo Imóvel
        </Link>
      </div>

      <div className="bg-white rounded-[3rem] border border-black/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-black/5 bg-[#F1F1EE]/30 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar portfólio..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-black/5 focus:border-[#4A5D4E] outline-none transition-all bg-white font-bold text-[#232323] text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-black/5 text-[#232323] font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
            <Filter size={18} />
            Filtrar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F1F1EE] text-[#6B7280] text-[10px] font-black uppercase tracking-[0.3em] border-b border-black/5">
              <tr>
                <th className="px-10 py-6 text-left">Referência</th>
                <th className="px-10 py-6 text-left">Imóvel</th>
                <th className="px-10 py-6 text-left">Valor</th>
                <th className="px-10 py-6 text-left">Status</th>
                <th className="px-10 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map(imovel => (
                <tr key={imovel.id} className="hover:bg-[#F1F1EE]/50 transition-colors group">
                  <td className="px-10 py-6 text-[10px] font-black text-[#6B7280] tracking-widest">
                    #{imovel.referencia}
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm shrink-0">
                        <img src={imovel.imagens[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-black text-[#232323] group-hover:text-[#4A5D4E] transition-colors">{imovel.titulo}</div>
                        <div className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider">{imovel.bairro} — {imovel.tipoImovel}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="font-black text-[#232323] text-lg tracking-tight">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(imovel.preco)}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full ${
                      imovel.status === ImovelStatus.DISPONIVEL ? 'bg-[#4A5D4E]/10 text-[#4A5D4E]' :
                      imovel.status === ImovelStatus.RESERVADO ? 'bg-amber-100 text-amber-700' :
                      'bg-[#F1F1EE] text-[#6B7280]'
                    }`}>
                      {imovel.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/imovel/${imovel.id}`} className="p-3 text-[#6B7280] hover:text-[#4A5D4E] hover:bg-[#F1F1EE] rounded-xl transition-all"><Eye size={18} /></Link>
                      <Link to={`/admin/properties/edit/${imovel.id}`} className="p-3 text-[#6B7280] hover:text-[#232323] hover:bg-[#F1F1EE] rounded-xl transition-all"><Edit size={18} /></Link>
                      <button onClick={() => handleDelete(imovel.id, imovel.titulo)} className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
