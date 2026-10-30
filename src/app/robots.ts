import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

// Máy tìm kiếm (Google, Bing, Seznam…) và trợ lý AI (ChatGPT, Perplexity, Claude, Gemini) đều được đọc trang;
// liệt kê riêng bot AI để chắc chắn không bị chặn bởi quy tắc mặc định của nền tảng.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "SeznamBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: ["/api/", "/admin/"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
