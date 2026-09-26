import { $, $$ } from './dom.ts';
import { copyText, flash } from './clipboard.ts';

/**
 * Ficha de inscrição de cirurgiões: prévia do card ao vivo e geração do e-mail.
 * Nada é enviado a servidor algum: o texto é montado aqui e aberto no Gmail ou no app de e-mail.
 */
const FOCUS: Record<string, string> = {
  artroplastia: 'Prótese (artroplastia)',
  artroscopia: 'Artroscopia e preservação',
  trauma: 'Fraturas e trauma',
  revisao: 'Revisão de prótese',
  pediatrico: 'Quadril infantil',
};
const CARE: Record<string, string> = { convenio: 'Convênio', particular: 'Particular', sus: 'SUS' };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

export const initSurgeonForm = (): void => {
  const form = $<HTMLFormElement>('[data-surgeon-form]');
  if (!form) return;
  const TO = 'curitibaquadril@gmail.com';
  const SUBJECT = 'Inclusão no diretório: cirurgião de quadril em Curitiba';
  const out = $('[data-form-out]', form);
  const err = $('[data-form-err]', form);
  const counter = $('[data-count]', form);
  const pv = {
    ini: $('[data-pv-ini]'),
    nome: $('[data-pv-nome]'),
    crm: $('[data-pv-crm]'),
    rqe: $('[data-pv-rqe]'),
    bio: $('[data-pv-bio]'),
    tags: $('[data-pv-tags]'),
    locais: $('[data-pv-locais]'),
  };
  let body = '';

  const val = (name: string): string => ((form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? '').trim();
  const checked = (name: string): string[] => $$<HTMLInputElement>(`input[name="${name}"]:checked`, form).map((i) => i.value);

  const updatePreview = () => {
    const nome = val('nome') || 'Dra. Maria Exemplo';
    if (pv.nome) pv.nome.textContent = nome;
    if (pv.ini) pv.ini.textContent = nome.replace(/^(dra?\.?)\s+/i, '').split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
    if (pv.crm) pv.crm.textContent = `CRM-PR ${val('crm') || '00000'}`;
    if (pv.rqe) pv.rqe.textContent = `RQE ${val('rqe') || '00000'}`;
    if (pv.bio) pv.bio.textContent = val('bio') || 'Sua apresentação curta aparece aqui.';
    if (pv.locais) pv.locais.textContent = val('locais').split('\n')[0] || 'Consultório · Bairro, Curitiba';
    if (pv.tags) {
      const f = checked('foco').map((k) => `<li>${esc(FOCUS[k] ?? k)}</li>`);
      const c = checked('atendimento').map((k) => `<li class="tag-care">${esc(CARE[k] ?? k)}</li>`);
      pv.tags.innerHTML = [...f, ...c].join('') || '<li>Prótese (artroplastia)</li><li class="tag-care">Convênio</li>';
    }
    if (counter) counter.textContent = `${val('bio').length}/280`;
  };

  const compose = (): string =>
    [
      'Olá! Gostaria de ser incluído(a) no diretório de cirurgiões de quadril do Quadril Curitiba.',
      '',
      `Nome: ${val('nome')}`,
      `CRM-PR: ${val('crm')}`,
      `RQE: ${val('rqe')}`,
      `E-mail: ${val('email')}`,
      `Telefone/WhatsApp: ${val('telefone') || '-'}`,
      `Foco de atuação: ${checked('foco').map((k) => FOCUS[k]).join(', ') || '-'}`,
      `Atendimento: ${checked('atendimento').map((k) => CARE[k]).join(', ') || '-'}`,
      `Convênios: ${val('convenios') || '-'}`,
      `Locais de atendimento: ${val('locais')}`,
      `Site: ${val('site') || '-'}`,
      `Instagram: ${val('instagram') || '-'}`,
      '',
      'Apresentação:',
      val('bio') || '-',
      '',
      'Confirmo que as informações são verdadeiras, autorizo a publicação após a conferência de CRM e RQE e sei que sou responsável pela minha publicidade perante o CFM.',
    ].join('\n');

  form.addEventListener('input', () => {
    updatePreview();
    if (out) out.hidden = true;
  });
  form.addEventListener('change', updatePreview);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const missing = $$<HTMLInputElement | HTMLTextAreaElement>('[required]', form).filter((f) =>
      f instanceof HTMLInputElement && f.type === 'checkbox' ? !f.checked : !f.value.trim() || !f.checkValidity(),
    );
    $$('[aria-invalid]', form).forEach((f) => f.removeAttribute('aria-invalid'));
    if (missing.length) {
      missing.forEach((f) => f.setAttribute('aria-invalid', 'true'));
      if (err) {
        err.hidden = false;
        err.textContent = 'Preencha os campos obrigatórios marcados e confirme a autorização de publicação.';
      }
      missing[0]?.focus();
      return;
    }
    if (err) err.hidden = true;
    body = compose();
    const gmail = $<HTMLAnchorElement>('[data-send-gmail]', form);
    const mailto = $<HTMLAnchorElement>('[data-send-mailto]', form);
    if (gmail) gmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${TO}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;
    if (mailto) mailto.href = `mailto:${TO}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;
    if (out) {
      out.hidden = false;
      out.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });

  $('[data-copy-form]', form)?.addEventListener('click', async (e) => {
    const ok = await copyText(`Para: ${TO}\nAssunto: ${SUBJECT}\n\n${body}`);
    flash(e.currentTarget as Element, ok ? 'Texto copiado. Cole em um e-mail para ' + TO : 'Não foi possível copiar');
  });

  updatePreview();
};
