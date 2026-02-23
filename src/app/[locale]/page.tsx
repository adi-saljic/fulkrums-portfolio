import { Metadata } from "next";
import HomeFourPage from "./(homes)/home-4/page";
import { generatePageMetadata, homeMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = homeMetadata[locale as 'bs' | 'en'] || homeMetadata.bs;

  return generatePageMetadata({
    title: content.title,
    description: content.description,
    path: '/',
    locale,
    keywords: content.keywords,
  });
}

export default function Home() {
  return (
    <>
      <HomeFourPage />
    </>
  );
}
