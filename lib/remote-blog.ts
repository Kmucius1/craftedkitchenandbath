// Posts written and published from DRYP Hub (the internal CRM at
// dryphub.com) show up here alongside the site's own hand-written articles
// in lib/blog-articles.ts. This never throws — if DRYP Hub is unreachable,
// callers just see zero remote posts and the site keeps working normally.

const DRYP_HUB_BLOG_API = "https://www.dryphub.com/api/public/blog/crafted-kitchen-bath";

export interface RemotePost {
  title: string;
  slug: string;
  category: string | null;
  author: string | null;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string;
}

export async function getRemotePosts(): Promise<RemotePost[]> {
  try {
    const res = await fetch(DRYP_HUB_BLOG_API, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getRemotePost(slug: string): Promise<RemotePost | null> {
  try {
    const res = await fetch(`${DRYP_HUB_BLOG_API}?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.slug ? data : null;
  } catch {
    return null;
  }
}

export function remoteReadMinutes(content: string | null): number {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function remoteDisplayDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Pulls question/answer pairs out of a post's FAQ section so the page can
 * emit FAQPage schema. DRYP Hub posts write it as an H2 containing "FAQ" or
 * "Frequently Asked" followed by one `### Question` per answer. Lives here
 * rather than lib/markdown.ts, which must stay byte-identical to DRYP Hub's. */
export function extractRemoteFaqs(content: string | null): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false;
  let current: { question: string; lines: string[] } | null = null;

  const flush = () => {
    if (current && current.lines.length) {
      faqs.push({ question: current.question, answer: current.lines.join(" ") });
    }
    current = null;
  };

  for (const raw of (content || "").replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      flush();
      inFaq = /faq|frequently asked/i.test(h2[1]);
      continue;
    }
    if (!inFaq) continue;
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      flush();
      current = { question: stripMarkdown(h3[1]), lines: [] };
      continue;
    }
    if (current && line) current.lines.push(stripMarkdown(line.replace(/^([-*]|\d+\.)\s+/, "")));
  }
  flush();
  return faqs;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|\*|~~)/g, "")
    .trim();
}
