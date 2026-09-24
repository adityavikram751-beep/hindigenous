"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

import { submitGetInTouch } from '@/lib/api';

export default function Footer() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', description: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const content = {
    hi: {
      about: 'HINDIGENOUS',
      aboutText: 'उद्यमेन हि सिद्ध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य  प्रविशन्ति मुखे मृगाः॥',
      linksTitle: 'महत्वपूर्ण लिंक्स',
      contactText: 'ईमेल: thehindigenous@gmail.com',
      formTitle: 'संपर्क करें (Get In Touch)',
      namePlaceholder: 'आपका नाम (Name)',
      emailPlaceholder: 'ईमेल पता (Email)',
      phonePlaceholder: 'फ़ोन नंबर (Phone Number - optional)',
      descPlaceholder: 'विवरण / संदेश लिखें (Description)...',
      submitBtn: 'संदेश भेजें (Submit)',
      submittingBtn: 'भेजा जा रहा है...',
      successMsg: '✓ आपका संदेश सफलतापूर्वक भेज दिया गया है!',
      errorMsg: 'कुछ गलत हो गया, कृपया पुनः प्रयास करें।',
      rights: '© 2026 HINDIGENOUS. सर्वाधिकार सुरक्षित.'
    },
    en: {
      about: 'HINDIGENOUS',
      aboutText: 'We provide you with the most authentic and unbiased news from the country and the world. Our goal is to make you aware of the truth behind every event.',
      linksTitle: 'Important Links',
      contactText: 'Email: contact@hindigenous.com\nPhone: +91 123 456 7890',
      formTitle: 'Get In Touch',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Email Address',
      phonePlaceholder: 'Phone Number (optional)',
      descPlaceholder: 'Description / Message...',
      submitBtn: 'Submit Message',
      submittingBtn: 'Submitting...',
      successMsg: '✓ Thank you! Your message has been sent successfully.',
      errorMsg: 'Something went wrong, please try again.',
      rights: '© 2026 HINDIGENOUS. All rights reserved.'
    }
  };

  const t = content[lang] || content.hi;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) return;

    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await submitGetInTouch(formData);
      if (res && (res.success || res._id || res.data)) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phoneNumber: '', description: '' });

        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setStatus({ loading: false, success: false, error: (res && res.message) || t.errorMsg });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: t.errorMsg });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* About Column */}
          <div className={styles.footerCol}>
            <div className={styles.footerBrand}>
              <img src="/logo.png" alt="Hindigenous Logo" className={styles.footerLogoImg} />
              <h4>{t.about}</h4>
            </div>
            <p>{t.aboutText}</p>
            <div className={styles.contactDetails}>
              <p style={{ whiteSpace: 'pre-line', marginTop: '15px' }}>{t.contactText}</p>
            </div>
          </div>

          {/* Important Links Column */}
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

          {/* Contact / Get In Touch Form Column */}
          <div className={styles.footerCol}>
            <h4>{t.formTitle}</h4>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  required
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  required
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t.descPlaceholder}
                  required
                  className={styles.formTextarea}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className={styles.submitBtn}
              >
                {status.loading ? t.submittingBtn : t.submitBtn}
              </button>

              {status.success && (
                <p className={styles.successMessage}>{t.successMsg}</p>
              )}
              {status.error && (
                <p className={styles.errorMessage}>{status.error}</p>
              )}
            </form>
          </div>
        </div>

        <div className={styles.footerBottom}>
          {t.rights}
        </div>
      </div>
    </footer>
  );
}
