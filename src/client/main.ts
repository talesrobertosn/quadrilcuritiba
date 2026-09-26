/**
 * Quadril Curitiba — ponto de entrada do JavaScript do site.
 * Compilado pelo esbuild para assets/app.js. O site funciona inteiro sem JS;
 * aqui ficam só as camadas de conforto (busca, índice, filtros, tema, ficha).
 */
import { initCopy } from './clipboard.ts';
import { initDirectoryFilter, initLibraryFilter } from './filters.ts';
import { initHeader } from './header.ts';
import { initProgress } from './progress.ts';
import { initProse } from './prose.ts';
import { initReveal } from './reveal.ts';
import { initSearch } from './search.ts';
import { initSurgeonForm } from './surgeon-form.ts';
import { initTheme } from './theme.ts';
import { initToc } from './toc.ts';

const safe = (name: string, fn: () => void) => {
  try {
    fn();
  } catch (err) {
    console.error(`[quadril] falha em ${name}`, err);
  }
};

safe('theme', initTheme);
safe('header', initHeader);
safe('search', initSearch);
safe('copy', initCopy);
safe('prose', initProse);
safe('toc', initToc);
safe('progress', initProgress);
safe('library', initLibraryFilter);
safe('directory', initDirectoryFilter);
safe('surgeon-form', initSurgeonForm);
safe('reveal', initReveal);
