"use client";
import { useLanguage } from "@/context/LanguageContext";

import Link from "next/link";
import styles from "../category.module.css";

const categoryData = {
  etihas: { hi: "इतिहास", en: "History" },
  sahitya: { hi: "साहित्य", en: "Literature" },
  kala: { hi: "कला", en: "Arts" },
  sanskriti: { hi: "संस्कृति", en: "Culture" },
  rajpat: { hi: "राज-पाट", en: "Raj-paat" },
};

// Mock articles data
const articles = [
  {
    slug: "article-1",
    image: "https://images.unsplash.com/photo-1541872526845-866418b76c8c?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "समाजवाद सुनिश्चित करता है कि पेपर लीक कभी न रुकें",
      en: "Socialism ensures that paper leaks never stop",
    },
    author: { hi: "कौशलेश राय", en: "Kaushlesh Rai" },
    date: "July 31, 2026",
    excerpt: {
      hi: "मैंने 5-6 साल पहले एक किताब पढ़ी थी. उसमे ऑथर ने लिखा था कि आगे आने वाले वर्षों में भारत में कोई भी परीक्षा...",
      en: "I read a book 5-6 years ago. In it, the author wrote that in the coming years, no examination in India...",
    }
  },
  {
    slug: "article-2",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "लोकतंत्र के गलियारों से: सत्ता का संघर्ष",
      en: "From the Corridors of Democracy: The Struggle for Power",
    },
    author: { hi: "अनामिका सिंह", en: "Anamika Singh" },
    date: "July 28, 2026",
    excerpt: {
      hi: "राजपथ केवल एक मार्ग नहीं है, यह देश की धड़कन है। यहाँ से हर राजनीतिक फैसले की गूंज पूरे देश में सुनाई देती है...",
      en: "Rajpath is not just a road, it is the heartbeat of the country. From here, the echo of every political decision...",
    }
  },
  {
    slug: "article-3",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "संसद के नए सत्र की हलचल",
      en: "Hustle and Bustle of the New Parliament Session",
    },
    author: { hi: "रवि कुमार", en: "Ravi Kumar" },
    date: "July 25, 2026",
    excerpt: {
      hi: "आगामी चुनावों की रणनीतियां अब अंतिम चरण में हैं। सभी प्रमुख दल अपनी-अपनी गोटियां सेट करने में लगे हुए हैं...",
      en: "Strategies for upcoming elections are in their final stages. All major parties are busy setting their pieces...",
    }
  }
];

export default function CategoryPage() {
  const { lang } = useLanguage();
  const category = 'rajpat';
  
  const pageTitle = categoryData[category] ? categoryData[category][lang] : category;

  return (
    <main className={`container ${styles.categoryMain}`}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      
      <div className={styles.articleList}>
        {articles.map((article, index) => (
          <Link href={`/${category}/${article.slug}`} key={index} className={styles.articleCard}>
            <div className={styles.cardImageWrapper}>
              <img 
                src={article.image}
                alt={article.title[lang]} 
                className={styles.cardImage} 
              />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{article.title[lang]}</h2>
              <div className={styles.cardMeta}>
                <span className={styles.cardAuthor}>{article.author[lang]}</span>
                <span className={styles.cardDate}>- {article.date}</span>
              </div>
              <p className={styles.cardExcerpt}>{article.excerpt[lang]}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
