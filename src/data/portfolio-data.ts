import mediaMap from './generated/media-map.json';

export interface IPortfolio {
  id: number;
  slug: string;
  titleKey: string;
  category: string;
  heroImage: string;
  detailImages: string[];
  detailVideos?: string[];
  detailPdf?: string;
  // Nova polja za portfolio details sekciju
  client?: string;
  date?: string;
  services?: string[];
  deliverables?: string[];
  description?: string;
}

const portfolio_data: IPortfolio[] = [
  {
    id: 1,
    slug: "atleta",
    titleKey: "Atleta",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Atleta.jpg",
    detailImages: [],
    detailVideos: (mediaMap as any).atleta?.detailVideos || [],
    client: "Atleta Sports Club",
    date: "2024",
    services: ["Brand Identity", "Social Media Marketing", "Content Production"],
    deliverables: ["Video Content", "Graphics Design", "Brand Guidelines"],
    description: "Comprehensive sports marketing campaign combining dynamic video content with brand identity development. Creating engaging social media presence and promotional materials for modern athletic brand.",
  },
  {
    id: 2,
    slug: "atraktiv",
    titleKey: "Atraktiv",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Atraktiv.jpg",
    detailImages: [],
    detailVideos: (mediaMap as any).atraktiv?.detailVideos || [],
    client: "Atraktiv Magazine",
    date: "2024",
    services: ["Digital Marketing", "Video Production", "Content Strategy"],
    deliverables: ["Promotional Videos", "Social Media Content", "Brand Campaign"],
    description: "Modern marketing campaign for lifestyle magazine featuring dynamic video content and engaging digital storytelling. Focused on creating compelling narratives that resonate with contemporary audiences.",
  },
  {
    id: 3,
    slug: "bestdrive",
    titleKey: "BestDrive",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Bestdrive-Maja.jpg",
    detailImages: (mediaMap as any).bestdrive?.detailImages || [],
    detailVideos: (mediaMap as any).bestdrive?.detailVideos || [],
    client: "BestDrive & Garage Pulse",
    date: "2023-2024",
    services: ["Automotive Marketing", "Video Production", "Brand Development"],
    deliverables: ["Commercial Videos", "Brand Identity", "Digital Content"],
    description: "Comprehensive automotive brand campaign showcasing tire services and garage solutions. Creating dynamic video content that highlights technical expertise and customer service excellence.",
  },
  {
    id: 4,
    slug: "cheyf",
    titleKey: "Cheyf",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Cheyf.jpg",
    detailImages: (mediaMap as any).cheyf?.detailImages || [],
    detailVideos: (mediaMap as any).cheyf?.detailVideos || [],
    client: "Cheyf Restaurant",
    date: "2023-2024",
    services: ["Food Photography", "Video Production", "Social Media Marketing"],
    deliverables: ["Menu Videos", "Social Content", "Brand Campaign"],
    description: "Culinary visual storytelling project capturing the essence of modern dining experience. Creating mouth-watering video content and engaging social media presence for contemporary restaurant brand.",
  },
  {
    id: 5,
    slug: "cheyf-accommodations",
    titleKey: "Cheyf Accommodations",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Cheyf-Accomodation.jpg",
    detailImages: [],
    detailVideos: (mediaMap as any)['cheyf-accomodations']?.detailVideos || [],
    client: "Cheyf Accommodations",
    date: "2024",
    services: ["Real Estate Marketing", "Video Tours", "Content Production"],
    deliverables: ["Property Videos", "Virtual Tours", "Marketing Materials"],
    description: "Luxury accommodation showcase featuring stunning property tours and lifestyle content. Creating immersive video experiences that highlight unique features and amenities of premium rental properties.",
  },
  {
    id: 6,
    slug: "eureka-filaments",
    titleKey: "Eureka Filaments",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Eureka-Filaments.jpg",
    detailImages: (mediaMap as any)['eureka-filaments']?.detailImages || [],
    detailVideos: [],
  },
  {
    id: 7,
    slug: "get-energy-canada",
    titleKey: "Get Energy Canada",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/GetEnergy.jpg",
    detailImages: (mediaMap as any)['get-energy-canada']?.detailImages || [],
    detailVideos: [],
  },
  {
    id: 8,
    slug: "ibm",
    titleKey: "IBM",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Integrated-body.jpg",
    detailImages: (mediaMap as any)['integrated-body-movement']?.detailImages || [],
    detailVideos: [],
  },
  {
    id: 9,
    slug: "legacy-vacations",
    titleKey: "Legacy Vacations",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Legacy-Vacations.jpg",
    detailImages: (mediaMap as any)['legacy-vacations']?.detailImages || [],
    detailVideos: [],
  },
  {
    id: 10,
    slug: "sommerhagen",
    titleKey: "Sommerhagen",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Sommerhagene.jpg",
    detailImages: [],
    detailVideos: (mediaMap as any).sommerhagen?.detailVideos || [],
    client: "Sommerhagen Resort",
    date: "2023-2024",
    services: ["Tourism Marketing", "Video Production", "Content Creation"],
    deliverables: ["Promotional Videos", "Destination Content", "Social Media Campaign"],
    description: "Stunning visual journey through picturesque travel destination showcasing natural beauty and adventure experiences. Creating captivating video content that inspires wanderlust and promotes sustainable tourism.",
  },
  {
    id: 11,
    slug: "zamzam",
    titleKey: "Zamzam",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Zamzam-Project.jpg",
    detailImages: [],
    detailVideos: (mediaMap as any)['zamzam-project']?.detailVideos || [],
    client: "Zamzam Brand",
    date: "2024",
    services: ["Product Marketing", "Video Production", "Brand Strategy"],
    deliverables: ["Product Videos", "Social Content", "Marketing Campaign"],
    description: "Modern food and beverage brand campaign featuring innovative product showcases and lifestyle integration. Creating fresh visual content that connects with health-conscious contemporary consumers.",
  },
  {
    id: 12,
    slug: "garagepulse",
    titleKey: "Garagepulse",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Garagepulse.jpg",
    detailImages: (mediaMap as any).garagepulse?.detailImages || [],
    detailVideos: [],
  },
  {
    id: 13,
    slug: "green-concept",
    titleKey: "Green Concept Houses",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Green-Concept-Houses.jpg",
    detailImages: (mediaMap as any)['green-concept']?.detailImages || [],
    detailVideos: (mediaMap as any)['green-concept']?.detailVideos || [],
    client: "Green Concept Development",
    date: "2024",
    services: ["Real Estate Marketing", "Architectural Visualization", "Video Tours"],
    deliverables: ["Property Videos", "3D Tours", "Marketing Materials"],
    description: "Sustainable architecture showcase featuring eco-friendly residential designs and modern living spaces. Creating compelling video content that highlights innovative green building solutions and contemporary lifestyle.",
  },
  {
    id: 14,
    slug: "igny",
    titleKey: "Igny",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Igny.jpg",
    detailImages: (mediaMap as any).igny?.detailImages || [],
    detailVideos: (mediaMap as any).igny?.detailVideos || [],
    client: "Igny Brand",
    date: "2024",
    services: ["Brand Development", "Video Production", "Social Media Marketing"],
    deliverables: ["Brand Videos", "Social Content", "Visual Identity"],
    description: "Contemporary food and beverage brand launch featuring stylish product presentation and lifestyle integration. Creating sophisticated video content that appeals to modern urban consumers.",
  },
  {
    id: 15,
    slug: "rusticmens",
    titleKey: "Rusticmens",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Portfolio/Baneri-Portfolio/Rusticmens.jpg",
    detailImages: (mediaMap as any).rusticmens?.detailImages || [],
    detailVideos: [],
  },
];

export function getPortfolioData(): IPortfolio[] {
  return portfolio_data;
}

export default portfolio_data;
