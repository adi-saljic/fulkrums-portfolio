import { baseUrl } from './metadata';

// LocalBusiness Schema for Fulkrums
export function generateLocalBusinessSchema(locale: string = 'bs') {
  const name = 'Fulkrums Digital Agency';
  const description =
    locale === 'bs'
      ? 'Digitalna agencija u Sarajevu koja nudi video produkciju, dron snimanje, fotografiju, web development, AI integracije i performance marketing u Bosni i Hercegovini i Balkanu.'
      : 'Digital agency in Sarajevo offering video production, drone filming, photography, web development, AI integrations, and performance marketing across Bosnia and Herzegovina and the Balkans.';

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#organization`,
    name,
    description,
    url: baseUrl,
    logo: `${baseUrl}/assets/img/logo/logo-transparent.png`,
    image: `${baseUrl}/assets/img/logo/logo-transparent.png`,
    telephone: '+387-62-000-000',
    email: 'office@fulkrums.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mihaljevska 100',
      addressLocality: 'Sarajevo',
      postalCode: '71000',
      addressCountry: 'BA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.8563',
      longitude: '18.4131',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Sarajevo',
      },
      {
        '@type': 'Country',
        name: 'Bosnia and Herzegovina',
      },
      {
        '@type': 'Place',
        name: 'Balkans',
      },
    ],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-17:00',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'bs' ? 'Usluge' : 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'Video Produkcija' : 'Video Production',
            description:
              locale === 'bs'
                ? 'Profesionalna video produkcija, video marketing, i videografija u Sarajevu'
                : 'Professional video production, video marketing, and videography in Sarajevo',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'Dron Snimanje' : 'Drone Filming',
            description:
              locale === 'bs'
                ? 'Dron snimanje i aerial fotografija u Bosni i Hercegovini'
                : 'Drone filming and aerial photography in Bosnia and Herzegovina',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'Web Development' : 'Web Development',
            description:
              locale === 'bs'
                ? 'Izrada web stranica, full stack development i web aplikacije u Sarajevu'
                : 'Web development, full stack development and web applications in Sarajevo',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'AI Integracije' : 'AI Integrations',
            description:
              locale === 'bs'
                ? 'AI integracije i automatizacija za biznis u Bosni'
                : 'AI integrations and automation for business in Bosnia',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'Performance Marketing' : 'Performance Marketing',
            description:
              locale === 'bs'
                ? 'Performance marketing i digitalni marketing u Sarajevu i Balkanu'
                : 'Performance marketing and digital marketing in Sarajevo and the Balkans',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'Social Media Marketing' : 'Social Media Marketing',
            description:
              locale === 'bs'
                ? 'Upravljanje društvenim mrežama i social media marketing'
                : 'Social media management and social media marketing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'bs' ? 'Fotografija' : 'Photography',
            description:
              locale === 'bs'
                ? 'Profesionalna fotografija i foto usluge u Sarajevu'
                : 'Professional photography and photo services in Sarajevo',
          },
        },
      ],
    },
  };
}

// Organization Schema
export function generateOrganizationSchema(locale: string = 'bs') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Fulkrums',
    legalName: 'Fulkrums Digital Agency',
    url: baseUrl,
    logo: `${baseUrl}/assets/img/logo/logo-transparent.png`,
    foundingDate: '2015',
    foundingLocation: {
      '@type': 'Place',
      name: 'Sarajevo, Bosnia and Herzegovina',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+387-62-000-000',
      contactType: 'customer service',
      email: 'office@fulkrums.com',
      areaServed: ['BA', 'HR', 'RS', 'ME'],
      availableLanguage: ['Bosnian', 'English', 'Serbian', 'Croatian'],
    },
  };
}

// WebSite Schema
export function generateWebSiteSchema(locale: string = 'bs') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Fulkrums Digital Agency',
    description:
      locale === 'bs'
        ? 'Digitalna agencija u Sarajevu - video produkcija, web development i AI integracije'
        : 'Digital agency in Sarajevo - video production, web development and AI integrations',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['bs', 'en'],
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

// Service Schema
export function generateServiceSchema(
  name: string,
  description: string,
  serviceType: string,
  locale: string = 'bs'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name,
    description,
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Bosnia and Herzegovina',
    },
    availableLanguage: ['bs', 'en', 'sr', 'hr'],
  };
}

// CreativeWork Schema for Portfolio/Case Studies
export function generateCreativeWorkSchema(
  title: string,
  description: string,
  category: string,
  images: string[],
  locale: string = 'bs'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    genre: category,
    creator: {
      '@id': `${baseUrl}/#organization`,
    },
    image: images.map((img) => (img.startsWith('http') ? img : `${baseUrl}${img}`)),
    inLanguage: locale,
  };
}

// WebPage Schema
export function generateWebPageSchema(
  name: string,
  description: string,
  url: string,
  locale: string = 'bs'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}${url}`,
    url: `${baseUrl}${url}`,
    name,
    description,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: locale,
  };
}
