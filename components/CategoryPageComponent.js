"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import styles from "@/app/category.module.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonGrid from "@/components/SkeletonGrid";
import { fetchCategoryArticles, parseImageUrl, DEFAULT_ARTICLE_IMAGE, DEFAULT_SVG_FALLBACK } from "@/lib/api";

const categoryData = {
  etihas: { hi: "इतिहास", en: "History" },
  sahitya: { hi: "साहित्य", en: "Literature" },
  kala: { hi: "कला", en: "Arts" },
  sanskriti: { hi: "संस्कृति", en: "Culture" },
  rajpat: { hi: "राज-पाट", en: "Raj-paat" },
};

const fallbackImage = DEFAULT_ARTICLE_IMAGE;

export default function CategoryPageComponent({ categoryKey }) {
  const { lang, translateArticles, getFieldText } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [displayArticles, setDisplayArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const apiArticles = await fetchCategoryArticles(categoryKey);
      if (isMounted) {
        setArticles(Array.isArray(apiArticles) ? apiArticles : []);
        setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [categoryKey]);

  // Translate articles whenever articles or lang changes
  useEffect(() => {
    let isMounted = true;
    async function processTranslations() {
      if (!articles || articles.length === 0) {
        if (isMounted) setDisplayArticles([]);
        return;
      }
      const translated = await translateArticles(articles, lang);
      if (isMounted) {
        setDisplayArticles(translated);
      }
    }
    processTranslations();
    return () => { isMounted = false; };
  }, [articles, lang, translateArticles]);

  const pageTitle = categoryData[categoryKey] ? categoryData[categoryKey][lang] : categoryKey;

  const currentList = displayArticles.length > 0 ? displayArticles : articles;

  return (
    <main className={`container ${styles.categoryMain}`}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      
      {loading ? (
        <>
          <LoadingSpinner text={lang === 'hi' ? 'लेख लोड हो रहे हैं...' : 'Loading articles...'} />
          <SkeletonGrid count={6} />
        </>
      ) : currentList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          {lang === 'hi' ? 'इस श्रेणी में अभी कोई लेख उपलब्ध नहीं है।' : 'No articles available in this category yet.'}
        </div>
      ) : (
        <div className={styles.articleList}>
          {currentList.map((item, index) => {
            const articleId = item._id || item.id || item.slug || `article-${index}`;
            const title = item.translatedTitle || getFieldText(item.title, lang, 'शीर्षक unavailable');
            const author = item.translatedAuthor || getFieldText(item.authorName || item.author, lang, 'HINDIGENOUS');
            const rawExcerpt = item.translatedExcerpt || getFieldText(item.subTitle || item.description || item.excerpt, lang, '');
            const cleanExcerpt = rawExcerpt.replace(/[\r\n]+/g, ' ').trim();
            const excerpt = cleanExcerpt.length > 120 ? `${cleanExcerpt.slice(0, 120)}...` : cleanExcerpt;
            const image = parseImageUrl(item);
            const date = item.createdAt ? new Date(item.createdAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US') : (item.date || '');

            return (
              <Link href={`/${categoryKey}/${articleId}`} key={articleId} className={styles.articleCard}>
                <div className={styles.cardImageWrapper}>
                  <img 
                    src={image}
                    alt={title} 
                    className={styles.cardImage} 
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage; }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{title}</h2>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardAuthor}>{author}</span>
                    {date && <span className={styles.cardDate}>- {date}</span>}
                  </div>
                  {excerpt && <p className={styles.cardExcerpt}>{excerpt}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
