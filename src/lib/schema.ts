/**
 * Construtores de dados estruturados (JSON-LD, schema.org).
 * Todos os schemas do site nascem aqui, a partir dos mesmos dados que geram o HTML
 * visível: o FAQ do schema é sempre idêntico ao FAQ da página, por construção.
 */
import { SITE, abs } from '../site.config.ts';
import { stripTags } from './html.ts';
import type { Article, FaqItem, Surgeon } from './types.ts';
import { FOCUS_LABEL } from '../data/surgeons.ts';

export type Json = Record<string, unknown>;

const CTX = 'https://schema.org';

export const organization = (): Json => ({
  '@type': 'Organization',
  '@id': `${SITE.url}#organizacao`,
  name: SITE.name,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: abs(SITE.logo), width: 512, height: 512 },
  email: SITE.email,
  areaServed: { '@type': 'City', name: SITE.city },
});

/** Perfil do médico (Etapa 2). Retorna null enquanto `SITE.doctor` não for preenchido. */
export const physician = (): Json | null => {
  const d = SITE.doctor;
  if (!d) return null;
  const node: Json = {
    '@type': 'Physician',
    '@id': `${SITE.url}#medico`,
    name: d.displayName,
    description: d.bio,
    medicalSpecialty: 'https://schema.org/Musculoskeletal',
    identifier: [d.crm, d.rqe],
    jobTitle: d.title,
    url: abs('sobre.html'),
    sameAs: d.sameAs,
  };
  if (d.photo) node.image = abs(d.photo);
  if (d.clinic) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: d.clinic.street,
      addressLocality: d.clinic.city,
      addressRegion: d.clinic.region,
      postalCode: d.clinic.postalCode,
      addressCountry: 'BR',
    };
    if (d.clinic.phone) node.telephone = d.clinic.phone;
    if (d.clinic.geo) node.geo = { '@type': 'GeoCoordinates', latitude: d.clinic.geo.lat, longitude: d.clinic.geo.lng };
    if (d.clinic.openingHours) node.openingHours = d.clinic.openingHours;
  }
  return node;
};

const doctorRef = (): Json | undefined => (SITE.doctor ? { '@id': `${SITE.url}#medico` } : undefined);

export const breadcrumbs = (items: Array<{ name: string; path: string }>): Json => ({
  '@context': CTX,
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqPage = (faq: FaqItem[]): Json => ({
  '@context': CTX,
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
  })),
});

export const medicalWebPage = (a: Article): Json => {
  const node: Json = {
    '@context': CTX,
    '@type': 'MedicalWebPage',
    '@id': `${abs(a.file)}#pagina`,
    url: abs(a.file),
    name: a.title,
    headline: a.headline,
    description: a.description,
    inLanguage: SITE.lang,
    isPartOf: { '@id': `${SITE.url}#site` },
    publisher: organization(),
    image: abs(a.image ?? SITE.ogImage),
    dateModified: a.modified,
    lastReviewed: a.reviewed,
    medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    wordCount: a.words,
    timeRequired: `PT${a.readingMinutes}M`,
    citation: a.refs.map(stripTags),
  };
  if (a.published) node.datePublished = a.published;
  if (a.about) node.about = a.about;
  const doc = doctorRef();
  if (doc) {
    node.author = doc;
    node.reviewedBy = doc;
  } else {
    node.author = { '@id': `${SITE.url}#organizacao` };
  }
  return node;
};

export const webPage = (opts: { path: string; name: string; description: string; modified: string; type?: string }): Json => ({
  '@context': CTX,
  '@type': opts.type ?? 'WebPage',
  '@id': `${abs(opts.path)}#pagina`,
  url: abs(opts.path),
  name: opts.name,
  description: opts.description,
  inLanguage: SITE.lang,
  isPartOf: { '@id': `${SITE.url}#site` },
  publisher: { '@id': `${SITE.url}#organizacao` },
  dateModified: opts.modified,
});

export const webSite = (): Json => ({
  '@context': CTX,
  '@type': 'WebSite',
  '@id': `${SITE.url}#site`,
  name: SITE.name,
  alternateName: SITE.domain,
  url: SITE.url,
  inLanguage: SITE.lang,
  description: 'Guia informativo e gratuito sobre saúde e cirurgia do quadril, para pacientes de Curitiba e de todo o Brasil.',
  publisher: organization(),
});

export const surgeonList = (list: Surgeon[]): Json => ({
  '@context': CTX,
  '@type': 'ItemList',
  name: 'Cirurgiões de quadril indicados em Curitiba',
  itemListElement: list.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Physician',
      name: s.name,
      identifier: [s.crm, s.rqe],
      medicalSpecialty: 'https://schema.org/Musculoskeletal',
      description: s.bio,
      knowsAbout: s.focus.map((f) => FOCUS_LABEL[f]),
      ...(s.photo ? { image: abs(s.photo) } : {}),
      ...(s.phone ? { telephone: s.phone } : {}),
      ...(s.website ? { url: s.website } : {}),
      address: s.locations.map((l) => ({
        '@type': 'PostalAddress',
        ...(l.street ? { streetAddress: l.street } : {}),
        addressLocality: l.city,
        addressRegion: 'PR',
        addressCountry: 'BR',
      })),
    },
  })),
});

export const ldScript = (data: Json | null): string =>
  data ? `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : '';
