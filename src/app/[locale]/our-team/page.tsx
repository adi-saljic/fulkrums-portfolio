import { Metadata } from 'next';
import { generatePageMetadata, teamMetadata } from '@/lib/seo/metadata';
import OurTeamPageClient from './our-team-page-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = teamMetadata[locale as 'bs' | 'en'] || teamMetadata.bs;
  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: '/our-team',
    locale,
    keywords: content.keywords,
  });
}

export default function OurTeamPage() {
  return <OurTeamPageClient />;
}
