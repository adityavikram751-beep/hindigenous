"use client";
import CategoryPageComponent from "@/components/CategoryPageComponent";

const initialArticles = [
  {
    slug: "rajpat-1",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200",
    title: {
      hi: "राज-पाट: नीतियाँ, शासन और लोकनीति का विश्लेषण",
      en: "Raj-paat: Analysis of Policies, Governance and Public Policy",
    },
    author: { hi: "राजनीतिक विश्लेषक", en: "Political Analyst" },
    date: "August 4, 2026",
    excerpt: {
      hi: "भारतीय शासन प्रणाली, संवैधानिक सुधारों और लोक नीतियों का निष्पक्ष अध्ययन...",
      en: "Unbiased study of Indian governance system, constitutional reforms and public policies...",
    }
  }
];

export default function RajpatPage() {
  return <CategoryPageComponent categoryKey="rajpat" initialArticles={initialArticles} />;
}
