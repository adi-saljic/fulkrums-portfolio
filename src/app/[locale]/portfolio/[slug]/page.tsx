import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getPortfolioData } from '@/data/portfolio-data';
import PortfolioDetailClient from './portfolio-detail-client';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ['bs', 'en'].flatMap((locale) =>
    getPortfolioData().map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getPortfolioData().find((p) => p.slug === slug);
  if (!item) return {};

  const title = `${item.titleKey} - Portfolio | Fulkrums Sarajevo`;
  const description =
    item.description ||
    (locale === 'bs'
      ? `Portfolio projekat ${item.titleKey} — video produkcija i marketing od Fulkrums agencije Sarajevo.`
      : `Portfolio project ${item.titleKey} — video production and marketing by Fulkrums agency Sarajevo.`);

  return generatePageMetadata({
    title,
    description,
    path: `/portfolio/${slug}`,
    locale,
    keywords: [...(item.services || []), 'Fulkrums', 'Sarajevo', item.titleKey],
    image: item.heroImage || undefined,
  });
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioData().find((p) => p.slug === slug);
  return (
    <>
      {item?.heroImage && (
        <link rel="preload" as="image" href={item.heroImage} />
      )}
      <PortfolioDetailClient params={params} />
    </>
  );
}
