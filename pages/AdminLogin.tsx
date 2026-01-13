
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key, Lock } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setAuthenticated } = useAppState();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@prime.com' && password === 'admin123') {
      setAuthenticated(true);
      navigate('/admin/dashboard');
    } else {
      alert('Credenciais inválidas. Use admin@prime.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1EE] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="bg-[#4A5D4E] w-20 h-20 door-shape flex items-center justify-center mx-auto mb-8 text-white shadow-2xl">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-black text-[#232323] mb-3 tracking-tighter">Portal do Corretor</h1>
          <p className="text-[#6B7280] font-medium">Gestão exclusiva de ativos imobiliários Nova.</p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[#232323] text-[10px] font-black uppercase tracking-widest mb-3 block">Identificação</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-[#F1F1EE] border border-black/5 rounded-2xl px-6 py-4 text-[#232323] outline-none focus:border-[#4A5D4E] transition-all font-bold"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-[#232323] text-[10px] font-black uppercase tracking-widest mb-3 block">Chave de Acesso</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#F1F1EE] border border-black/5 rounded-2xl px-6 py-4 text-[#232323] outline-none focus:border-[#4A5D4E] transition-all font-bold"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#232323] text-white font-black py-5 rounded-full shadow-2xl shadow-black/10 hover:bg-[#4A5D4E] transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Key size={20} />
              Acessar Painel
            </button>
          </form>
        </div>

        <div className="mt-12 flex items-center gap-2 justify-center text-[#6B7280] text-xs font-bold uppercase tracking-widest">
          <ShieldAlert size={14} className="text-[#4A5D4E]" />
          Ambiente Seguro e Monitorado
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
