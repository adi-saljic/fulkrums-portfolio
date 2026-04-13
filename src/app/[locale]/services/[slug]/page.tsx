import { Metadata } from 'next';
import { generatePageMetadata, serviceMetadata } from '@/lib/seo/metadata';
import ServicePageClient from './service-page-client';

type Props = { params: Promise<{ locale: string; slug: string }> };

const SERVICE_SLUGS = ['video-production', 'digital-marketing', 'graphic-design'] as const;
type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function generateStaticParams() {
  return ['bs', 'en'].flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {};
  const serviceKey = slug as ServiceSlug;
  const localeKey = locale === 'en' ? 'en' : 'bs';
  const content = serviceMetadata[serviceKey][localeKey];
  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: `/services/${slug}`,
    locale,
    keywords: content.keywords,
  });
}

export default function ServicePage({ params }: Props) {
  return <ServicePageClient params={params} />;
}
