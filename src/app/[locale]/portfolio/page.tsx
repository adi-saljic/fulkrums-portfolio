import { Metadata } from 'next';
import { generatePageMetadata, portfolioMetadata } from '@/lib/seo/metadata';
import PortfolioPageClient from './portfolio-page-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = portfolioMetadata[locale as 'bs' | 'en'] || portfolioMetadata.bs;
  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: '/portfolio',
    locale,
    keywords: content.keywords,
  });
}

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
