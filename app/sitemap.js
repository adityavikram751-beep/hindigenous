export default async function sitemap() {
  const baseUrl = "https://hindigenous.com";

  const routes = [
    "",
    "/etihas",
    "/sahitya",
    "/kala",
    "/sanskriti",
    "/rajpat"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
