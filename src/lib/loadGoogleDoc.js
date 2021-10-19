// adapted from https://github.com/rdmurphy/doc-to-archieml (MIT licensed)

import { google } from 'googleapis';
import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML
 *
 * @param {string} input - Possibly dirty HTML
 * @param {boolean} preserveStyles - If true, allow few decorative tags.
 *    Else, strip everything
 * @returns {string} Clean HTML
 */
function sanitize(input, preserveStyles = false) {
  return sanitizeHtml(input, {
    allowedTags: preserveStyles ? ['b', 'i', 'u', 's', 'sub', 'sup', 'a'] : [],
    allowedAttributes: preserveStyles ? { a: ['href'] } : {},
  });
}

/**
 * Connect to Google Docs
 * 
 * @param {string} keyFile - path to secret credential file
 * @returns Authenticated Google doc client
 */
async function connect(keyFile = 'google-credentials.json') {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    keyFile,
  });

  return google.docs({ version: 'v1', auth });
}

/**
 * Load content from a Google doc
 * 
 * @param {string} documentId - Google doc ID
 * @param {boolean} preserveStyles - if true, preserve some formatting
 * @returns {string} Sanitized doc contents
 */
async function loadGoogleDoc(documentId, preserveStyles = false) {
  const client = await connect();
  const { data } = await client.documents.get({ documentId });
  return parseGoogleDoc(data, preserveStyles);
}

/**
 * Transform Google Doc object into content string
 * 
 * @param {Object} document - Google Doc as returned by their API
 * @param {boolean} preserveStyles - if true, preserve some formatting
 *    (supported: bold, italic, underlined, superscript, subscript, links)
 * @returns {string} Sanitized doc contents
 */
function parseGoogleDoc(document, preserveStyles = false) {
  let text = '';

  // sanity checks
  if (!document.body) return text;
  if (!document.body.content) return text;

  document.body.content.forEach((element) => {
    if (element.paragraph) {
      const paragraph = element.paragraph;

      // this is a list
      const needsBullet = paragraph.bullet != null;

      if (paragraph.elements) {
        const values = paragraph.elements;

        values.forEach((value, idx) => {
          // prepend an asterisk if this is a list item
          const prefix = needsBullet && idx === 0 ? '* ' : '';

          // concat the text
          text += `${prefix}${parseParagraphElement(value, preserveStyles)}`;
        });
      }
    }
  });

  return sanitize(text, preserveStyles);
}

/**
 * Parse Google doc element
 * 
 * @param {Object} element - Google doc element
 * @param {boolean} preserveStyles - if true, preserve some formatting
 *    (supported: bold, italic, underlined, superscript, subscript, links)
 * @returns {string} Content parsed as HTML
 */
function parseParagraphElement(element, preserveStyles = false) {
  if (!element.textRun) return '';
  if (!element.textRun.content) return '';

  const { textRun } = element;
  let { content } = textRun;

  // return early if no styles specified or styles are to be ignored
  if (!preserveStyles) return content;
  if (!textRun.textStyle) return content;

  const { textStyle } = textRun;

  // apply text styles
  if (textStyle.bold) content = wrap(content, 'b');
  if (textStyle.italic) content = wrap(content, 'i');
  if (textStyle.underline) content = wrap(content, 'u');
  if (textStyle.strikethrough) content = wrap(content, 's');

  // apply sub- or superscript
  if (textStyle.baselineOffset) {
    const { baselineOffset } = textStyle;
    if (baselineOffset === 'SUBSCRIPT') content = wrap(content, 'sub');
    else if (baselineOffset === 'SUPERSCRIPT') content = wrap(content, 'sup');
  }

  // return early if no link information associated
  if (!textStyle.link) return content;
  if (!textStyle.link.url) return content;

  // add link
  const { url } = textStyle.link;
  return `<a href="${url}">${content}</a>`;
}

/**
 * Wrap content in tags
 * 
 * @param {string} content - text
 * @param {string} tag - name of the tag (e.g. "b" for <b>)
 * @returns {string} HTML tag
 */
function wrap(content, tag) {
  // there is no content to be wrapped
  if (content.trim().length == 0) return content;

  // initialize whitespace before and after content
  const ws = { start: '', end: '' };

  const isWhitespace = (char) => /\s/.test(char);

  // record whitespace before content
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (!isWhitespace(char)) break;
    ws.start += char;
  }

  // record whitespace after content
  for (let i = content.length - 1; i >= 0; i--) {
    const char = content[i];
    if (!isWhitespace(char)) break;
    ws.end += char;
  }

  return [ws.start, `<${tag}>`, content.trim(), `</${tag}>`, ws.end].join('');
}

export default loadGoogleDoc;
