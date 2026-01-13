
import { supabase } from './supabaseClient';
import { AppState, Imovel, Banner, Regiao, Lead, SiteSettings, FinanciamentoSettings, LocalizacaoSettings, ProvaSocial, Finalidade, TipoImovel, ImovelStatus } from '../types';
import { INITIAL_IMOVEIS, INITIAL_REGIOES, INITIAL_BANNERS_PROMO, INITIAL_BANNERS_EM_BREVE, INITIAL_SETTINGS, INITIAL_FINANCIAMENTO, INITIAL_LOCALIZACAO, INITIAL_PROVA_SOCIAL } from '../constants';

// --- Mappers ---
const mapImovelFromDB = (dbImovel: any): Imovel => ({
    ...dbImovel,
    tipoImovel: dbImovel.tipo_imovel as TipoImovel,
    dataCriacao: dbImovel.data_criacao,
    regiao_id: dbImovel.regiao_id || '', // Handle nullable
    imagens: dbImovel.imagens || [],
    areas_privativas: dbImovel.areas_privativas || [],
    areas_comuns: dbImovel.areas_comuns || [],
    diferenciais: dbImovel.diferenciais || [],
    status: dbImovel.status as ImovelStatus,
    finalidade: dbImovel.finalidade as Finalidade,
});

const mapImovelToDB = (imovel: Imovel) => ({
    ...imovel,
    tipo_imovel: imovel.tipoImovel,
    data_criacao: imovel.dataCriacao,
    regiao_id: imovel.regiao_id || null, // Convert empty string to null for UUID FK if needed, or keep valid UUID
});

// --- Fetchers ---

const mapSettingsFromDB = (dbSettings: any): SiteSettings => ({
    heroHeadline: dbSettings?.hero_headline ?? INITIAL_SETTINGS.heroHeadline,
    heroSubheadline: dbSettings?.hero_subheadline ?? INITIAL_SETTINGS.heroSubheadline,
    contactWhatsapp: dbSettings?.contact_whatsapp ?? INITIAL_SETTINGS.contactWhatsapp,
    propertiesHeaderImage: dbSettings?.properties_header_image,
    heroBackgroundImage: dbSettings?.hero_background_image
});

const mapSettingsToDB = (settings: SiteSettings) => ({
    hero_headline: settings.heroHeadline,
    hero_subheadline: settings.heroSubheadline,
    contact_whatsapp: settings.contactWhatsapp,
    properties_header_image: settings.propertiesHeaderImage,
    hero_background_image: settings.heroBackgroundImage
});

// --- Fetchers ---

export const fetchFullState = async (): Promise<AppState> => {
    const [
        { data: imoveis },
        { data: regioes },
        { data: banners },
        { data: siteSettings },
        { data: financiamento },
        { data: localizacao },
        { data: provaSocial },
        { data: leads }
    ] = await Promise.all([
        supabase.from('imoveis').select('*'),
        supabase.from('regioes').select('*'),
        supabase.from('banners').select('*'),
        supabase.from('site_settings').select('*').single(),
        supabase.from('financiamento_settings').select('*').single(),
        supabase.from('localizacao_settings').select('*').single(),
        supabase.from('prova_social').select('*').single(),
        supabase.from('leads').select('*')
    ]);

    return {
        imoveis: imoveis ? imoveis.map(mapImovelFromDB) : [],
        regioes: regioes || [],
        bannersPromocionais: banners ? banners.filter((b: any) => b.tipo === 'PROMO') : [],
        bannersEmBreve: banners ? banners.filter((b: any) => b.tipo === 'EMBREVE') : [],
        settings: siteSettings ? mapSettingsFromDB(siteSettings) : INITIAL_SETTINGS,
        financiamento: financiamento || INITIAL_FINANCIAMENTO,
        provaSocial: provaSocial || INITIAL_PROVA_SOCIAL,
        localizacao: localizacao || INITIAL_LOCALIZACAO,
        leads: leads || [],
        isAuthenticated: false // Sempre inicia como não autenticado
    };
};

// --- Actions ---

export const dbAddImovel = async (imovel: Imovel) => {
    // We remove the ID to let postgres generate a valid UUID
    const { id, ...rest } = mapImovelToDB(imovel);
    const { data, error } = await supabase.from('imoveis').insert(rest).select().single();
    if (error) throw error;
    return mapImovelFromDB(data);
};

export const dbUpdateImovel = async (imovel: Imovel) => {
    const { error } = await supabase.from('imoveis').update(mapImovelToDB(imovel)).eq('id', imovel.id);
    if (error) throw error;
};

export const dbDeleteImovel = async (id: string) => {
    const { error } = await supabase.from('imoveis').delete().eq('id', id);
    if (error) throw error;
};

export const dbAddRegiao = async (regiao: Regiao) => {
    const { id, ...rest } = regiao;
    const { error } = await supabase.from('regioes').insert(rest);
    if (error) throw error;
};

export const dbDeleteRegiao = async (id: string) => {
    const { error } = await supabase.from('regioes').delete().eq('id', id);
    if (error) throw error;
};

export const dbUpdateBanners = async (banners: Banner[], type: 'PROMO' | 'EMBREVE') => {
    // Estratégia simples: Deletar todos desse tipo e inserir os novos. 
    // Em produção, seria melhor UPSERT.

    // 1. Delete existing of this type
    const { error: deleteError } = await supabase.from('banners').delete().eq('tipo', type);
    if (deleteError) {
        console.error('Error deleting old banners:', deleteError);
        // We throw to prevent partial state updates that might leave the user confused
        throw new Error(`Failed to clear old banners: ${deleteError.message}`);
    }

    // 2. Insert new ones
    if (banners.length > 0) {
        // Explicitly map ONLY database columns to execute a clean insert
        const toInsert = banners.map(b => ({
            titulo: b.titulo || '',
            imagem_desktop: b.imagem_desktop || '',
            imagem_mobile: b.imagem_mobile || '',
            link_acao: b.link_acao || '',
            texto_alt: b.texto_alt || '',
            ativo: b.ativo === undefined ? true : b.ativo,
            ordem: typeof b.ordem === 'number' ? b.ordem : 0,
            tipo: type
        }));

        console.log('Inserting banners:', toInsert);

        const { error } = await supabase.from('banners').insert(toInsert);
        if (error) {
            console.error('Supabase Error inserting banners:', error);
            throw new Error(`Failed to insert banners: ${error.message}`);
        }
    }
};


export const dbAddLead = async (lead: Lead) => {
    // Mapear campos se necessário
    const dbLead = {
        ...lead,
        tipo_imovel: lead.tipo_imovel,
        data_envio: lead.dataEnvio,
        imovel_titulo: lead.imovelTitulo,
        imovel_id: lead.imovelId
    };
    const { error } = await supabase.from('leads').insert(dbLead);
    if (error) throw error;
};

export const dbDeleteLead = async (id: string) => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
};

export const dbUpdateSettings = async (settings: SiteSettings) => {
    // Assumindo que sempre existe, update no primeiro id encontrado ou algo assim é perigoso em multi-row,
    // mas aqui é single-row policy.
    // Melhor estratégia: pegar o ID ou fazer update sem where se for único linha garantida.
    // Vamos tentar update em tudo (já que só tem 1 linha)
    const { data } = await supabase.from('site_settings').select('id').single();
    if (data) {
        await supabase.from('site_settings').update(mapSettingsToDB(settings)).eq('id', data.id);
    } else {
        await supabase.from('site_settings').insert(mapSettingsToDB(settings));
    }
};

export const dbUpdateFinanciamento = async (fin: FinanciamentoSettings) => {
    const { data } = await supabase.from('financiamento_settings').select('id').single();
    if (data) {
        await supabase.from('financiamento_settings').update(fin).eq('id', data.id);
    } else {
        await supabase.from('financiamento_settings').insert(fin);
    }
};

export const dbUpdateProvaSocial = async (ps: ProvaSocial) => {
    const { data } = await supabase.from('prova_social').select('id').single();
    if (data) {
        await supabase.from('prova_social').update(ps).eq('id', data.id);
    } else {
        await supabase.from('prova_social').insert(ps);
    }
};

export const dbUpdateLocalizacao = async (loc: LocalizacaoSettings) => {
    const { data } = await supabase.from('localizacao_settings').select('id').single();
    if (data) {
        await supabase.from('localizacao_settings').update(loc).eq('id', data.id);
    } else {
        await supabase.from('localizacao_settings').insert(loc);
    }
};

export const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
};
