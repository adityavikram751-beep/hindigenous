/**
 * Dynamic Translation Utility for Hindigenous
 * Handles dynamic string & API article object translation between Hindi & English
 */

const memoryCache = new Map();

/**
 * Helper to check if text contains Hindi (Devanagari) characters
 */
export function isHindiText(text) {
  if (!text || typeof text !== 'string') return false;
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Gets cached translation from memory or localStorage
 */
function getFromCache(key) {
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const cached = localStorage.getItem(`tr_${key}`);
      if (cached) {
        memoryCache.set(key, cached);
        return cached;
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }
  return null;
}

/**
 * Saves translation to memory and localStorage cache
 */
function saveToCache(key, val) {
  memoryCache.set(key, val);
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(`tr_${key}`, val);
    } catch (e) {
      // ignore quota errors
    }
  }
}

/**
 * Translate a single text string dynamically to target language ('hi' or 'en')
 */
export async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return text || '';
  }

  const isHindi = isHindiText(text);

  // If text is already in target language, return as is
  if (targetLang === 'hi' && isHindi) return text;
  if (targetLang === 'en' && !isHindi) return text;

  const cacheKey = `${targetLang}:${text.slice(0, 100)}_${text.length}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json && json[0] && Array.isArray(json[0])) {
        const translated = json[0].map(part => part[0]).join('');
        if (translated) {
          saveToCache(cacheKey, translated);
          return translated;
        }
      }
    }
  } catch (err) {
    console.warn(`Translation failed for text: "${text.slice(0, 30)}..."`, err);
  }

  return text;
}

/**
 * Helper to get property text from object (handling localized object or plain string)
 */
export function getFieldText(field, lang, fallback = '') {
  if (!field) return fallback;
  if (typeof field === 'object') {
    return field[lang] || field.hi || field.en || fallback;
  }
  return String(field);
}

/**
 * Translates a single article object (title, author, excerpt, description, bio, content)
 */
export async function translateArticleItem(item, targetLang) {
  if (!item || typeof item !== 'object') return item;

  const rawTitle = getFieldText(item.title, targetLang, '');
  const rawAuthor = getFieldText(item.authorName || item.author, targetLang, '');
  const rawExcerpt = getFieldText(item.subTitle || item.description || item.excerpt, targetLang, '');
  const rawBio = getFieldText(item.bio || item.authorBio, targetLang, '');
  const rawContent = getFieldText(item.content || item.description, targetLang, '');

  const [translatedTitle, translatedAuthor, translatedExcerpt, translatedBio, translatedContent] = await Promise.all([
    translateText(rawTitle, targetLang),
    translateText(rawAuthor, targetLang),
    translateText(rawExcerpt, targetLang),
    translateText(rawBio, targetLang),
    translateText(rawContent, targetLang),
  ]);

  return {
    ...item,
    translatedTitle,
    translatedAuthor,
    translatedExcerpt,
    translatedBio,
    translatedContent,
    displayLang: targetLang,
  };
}

/**
 * Translates an array of articles in parallel
 */
export async function translateArticles(articles, targetLang) {
  if (!Array.isArray(articles)) return [];
  return Promise.all(articles.map(item => translateArticleItem(item, targetLang)));
}
