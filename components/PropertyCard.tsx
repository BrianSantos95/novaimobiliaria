
import React from 'react';
import { MapPin, MoveRight, Square, BedDouble, Car } from 'lucide-react';
import { Imovel, Finalidade, Regiao, ImovelStatus } from '../types';

interface PropertyCardProps {
  property: Imovel;
  regiao: Regiao | undefined;
  onViewDetails: (property: Imovel) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, regiao, onViewDetails }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(property.preco);

  const regiaoNome = regiao?.nome || 'Maceió';

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-700 group flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.imagens[0]}
          alt={property.titulo}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 flex gap-3">
          {property.status === ImovelStatus.NOVO && (
            <span className="bg-[#4A5D4E] text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">Novo</span>
          )}
          {property.status === ImovelStatus.LANCAMENTO && (
            <span className="bg-[#232323] text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">Lançamento</span>
          )}
          {property.status === ImovelStatus.EM_BREVE && (
            <span className="bg-amber-500 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">Em Breve</span>
          )}
          {(property.status === ImovelStatus.INDISPONIVEL || property.status === ImovelStatus.VENDIDO || property.status === ImovelStatus.ALUGADO) && (
            <span className="bg-rose-500 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">{property.status}</span>
          )}
          {(property.status === ImovelStatus.DISPONIVEL && property.lancamento) && (
            <span className="bg-[#4A5D4E] text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">Novo</span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-[#232323] text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm">
            {property.finalidade}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[#6B7280] text-[10px] font-black uppercase tracking-widest mb-6">
          <MapPin size={12} className="text-[#4A5D4E]" />
          {regiaoNome} — {property.bairro}
        </div>

        <h3 className="text-2xl font-black text-[#232323] mb-4 leading-[1.1] group-hover:text-[#4A5D4E] transition-colors">
          {property.titulo}
        </h3>

        <p className="text-[#6B7280] text-sm font-medium mb-8 line-clamp-2 leading-relaxed">
          {property.descricao_curta}
        </p>

        {/* Principais informações do imóvel */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-[#232323]">
            <Square size={16} className="text-[#4A5D4E]" />
            <span className="text-sm font-black">{property.area}m²</span>
          </div>
          <div className="flex items-center gap-2 text-[#232323]">
            <BedDouble size={16} className="text-[#4A5D4E]" />
            <span className="text-sm font-black">{property.quartos} Quartos</span>
          </div>
          <div className="flex items-center gap-2 text-[#232323]">
            <Car size={16} className="text-[#4A5D4E]" />
            <span className="text-sm font-black">{property.vagas} Vagas</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
          <div>
            <span className="text-[#6B7280] text-[10px] font-black uppercase tracking-widest block mb-1">Valor do Imóvel</span>
            <div className="text-xl font-black text-[#232323]">
              {formattedPrice}
            </div>
          </div>

          <button
            onClick={() => onViewDetails(property)}
            className="w-12 h-12 bg-[#232323] text-white rounded-full flex items-center justify-center hover:bg-[#4A5D4E] transition-all hover:scale-110 shadow-xl"
          >
            <MoveRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
