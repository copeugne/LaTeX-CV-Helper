import { render } from 'ejs';
import type { Resume } from '../types/resume';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { CHTML } from 'mathjax-full/js/output/chtml.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';

// Initialize MathJax
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({
  packages: AllPackages,
  inlineMath: [['$', '$']],
  displayMath: [['$$', '$$']],
});

const chtml = new CHTML({
  fontURL: 'https://cdn.jsdelivr.net/npm/mathjax-full@3.2.2/es5/output/chtml/fonts/woff-v2',
});

const html = mathjax.document('', { InputJax: tex, OutputJax: chtml });

export async function compile(template: string, data: Resume): Promise<void> {
  try {
    // First, process the template with EJS
    const processedLatex = render(template, data);

    // Convert LaTeX to HTML using MathJax
    const node = html.convert(processedLatex, {
      display: true,
      em: 16,
      ex: 8,
      containerWidth: 800
    });

    // Update the preview
    const previewContainer = document.getElementById('latex-preview');
    if (previewContainer) {
      previewContainer.innerHTML = adaptor.outerHTML(node);
    }
  } catch (error) {
    throw new Error(
      error instanceof Error 
        ? `LaTeX compilation failed: ${error.message}`
        : 'LaTeX compilation failed'
    );
  }
}