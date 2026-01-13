
import React from 'react';
import {
  Building2, Users, MousePointer2, TrendingUp,
  ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { ImovelStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const { imoveis, leads } = useAppState();

  const stats = [
    {
      label: 'Imóveis Ativos',
      value: imoveis.filter(i => i.ativo).length,
      icon: <Building2 />,
      change: '+12%',
      isUp: true
    },
    {
      label: 'Leads Recebidos',
      value: leads.length,
      icon: <Users />,
      change: '+25%',
      isUp: true
    },
    {
      label: 'Visualizações',
      value: '14.2k',
      icon: <MousePointer2 />,
      change: '-4%',
      isUp: false
    },
    {
      label: 'Conversão',
      value: '3.2%',
      icon: <TrendingUp />,
      change: '+1.5%',
      isUp: true
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#232323] mb-2 tracking-tighter">Dashboard</h1>
          <p className="text-[#6B7280] font-medium">Monitoramento em tempo real do seu portfólio.</p>
        </div>
        <div className="bg-white border border-black/5 px-6 py-3 rounded-full flex items-center gap-3 text-[#232323] font-bold shadow-sm">
          <Calendar size={18} className="text-[#4A5D4E]" />
          {new Date().toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl border border-black/5 shadow-sm group hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-[#F1F1EE] text-[#4A5D4E] rounded-xl group-hover:bg-[#4A5D4E] group-hover:text-white transition-colors">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-[#4A5D4E]' : 'text-rose-500'}`}>
                {stat.change}
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="text-[#6B7280] font-black uppercase text-[10px] mb-2 tracking-widest">{stat.label}</div>
            <div className="text-4xl font-black text-[#232323] tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-black/5 flex justify-between items-center">
            <h3 className="font-black text-2xl text-[#232323] tracking-tight">Leads Recentes</h3>
            <button className="text-[#4A5D4E] font-black text-xs uppercase tracking-widest hover:underline">Ver Todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F1F1EE] text-[#6B7280] text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-5 text-left">Contato</th>
                  <th className="px-10 py-5 text-left">Imóvel</th>
                  <th className="px-10 py-5 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {leads.slice(0, 5).map(lead => (
                  <tr key={lead.id} className="hover:bg-[#F1F1EE]/50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="font-black text-[#232323]">{lead.nome}</div>
                      <div className="text-xs text-[#6B7280] font-bold">{lead.whatsapp}</div>
                    </td>
                    <td className="px-10 py-6 text-[#6B7280] text-sm font-bold truncate max-w-[200px]">{lead.imovelTitulo}</td>
                    <td className="px-10 py-6">
                      <span className="bg-[#4A5D4E]/10 text-[#4A5D4E] text-[10px] font-black uppercase px-3 py-1.5 rounded-full">Novo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-black/5 shadow-sm p-10">
          <h3 className="font-black text-2xl text-[#232323] mb-10 tracking-tight">Status da Carteira</h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3">
                <span className="text-[#6B7280]">Disponíveis</span>
                <span className="text-[#232323]">{imoveis.filter(i => i.status === ImovelStatus.DISPONIVEL).length}</span>
              </div>
              <div className="h-3 bg-[#F1F1EE] rounded-full overflow-hidden">
                <div className="h-full bg-[#4A5D4E]" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3">
                <span className="text-[#6B7280]">Vendidos</span>
                <span className="text-[#232323]">{imoveis.filter(i => i.status === ImovelStatus.VENDIDO).length}</span>
              </div>
              <div className="h-3 bg-[#F1F1EE] rounded-full overflow-hidden">
                <div className="h-full bg-[#232323]" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-[#232323] rounded-xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-black text-xl mb-3 tracking-tight">Nova Inteligência</h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed">Imóveis com vídeos capturados em Maceió recebem 60% mais atenção.</p>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4A5D4E]/20 blur-[60px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
