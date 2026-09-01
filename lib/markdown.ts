// Minimal markdown -> HTML for remote blog post bodies written in DRYP Hub's
// blog editor. Deliberately dependency-free (no remark/react-markdown) —
// supports the subset that editor actually produces: headings, bold/italic,
// links, images, paragraphs, blockquotes, and ordered/unordered lists.
// Ported verbatim from DRYP Hub's lib/blog/markdown.ts.

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string) {
  let out = escapeHtml(text);
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

export function markdownToHtml(markdown: string): string {
  const lines = (markdown || "").replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let paragraph: string[] = [];

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }
  function closeList() {
    if (listType) {
      html.push(listType === "ul" ? "</ul>" : "</ol>");
      listType = null;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) { flushParagraph(); closeList(); continue; }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph(); closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph(); closeList();
      html.push(`<blockquote>${renderInline(line.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (listType !== "ul") { closeList(); html.push("<ul>"); listType = "ul"; }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    const numbered = line.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      flushParagraph();
      if (listType !== "ol") { closeList(); html.push("<ol>"); listType = "ol"; }
      html.push(`<li>${renderInline(numbered[1])}</li>`);
      continue;
    }

    const imageOnly = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (imageOnly) {
      flushParagraph(); closeList();
      html.push(`<img src="${imageOnly[2]}" alt="${escapeHtml(imageOnly[1])}" loading="lazy" />`);
      continue;
    }

    closeList();
    paragraph.push(line);
  }
  flushParagraph();
  closeList();

  return html.join("\n");
}
