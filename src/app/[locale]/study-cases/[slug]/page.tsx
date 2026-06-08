import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { getProjectData } from '@/data/project-data';
import ProjectPageClient from './project-page-client';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ['bs', 'en'].flatMap((locale) =>
    getProjectData().map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getProjectData().find((p) => p.slug === slug);
  if (!item) return {};

  let projectTitle = item.titleKey;
  let overview = '';
  try {
    const t = await getTranslations({ locale, namespace: 'projectData' });
    const data = t.raw(item.titleKey) as { title?: string; overview?: string };
    projectTitle = data.title || item.titleKey;
    overview = data.overview || '';
  } catch {
    // use titleKey fallback
  }

  const title =
    locale === 'bs'
      ? `${projectTitle} - Rezultati & Case Study | Fulkrums Sarajevo`
      : `${projectTitle} - Results & Case Study | Fulkrums Sarajevo`;

  const description = overview
    ? overview.slice(0, 160)
    : locale === 'bs'
    ? `Case study ${projectTitle} — performance marketing i video produkcija od Fulkrums agencije Sarajevo.`
    : `Case study: ${projectTitle} — performance marketing and video production by Fulkrums agency Sarajevo.`;

  return generatePageMetadata({
    title,
    description,
    path: `/study-cases/${slug}`,
    locale,
    keywords: ['case study', 'results', projectTitle, 'Fulkrums', 'Sarajevo', 'performance marketing'],
    image: item.heroImage || undefined,
  });
}

export default async function StudyCasePage({ params }: Props) {
  const { locale, slug } = await params;
  const item = getProjectData().find((p) => p.slug === slug);

  // Structured data (SEO audit 8.1 / 16.3): Article + breadcrumb for the case study.
  let articleSchema = null;
  let breadcrumbSchema = null;
  if (item) {
    let projectTitle = item.titleKey;
    let overview = '';
    try {
      const t = await getTranslations({ locale, namespace: 'projectData' });
      const data = t.raw(item.titleKey) as { title?: string; overview?: string };
      projectTitle = data.title || item.titleKey;
      overview = data.overview || '';
    } catch {
      // use titleKey fallback
    }
    const prefix = locale === 'bs' ? '' : `/${locale}`;
    const localeKey = locale === 'en' ? 'en' : 'bs';
    articleSchema = generateArticleSchema({
      headline: projectTitle,
      description: (overview || projectTitle).slice(0, 200),
      url: `${prefix}/study-cases/${slug}`,
      image: item.heroImage || undefined,
      locale: localeKey,
    });
    breadcrumbSchema = generateBreadcrumbSchema([
      { name: locale === 'bs' ? 'Početna' : 'Home', url: `${prefix}/` },
      { name: locale === 'bs' ? 'Rezultati' : 'Results', url: `${prefix}/study-cases` },
      { name: projectTitle, url: `${prefix}/study-cases/${slug}` },
    ]);
  }

  return (
    <>
      {item?.heroImage && (
        <link rel="preload" as="image" href={item.heroImage} />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ProjectPageClient slug={slug} />
    </>
  );
}
