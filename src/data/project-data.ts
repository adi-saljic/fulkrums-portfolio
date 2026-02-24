// Import media map statically for client-side access
import mediaMapData from './generated/media-map.json';

export interface IProject {
  id: number;
  slug: string;
  titleKey: string;
  category: string;
  heroImage: string;
  detailImages: string[];
  detailVideos?: string[];
  detailPdf?: string;
}

// S3 media only - no fallback URLs
const project_data: IProject[] = [
  {
    id: 1,
    slug: "quickie-liga",
    titleKey: "quickieLiga",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/QUICKIE-LIGA.png",
    detailImages: [],
    detailVideos: [
      "/assets/videos/quickieLiga/QUICKIENAJAVA.mp4",
      "/assets/videos/quickieLiga/quickieVideo.mp4",
    ],
  },
  {
    id: 2,
    slug: "bestdrive-maja",
    titleKey: "bestdriveMaja",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/BESTDRIVE-MAJA.png",
    detailImages: [],
  },
  {
    id: 3,
    slug: "it-works-marketing",
    titleKey: "itWorksMarketing",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/IT-WORKS.png",
    detailImages: [],
    detailVideos: [
      "/assets/videos/itWorks/Video1.mp4",
      "/assets/videos/itWorks/Video2.mp4",
    ],
  },
  {
    id: 4,
    slug: "atleta",
    titleKey: "atleta",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/ATLETSKA-KONDICIJA.png",
    detailImages: [],
    detailVideos: [
      "/assets/videos/atleta/fin.mp4",
      "/assets/videos/atleta/finRlls.mp4",
      "/assets/videos/atleta/Sequence03.mp4",
    ],
  },
  {
    id: 5,
    slug: "igny",
    titleKey: "igny",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/IGNY.png",
    detailImages: [],
  },
  {
    id: 6,
    slug: "sommerhagene",
    titleKey: "sommerhagene",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/SOMMERHAGENE.png",
    detailImages: [],
    detailVideos: [
      "/assets/videos/sommerhagen/1.mp4",
      "/assets/videos/sommerhagen/Sequence1.mp4",
      "/assets/videos/sommerhagen/Sequence3.mp4",
    ],
    detailPdf: "",
  },
  {
    id: 7,
    slug: "wonderflle",
    titleKey: "wonderflle",
    category: "",
    heroImage: "https://d1hqd8vqu5a5q0.cloudfront.net/Pr.-Rezultati/THBMLS/WONDERWAFFLE.png",
    detailImages: [],
    detailVideos: [],
  },
];

/**
 * Enrich project data with S3 media URLs
 * Falls back to existing Google Drive URLs if S3 media not found
 */
function enrichProjectWithMedia(project: IProject): IProject {
  try {
    // Use statically imported media map
    const mediaMap = mediaMapData as any;

    // Projects are prefixed with "project-" in the media map
    const s3Media = mediaMap[`project-${project.slug}`];

    if (!s3Media) {
      // No S3 media found, use existing URLs
      return project;
    }

    // Merge S3 media with existing project data
    return {
      ...project,
      heroImage: s3Media.heroImage || project.heroImage,
      detailImages:
        s3Media.detailImages.length > 0
          ? s3Media.detailImages
          : project.detailImages,
      detailVideos:
        s3Media.detailVideos && s3Media.detailVideos.length > 0
          ? s3Media.detailVideos
          : project.detailVideos,
      detailPdf: s3Media.detailPdf || project.detailPdf,
    };
  } catch (error) {
    // Media map not found or error loading it
    // Return original project data (fallback to Google Drive URLs)
    return project;
  }
}

/**
 * Get enriched project data with S3 media URLs
 * Use this function in components instead of importing project_data directly
 */
export function getProjectData(): IProject[] {
  return project_data.map(enrichProjectWithMedia);
}

// Portfolio interface (for portfolio slider/showcase)
export interface IPortfolio {
  id: number;
  slug: string;
  titleKey: string;
  category: string;
  heroImage: string;
  detailImages: string[];
  detailVideos?: string[];
  detailPdf?: string;
}

// S3 media only - no fallback URLs
export const portfolio_data: IPortfolio[] = [
  {
    id: 1,
    slug: "atleta",
    titleKey: "atleta",
    category: "",
    heroImage: "",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/atleta/CopyfATHLETICALPHABET.mp4",
      "/assets/videos/portfolio/atleta/CopyfSequence06.mp4",
      "/assets/videos/portfolio/atleta/CopyofELJEZNIČAR.mp4",
    ],
  },
  {
    id: 2,
    slug: "atraktiv",
    titleKey: "atraktiv",
    category: "",
    heroImage: "",
    detailImages: [],
    detailVideos: [
      "/assets/videos/portfolio/atraktiv/CopyofATRAKTIV.mp4",
      "/assets/videos/portfolio/atraktiv/CopyfTRAKTIVMAGACIN.mp4",
    ],
  },
];

export default project_data;
