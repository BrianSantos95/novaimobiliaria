
import React from 'react';
import { MessageCircle, ExternalLink, Trash2, Calendar, User } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

const AdminLeads: React.FC = () => {
  const { leads } = useAppState();

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Leads Recebidos</h1>
        <p className="text-slate-500 font-medium">Interessados que preencheram o formulário da landing page.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              <th className="px-10 py-6 text-left">Contato</th>
              <th className="px-10 py-6 text-left">Interesse</th>
              <th className="px-10 py-6 text-left">Data</th>
              <th className="px-10 py-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="font-black text-slate-900">{lead.nome}</div>
                      <a 
                        href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 font-bold flex items-center gap-1 hover:underline"
                      >
                        <MessageCircle size={12} fill="currentColor" />
                        {lead.whatsapp}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <div className="font-bold text-slate-600">{lead.tipo_imovel}</div>
                  {lead.imovelTitulo && <div className="text-xs text-slate-400 truncate max-w-[200px]">{lead.imovelTitulo}</div>}
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar size={14} />
                    {new Date(lead.dataEnvio).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-10 py-24 text-center">
                  <div className="max-w-xs mx-auto text-slate-400">
                    <MessageCircle size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="font-bold">Nenhum lead recebido ainda.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeads;
