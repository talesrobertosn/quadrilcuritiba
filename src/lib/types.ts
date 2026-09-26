/**
 * Tipos compartilhados do gerador estático.
 * Tudo o que vira página passa por aqui: artigos, cirurgiões, configuração do site.
 */

/** Eixos temáticos usados no índice de artigos, nos filtros e nas cores de categoria. */
export type Category = 'dor' | 'diagnostico' | 'cirurgia' | 'recuperacao';

export interface TocItem {
  id: string;
  label: string;
}

export interface FaqItem {
  /** Pergunta, em texto puro. Vira `<summary>` e `Question.name` no schema. */
  q: string;
  /** Resposta, em HTML. Vira `.faq-body` e `Answer.text` (sem tags) no schema. */
  a: string;
}

/** Objeto schema.org livre para `about` (MedicalCondition, MedicalProcedure...). */
export type SchemaThing = Record<string, unknown> & { '@type': string; name: string };

export interface ArticleData {
  slug: string;
  /** `<title>`: até 65 caracteres. */
  title: string;
  /** Meta description: até 160 caracteres. */
  description: string;
  ogTitle: string;
  ogDescription: string;
  /** Headline do schema MedicalWebPage. */
  headline: string;
  /** H1 visível. Aceita HTML inline. */
  h1: string;
  /** Linha fina do hero. Aceita HTML inline. */
  lead: string;
  /** Etiqueta curta acima do H1. */
  pill: string;
  /** Último item da trilha de navegação. */
  crumb: string;
  category: Category;
  /** Etiqueta do card no índice (Pilar, Novo, Custos...). */
  tag: string;
  cardTitle: string;
  cardText: string;
  /** ISO yyyy-mm-dd. */
  published?: string;
  modified: string;
  reviewed: string;
  /** Imagem principal (caminho relativo), usada no schema. */
  image?: string;
  about?: SchemaThing;
  toc: TocItem[];
  faqTitle: string;
  faq: FaqItem[];
  takeaways: string[];
  refs: string[];
  /** Slugs de artigos relacionados (bloco "Leia também"). */
  related: string[];
}

/** Artigo com o corpo carregado e os campos derivados no build. */
export interface Article extends ArticleData {
  body: string;
  file: string;
  words: number;
  readingMinutes: number;
  /** H2 com id encontrados no corpo, para a busca. */
  sections: TocItem[];
}

/* ------------------------------------------------------------------ */
/* Diretório de cirurgiões                                             */
/* ------------------------------------------------------------------ */

export type SurgeonFocus = 'artroplastia' | 'artroscopia' | 'trauma' | 'revisao' | 'pediatrico';
export type CareMode = 'convenio' | 'particular' | 'sus';

export interface SurgeonLocation {
  /** Nome do consultório, clínica ou hospital. */
  name: string;
  street?: string;
  neighborhood: string;
  city: string;
  /** Link do Google Maps, se houver. */
  mapUrl?: string;
}

export interface Surgeon {
  id: string;
  name: string;
  /** Ex.: "CRM-PR 00000". */
  crm: string;
  /** Registro de Qualificação de Especialista. Ex.: "RQE 0000". */
  rqe: string;
  photo?: string;
  focus: SurgeonFocus[];
  care: CareMode[];
  /** Convênios citados pelo próprio profissional. */
  plans?: string[];
  locations: SurgeonLocation[];
  /** Resumo em até 280 caracteres, escrito pelo profissional e revisado pelo site. */
  bio: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  /** Data em que CRM e RQE foram conferidos no portal do CFM (ISO). */
  verifiedAt: string;
}

/* ------------------------------------------------------------------ */
/* Etapa 2: identificação do médico responsável                        */
/* ------------------------------------------------------------------ */

export interface DoctorProfile {
  name: string;
  /** Ex.: "Dr. Fulano de Tal". */
  displayName: string;
  crm: string;
  rqe: string;
  title: string;
  photo?: string;
  bio: string;
  sameAs: string[];
  clinic?: {
    name: string;
    street: string;
    neighborhood: string;
    city: string;
    region: string;
    postalCode: string;
    phone?: string;
    geo?: { lat: number; lng: number };
    openingHours?: string[];
  };
}
