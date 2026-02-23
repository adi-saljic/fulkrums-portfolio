/**
 * TypeScript type definitions for S3 media integration
 */

export type MediaType = 'hero' | 'image' | 'video' | 'pdf';

export interface PortfolioMedia {
  slug: string;
  heroImage: string;
  detailImages: string[];
  detailVideos: string[];
  detailPdf?: string;
}

export interface PortfolioMediaMap {
  [slug: string]: PortfolioMedia;
}

export interface ProjectMedia {
  slug: string;
  heroImage: string;
  detailImages: string[];
  detailVideos: string[];
  detailPdf?: string;
}

export interface ProjectMediaMap {
  [slug: string]: ProjectMedia;
}

export interface HomepageThumbnail {
  slug: string;
  thumbnail: string;
}

export interface HomepageThumbnailsMap {
  [slug: string]: string; // slug -> thumbnail URL
}

export interface S3Object {
  Key: string;
  Size: number;
  LastModified: Date;
}

export interface MediaSyncResult {
  portfolios: number;
  projects: number;
  images: number;
  videos: number;
  pdfs: number;
  errors: string[];
}
