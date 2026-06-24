import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { generatePageMetadata, serviceMetadata } from '@/lib/seo/metadata';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { syncGraphicDesignImages } from '@/lib/s3/media-sync';
import { getVideoProductionVideos } from '@/data/video-production-videos';
import ServicePageClient from './service-page-client';

type Props = { params: Promise<{ locale: string; slug: string }> };

const SERVICE_SLUGS = ['video-production', 'digital-marketing', 'graphic-design'] as const;
type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const getGraphicDesignImages = unstable_cache(
  () => syncGraphicDesignImages(),
  ['graphic-design-showcase-images'],
  { revalidate: 3600, tags: ['graphic-design-showcase-images'] }
);

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

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const graphicDesignImages =
    slug === 'graphic-design' ? await getGraphicDesignImages() : undefined;
  const videoProductionVideos =
    slug === 'video-production' ? getVideoProductionVideos() : undefined;

  // Structured data (SEO audit 8.1): Service + breadcrumb, referencing the
  // Organization @id rendered on the homepage.
  const localeKey = locale === 'en' ? 'en' : 'bs';
  const content = SERVICE_SLUGS.includes(slug as ServiceSlug)
    ? serviceMetadata[slug as ServiceSlug][localeKey]
    : undefined;
  const prefix = locale === 'bs' ? '' : `/${locale}`;
  const serviceName = content?.title.split(' | ')[0];
  const serviceSchema =
    content && serviceName
      ? generateServiceSchema(serviceName, content.description, slug, localeKey)
      : null;
  const breadcrumbSchema =
    content && serviceName
      ? generateBreadcrumbSchema([
          { name: locale === 'bs' ? 'Početna' : 'Home', url: `${prefix}/` },
          { name: serviceName, url: `${prefix}/services/${slug}` },
        ])
      : null;

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ServicePageClient
        slug={slug}
        graphicDesignImages={graphicDesignImages}
        videoProductionVideos={videoProductionVideos}
      />
    </>
  );
}
