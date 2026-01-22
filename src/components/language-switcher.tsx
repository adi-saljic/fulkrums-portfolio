"use client";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'bs', label: 'BS', flag: '🇧🇦' },
    { code: 'en', label: 'EN', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  return (
    <div className="language-switcher" style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-switcher-btn"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.5)',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          transition: 'all 0.3s ease'
        }}
        disabled={isPending}
      >
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.label}</span>
        <span style={{ fontSize: '10px' }}>▼</span>
      </button>

      {isOpen && (
        <div
          className="language-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '5px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            minWidth: '100px'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              disabled={locale === lang.code || isPending}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: 'none',
                background: locale === lang.code ? '#f0f0f0' : 'transparent',
                cursor: locale === lang.code ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#000',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (locale !== lang.code) {
                  e.currentTarget.style.background = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== lang.code) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
