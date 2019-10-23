<script>
/* eslint no-console: off, node/no-unpublished-import: off */
import Markdown from 'markdown-it';
import MarkdownAbbr from 'markdown-it-abbr';
import MarkdownDeflist from 'markdown-it-deflist';
import MarkdownSubscript from 'markdown-it-sub';
import MarkdownSuperscript from 'markdown-it-sup';
/* eslint-enable node/no-unpublished-import */

// Can't combine markdown processor for inspector with markdown processor for reference cards
// because they have different breaks settings.
const markdownProcessor = new Markdown({ breaks: false })
  .use(MarkdownAbbr)
  .use(MarkdownDeflist)
  .use(MarkdownSubscript)
  .use(MarkdownSuperscript);

export default {
  props: {
    markdown: {
      type: String,
      required: true,
    },
  },
  data () {
    return { html: '' };
  },
  watch: {
    markdown () {
      this.processMarkdown().catch(console.error);
    },
  },
  created () {
    this.$nextTick(() => this.processMarkdown().catch(console.error));
  },
  methods: {
    async processMarkdown () {
      const html = markdownProcessor.render(this.markdown);
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.tagName === 'A') {
          const href = node.getAttribute('href');
          if (href) {
            const { 'default': asset }
              = await import(/* webpackMode: "eager" */ `@ven2/refcards/assets/${href}`);
            node.setAttribute('href', asset);
            node.setAttribute('download', href.replace(/^.*\//u, ''));
          }
        }
      }
      const node = this.$refs.content;
      if (!node) {
        console.warn('node not found in markdown.vue#processMarkdown');
        return;
      }
      if (node.childElementCount) {
        node.removeChild(node.firstElementChild);
      }
      node.append(doc.body);
    },
  },
};
</script>

<template>
  <div ref="content"></div>
</template>