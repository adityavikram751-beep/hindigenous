"use client";
import CategoryPageComponent from "@/components/CategoryPageComponent";

const initialArticles = [
  {
    slug: "sanskriti-1",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "भारतीय संस्कृति: विविधता में एकता की अमर गाथा",
      en: "Indian Culture: Eternal Saga of Unity in Diversity",
    },
    author: { hi: "संस्कृति शोधकर्ता", en: "Culture Researcher" },
    date: "August 3, 2026",
    excerpt: {
      hi: "वेदों, उपनिषदों और लोक परंपराओं से पोषित भारतीय संस्कृति के विभिन्न पहलुओं पर विशेष रिपोर्ट...",
      en: "Special report on various aspects of Indian culture nurtured by Vedas, Upanishads and folk traditions...",
    }
  }
];

export default function SanskritiPage() {
  return <CategoryPageComponent categoryKey="sanskriti" initialArticles={initialArticles} />;
}
