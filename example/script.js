import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Breadcrumb from 'reveal.js-breadcrumb/index.js'

let deck = new Reveal({
  plugins: [Markdown, Breadcrumb],
  hash:true
});
deck.initialize();