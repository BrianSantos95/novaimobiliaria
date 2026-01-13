
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mail, Phone, Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#F1F1EE] pt-20 pb-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 mb-32">
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-10 group">
              <div className="bg-[#4A5D4E] p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                <Home size={28} />
              </div>
              <span className="text-3xl font-black tracking-tighter text-[#232323] uppercase">Nova<span className="text-[#4A5D4E]">Imobiliária</span></span>
            </Link>
            <p className="text-[#6B7280] font-medium leading-relaxed max-w-sm mb-12 text-lg">
              Abra a porta para novos momentos. Oferecemos as melhores oportunidades no mercado de alto padrão em Maceió.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-14 h-14 bg-white hover:bg-[#4A5D4E] border border-black/5 rounded-full transition-all flex items-center justify-center text-[#232323] hover:text-white shadow-sm hover:-translate-y-1"><Instagram size={24} /></a>
              <a href="#" className="w-14 h-14 bg-white hover:bg-[#4A5D4E] border border-black/5 rounded-full transition-all flex items-center justify-center text-[#232323] hover:text-white shadow-sm hover:-translate-y-1"><Facebook size={24} /></a>
              <a href="#" className="w-14 h-14 bg-white hover:bg-[#4A5D4E] border border-black/5 rounded-full transition-all flex items-center justify-center text-[#232323] hover:text-white shadow-sm hover:-translate-y-1"><Linkedin size={24} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black text-[#232323] uppercase tracking-[0.3em] mb-12">Navegação</h3>
            <ul className="space-y-6 text-[#6B7280] font-bold text-base">
              <li><Link to="/venda" className="hover:text-[#4A5D4E] transition-colors">Venda</Link></li>
              <li><Link to="/aluguel" className="hover:text-[#4A5D4E] transition-colors">Aluguel</Link></li>
              <li><Link to="/sobre" className="hover:text-[#4A5D4E] transition-colors">Sobre nós</Link></li>
              <li><Link to="/admin" className="text-[#4A5D4E] underline">Portal do Corretor</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-black text-[#232323] uppercase tracking-[0.3em] mb-12">Contato</h3>
            <ul className="space-y-6 text-[#6B7280] font-bold text-base">
              <li>
                <a href="tel:82999999999" className="flex items-center gap-4 group hover:text-[#232323] transition-colors">
                  <div className="w-12 h-12 shrink-0 bg-white rounded-xl flex items-center justify-center shadow-sm border border-black/5 group-hover:border-[#4A5D4E] group-hover:bg-[#4A5D4E] group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <span className="text-sm md:text-base">(82) 99999-9999</span>
                </a>
              </li>
              <li>
                <a href="mailto:contato@novaimobiliaria.com.br" className="flex items-center gap-4 group hover:text-[#232323] transition-colors">
                  <div className="w-12 h-12 shrink-0 bg-white rounded-xl flex items-center justify-center shadow-sm border border-black/5 group-hover:border-[#4A5D4E] group-hover:bg-[#4A5D4E] group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <span className="text-sm md:text-base break-words">contato@novaimobiliaria.com.br</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-20 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-[#6B7280] text-[12px] font-black uppercase tracking-widest">© 2024 Nova Imobiliária. Todos os direitos reservados.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 text-[#232323] font-black text-[12px] uppercase tracking-widest"
          >
            Voltar ao topo
            <div className="w-12 h-12 bg-[#232323] text-white rounded-full flex items-center justify-center group-hover:-translate-y-2 transition-transform shadow-xl shadow-black/20">
              <ArrowUp size={20} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
