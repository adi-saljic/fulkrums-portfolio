import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
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

export default function StudyCasePage({ params }: Props) {
  return <ProjectPageClient params={params} />;
}
