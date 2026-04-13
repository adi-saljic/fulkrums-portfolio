import React from 'react';
import { Metadata } from 'next';
import HomeFourMain from '@/components/pages/homes/home-4';
import { generatePageMetadata, homeMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = homeMetadata[locale as 'bs' | 'en'] || homeMetadata.bs;
  return {
    ...generatePageMetadata({
      title: content.title,
      description: content.description,
      path: '/',
      locale,
      keywords: content.keywords,
    }),
    // noindex: this route is a duplicate of '/'
    robots: { index: false, follow: true },
  };
}

const HomePageFour = () => {
  return (
    <HomeFourMain/>
  );
};

export default HomePageFour;