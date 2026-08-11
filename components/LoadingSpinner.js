"use client";
import styles from "./Loading.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function LoadingSpinner({ text }) {
  const { lang } = useLanguage();

  const defaultText = lang === 'hi' 
    ? 'सामग्री लोड हो रही है...' 
    : 'Loading content...';

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <div className={styles.spinnerText}>
        {text || defaultText}
      </div>
    </div>
  );
}
