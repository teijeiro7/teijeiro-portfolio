/**
 * Tiny inline formatter for content strings.
 *
 * `|` becomes a hard line break (headings only), `*text*` becomes emphasis.
 * Everything is escaped first so content files cannot inject markup.
 */
export function inline(value: string): string {
  const escaped = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return escaped
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\|/g, "<br />");
}

/** Same as `inline` but without line breaks, for labels and short copy. */
export function plain(value: string): string {
  return inline(value).replace(/<br \/>/g, " ");
}
