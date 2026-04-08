"use client";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";

type LanguageSwitcherProps = {
  mobile?: boolean;
};

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
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

  // Mobile version - shows both buttons side by side
  if (mobile) {
    return (
      <div className="tp-header-3-offcanvas-language-options">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            disabled={locale === lang.code || isPending}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop version - compact circle with dropdown
  return (
    <div className="tp-header-3-language">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="tp-header-3-language-btn"
        disabled={isPending}
      >
        <span>{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <div className="tp-header-3-language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              disabled={locale === lang.code || isPending}
              className="tp-header-3-language-dropdown-item"
            >
              <span className="flag">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
