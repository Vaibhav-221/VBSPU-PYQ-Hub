import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vbspu-pyq-hub.online";
  const staticRoutes = [
    "",
    "/about",
    "/semesters",
    "/materials",
    "/contact",
    "/support",
    "/privacy",
  ];
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
