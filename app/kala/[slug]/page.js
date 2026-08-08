"use client";
import { useLanguage } from "@/context/LanguageContext";
import { useParams } from "next/navigation";

import styles from "./article.module.css";
import Link from "next/link";

const categoryNames = {
  etihas: { hi: "इतिहास", en: "History" },
  sahitya: { hi: "साहित्य", en: "Literature" },
  kala: { hi: "कला", en: "Arts" },
  sanskriti: { hi: "संस्कृति", en: "Culture" },
  rajpat: { hi: "राजनीति", en: "Politics" }, // Using Rajneeti as per screenshot
};

const articleData = {
  image: "https://images.unsplash.com/photo-1541872526845-866418b76c8c?auto=format&fit=crop&q=80&w=2000",
  title: {
    hi: "समाजवाद सुनिश्चित करता है कि पेपर लीक कभी न रुकें",
    en: "Socialism ensures that paper leaks never stop",
  },
  author: { hi: "कौशलेश राय", en: "Kaushlesh Rai" },
  date: "July 31, 2026",
  bio: {
    hi: "कौशलेश राय एक कल्चरल कमेंटेटर और द डोज़ियर के फाउंडर हैं.",
    en: "Kaushlesh Rai is a cultural commentator and founder of The Dossier."
  },
  content: {
    hi: [
      "मैंने 5-6 साल पहले एक किताब पढ़ी थी. उसमे ऑथर ने लिखा था कि आगे आने वाले वर्षों में भारत में कोई भी परीक्षा बिना पेपर लीक कराए लगभग असंभव हो जाएगी. उन्होंने इसके पीछे कुछ कारण भी बताए थे, जो आज की स्थिति पर बिल्कुल फिट बैठते हैं.",
      "लीक लोकपाल बनाओगे तो वो भी रिश्वतखोरी की दुकान ही खोलेगा या, परीक्षा देने वाली लड़कियों का यौन शोषण करेगा.",
      "ढोंग से मनुष्य मूर्ख बनते है, प्रकृति नहीं."
    ],
    en: [
      "I read a book 5-6 years ago. In it, the author wrote that in the coming years, no examination in India will be possible without a paper leak. He gave some reasons for this, which perfectly fit today's situation.",
      "If you create a Leak Lokpal, he will also open a bribery shop or sexually exploit the girls taking the exam.",
      "Hypocrisy fools humans, not nature."
    ]
  }
};

export default function ArticlePage() {
  const { lang } = useLanguage();
  const params = useParams();
  const category = 'kala';
  
  const categoryName = categoryNames[category] ? categoryNames[category][lang] : category;

  return (
    <main className={styles.articleMain}>
      <div className={styles.heroSection}>
        <img src={articleData.image} alt={articleData.title[lang]} className={styles.heroImage} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.categoryLabel}>{categoryName}</span>
          <h1 className={styles.articleTitle}>{articleData.title[lang]}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.articleAuthor}>{articleData.author[lang]}</span>
            <span>📅 {articleData.date}</span>
          </div>
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
          {/* Copy Link */}
          <div className={styles.socialIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
        </div>

        <div className={styles.articleBody}>
          {articleData.content[lang].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.authorBio}>
          <h3 className={styles.authorName}>{articleData.author[lang]}</h3>
          <p className={styles.authorDescription}>{articleData.bio[lang]}</p>
        </div>
      </div>
    </main>
  );
}
