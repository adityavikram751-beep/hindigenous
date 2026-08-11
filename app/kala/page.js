"use client";
import CategoryPageComponent from "@/components/CategoryPageComponent";

const initialArticles = [
  {
    slug: "kala-1",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "भारतीय मूर्तिकला एवं चित्रकला की अनूठी परंपरा",
      en: "Unique Tradition of Indian Sculpture and Painting",
    },
    author: { hi: "कला समीक्षक", en: "Art Critic" },
    date: "August 2, 2026",
    excerpt: {
      hi: "अजंता और एलोरा की गुफाओं से लेकर मधुबनी और तंजौर चित्रकला शैली तक भारतीय कला का समृद्ध संसार...",
      en: "From the caves of Ajanta and Ellora to the Madhubani and Tanjore painting styles, the rich world of Indian art...",
    }
  }
];

export default function KalaPage() {
  return <CategoryPageComponent categoryKey="kala" initialArticles={initialArticles} />;
}
