"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { 
  fetchHomePageArticles,
  fetchHomePageVideos,
  fetchGalleryItems, 
  fetchLatestArticlesAcrossCategories,
  fetchOneArticlePerCategory,
  parseImageUrl, 
  parseVideoEmbed,
  getYouTubeThumbnail,
  DEFAULT_ARTICLE_IMAGE,
  DEFAULT_SVG_FALLBACK
} from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonGrid from "@/components/SkeletonGrid";

const fallbackImage = DEFAULT_ARTICLE_IMAGE;

export default function Home() {
  const { lang, translateArticles, translateText, getFieldText } = useLanguage();

  const [homeArticles, setHomeArticles] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadAllHomeData() {
      setLoading(true);

      const [apiHomeArts, apiVideos, apiGallery, apiLatest, apiCatArticles] = await Promise.all([
        fetchHomePageArticles(),
        fetchHomePageVideos(),
        fetchGalleryItems(),
        fetchLatestArticlesAcrossCategories(),
        fetchOneArticlePerCategory()
      ]);

      if (isMounted) {
        // Home page articles (or fallback to latest)
        const mainArticlesList = (apiHomeArts && apiHomeArts.length > 0) ? apiHomeArts : apiLatest;
        if (mainArticlesList && mainArticlesList.length > 0) {
          setHomeArticles(mainArticlesList);
        }

        // Dedicated Video API items (/api/home-page/video)
        if (apiVideos && apiVideos.length > 0) {
          const processedVids = [];
          apiVideos.forEach((v) => {
            const vUrl = Array.isArray(v.videos) && v.videos.length > 0 
              ? v.videos[0] 
              : (v.videoUrl || v.url || v.file || '');
            if (vUrl) {
              processedVids.push({
                _id: v._id || v.id,
                title: v.title || 'Featured Video',
                description: v.description || '',
                url: vUrl
              });
            }
          });
          setVideoList(processedVids);
        }

        // Gallery items (/api/gallery)
        if (apiGallery && apiGallery.length > 0) {
          setGalleryItems(apiGallery);
        }

        // 1 Article per category (History, Sahitya, Kala, Sanskriti, Rajpath)
        if (apiCatArticles && apiCatArticles.length > 0) {
          setCategoryArticles(apiCatArticles);
        }

        setLoading(false);
      }
    }

    loadAllHomeData();
    return () => { isMounted = false; };
  }, []);

  // Translate all content dynamically on language change
  const [translatedHomeArts, setTranslatedHomeArts] = useState([]);
  const [translatedVideoList, setTranslatedVideoList] = useState([]);
  const [translatedGallery, setTranslatedGallery] = useState([]);
  const [translatedCategoryArts, setTranslatedCategoryArts] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Skip translation if data hasn't loaded yet
    if (homeArticles.length === 0 && videoList.length === 0 && galleryItems.length === 0 && categoryArticles.length === 0) {
      return;
    }

    async function processTranslations() {
      if (isMounted) setIsTranslating(true);

      const [tHome, tVids, tGallery, tCats] = await Promise.all([
        homeArticles.length > 0 ? translateArticles(homeArticles, lang) : [],
        videoList.length > 0 ? Promise.all(videoList.map(async (v) => ({
          ...v,
          translatedTitle: await translateText(v.title, lang),
          translatedDesc: await translateText(v.description, lang)
        }))) : [],
        galleryItems.length > 0 ? Promise.all(galleryItems.map(async (g) => ({
          ...g,
          translatedTitle: await translateText(g.title, lang),
          translatedDesc: await translateText(g.description, lang)
        }))) : [],
        categoryArticles.length > 0 ? translateArticles(categoryArticles, lang) : []
      ]);

      if (isMounted) {
        setTranslatedHomeArts(tHome);
        setTranslatedVideoList(tVids);
        setTranslatedGallery(tGallery);
        setTranslatedCategoryArts(tCats);
        setIsTranslating(false);
      }
    }

    processTranslations();
    return () => { isMounted = false; };
  }, [lang, homeArticles.length, videoList.length, galleryItems.length, categoryArticles.length]);

  const content = {
    hi: {
      latestNews: "ताज़ा खबरें",
      videoSectionTitle: "विशेष वीडियो अनुभाग (Video Section)",
      videoGallery: "वीडियो गैलरी (YouTube)",
      categoryHighlights: "श्रेणी विशेष (Category Highlights)",
    },
    en: {
      latestNews: "Latest News",
      videoSectionTitle: "Featured Video Section",
      videoGallery: "Video Gallery (YouTube)",
      categoryHighlights: "Category Highlights",
    }
  };

  const t = content[lang] || content.hi;

  const currentHomeArts = translatedHomeArts.length > 0 ? translatedHomeArts : homeArticles;
  const currentVideoList = translatedVideoList.length > 0 ? translatedVideoList : videoList;
  const currentGallery = translatedGallery.length > 0 ? translatedGallery : galleryItems;
  const currentCatArticles = translatedCategoryArts.length > 0 ? translatedCategoryArts : categoryArticles;

  // Main featured article (1st article)
  const featuredArticle = currentHomeArts[0];
  // Side articles (next 4 articles)
  const sideArticles = currentHomeArts.slice(1, 5);

  // Active inline video details
  const activeVideo = currentVideoList[activeVideoIdx] || currentVideoList[0];
  const activeVideoEmbed = activeVideo ? parseVideoEmbed(activeVideo.url) : null;
  const activeVideoThumbnail = activeVideo ? getYouTubeThumbnail(activeVideo.url, fallbackImage) : fallbackImage;

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_SVG_FALLBACK;
  };

  return (
    <main>
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
        
        {/* Initial API Data Loading State */}
        {loading ? (
          <div style={{ padding: '40px 0' }}>
            <LoadingSpinner text={lang === 'hi' ? 'ताज़ा खबरें और वीडियो लोड हो रहे हैं...' : 'Loading latest news & videos...'} />
            <SkeletonGrid count={6} />
          </div>
        ) : (
          <>
            {/* Translation Loading Indicator */}
            {isTranslating && (
              <div style={{
                position: 'sticky',
                top: '10px',
                zIndex: 100,
                background: 'var(--accent-color, #b03a2e)',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '20px',
                margin: '0 auto 16px auto',
                width: 'fit-content',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }}></span>
                {lang === 'hi' ? 'सामग्री को हिंदी में रूपांतरित किया जा रहा है...' : 'Translating content to English...'}
              </div>
            )}

        {/* SECTION 1: LATEST NEWS (Left Featured Article + Right Side Articles) */}
        <h2 className={styles.sectionHeading}>{t.latestNews}</h2>
        <div className={styles.mainGrid}>
          
          {/* Left Column: Featured Article */}
          {featuredArticle && (
            <section className={styles.featuredSection}>
              <Link 
                href={`/${featuredArticle.categoryKey || 'home-page'}/${featuredArticle._id || featuredArticle.id || '1'}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.featuredImageWrapper}>
                  <img 
                    src={parseImageUrl(featuredArticle, fallbackImage)} 
                    alt={featuredArticle.translatedTitle || getFieldText(featuredArticle.title, lang, '')} 
                    className={styles.featuredImage}
                    onError={handleImageError}
                  />
                </div>
                <div style={{ marginTop: '14px' }}>
                  {getFieldText(featuredArticle.subTitle || featuredArticle.category, lang, '') && (
                    <span className={styles.articleLabel}>
                      {getFieldText(featuredArticle.subTitle || featuredArticle.category, lang, '')}
                    </span>
                  )}
                  <h2 className={styles.featuredTitle} style={{ fontSize: '1.6rem', marginTop: '6px' }}>
                    {featuredArticle.translatedTitle || getFieldText(featuredArticle.title, lang, 'शीर्षक unavailable')}
                  </h2>
                  <div className={styles.articleAuthor} style={{ marginTop: '8px', fontSize: '0.95rem' }}>
                    {featuredArticle.translatedAuthor || getFieldText(featuredArticle.authorName || featuredArticle.author, lang, 'HINDIGENOUS')}
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Right Column: 4 Side Articles */}
          <aside className={styles.sideArticles}>
            {sideArticles.map((item, idx) => {
              const catKey = item.categoryKey || 'home-page';
              const articleId = item._id || item.id || `side-${idx}`;
              const title = item.translatedTitle || getFieldText(item.title, lang, 'शीर्षक unavailable');
              const author = item.translatedAuthor || getFieldText(item.authorName || item.author, lang, 'HINDIGENOUS');
              const label = getFieldText(item.subTitle || item.category || item.label, lang, '');
              const image = parseImageUrl(item, fallbackImage);

              return (
                <Link 
                  href={`/${catKey}/${articleId}`} 
                  key={idx} 
                  className={styles.articleCard} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className={styles.articleImageWrapper}>
                    <img 
                      src={image} 
                      alt={title} 
                      className={styles.articleImage} 
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    {label && <div className={styles.articleLabel}>{label}</div>}
                    <h3 className={styles.articleTitle}>{title}</h3>
                    <div className={styles.articleAuthor}>{author}</div>
                  </div>
                </Link>
              );
            })}
          </aside>

        </div>

        {/* SECTION 2: DEDICATED INLINE VIDEO SECTION (/api/home-page/video) */}
        {activeVideo && (
          <div style={{ marginTop: '50px', background: 'var(--surface-color, #1a1a1a)', padding: '24px', borderRadius: '12px', color: '#fff' }}>
            <h2 className={styles.sectionHeading} style={{ borderBottom: '2px solid #b03a2e', paddingBottom: '8px', color: '#fff' }}>
              {t.videoSectionTitle}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '20px', alignItems: 'center' }}>
              
              {/* Left Column: Video Player (Plays Inline Right on Screen) */}
              <div 
                style={{ position: 'relative', width: '100%', height: '320px', background: '#000', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setIsPlayingVideo(true)}
              >
                {isPlayingVideo && activeVideoEmbed ? (
                  activeVideoEmbed.type === 'youtube' ? (
                    <iframe 
                      src={`${activeVideoEmbed.embedUrl}&autoplay=1`}
                      title={activeVideo.translatedTitle || activeVideo.title} 
                      frameBorder="0" 
                      style={{ width: '100%', height: '100%' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  ) : (
                    <video 
                      controls 
                      autoPlay 
                      src={activeVideoEmbed.url} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img 
                      src={activeVideoThumbnail} 
                      alt={activeVideo.translatedTitle || activeVideo.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={handleImageError}
                    />
                    {/* Big Center Play Button */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(176, 58, 46, 0.9)',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
                      transition: 'transform 0.2s'
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Title and Description */}
              <div style={{ padding: '8px' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', tracking: '1px', color: '#b03a2e', fontWeight: 700 }}>
                  ▶ {lang === 'hi' ? 'विशेष वीडियो' : 'Featured Video'}
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '8px', lineHeight: '1.3', color: '#fff' }}>
                  {activeVideo.translatedTitle || activeVideo.title}
                </h3>
                {(activeVideo.translatedDesc || activeVideo.description) && (
                  <p style={{ marginTop: '12px', fontSize: '0.98rem', color: '#ccc', lineHeight: '1.6' }}>
                    {activeVideo.translatedDesc || activeVideo.description}
                  </p>
                )}
                {!isPlayingVideo && (
                  <button 
                    onClick={() => setIsPlayingVideo(true)}
                    style={{
                      marginTop: '16px',
                      padding: '10px 20px',
                      background: '#b03a2e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    {lang === 'hi' ? 'यहाँ वीडियो चलाएं' : 'Play Video Inline'}
                  </button>
                )}
              </div>

            </div>

            {/* Video Selector Playlist below main player */}
            {currentVideoList.length > 1 && (
              <div style={{ marginTop: '24px', display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {currentVideoList.map((vItem, vIdx) => {
                  const isActive = vIdx === activeVideoIdx;
                  const vThumb = getYouTubeThumbnail(vItem.url, fallbackImage);
                  const vTitle = vItem.translatedTitle || vItem.title;

                  return (
                    <div 
                      key={vIdx} 
                      onClick={() => {
                        setActiveVideoIdx(vIdx);
                        setIsPlayingVideo(true);
                      }}
                      style={{
                        minWidth: '200px',
                        maxWidth: '220px',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: isActive ? '#333' : '#222',
                        border: isActive ? '2px solid #b03a2e' : '1px solid #444',
                        padding: '8px'
                      }}
                    >
                      <div style={{ position: 'relative', height: '110px', borderRadius: '4px', overflow: 'hidden' }}>
                        <img 
                          src={vThumb} 
                          alt={vTitle} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={handleImageError}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#fff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {vTitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* SECTION 3: GALLERY (Opens Directly on YouTube) */}
        <h2 className={styles.sectionHeading} style={{ marginTop: '50px' }}>{t.videoGallery}</h2>
        <div className={styles.cardGrid}>
          {currentGallery.map((gItem, idx) => {
            const ytUrl = gItem.youtubeUrl || gItem.videoUrl || gItem.url || 'https://www.youtube.com';
            const thumbnail = getYouTubeThumbnail(ytUrl, parseImageUrl(gItem, fallbackImage));
            const gTitle = gItem.translatedTitle || getFieldText(gItem.title, lang, 'Gallery Video');
            const gDesc = gItem.translatedDesc || getFieldText(gItem.description, lang, '');

            return (
              <a 
                href={ytUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={idx} 
                className={styles.articleCard} 
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
              >
                <div className={styles.articleImageWrapper} style={{ height: '200px', position: 'relative' }}>
                  <img 
                    src={thumbnail} 
                    alt={gTitle} 
                    className={styles.articleImage} 
                    onError={handleImageError}
                  />
                  {/* Red YouTube Play Badge Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(255, 0, 0, 0.85)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>

                <div style={{ padding: '12px 0' }}>
                  <h3 className={styles.articleTitle} style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>{gTitle}</h3>
                  {gDesc && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {gDesc}
                    </p>
                  )}
                  <span style={{ fontSize: '0.8rem', color: '#cc0000', fontWeight: 600, display: 'inline-block', marginTop: '6px' }}>
                    ▶ YouTube पर देखें (Watch on YouTube) ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* SECTION 4: CATEGORY HIGHLIGHTS (1 Article from Each Category) */}
        {currentCatArticles.length > 0 && (
          <>
            <h2 className={styles.sectionHeading} style={{ marginTop: '50px' }}>{t.categoryHighlights}</h2>
            <div className={styles.cardGrid}>
              {currentCatArticles.map((catItem, idx) => {
                const catKey = catItem.categoryKey || 'etihas';
                const catTitle = catItem.categoryTitle ? catItem.categoryTitle[lang] : catKey;
                const articleId = catItem._id || catItem.id || `cat-art-${idx}`;
                const title = catItem.translatedTitle || getFieldText(catItem.title, lang, 'शीर्षक unavailable');
                const author = catItem.translatedAuthor || getFieldText(catItem.authorName || catItem.author, lang, 'HINDIGENOUS');
                const image = parseImageUrl(catItem, fallbackImage);

                return (
                  <Link 
                    href={`/${catKey}/${articleId}`} 
                    key={idx} 
                    className={styles.articleCard} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className={styles.articleImageWrapper} style={{ height: '220px' }}>
                      <img 
                        src={image} 
                        alt={title} 
                        className={styles.articleImage} 
                        onError={handleImageError}
                      />
                    </div>
                    <div style={{ padding: '10px 0' }}>
                      <div className={styles.articleLabel}>{catTitle}</div>
                      <h3 className={styles.articleTitle}>{title}</h3>
                      <div className={styles.articleAuthor}>{author}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
          </>
        )}

      </div>
    </main>
  );
}




