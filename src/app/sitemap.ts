import { MetadataRoute } from 'next';
import project_data from '@/data/project-data';
import { getPortfolioData } from '@/data/portfolio-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fulkrums.com';

  // Get enriched portfolio data with S3 media URLs
  const portfolio_data = getPortfolioData();

  // Define supported locales
  const locales = ['bs', 'en'];

  // Helper to create locale variants
  const createLocaleUrls = (
    path: string,
    priority: number,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly'
  ) => {
    return locales.map(locale => ({
      url: locale === 'bs' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          'bs': `${baseUrl}${path}`,
          'en': `${baseUrl}/en${path}`,
        }
      }
    }));
  };

  // Service slugs
  const SERVICE_SLUGS = ['video-production', 'digital-marketing', 'graphic-design'];

  // Main pages
  const mainPages = [
    ...createLocaleUrls('/', 1.0, 'weekly'),
    ...createLocaleUrls('/portfolio', 0.9),
    ...createLocaleUrls('/study-cases', 0.9),
    ...createLocaleUrls('/our-team', 0.8),
  ];

  // Portfolio detail pages
  const portfolioPages = portfolio_data.flatMap(item =>
    createLocaleUrls(`/portfolio/${item.slug}`, 0.7)
  );

  // Study case detail pages
  const studyCasePages = project_data.flatMap(item =>
    createLocaleUrls(`/study-cases/${item.slug}`, 0.7)
  );

  // Service pages
  const servicePages = SERVICE_SLUGS.flatMap(slug =>
    createLocaleUrls(`/services/${slug}`, 0.8)
  );

  return [
    ...mainPages,
    ...portfolioPages,
    ...studyCasePages,
    ...servicePages,
  ];
}
