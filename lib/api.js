const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hindigenousbackend-1.onrender.com';
const LOCAL_URL = 'http://localhost:5000';

/**
 * Helper to fetch data with primary URL and fallback production URL
 */
async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn(`Primary API call failed to ${BASE_URL}${endpoint}, trying local fallback...`);
  }

  // Local fallback
  try {
    const res = await fetch(`${LOCAL_URL}${endpoint}`, options);
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.error(`Local fallback API call failed to ${LOCAL_URL}${endpoint}`, err);
  }

  return null;
}

export const DEFAULT_ARTICLE_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23701515'/><stop offset='50%' stop-color='%23b03a2e'/><stop offset='100%' stop-color='%234a0e0e'/></linearGradient><linearGradient id='gold' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='%23f39c12'/><stop offset='100%' stop-color='%23f1c40f'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg)'/><rect x='30' y='30' width='1140' height='740' rx='16' fill='none' stroke='url(%23gold)' stroke-width='2' opacity='0.35'/><circle cx='600' cy='360' r='180' fill='none' stroke='url(%23gold)' stroke-width='1.5' opacity='0.25'/><text x='50%' y='47%' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-family='system-ui, -apple-system, sans-serif' font-size='68' font-weight='800' letter-spacing='8'>HINDIGENOUS</text><text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' fill='url(%23gold)' font-family='system-ui, -apple-system, sans-serif' font-size='22' font-weight='600' letter-spacing='8'>INDIAN HERITAGE %26 CULTURE</text></svg>";
export const DEFAULT_SVG_FALLBACK = DEFAULT_ARTICLE_IMAGE;

/**
 * Helper to resolve image URL from API object
 */
export function parseImageUrl(item, fallback = DEFAULT_ARTICLE_IMAGE) {
  if (!item) return fallback;
  
  let imgPath = '';
  if (typeof item === 'string') {
    imgPath = item;
  } else if (typeof item === 'object') {
    imgPath = item.image || item.imageUrl || item.img || item.file || item.url || item.path || '';
  }

  if (!imgPath || typeof imgPath !== 'string') return fallback;

  // Clean wrapping quotes from API strings (e.g. '"https://res.cloudinary.com/..."')
  imgPath = imgPath.replace(/^["']|["']$/g, '').trim();
  
  if (!imgPath || imgPath === 'undefined' || imgPath === 'null' || imgPath === '[object Object]') {
    return fallback;
  }

  if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) {
    return imgPath;
  }
  
  const cleanPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Extract YouTube Thumbnail Image URL
 */
export function getYouTubeThumbnail(url, fallback = DEFAULT_ARTICLE_IMAGE) {
  if (!url || typeof url !== 'string') return fallback;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
  }
  return fallback;
}

/**
 * Submit Enquiry / Get In Touch Form
 * POST /api/get-in-touch
 */
export async function submitGetInTouch(formData) {
  const payload = {
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber || formData.phone || '',
    description: formData.description || formData.message || '',
  };

  return await fetchApi('/api/get-in-touch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch Category Articles (GET only)
 */
export async function fetchCategoryArticles(categoryKey) {
  let endpoint = `/api/${categoryKey}`;
  
  if (categoryKey === 'etihas') endpoint = '/api/history';
  if (categoryKey === 'sahitya') endpoint = '/api/sahitya';
  if (categoryKey === 'kala') endpoint = '/api/art';
  if (categoryKey === 'sanskriti') endpoint = '/api/history';
  if (categoryKey === 'rajpat') endpoint = '/api/rajpath';

  const res = await fetchApi(endpoint);

  if (!res) return null;

  // Extract array from response
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.articles)) return res.articles;
  if (Array.isArray(res.posts)) return res.posts;
  
  return null;
}

/**
 * Fetch Single Article Detail (GET only with universal fallback search)
 */
export async function fetchSingleArticle(categoryKey, id) {
  if (!id) return null;

  const endpointsToTry = [];
  
  if (categoryKey === 'etihas') endpointsToTry.push(`/api/history/${id}`);
  else if (categoryKey === 'sahitya') endpointsToTry.push(`/api/sahitya/${id}`);
  else if (categoryKey === 'kala') endpointsToTry.push(`/api/art/${id}`);
  else if (categoryKey === 'sanskriti') endpointsToTry.push(`/api/history/${id}`);
  else if (categoryKey === 'rajpat') endpointsToTry.push(`/api/rajpath/${id}`);
  else if (categoryKey === 'home' || categoryKey === 'home-page') endpointsToTry.push(`/api/home-page/article/${id}`);

  // Fallbacks across ALL category endpoints so any article ID always loads successfully!
  endpointsToTry.push(
    `/api/home-page/article/${id}`,
    `/api/history/${id}`,
    `/api/sahitya/${id}`,
    `/api/art/${id}`,
    `/api/rajpath/${id}`
  );

  for (const endpoint of endpointsToTry) {
    try {
      const res = await fetchApi(endpoint);
      if (res) {
        const data = res.data || res.article || res;
        if (data && (data._id || data.title || data.id)) return data;
      }
    } catch (e) {
      // ignore and try next fallback endpoint
    }
  }

  return null;
}

/**
 * Fetch Home Page Articles (GET /api/home-page/article)
 */
export async function fetchHomePageArticles() {
  const res = await fetchApi('/api/home-page/article');
  if (!res) return null;

  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.articles)) return res.articles;

  return null;
}

/**
 * Fetch Home Page Videos (GET /api/home-page/video)
 */
export async function fetchHomePageVideos() {
  const res = await fetchApi('/api/home-page/video');
  if (!res) return null;

  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.videos)) return res.videos;

  return null;
}

/**
 * Fetch Gallery Items (GET /api/gallery)
 */
export async function fetchGalleryItems() {
  const res = await fetchApi('/api/gallery');
  if (!res) return null;

  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.items)) return res.items;

  return null;
}

/**
 * Fetch top 5-8 latest articles added across ALL categories (sorted by createdAt desc)
 */
export async function fetchLatestArticlesAcrossCategories() {
  const categories = [
    { key: 'etihas', endpoint: '/api/history' },
    { key: 'sahitya', endpoint: '/api/sahitya' },
    { key: 'kala', endpoint: '/api/art' },
    { key: 'rajpat', endpoint: '/api/rajpath' },
    { key: 'home', endpoint: '/api/home-page/article' },
  ];

  const results = await Promise.all(
    categories.map(async (cat) => {
      const res = await fetchApi(cat.endpoint);
      if (!res) return [];
      let list = Array.isArray(res) ? res : (res.data || res.articles || res.posts || []);
      return list.map(item => ({ ...item, categoryKey: cat.key }));
    })
  );

  const allArticles = results.flat();

  // Sort by createdAt descending so latest added article is first!
  allArticles.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  return allArticles;
}

/**
 * Fetch 1 latest article from each of the 5 categories (etihas, sahitya, kala, sanskriti, rajpat)
 */
export async function fetchOneArticlePerCategory() {
  const catList = [
    { key: 'etihas', title: { hi: 'इतिहास', en: 'History' } },
    { key: 'sahitya', title: { hi: 'साहित्य', en: 'Literature' } },
    { key: 'kala', title: { hi: 'कला', en: 'Arts' } },
    { key: 'sanskriti', title: { hi: 'संस्कृति', en: 'Culture' } },
    { key: 'rajpat', title: { hi: 'राज-पाट', en: 'Raj-paat' } },
  ];

  const articles = await Promise.all(
    catList.map(async (cat) => {
      const catArticles = await fetchCategoryArticles(cat.key);
      if (catArticles && catArticles.length > 0) {
        return {
          ...catArticles[0],
          categoryKey: cat.key,
          categoryTitle: cat.title,
        };
      }
      return null;
    })
  );

  return articles.filter(Boolean);
}

/**
 * Parse video URL or YouTube URL into embed link or video source object
 */
export function parseVideoEmbed(url) {
  if (!url || typeof url !== 'string') return null;
  
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&mute=1&loop=1&playlist=${ytMatch[1]}`,
      watchUrl: `https://www.youtube.com/watch?v=${ytMatch[1]}`,
      id: ytMatch[1]
    };
  }

  return {
    type: 'direct',
    url: url
  };
}


