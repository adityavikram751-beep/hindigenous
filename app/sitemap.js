import { fetchLatestArticlesAcrossCategories } from "@/lib/api";

export default async function sitemap() {
  const baseUrl = "https://hindigenous.com";

  const staticRoutes = [
    "",
    "/etihas",
    "/sahitya",
    "/kala",
    "/sanskriti",
    "/rajpat"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  let articleRoutes = [];
  try {
    const articles = await fetchLatestArticlesAcrossCategories();
    if (articles && articles.length > 0) {
      articleRoutes = articles.map((art) => {
        const cat = art.categoryKey || "etihas";
        const id = art._id || art.id;
        return {
          url: `${baseUrl}/${cat}/${id}`,
          lastModified: art.updatedAt || art.createdAt || new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...staticRoutes, ...articleRoutes];
}
