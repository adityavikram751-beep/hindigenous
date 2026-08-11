"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useParams } from "next/navigation";
import styles from "./ArticleDetail.module.css";
import { fetchSingleArticle, parseImageUrl } from "@/lib/api";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const categoryNames = {
  etihas: { hi: "इतिहास", en: "History" },
  sahitya: { hi: "साहित्य", en: "Literature" },
  kala: { hi: "कला", en: "Arts" },
  sanskriti: { hi: "संस्कृति", en: "Culture" },
  rajpat: { hi: "राज-पाट", en: "Raj-paat" },
};

export default function ArticleDetailComponent({ categoryKey }) {
  const { lang, translateArticleItem, getFieldText } = useLanguage();
  const params = useParams();
  const slug = params?.slug;

  const [rawArticle, setRawArticle] = useState(null);
  const [displayArticle, setDisplayArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    async function loadArticle() {
      setLoading(true);
      const apiData = await fetchSingleArticle(categoryKey, slug);
      if (isMounted) {
        setRawArticle(apiData);
        setLoading(false);
      }
    }
    loadArticle();
    return () => { isMounted = false; };
  }, [categoryKey, slug]);

  // Translate article object whenever rawArticle or lang changes
  useEffect(() => {
    let isMounted = true;
    async function processTranslation() {
      if (!rawArticle) {
        if (isMounted) setDisplayArticle(null);
        return;
      }
      const translated = await translateArticleItem(rawArticle, lang);
      if (isMounted) {
        setDisplayArticle(translated);
      }
    }
    processTranslation();
    return () => { isMounted = false; };
  }, [rawArticle, lang, translateArticleItem]);

  const categoryName = categoryNames[categoryKey] ? categoryNames[categoryKey][lang] : categoryKey;

  const article = displayArticle || rawArticle;

  if (loading) {
    return (
      <main className="container" style={{ padding: '80px 20px', minHeight: '60vh' }}>
        <LoadingSpinner text={lang === 'hi' ? 'लेख लोड हो रहा है...' : 'Loading article details...'} />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="container" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
          {lang === 'hi' ? 'लेख प्राप्त नहीं हुआ।' : 'Article not found.'}
        </h2>
        <Link href={`/${categoryKey}`} style={{ color: 'var(--accent-color, #b03a2e)', textDecoration: 'underline' }}>
          {lang === 'hi' ? '← श्रेणी सूची पर वापस जाएँ' : '← Back to category list'}
        </Link>
      </main>
    );
  }

  const title = article.translatedTitle || getFieldText(article.title, lang, 'Untitled');
  const author = article.translatedAuthor || getFieldText(article.authorName || article.author, lang, 'HINDIGENOUS');
  const bio = article.translatedBio || getFieldText(article.bio || article.authorBio, lang, '');
  const image = parseImageUrl(article);
  const date = article.createdAt ? new Date(article.createdAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US') : (article.date || '');
  
  let rawContent = article.translatedContent || article.description || article.content || article.subTitle || '';
  let rawText = '';
  if (typeof rawContent === 'string') {
    rawText = rawContent;
  } else if (Array.isArray(rawContent)) {
    rawText = rawContent.join('\n\n');
  } else if (typeof rawContent === 'object') {
    rawText = getFieldText(rawContent, lang, '');
  }

  // Detect Poem (Kavita) vs Story (Kahani)
  const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
  const avgLineLength = lines.length > 0 ? (rawText.length / lines.length) : 100;
  const isPoem = (lines.length > 3 && avgLineLength < 65) || (categoryKey === 'sahitya' && lines.length > 3);

  const stanzas = rawText.split(/\r?\n\r?\n/).filter(Boolean);

  return (
    <main className={styles.articleMain}>
      <div className={styles.heroSection}>
        <div className={styles.heroBackdrop} style={{ backgroundImage: `url(${image})` }}></div>
        
        <div className={styles.heroContent}>
          <span className={styles.categoryLabel}>{categoryName}</span>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.articleAuthor}>{author}</span>
            {date && <span>📅 {date}</span>}
          </div>
        </div>

        {/* Uncropped Featured Image Container */}
        <div className={styles.featuredImageWrapper}>
          <img 
            src={image} 
            alt={title} 
            className={styles.articleFeaturedImage} 
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&q=80&w=1200"; }}
          />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.socialShare}>
          {/* X (Twitter) */}
          <div className={styles.socialIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </div>
          {/* Facebook */}
          <div className={styles.socialIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          {/* Whatsapp */}
          <div className={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.976L1.92 22.083l5.253-1.378A9.957 9.957 0 0012.012 21.98c5.506 0 9.989-4.479 9.989-9.985S17.518 2 12.012 2zm5.494 14.341c-.227.636-1.313 1.205-1.815 1.272-.486.065-1.127.112-3.633-1.041-2.999-1.382-4.945-4.437-5.093-4.636-.149-.199-1.216-1.616-1.216-3.084 0-1.468.761-2.193 1.03-2.483.268-.29.58-.362.772-.362.193 0 .385.002.554.01.182.008.427-.069.664.502.246.592.836 2.046.909 2.194.072.149.12.321.024.512-.096.191-.145.313-.289.482-.145.169-.307.369-.439.502-.145.145-.301.306-.133.596.17.29 .755 1.246 1.625 2.023 1.125 1.004 2.062 1.31 2.352 1.455.29.145.461.121.636-.073.175-.193.753-.878.955-1.18.203-.301.405-.251.67-.151.265.099 1.677.79 1.966.935.29.145.482.217.554.337.072.12.072.701-.155 1.337z"/></svg>
          </div>
          {/* LinkedIn */}
          <div className={styles.socialIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </div>
        </div>

        <div className={styles.articleBody}>
          {isPoem ? (
            <div className={styles.poemBody}>
              {stanzas.map((stanza, idx) => (
                <div key={idx} className={styles.poemStanza}>
                  {stanza.trim()}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.storyBody}>
              {stanzas.map((paragraph, idx) => (
                <p key={idx}>{paragraph.trim()}</p>
              ))}
            </div>
          )}
        </div>

        {author && (
          <div className={styles.authorBio}>
            <h3 className={styles.authorName}>{author}</h3>
            {bio && <p className={styles.authorDescription}>{bio}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
