import { Metadata } from 'next';

export const baseUrl = 'https://fulkrums.com';

interface MetadataParams {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords?: string[];
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  keywords = [],
  image = '/assets/img/logo/logo-transparent.png',
}: MetadataParams): Metadata {
  const url = locale === 'bs' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Fulkrums Digital Agency' }],
    creator: 'Fulkrums',
    publisher: 'Fulkrums',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        'bs': locale === 'bs' ? url : `${baseUrl}${path}`,
        'en': locale === 'en' ? url : `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Fulkrums Digital Agency',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'bs' ? 'bs_BA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@fulkrums',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Default keywords for all pages
export const defaultKeywords = [
  'Fulkrums',
  'digital agency',
  'digitalna agencija',
  'Sarajevo',
  'Bosnia',
  'Bosna i Hercegovina',
  'video production',
  'video produkcija',
  'web development',
  'izrada web stranica',
  'AI integrations',
  'AI integracije',
  'performance marketing',
  'social media marketing',
  'društvene mreže',
  'photography',
  'fotografija',
  'drone filming',
  'dron snimanje',
  'Balkans',
  'Balkan',
];

// Home page metadata
export const homeMetadata = {
  bs: {
    title: 'Fulkrums - Video Produkcija, Web Development & AI Integracije Sarajevo | Digitalna Agencija Bosna',
    description: 'Ekspertna digitalna agencija u Sarajevu nudi video produkciju, dron snimanje, fotografiju, web development, AI integracije i performance marketing u Bosni i Hercegovini i Balkanu.',
    keywords: [
      ...defaultKeywords,
      'video marketing sarajevo',
      'snimanje videozapisa bosna',
      'videography bosnia',
      'full stack development sarajevo',
      'marketing plan bosna',
      'društvene mreže sarajevo',
    ],
  },
  en: {
    title: 'Fulkrums - Video Production, Web Development & AI Integrations Sarajevo | Digital Agency Bosnia',
    description: 'Expert digital agency in Sarajevo offering video production, drone filming, photography, web development, AI integrations, and performance marketing across Bosnia and Herzegovina and the Balkans.',
    keywords: [
      ...defaultKeywords,
      'video editing sarajevo',
      'videos in sarajevo',
      'full stack applications',
      'marketing plan bosnia',
      'social media marketing balkans',
    ],
  },
};

// Portfolio page metadata
export const portfolioMetadata = {
  bs: {
    title: 'Portfolio - Marketing & Web Development Projekti Bosna | Fulkrums Sarajevo',
    description: 'Pogledajte naš portfolio video produkcije, web developmenta i marketing projekata za klijente u Sarajevu, Bosni i Hercegovini i širom Balkana.',
    keywords: [...defaultKeywords, 'portfolio', 'projekti', 'case studies', 'rezultati'],
  },
  en: {
    title: 'Portfolio - Marketing & Web Development Projects Bosnia | Fulkrums Sarajevo',
    description: 'View our portfolio of video production, web development, and marketing projects for clients in Sarajevo, Bosnia and Herzegovina, and across the Balkans.',
    keywords: [...defaultKeywords, 'portfolio', 'projects', 'case studies', 'work'],
  },
};

// Study cases page metadata
export const studyCasesMetadata = {
  bs: {
    title: 'Rezultati & Case Studies - Digital Marketing Sarajevo | Fulkrums Agencija Bosna',
    description: 'Stvarni rezultati iz naših video marketing, performance marketing i web development kampanja u Sarajevu i Bosni i Hercegovini.',
    keywords: [...defaultKeywords, 'rezultati', 'case studies', 'uspješni projekti', 'performance'],
  },
  en: {
    title: 'Results & Case Studies - Digital Marketing Sarajevo | Fulkrums Agency Bosnia',
    description: 'Real results from our video marketing, performance marketing, and web development campaigns in Sarajevo and Bosnia and Herzegovina.',
    keywords: [...defaultKeywords, 'results', 'case studies', 'success stories', 'performance'],
  },
};

// Team page metadata
export const teamMetadata = {
  bs: {
    title: 'Naš Tim - Ekspertni Tim Digitalne Agencije Sarajevo | Fulkrums Bosna',
    description: 'Upoznajte naš tim video producenata, developera i marketing eksperata koji služe Sarajevo, Bosnu i Hercegovinu i Balkan.',
    keywords: [...defaultKeywords, 'tim', 'team', 'eksperti', 'experts'],
  },
  en: {
    title: 'Our Team - Expert Digital Agency Team Sarajevo | Fulkrums Bosnia',
    description: 'Meet our team of video producers, developers, and marketing experts serving Sarajevo, Bosnia and Herzegovina, and the Balkans.',
    keywords: [...defaultKeywords, 'team', 'experts', 'professionals'],
  },
};
