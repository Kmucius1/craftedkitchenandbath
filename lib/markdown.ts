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

const SITE_ORIGIN = "https://craftedkitchenandbath.com";

// Editor uploads are full-size originals (often 2 MB PNGs). Serve them through
// the image optimizer, which resizes and re-encodes to WebP/AVIF. Hosts must be
// allowed in next.config.ts images.remotePatterns.
function imageSrc(url: string) {
  const raw = url.replace(/&amp;/g, "&");
  if (raw.startsWith("/") || /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(raw)) {
    return escapeHtml(`/_next/image?url=${encodeURIComponent(raw)}&w=1200&q=75`);
  }
  return url;
}

function imageTag(alt: string, url: string) {
  return `<img src="${imageSrc(url)}" alt="${alt}" loading="lazy" decoding="async" />`;
}

// Links to this site stay in the tab and drop the trailing slash, which would
// otherwise cost a redirect (/contact/ -> /contact). Everything else opens in a new tab.
function linkTag(label: string, href: string) {
  const raw = href.replace(/&amp;/g, "&");
  if (raw.startsWith("/") || raw.startsWith(SITE_ORIGIN)) {
    let path = raw.startsWith(SITE_ORIGIN) ? raw.slice(SITE_ORIGIN.length) || "/" : raw;
    path = path.replace(/\/+(?=($|[?#]))/, "") || "/";
    return `<a href="${escapeHtml(path)}">${label}</a>`;
  }
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function renderInline(text: string) {
  let out = escapeHtml(text);
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt: string, url: string) => imageTag(alt, url));
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => linkTag(label, href));
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(/~~([^~]+)~~/g, "<del>$1</del>");
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
      html.push(imageTag(escapeHtml(imageOnly[1]), imageOnly[2]));
      continue;
    }

    closeList();
    paragraph.push(line);
  }
  flushParagraph();
  closeList();

  return html.join("\n");
}
