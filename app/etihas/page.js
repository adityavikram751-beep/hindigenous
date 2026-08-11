"use client";
import CategoryPageComponent from "@/components/CategoryPageComponent";

const initialArticles = [
  {
    slug: "article-1",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
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
  }
];

export default function EtihasPage() {
  return <CategoryPageComponent categoryKey="etihas" initialArticles={initialArticles} />;
}
