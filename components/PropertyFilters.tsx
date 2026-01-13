
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { TipoImovel } from '../types';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

const PropertyFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    search: '',
    tipo: '',
    precoMax: '',
    quartos: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl -mt-10 relative z-10 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Localização</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="search"
              placeholder="Ex: Jardim Europa"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              value={filters.search}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Tipo de Imóvel</label>
          <select
            name="tipo"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none bg-white"
            value={filters.tipo}
            onChange={handleChange}
          >
            <option value="">Todos os tipos</option>
            {Object.values(TipoImovel).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Valor Máximo</label>
          <input
            type="number"
            name="precoMax"
            placeholder="R$ Infinito"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            value={filters.precoMax}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Quartos</label>
          <select
            name="quartos"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none bg-white"
            value={filters.quartos}
            onChange={handleChange}
          >
            <option value="">Qualquer quantidade</option>
            <option value="1">1+ Quartos</option>
            <option value="2">2+ Quartos</option>
            <option value="3">3+ Quartos</option>
            <option value="4">4+ Quartos</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
