"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { lang, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 140) {
        setIsScrolled(true);
      } else if (currentScroll < 15) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const content = {
    hi: {
      logoTitle: 'HINDIGENOUS',
      logoSubtitle: 'हिन्दी',
      nav: {
        home: 'मुखपृष्ठ',
        etihas: 'इतिहास',
        sahitya: 'साहित्य',
        kala: 'कला',
        sanskriti: 'संस्कृति',
        rajpat: 'राज-पाट '
      }
    },
    en: {
      logoTitle: 'HINDIGENOUS',
      logoSubtitle: 'English',
      nav: {
        home: 'Home',
        etihas: 'History',
        sahitya: 'Literature',
        kala: 'Arts',
        sanskriti: 'Culture',
        rajpat: 'Raj-paat'
      }
    }
  };

  const t = content[lang];

  return (
    <>
      {/* Sidebar Overlay */}
      <div 
        className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.overlayVisible : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className={`${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.headerLayout}>
            {/* Header / Logo Section */}
            <header className={styles.topBar}>
              <Link href="/" className={styles.logoContainer} onClick={() => setIsSidebarOpen(false)}>
                <img src="/logo.png" alt="Hindigenous Logo" className={styles.logoImg} />
                <div className={styles.logoTextGroup}>
                  <h1 className={styles.logoTitle}>{t.logoTitle}</h1>
                  <span className={styles.logoSubtitle}>{t.logoSubtitle}</span>
                </div>
              </Link>

              <div className={styles.actions}>
                <button
                  onClick={toggleLanguage}
                  className={styles.langToggle}
                >
                  {lang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें'}
                </button>
                
                <button 
                  className={styles.hamburger}
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open Menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>
            </header>

            {/* Navigation Section / Sidebar */}
            <div className={`${styles.navContainer} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
              <button 
                className={styles.closeSidebar} 
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <nav className={styles.navList}>
                {/* Mobile Translator Button inside Sidebar */}
                <button
                  onClick={toggleLanguage}
                  className={styles.mobileLangToggle}
                >
                  {lang === 'hi' ? 'Read in English' : 'हिंदी में पढ़ें'}
                </button>

                <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.activeItem : ''}`} onClick={() => setIsSidebarOpen(false)}>{t.nav.home}</Link>
                <span className={styles.separator}>/</span>
                <Link href="/etihas" className={`${styles.navItem} ${pathname.startsWith('/etihas') ? styles.activeItem : ''}`} onClick={() => setIsSidebarOpen(false)}>{t.nav.etihas}</Link>
                <span className={styles.separator}>/</span>
                <Link href="/sahitya" className={`${styles.navItem} ${pathname.startsWith('/sahitya') ? styles.activeItem : ''}`} onClick={() => setIsSidebarOpen(false)}>{t.nav.sahitya}</Link>
                <span className={styles.separator}>/</span>
                <Link href="/kala" className={`${styles.navItem} ${pathname.startsWith('/kala') ? styles.activeItem : ''}`} onClick={() => setIsSidebarOpen(false)}>{t.nav.kala}</Link>
                <span className={styles.separator}>/</span>
                <Link href="/sanskriti" className={`${styles.navItem} ${pathname.startsWith('/sanskriti') ? styles.activeItem : ''}`} onClick={() => setIsSidebarOpen(false)}>{t.nav.sanskriti}</Link>
                <span className={styles.separator}>/</span>
                <Link href="/rajpat" className={`${styles.navItem} ${pathname.startsWith('/rajpat') ? styles.activeItem : ''}`} onClick={() => setIsSidebarOpen(false)}>{t.nav.rajpat}</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
