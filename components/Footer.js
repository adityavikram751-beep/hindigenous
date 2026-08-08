"use client";
import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const { lang } = useLanguage();
  const pathname = usePathname();

  const content = {
    hi: {
      about: 'HINDIGENOUS',
      aboutText: 'हम आपको देश और दुनिया की सबसे प्रामाणिक और निष्पक्ष खबरें प्रदान करते हैं। हमारा उद्देश्य आपको हर घटना के पीछे की सच्चाई से अवगत कराना है।',
      linksTitle: 'महत्वपूर्ण लिंक्स',
      contactTitle: 'संपर्क करें',
      contactText: 'ईमेल: contact@hindigenous.com\nफोन: +91 123 456 7890',
      rights: '© 2026 HINDIGENOUS. सर्वाधिकार सुरक्षित.'
    },
    en: {
      about: 'HINDIGENOUS',
      aboutText: 'We provide you with the most authentic and unbiased news from the country and the world. Our goal is to make you aware of the truth behind every event.',
      linksTitle: 'Important Links',
      contactTitle: 'Contact Us',
      contactText: 'Email: contact@hindigenous.com\nPhone: +91 123 456 7890',
      rights: '© 2026 HINDIGENOUS. All rights reserved.'
    }
  };

  const t = content[lang] || content.hi;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4>{t.about}</h4>
            <p>{t.aboutText}</p>
          </div>
          <div className={styles.footerCol}>
            <h4>{t.linksTitle}</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/">{lang === 'hi' ? 'मुखपृष्ठ' : 'Home'}</Link></li>
              <li><Link href="/etihas">{lang === 'hi' ? 'इतिहास' : 'History'}</Link></li>
              <li><Link href="/sahitya">{lang === 'hi' ? 'साहित्य' : 'Literature'}</Link></li>
              <li><Link href="/kala">{lang === 'hi' ? 'कला' : 'Arts'}</Link></li>
              <li><Link href="/sanskriti">{lang === 'hi' ? 'संस्कृति' : 'Culture'}</Link></li>
              <li><Link href="/rajpat">{lang === 'hi' ? 'राजपथ' : 'Rajpath'}</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>{t.contactTitle}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{t.contactText}</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          {t.rights}
        </div>
      </div>
    </footer>
  );
}
