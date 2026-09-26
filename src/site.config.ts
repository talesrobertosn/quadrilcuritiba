import type { DoctorProfile } from './lib/types.ts';

/**
 * Configuração central do site.
 *
 * ETAPA 1 (atual): hub informativo anônimo. `doctor` fica `null`: nenhum nome
 * de médico aparece nas páginas nem no schema.
 *
 * ETAPA 2 (futuro): preencha `doctor` com o perfil do cirurgião responsável.
 * O build passa a gerar automaticamente, em todas as páginas:
 *   - assinatura "Escrito e revisado por" nos artigos, com CRM e RQE;
 *   - `author` e `reviewedBy` (Physician) no schema MedicalWebPage;
 *   - schema Physician + MedicalClinic na home e na página Sobre;
 *   - bloco do médico na página de cirurgiões.
 * Nada mais precisa ser editado à mão.
 */
export const SITE = {
  name: 'Quadril Curitiba',
  domain: 'quadrilcuritiba.com.br',
  url: 'https://quadrilcuritiba.com.br/',
  locale: 'pt_BR',
  lang: 'pt-BR',
  city: 'Curitiba',
  region: 'Paraná',
  email: 'curitibaquadril@gmail.com',
  themeColor: '#0E4A4C',
  ogImage: 'assets/og-image.png',
  logo: 'assets/favicon-512.png',
  /** Data exibida no rodapé e no selo "Revisado em" da home. */
  lastEditorialReview: '2026-09-25',
  doctor: null as DoctorProfile | null,
} as const;

export const abs = (path: string): string =>
  path === 'index.html' || path === '' ? SITE.url : SITE.url + path.replace(/^\//, '');
