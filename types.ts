
export enum Finalidade {
  VENDA = 'VENDA',
  ALUGUEL = 'ALUGUEL'
}

export enum TipoImovel {
  CASA = 'CASA',
  APARTAMENTO = 'APARTAMENTO',
  COMERCIAL = 'COMERCIAL',
  TERRENO = 'TERRENO',
  STUDIO = 'STUDIO',
  SOBRADO = 'SOBRADO'
}

export enum ImovelStatus {
  DISPONIVEL = 'DISPONÍVEL',
  NOVO = 'NOVO',
  LANCAMENTO = 'LANÇAMENTO',
  INDISPONIVEL = 'INDISPONÍVEL',
  EM_BREVE = 'EM BREVE',
  RESERVADO = 'RESERVADO',
  VENDIDO = 'VENDIDO',
  ALUGADO = 'ALUGADO'
}

export interface Metrica {
  label: string;
  valor: number;
}

export interface ProvaSocial {
  id: string;
  titulo: string;
  subtitulo: string;
  imagens: string[];
  metricas: Metrica[];
  ativo: boolean;
}

export interface Regiao {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  imagem: string;
  destaque: boolean;
  ativo: boolean;
}

export interface Banner {
  id: string;
  titulo?: string;
  imagem_desktop: string;
  imagem_mobile: string;
  link_acao?: string;
  texto_alt: string;
  ativo: boolean;
  ordem: number;
}

export interface Imovel {
  id: string;
  titulo: string;
  descricao_curta: string;
  descricao_completa: string;
  tipoImovel: TipoImovel;
  finalidade: Finalidade;
  regiao_id: string;
  preco: number;
  valor_condominio?: number;
  valor_iptu?: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  cidade: string;
  bairro: string;
  status: ImovelStatus;
  destaque: boolean;
  lancamento: boolean;
  referencia: string;
  imagens: string[];
  areas_privativas: string[];
  areas_comuns: string[];
  diferenciais: string[];
  dataCriacao: string;
  ativo: boolean;
}

export interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email?: string;
  tipo_imovel: string;
  regiao_id: string;
  imovelId?: string;
  imovelTitulo?: string;
  dataEnvio: string;
}

export interface FinanciamentoSettings {
  id: string;
  titulo: string;
  descricao: string;
  texto_destaque: string;
  imagem: string;
  ativo: boolean;
}

export interface LocalizacaoSettings {
  id: string;
  headline: string;
  subheadline: string;
  endereco: string;
  latitude: number;
  longitude: number;
  ativo: boolean;
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubheadline: string;
  contactWhatsapp: string;
  propertiesHeaderImage?: string;
  heroBackgroundImage?: string;
}

export interface AppState {
  imoveis: Imovel[];
  regioes: Regiao[];
  leads: Lead[];
  bannersPromocionais: Banner[];
  bannersEmBreve: Banner[];
  settings: SiteSettings;
  financiamento: FinanciamentoSettings;
  provaSocial: ProvaSocial;
  localizacao: LocalizacaoSettings;
  isAuthenticated: boolean;
}
