"use client";
import { createContext, useState, useContext, useEffect } from "react";

import { translateText, translateArticleItem, translateArticles, getFieldText } from "@/lib/translator";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("hi"); // Default language is Hindi

  // Optional: save preference to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("app_lang");
    if (saved) setLang(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "hi" ? "en" : "hi";
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, translateText, translateArticleItem, translateArticles, getFieldText }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
