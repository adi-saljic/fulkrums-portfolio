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
    // `absolute` bypasses the root layout title template ("%s | Fulkrums Digital
    // Agency Sarajevo"). Page titles below already include the brand, so without
    // this the suffix would stack into a double brand (audit finding).
    title: { absolute: title },
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
  'video marketing',
  'video agencija',
  'performance marketing',
  'marketing agencija Sarajevo',
  'social media marketing',
  'društvene mreže',
  'photography',
  'fotografija',
  'drone filming',
  'dron snimanje',
  'brand storytelling',
  'kreiranje sadržaja',
  'content creation',
  'Balkans',
  'Balkan',
];

// Home page metadata
export const homeMetadata = {
  bs: {
    title: 'Video Produkcija i Meta Ads Agencija Sarajevo | Fulkrums',
    description: 'Fulkrums je agencija za video produkciju i Meta Ads u Sarajevu. 10 godina iskustva, mjerljivi rezultati. Pogledajte naše case studies.',
    keywords: [
      ...defaultKeywords,
      'agencija za video produkciju Sarajevo',
      'video marketing sarajevo',
      'snimanje videozapisa bosna',
      'videography bosnia',
      'marketing plan bosna',
      'društvene mreže sarajevo',
      'grafički dizajn Sarajevo',
    ],
  },
  en: {
    title: 'Video Production and Meta Ads Agency Sarajevo | Fulkrums',
    description: 'Video production and Meta Ads agency in Sarajevo. 10 years of experience, measurable results. See our case studies and recent work.',
    keywords: [
      ...defaultKeywords,
      'video production agency Bosnia',
      'brand video Sarajevo',
      'video editing sarajevo',
      'commercial video production Bosnia',
      'marketing plan bosnia',
      'social media marketing balkans',
    ],
  },
};

// Portfolio page metadata
export const portfolioMetadata = {
  bs: {
    title: 'Portfolio | Video i Marketing Projekti | Fulkrums',
    description: '16 projekata iz video produkcije, Meta Ads kampanja i grafičkog dizajna. Klijenti uključuju IBM, Atleta, BestDrive, Get Energy Canada i druge.',
    keywords: [...defaultKeywords, 'portfolio', 'projekti', 'case studies', 'rezultati'],
  },
  en: {
    title: 'Portfolio | Video and Marketing Projects | Fulkrums',
    description: '16 projects in video production, Meta Ads campaigns and graphic design. Clients include IBM, Atleta, BestDrive, Get Energy Canada and others.',
    keywords: [...defaultKeywords, 'portfolio', 'projects', 'case studies', 'work'],
  },
};

// Study cases page metadata
export const studyCasesMetadata = {
  bs: {
    title: 'Rezultati | Marketing i Video Case Studies | Fulkrums',
    description: '7 case studies sa konkretnim brojkama. 2049 kupovina u 30 dana, 1152 installa, 105 leadova u 12 dana. Vidite kako su nastali rezultati.',
    keywords: [...defaultKeywords, 'rezultati', 'case studies', 'uspješni projekti', 'performance'],
  },
  en: {
    title: 'Results | Marketing and Video Case Studies | Fulkrums',
    description: '7 case studies with real numbers. 2049 purchases in 30 days, 1152 installs, 105 leads in 12 days. See how the results actually came together.',
    keywords: [...defaultKeywords, 'results', 'case studies', 'success stories', 'performance'],
  },
};

// Team page metadata
export const teamMetadata = {
  bs: {
    title: 'Naš Tim | Video i Marketing Tim | Fulkrums Sarajevo',
    description: 'Tim iza Fulkrums agencije. Video produkcija, Meta Ads i grafički dizajn. 10 godina iskustva kroz različite industrije, jedan proces.',
    keywords: [...defaultKeywords, 'tim', 'team', 'eksperti', 'experts'],
  },
  en: {
    title: 'Our Team | Video and Marketing Team | Fulkrums',
    description: 'The team behind Fulkrums agency. Video production, Meta Ads and graphic design. 10 years of experience across industries, one process.',
    keywords: [...defaultKeywords, 'team', 'experts', 'professionals'],
  },
};

// Service page metadata
export const serviceMetadata = {
  'video-production': {
    bs: {
      title: 'Video Produkcija Sarajevo | Fulkrums Agencija',
      description: 'Video produkcija u Sarajevu sa jasnim ciljem: više pregleda, više leadova, jači brend. Brendirani videi, reklame za Meta Ads, korporativni filmovi.',
      keywords: [
        ...defaultKeywords,
        'video produkcija Sarajevo',
        'video marketing Sarajevo',
        'snimanje videozapisa Bosna',
        'videography Sarajevo',
        'video agencija Sarajevo',
        'profesionalna video produkcija BiH',
      ],
    },
    en: {
      title: 'Video Production Sarajevo | Fulkrums Agency',
      description: 'Video production in Sarajevo with a clear goal: more views, more leads, stronger brand. Branded videos, Meta Ads creatives, corporate films and reels.',
      keywords: [
        ...defaultKeywords,
        'video production Sarajevo',
        'video marketing Bosnia',
        'commercial video production BiH',
        'videography agency Sarajevo',
        'professional video production Balkans',
      ],
    },
  },
  'digital-marketing': {
    bs: {
      title: 'Meta Ads Agencija Sarajevo | Fulkrums BiH',
      description: 'Meta Ads i performance marketing agencija u Sarajevu. Facebook i Instagram kampanje, optimizacija budžeta i ROAS reporting koji se vežu na vaše ciljeve.',
      keywords: [
        ...defaultKeywords,
        'digitalni marketing Sarajevo',
        'Meta Ads Bosna',
        'performance marketing agencija BiH',
        'Facebook oglasi Sarajevo',
        'Instagram oglasi Bosna',
        'lead generation Sarajevo',
      ],
    },
    en: {
      title: 'Meta Ads Agency Sarajevo | Fulkrums',
      description: 'Meta Ads and performance marketing agency in Sarajevo. Facebook and Instagram campaigns, budget optimization and ROAS reporting tied to your goals.',
      keywords: [
        ...defaultKeywords,
        'digital marketing Sarajevo',
        'Meta Ads Bosnia',
        'performance marketing agency BiH',
        'Facebook ads Sarajevo',
        'Instagram ads Bosnia',
        'lead generation Sarajevo',
      ],
    },
  },
  'graphic-design': {
    bs: {
      title: 'Grafički Dizajn Sarajevo | Fulkrums Agencija',
      description: 'Grafički dizajn u Sarajevu. Brand identity, vizualni identitet i social media dizajn za brendove koji znaju da dizajn nije ukras nego alat.',
      keywords: [
        ...defaultKeywords,
        'grafički dizajn Sarajevo',
        'brand identity Bosna',
        'social media dizajn BiH',
        'logo dizajn Bosna',
        'branding agencija BiH',
      ],
    },
    en: {
      title: 'Graphic Design Sarajevo | Fulkrums Agency',
      description: 'Graphic design in Sarajevo. Brand identity, visual identity and social media design for brands that treat design as a tool, not decoration.',
      keywords: [
        ...defaultKeywords,
        'graphic design Sarajevo',
        'brand identity Bosnia',
        'social media design BiH',
        'logo design Bosnia',
        'branding agency BiH',
      ],
    },
  },
};
