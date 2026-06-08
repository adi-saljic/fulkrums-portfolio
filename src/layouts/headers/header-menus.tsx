"use client";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import project_data from '@/data/project-data';
import { useContactModal } from '@/context/contact-modal-context';
import { scrollToServices } from '@/utils/scroll-to-services';

const HeaderMenus = () => {
  const t = useTranslations('nav');
  const tProjects = useTranslations('projectData');
  const { openModal } = useContactModal();
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal();
  };

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToServices(router);
  };

  return (
    <ul>
      <li>
        <Link href="/">{t('home')}</Link>
      </li>
      <li>
        <a href="#services" onClick={handleServicesClick}>{t('services')}</a>
      </li>
      <li>
        <Link href="/portfolio">{t('portfolio')}</Link>
      </li>
      <li>
        <Link href="/study-cases">{t('studyCases')}</Link>
      </li>
      {/* <li>
        <Link href="/our-team">{t('ourTeam')}</Link>
      </li> */}
      <li>
        <a href="#contact" onClick={handleContactClick}>{t('contact')}</a>
      </li>
    </ul>
  );
};

export default HeaderMenus;
