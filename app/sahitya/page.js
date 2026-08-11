"use client";
import CategoryPageComponent from "@/components/CategoryPageComponent";

const initialArticles = [
  {
    slug: "sahitya-1",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "हिंदी साहित्य का स्वर्णिम काल और आधुनिक धाराएँ",
      en: "Golden Era of Hindi Literature and Modern Currents",
    },
    author: { hi: "साहित्य सम्पादक", en: "Literature Editor" },
    date: "August 1, 2026",
    excerpt: {
      hi: "साहित्य समाज का दर्पण है। प्राचीन काव्य रचनाओं से लेकर आधुनिक गद्य साहित्य की प्रमुख प्रवृत्तियों का गहन विश्लेषण...",
      en: "Literature is the mirror of society. Deep analysis of major trends from ancient poetry to modern prose...",
    }
  }
];

export default function SahityaPage() {
  return <CategoryPageComponent categoryKey="sahitya" initialArticles={initialArticles} />;
}
