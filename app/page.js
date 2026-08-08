"use client";
import styles from "./page.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  const content = {
    hi: {
      heroTitle: "भारतीय इतिहास और विरासत",
      featuredTitle: "वामपंथियों के निशाने पर हमेशा शिक्षा मंत्रालय ही क्यों?",
      latestNews: "ताज़ा खबरें",
      videoGallery: "ऐतिहासिक वीडियो गैलरी",
      editorsPick: "संपादक की पसंद",
      opinion: "विचार / संपादकीय",
      moreContent: "विशेष कवरेज",
      articles: [
        { label: "डिस्कशन टेबल से", title: "नक्सलवाद से विकास की ओर बढ़ते आदिवासी", author: "HINDIGENOUS", img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800" },
        { label: "राष्ट्रीय", title: "पेपर लीक पर दिल्ली में आंदोलन, पंजाब में चुप्पी क्यों?", author: "आदित्य", img: "https://images.unsplash.com/photo-1541872526845-866418b76c8c?auto=format&fit=crop&q=80&w=800" },
        { label: "राजनीति", title: "‘बस नाम रहेगा अल्लाह का’, कॉकरोच जनता पार्टी का नया नारा", author: "HINDIGENOUS", img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800" },
        { label: "मुखौटा", title: "सच्चाई का आईना", author: "शालिनी कौशिक", img: "https://images.unsplash.com/photo-1542458428-21d15db8c227?auto=format&fit=crop&q=80&w=800" },
        { label: "विश्लेषण", title: "भारत के लिए क्यों ख़तरनाक हैं सोनम वांगचुक", author: "HINDIGENOUS", img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800" },
        { label: "इतिहास", title: "मराठा साम्राज्य का अनसुना इतिहास", author: "विकास शर्मा", img: "https://images.unsplash.com/photo-1582554766943-4ed4a4cbbf3d?auto=format&fit=crop&q=80&w=800" },
        { label: "संस्कृति", title: "सिंधु घाटी की वो खोजें जो बदल देंगी इतिहास", author: "प्रिया सिंह", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800" },
        { label: "प्रौद्योगिकी", title: "प्राचीन भारत का विज्ञान और तकनीक", author: "रोहित कुमार", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
      ]
    },
    en: {
      heroTitle: "Indian History & Heritage",
      featuredTitle: "Why is the Education Ministry always targeted by leftists?",
      latestNews: "Latest News",
      videoGallery: "Historical Video Gallery",
      editorsPick: "Editor's Pick",
      opinion: "Opinion / Editorial",
      moreContent: "Special Coverage",
      articles: [
        { label: "From the Discussion Table", title: "Tribals moving towards development from Naxalism", author: "HINDIGENOUS", img: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800" },
        { label: "National", title: "Protests in Delhi over paper leaks, why silence in Punjab?", author: "Aditya", img: "https://images.unsplash.com/photo-1541872526845-866418b76c8c?auto=format&fit=crop&q=80&w=800" },
        { label: "Politics", title: "'Only Allah's name will remain', Cockroach Janata Party's new slogan", author: "HINDIGENOUS", img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=800" },
        { label: "The Mask", title: "Mirror of Truth", author: "Shalini Kaushik", img: "https://images.unsplash.com/photo-1542458428-21d15db8c227?auto=format&fit=crop&q=80&w=800" },
        { label: "Analysis", title: "Why Sonam Wangchuk is dangerous for India", author: "HINDIGENOUS", img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800" },
        { label: "History", title: "The Untold History of the Maratha Empire", author: "Vikas Sharma", img: "https://images.unsplash.com/photo-1582554766943-4ed4a4cbbf3d?auto=format&fit=crop&q=80&w=800" },
        { label: "Culture", title: "Indus Valley discoveries that will change history", author: "Priya Singh", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800" },
        { label: "Technology", title: "Science and Technology of Ancient India", author: "Rohit Kumar", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
      ]
    }
  };

  const t = content[lang] || content.hi;
  
  // Generating a moderate amount of content blocks (3-4 pages worth)
  const repeatedSections = Array(4).fill(null); 

  return (
    <main>
      {/* Historic Hero Video Section (Autoplay) */}
      <section style={{ width: '100%', height: '80vh', position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
        >
          {/* A public domain / stock historical ruins video */}
          <source src="https://cdn.pixabay.com/video/2016/09/21/5361-182390708_large.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: '#e0c097', fontSize: '5rem', fontFamily: 'var(--font-serif)', textShadow: '2px 2px 10px rgba(0,0,0,0.9)', textAlign: 'center', padding: '0 20px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            {t.heroTitle}
          </h1>
        </div>
      </section>

      <div className="container">
        
        {/* MASSIVE CONTENT LOOP */}
        {repeatedSections.map((_, index) => (
          <div key={index} style={{ paddingBottom: '60px', borderBottom: index < repeatedSections.length - 1 ? '1px dashed #ccc' : 'none' }}>
            
            {/* TOP GRID: Featured + Sidebar */}
            <h2 className={styles.sectionHeading}>{t.latestNews} (भाग {index + 1})</h2>
            <div className={styles.mainGrid}>
              <section className={styles.featuredSection}>
                <div className={styles.featuredImageWrapper}>
                  <img 
                    src={t.articles[index % 8].img} 
                    alt="News" 
                    className={styles.featuredImage}
                  />
                </div>
                <h2 className={styles.featuredTitle}>{t.articles[index % 8].title}</h2>
              </section>

              <aside className={styles.sideArticles}>
                {t.articles.slice(0, 3).map((article, idx) => (
                  <article key={idx} className={styles.articleCard}>
                    <div className={styles.articleImageWrapper}>
                      <img src={t.articles[(idx + index) % 8].img} alt={article.title} className={styles.articleImage} />
                    </div>
                    {article.label && <div className={styles.articleLabel}>{t.articles[(idx + index) % 8].label}</div>}
                    <h3 className={styles.articleTitle}>{t.articles[(idx + index) % 8].title}</h3>
                    <div className={styles.articleAuthor}>{article.author}</div>
                  </article>
                ))}
              </aside>
            </div>

            {/* HISTORIC VIDEOS GALLERY */}
            <h2 className={styles.sectionHeading}>{t.videoGallery}</h2>
            <div className={styles.videoGrid}>
              <div className={styles.videoContainer}>
                 {/* Historic Documentary 1 */}
                 <iframe 
                    src="https://www.youtube.com/embed/t9ZqS4Oub8Y?autoplay=0&mute=1&loop=1&playlist=t9ZqS4Oub8Y" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
              </div>
              <div className={styles.videoContainer}>
                 {/* Historic Documentary 2 */}
                 <iframe 
                    src="https://www.youtube.com/embed/9G0z_JIf3lE?autoplay=0&mute=1&loop=1&playlist=9G0z_JIf3lE" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
              </div>
              <div className={styles.videoContainer}>
                 {/* Historic Documentary 3 */}
                 <iframe 
                    src="https://www.youtube.com/embed/V6fAomP5e_w?autoplay=0&mute=1&loop=1&playlist=V6fAomP5e_w" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
              </div>
              <div className={styles.videoContainer}>
                 {/* Historic Documentary 4 */}
                 <iframe 
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1&loop=1&playlist=jfKfPfyJRdk" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
              </div>
              <div className={styles.videoContainer}>
                 {/* Historic Documentary 5 */}
                 <iframe 
                    src="https://www.youtube.com/embed/Pwe-pA6TaZk?autoplay=0&mute=1&loop=1&playlist=Pwe-pA6TaZk" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
              </div>
            </div>

            {/* MORE CARDS GRID */}
            <h2 className={styles.sectionHeading}>{t.moreContent}</h2>
            <div className={styles.cardGrid}>
              {t.articles.slice(3, 6).map((article, idx) => (
                <article key={idx} className={styles.articleCard} style={{ border: 'none' }}>
                  <div className={styles.articleImageWrapper} style={{ height: '250px' }}>
                    <img src={t.articles[(idx + index + 3) % 8].img} alt={article.title} className={styles.articleImage} />
                  </div>
                  {article.label && <div className={styles.articleLabel}>{t.articles[(idx + index + 3) % 8].label}</div>}
                  <h3 className={styles.articleTitle}>{t.articles[(idx + index + 3) % 8].title}</h3>
                  <div className={styles.articleAuthor}>{article.author}</div>
                </article>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </main>
  );
}
