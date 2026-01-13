
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Users, 
  Image as ImageIcon, Settings, LogOut, Home, Map, Wallet, ShieldCheck, MapPin
} from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

const AdminSidebar: React.FC = () => {
  const { setAuthenticated } = useAppState();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/');
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Building2 size={20} />, label: 'Imóveis', path: '/admin/properties' },
    { icon: <Map size={20} />, label: 'Regiões', path: '/admin/regioes' },
    { icon: <ShieldCheck size={20} />, label: 'Prova Social', path: '/admin/prova-social' },
    { icon: <Wallet size={20} />, label: 'Financiamento', path: '/admin/financiamento' },
    { icon: <MapPin size={20} />, label: 'Localização', path: '/admin/localizacao' },
    { icon: <Users size={20} />, label: 'Leads', path: '/admin/leads' },
    { icon: <ImageIcon size={20} />, label: 'Banners', path: '/admin/banners' },
    { icon: <Settings size={20} />, label: 'Configurações', path: '/admin/settings' },
  ];

  return (
    <aside className="w-72 bg-white min-h-screen flex flex-col border-r border-black/5 fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-2 text-[#232323] mb-12">
          <div className="bg-[#4A5D4E] p-2 rounded-xl text-white">
            <Building2 size={22} />
          </div>
          <span className="font-extrabold text-xl tracking-tighter uppercase">Nova<span className="text-[#4A5D4E]">Admin</span></span>
        </div>

        <nav className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-[#232323] text-white shadow-xl shadow-black/10' 
                    : 'text-[#6B7280] hover:text-[#232323] hover:bg-[#F1F1EE]'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-black/5">
        <NavLink 
          to="/"
          className="flex items-center gap-3 px-5 py-3 rounded-xl text-[#6B7280] font-bold text-sm hover:text-[#232323] hover:bg-[#F1F1EE] transition-all mb-2"
        >
          <Home size={18} />
          Ver Site
        </NavLink>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-3 rounded-xl text-rose-500/70 font-bold text-sm hover:text-rose-600 hover:bg-rose-50 transition-all w-full text-left"
        >
          <LogOut size={18} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
