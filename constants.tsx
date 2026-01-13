
import { Finalidade, TipoImovel, ImovelStatus, Imovel, Banner, SiteSettings, Regiao, FinanciamentoSettings, ProvaSocial, LocalizacaoSettings } from './types';

export const INITIAL_REGIOES: Regiao[] = [
  { id: '1', nome: 'Ponta Verde', cidade: 'Maceió', estado: 'AL', imagem: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&q=80&w=600', destaque: true, ativo: true },
  { id: '2', nome: 'Jatiúca', cidade: 'Maceió', estado: 'AL', imagem: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600', destaque: true, ativo: true },
  { id: '3', nome: 'Pajuçara', cidade: 'Maceió', estado: 'AL', imagem: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=600', destaque: true, ativo: true },
  { id: '4', nome: 'Cruz das Almas', cidade: 'Maceió', estado: 'AL', imagem: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', destaque: true, ativo: true },
];

export const INITIAL_PROVA_SOCIAL: ProvaSocial = {
  id: 'main',
  titulo: 'Estamos em Maceió para fazer história',
  subtitulo: 'Ajudamos centenas de famílias a encontrarem o lugar perfeito para viver em Alagoas.',
  imagens: [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', 
    'https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&q=80&w=600', 
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=600', 
  ],
  metricas: [
    { label: 'famílias atendidas', valor: 80 },
    { label: 'casas financiadas e vendidas', valor: 33 },
    { label: 'imóveis alugados', valor: 56 },
    { label: 'anos realizando sonhos', valor: 5 },
  ],
  ativo: true
};

export const INITIAL_FINANCIAMENTO: FinanciamentoSettings = {
  id: 'main',
  titulo: 'A solução completa para o seu financiamento',
  descricao: 'Opções flexíveis para realizar seu sonho com tranquilidade.',
  texto_destaque: 'Financiamento residencial ou comercial • Até 90% do valor do imóvel • Prazo de até 360 meses • Melhores taxas do mercado',
  imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  ativo: true
};

export const INITIAL_LOCALIZACAO: LocalizacaoSettings = {
  id: 'main',
  headline: 'Onde estamos localizados',
  subheadline: 'Atendimento presencial em Maceió para oferecer o melhor suporte em cada etapa do seu imóvel.',
  endereco: '📍 Av. Hamilton de Barros Soutinho, Jatiúca – Maceió / AL',
  latitude: -9.6465,
  longitude: -35.7028,
  ativo: true
};

export const INITIAL_IMOVEIS: Imovel[] = [
  {
    id: '1',
    titulo: 'Edifício Infinity Coast - Beira Mar',
    descricao_curta: 'Luxuoso apartamento na orla de Ponta Verde com vista definitiva.',
    descricao_completa: 'Experimente o ápice do luxo em Maceió. Este apartamento no Infinity Coast oferece uma vista panorâmica definitiva para o mar da Ponta Verde. Com acabamentos de altíssimo padrão, amplas suítes e uma área de lazer completa que parece um resort privativo, é a escolha ideal para quem não abre mão do melhor.',
    tipoImovel: TipoImovel.APARTAMENTO,
    finalidade: Finalidade.VENDA,
    regiao_id: '1',
    preco: 1850000,
    valor_condominio: 1200,
    valor_iptu: 450,
    quartos: 4,
    banheiros: 4,
    vagas: 3,
    area: 210,
    cidade: 'Maceió',
    bairro: 'Ponta Verde',
    status: ImovelStatus.DISPONIVEL,
    destaque: true,
    lancamento: true,
    referencia: 'PR-INF-01',
    imagens: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'
    ],
    areas_privativas: ['Varanda Gourmet', 'Suíte Master', 'Dependência Completa'],
    areas_comuns: ['Piscina com Raia', 'Academia de Última Geração', 'Espaço Gourmet', 'Segurança 24h'],
    diferenciais: ['Automação Residencial', 'Piso em Porcelanato 120x120', 'Vidros Acústicos'],
    dataCriacao: new Date().toISOString(),
    ativo: true
  },
  {
    id: '2',
    titulo: 'RN Studio Premium - Cruz das Almas',
    descricao_curta: 'Studios modernos ideais para investimento ou moradia ágil.',
    descricao_completa: 'Localizado na crescente região de Cruz das Almas, o RN Studio Premium é o empreendimento perfeito para investidores focados em aluguéis de curta temporada ou profissionais que buscam praticidade. Próximo ao Parque Shopping e à praia, oferece uma localização privilegiada com rentabilidade garantida.',
    tipoImovel: TipoImovel.STUDIO,
    finalidade: Finalidade.VENDA,
    regiao_id: '4',
    preco: 486000,
    valor_condominio: 350,
    valor_iptu: 120,
    quartos: 1,
    banheiros: 1,
    vagas: 1,
    area: 32,
    cidade: 'Maceió',
    bairro: 'Cruz das Almas',
    status: ImovelStatus.DISPONIVEL,
    destaque: true,
    lancamento: false,
    referencia: 'ST-RN-44',
    imagens: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672023488-70e25813efdf?auto=format&fit=crop&q=80&w=800'
    ],
    areas_privativas: ['Fechadura Eletrônica', 'Infraestrutura para Split'],
    areas_comuns: ['Rooftop com Piscina', 'Coworking', 'Lavanderia Coletiva', 'Bicicletário'],
    diferenciais: ['Alta Liquidez', 'Próximo ao Shopping', 'Portaria Inteligente'],
    dataCriacao: new Date().toISOString(),
    ativo: true
  }
];

export const INITIAL_BANNERS_PROMO: Banner[] = [
  {
    id: 'p1',
    titulo: 'Ofertas Exclusivas',
    imagem_desktop: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1920&h=400',
    imagem_mobile: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=600&h=800',
    texto_alt: 'Ofertas Imobiliárias Maceió',
    ativo: true,
    ordem: 1
  }
];

export const INITIAL_BANNERS_EM_BREVE: Banner[] = [
  {
    id: 'eb1',
    titulo: 'Novo Lançamento na Jatiúca',
    imagem_desktop: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920&h=400',
    imagem_mobile: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=800',
    texto_alt: 'Em Breve Maceió',
    ativo: true,
    ordem: 1
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  heroHeadline: 'Encontre seu imóvel ideal em Maceió e fale direto com um corretor',
  heroSubheadline: 'Casas e apartamentos em Maceió – AL com atendimento rápido pelo WhatsApp',
  contactWhatsapp: '5582999999999'
};
