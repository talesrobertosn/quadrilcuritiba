/** Navegação principal e rodapé. Um único lugar para os links globais do site. */

export interface NavLink {
  href: string;
  label: string;
}

export const MAIN_NAV: NavLink[] = [
  { href: 'artigos.html', label: 'Artigos' },
  { href: 'artrose-de-quadril.html', label: 'Artrose' },
  { href: 'protese-de-quadril.html', label: 'Prótese' },
  { href: 'quanto-custa-protese-de-quadril.html', label: 'Custos' },
  { href: 'dor-no-quadril.html', label: 'Dor no quadril' },
];

/** Botão de destaque do cabeçalho. */
export const NAV_CTA: NavLink = { href: 'cirurgioes-curitiba.html', label: 'Cirurgiões em Curitiba' };

export const FOOTER_GROUPS: Array<{ title: string; links: NavLink[] }> = [
  {
    title: 'Dor e diagnóstico',
    links: [
      { href: 'dor-no-quadril.html', label: 'Dor no quadril' },
      { href: 'dor-na-virilha.html', label: 'Dor na virilha' },
      { href: 'bursite-no-quadril.html', label: 'Bursite e tendinite' },
      { href: 'artrose-de-quadril.html', label: 'Coxartrose (artrose)' },
      { href: 'como-aliviar-dor-artrose-quadril.html', label: 'Como aliviar a dor' },
      { href: 'fratura-de-quadril-no-idoso.html', label: 'Fratura no idoso' },
    ],
  },
  {
    title: 'Cirurgia e prótese',
    links: [
      { href: 'protese-de-quadril.html', label: 'Prótese de quadril' },
      { href: 'quanto-custa-protese-de-quadril.html', label: 'Quanto custa a prótese' },
      { href: 'artroscopia-de-quadril.html', label: 'Artroscopia de quadril' },
      { href: 'recuperacao-protese-de-quadril.html', label: 'Recuperação' },
      { href: 'protese-de-quadril-vale-a-pena.html', label: 'A prótese vale a pena?' },
    ],
  },
  {
    title: 'O site',
    links: [
      { href: 'artigos.html', label: 'Todos os artigos' },
      { href: 'cirurgioes-curitiba.html', label: 'Cirurgiões em Curitiba' },
      { href: 'cirurgioes-curitiba.html#para-cirurgioes', label: 'Sou cirurgião' },
      { href: 'sobre.html', label: 'Sobre e política editorial' },
      { href: 'privacidade.html', label: 'Privacidade' },
    ],
  },
];
