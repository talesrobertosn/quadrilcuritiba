import type { CareMode, Surgeon, SurgeonFocus } from '../lib/types.ts';

/**
 * Diretório de cirurgiões de quadril indicados pelo site.
 *
 * Para incluir um profissional:
 *   1. conferir CRM e RQE no portal do CFM (https://portal.cfm.org.br/busca-medicos);
 *   2. copiar o modelo abaixo, preencher e colar dentro da lista SURGEONS;
 *   3. rodar `npm run build`.
 * O card, o filtro, o schema Physician e o contador da página são gerados sozinhos.
 *
 * Modelo:
 * {
 *   id: 'nome-sobrenome',
 *   name: 'Dr. Nome Sobrenome',
 *   crm: 'CRM-PR 00000',
 *   rqe: 'RQE 00000',
 *   photo: 'assets/cirurgioes/nome-sobrenome.jpg',   // opcional, 480×480
 *   focus: ['artroplastia', 'artroscopia'],
 *   care: ['convenio', 'particular'],
 *   plans: ['Unimed', 'Bradesco Saúde'],
 *   locations: [{ name: 'Clínica X', street: 'Rua Y, 123', neighborhood: 'Batel', city: 'Curitiba' }],
 *   bio: 'Cirurgião de quadril com formação em ... (até 280 caracteres).',
 *   phone: '+55 41 0000-0000',
 *   whatsapp: '5541900000000',
 *   website: 'https://...',
 *   instagram: 'perfil',
 *   verifiedAt: '2026-10-01',
 * },
 */
export const SURGEONS: Surgeon[] = [];

export const FOCUS_LABEL: Record<SurgeonFocus, string> = {
  artroplastia: 'Prótese (artroplastia)',
  artroscopia: 'Artroscopia e preservação',
  trauma: 'Fraturas e trauma',
  revisao: 'Revisão de prótese',
  pediatrico: 'Quadril infantil',
};

export const CARE_LABEL: Record<CareMode, string> = {
  convenio: 'Convênio',
  particular: 'Particular',
  sus: 'SUS',
};
