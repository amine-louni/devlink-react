//import '../../../../node_modules/highlight.js/styles/github.css';
import './styles.css';
import React from 'react';
import MarkdownIt from 'markdown-it';
import markdownItMultimdTable from 'markdown-it-multimd-table';

import emoji from 'markdown-it-emoji';
import hljs from 'highlight.js';

const getMarkdownText = (markdown) => {
  const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: true,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    quotes: '“”‘’',

    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      );
    },
  })
    .use(markdownItMultimdTable)
    .use(emoji);
  return md.render(markdown);
};
export default function PostPreview(props) {
  return (
    <article
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: getMarkdownText(props.markdown) }}
    ></article>
  );
}
