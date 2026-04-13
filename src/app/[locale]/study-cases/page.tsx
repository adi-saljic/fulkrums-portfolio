import { Metadata } from 'next';
import { generatePageMetadata, studyCasesMetadata } from '@/lib/seo/metadata';
import StudyCasesPageClient from './study-cases-page-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = studyCasesMetadata[locale as 'bs' | 'en'] || studyCasesMetadata.bs;
  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: '/study-cases',
    locale,
    keywords: content.keywords,
  });
}

export default function StudyCasesPage() {
  return <StudyCasesPageClient />;
}
