
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

const WhatsAppIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Venda', path: '/venda' },
    { name: 'Aluguel', path: '/aluguel' },
    { name: 'Sobre', path: '/sobre' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="max-w-5xl w-full bg-white/80 backdrop-blur-xl border border-white/20 rounded-full px-4 md:px-8 py-3 flex justify-between items-center shadow-xl shadow-black/5">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-[#4A5D4E] p-2 rounded-xl text-white">
            <Home size={18} />
          </div>
          <span className="text-base font-extrabold tracking-tighter uppercase text-[#232323]">Nova<span className="text-[#4A5D4E]">Imobiliária</span></span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[13px] font-bold transition-all ${
                location.pathname === link.path ? 'text-[#4A5D4E]' : 'text-[#6B7280] hover:text-[#232323]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="https://wa.me/5582999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#232323] text-white px-5 md:px-7 py-2.5 rounded-full text-[12px] font-black hover:bg-[#4A5D4E] transition-all active:scale-95 shrink-0 flex items-center gap-2 shadow-lg shadow-black/10"
          >
            <WhatsAppIcon className="text-white" />
            Atendimento
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-[#232323] hover:bg-white/50 rounded-full transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 md:hidden z-40 flex flex-col p-6 pt-24 bg-[#F1F1EE]">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black text-[#232323] border-b border-black/5 pb-6"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-8">
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="text-[#4A5D4E] font-bold text-lg flex items-center gap-2"
              >
                Portal do Corretor
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
