import { Metadata } from "next";
import HomeFourPage from "./(homes)/home-4/page";
import { generatePageMetadata, homeMetadata } from "@/lib/seo/metadata";
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schemas";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localBusinessSchema = generateLocalBusinessSchema(locale);
  const organizationSchema = generateOrganizationSchema(locale);
  const websiteSchema = generateWebSiteSchema(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeFourPage />
    </>
  );
}
