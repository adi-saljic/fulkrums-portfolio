"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import project_data from '@/data/project-data';
import { useContactModal } from '@/context/contact-modal-context';

export default function MobileMenus() {
  const t = useTranslations('nav');
  const tProjects = useTranslations('projectData');
  const [portfolioOpen, setPortfolioOpen] = React.useState(false);
  const { openModal } = useContactModal();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal();
    // Close mobile menu
    const closeBtn = document.querySelector('.tp-offcanvas-close-btn') as HTMLButtonElement;
    if (closeBtn) closeBtn.click();
  };

  return (
    <>
      <nav className="tp-main-menu-content">
        <ul>
          <li>
            <Link href="/">{t('home')}</Link>
          </li>
          <li>
            <Link href="/portfolio">{t('portfolio')}</Link>
          </li>
          <li>
            <Link href="/study-cases">{t('studyCases')}</Link>
          </li>
          <li>
            <Link href="/our-team">{t('ourTeam')}</Link>
          </li>
          <li>
            <a href="#contact" onClick={handleContactClick}>{t('contact')}</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
