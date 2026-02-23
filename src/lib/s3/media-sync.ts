/**
 * S3 Media Sync Service
 * Connects to S3, lists portfolio media, and generates CloudFront URLs
 */

import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3';
import { normalizeS3FolderToSlug } from './slug-mapper';
import type {
  PortfolioMedia,
  PortfolioMediaMap,
  ProjectMedia,
  ProjectMediaMap,
  HomepageThumbnailsMap,
  MediaType,
  MediaSyncResult,
} from './types';

/**
 * Configuration for S3 connection
 */
interface S3Config {
  region: string;
  bucket: string;
  cloudFrontUrl: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

/**
 * Get S3 configuration from environment variables
 */
function getS3Config(): S3Config {
  const region = process.env.AWS_REGION || 'eu-central-1';
  const bucket = process.env.AWS_S3_BUCKET || 'fulkrums-data';
  const cloudFrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '';

  if (!cloudFrontUrl) {
    console.warn('⚠️  NEXT_PUBLIC_CLOUDFRONT_URL not set, using S3 direct URLs');
  }

  return {
    region,
    bucket,
    cloudFrontUrl,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

/**
 * Create S3 client
 */
function createS3Client(config: S3Config): S3Client {
  const clientConfig: any = {
    region: config.region,
  };

  // Only add credentials if they're provided
  if (config.accessKeyId && config.secretAccessKey) {
    clientConfig.credentials = {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    };
  }

  return new S3Client(clientConfig);
}

/**
 * Generate CloudFront URL from S3 key
 */
function generateCloudFrontUrl(s3Key: string, config: S3Config): string {
  // Trim whitespace from the key
  const cleanKey = s3Key.trim();

  // Encode each path segment separately to handle spaces and special characters
  // Split by '/', encode each segment, then join back
  const encodedKey = cleanKey
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');

  if (config.cloudFrontUrl) {
    // Use CloudFront CDN URL
    return `${config.cloudFrontUrl}/${encodedKey}`;
  }

  // Fallback to S3 direct URL
  return `https://${config.bucket}.s3.${config.region}.amazonaws.com/${encodedKey}`;
}

/**
 * Categorize media file by extension and path
 */
function categorizeMediaFile(key: string): MediaType {
  const lowerKey = key.toLowerCase();

  // Check file extension
  if (lowerKey.endsWith('.pdf')) {
    return 'pdf';
  }

  if (lowerKey.match(/\.(mp4|mov|avi|webm|mkv)$/)) {
    return 'video';
  }

  if (lowerKey.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
    // Check if it's in a 'hero' folder or named 'hero'
    if (lowerKey.includes('/hero/') || lowerKey.includes('hero')) {
      return 'hero';
    }
    return 'image';
  }

  return 'image'; // Default to image
}

/**
 * List all objects in a specific S3 prefix
 */
async function listS3Objects(
  client: S3Client,
  bucket: string,
  prefix: string
): Promise<_Object[]> {
  const objects: _Object[] = [];
  let continuationToken: string | undefined;

  try {
    do {
      const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      });

      const response = await client.send(command);

      if (response.Contents) {
        objects.push(...response.Contents);
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return objects;
  } catch (error) {
    console.error(`Error listing S3 objects with prefix "${prefix}":`, error);
    throw error;
  }
}

/**
 * Parse portfolio folder structure and extract media
 */
function parsePortfolioMedia(
  objects: _Object[],
  config: S3Config
): PortfolioMediaMap {
  const portfolioMap: PortfolioMediaMap = {};

  objects.forEach((obj) => {
    if (!obj.Key) return;

    // Skip folders (keys ending with /)
    if (obj.Key.endsWith('/')) return;

    // Parse key structure: Portfolio/{FolderName}/{optional-subfolder}/{filename}
    const parts = obj.Key.split('/');

    // Must have at least: Portfolio/{FolderName}/{filename}
    if (parts.length < 3 || parts[0] !== 'Portfolio') return;

    const folderName = parts[1];
    const slug = normalizeS3FolderToSlug(folderName);

    // Initialize portfolio if not exists
    if (!portfolioMap[slug]) {
      portfolioMap[slug] = {
        slug,
        heroImage: '',
        detailImages: [],
        detailVideos: [],
        detailPdf: undefined,
      };
    }

    const mediaType = categorizeMediaFile(obj.Key);
    const url = generateCloudFrontUrl(obj.Key, config);

    // Add media to appropriate category
    switch (mediaType) {
      case 'hero':
        // Use first hero image found
        if (!portfolioMap[slug].heroImage) {
          portfolioMap[slug].heroImage = url;
        }
        break;

      case 'image':
        portfolioMap[slug].detailImages.push(url);
        break;

      case 'video':
        portfolioMap[slug].detailVideos.push(url);
        break;

      case 'pdf':
        // Use first PDF found
        if (!portfolioMap[slug].detailPdf) {
          portfolioMap[slug].detailPdf = url;
        }
        break;
    }
  });

  // Post-processing: If no hero image, use first detail image
  Object.keys(portfolioMap).forEach((slug) => {
    if (!portfolioMap[slug].heroImage && portfolioMap[slug].detailImages.length > 0) {
      portfolioMap[slug].heroImage = portfolioMap[slug].detailImages[0];
    }
  });

  return portfolioMap;
}

/**
 * Main function: Sync portfolio media from S3
 */
export async function syncPortfolioMedia(): Promise<{
  mediaMap: PortfolioMediaMap;
  result: MediaSyncResult;
}> {
  const config = getS3Config();
  const client = createS3Client(config);

  console.log('🔄 Syncing portfolio media from S3...');
  console.log(`   Bucket: ${config.bucket}`);
  console.log(`   Region: ${config.region}`);
  console.log(`   CloudFront: ${config.cloudFrontUrl || 'Not configured (using S3 direct URLs)'}`);

  const errors: string[] = [];
  let totalImages = 0;
  let totalVideos = 0;
  let totalPdfs = 0;

  try {
    // List all objects in Portfolio folder
    const objects = await listS3Objects(client, config.bucket, 'Portfolio/');

    console.log(`📦 Found ${objects.length} objects in S3`);

    // Parse and categorize media
    const mediaMap = parsePortfolioMedia(objects, config);

    const portfolios = Object.keys(mediaMap).length;

    // Count media types
    Object.values(mediaMap).forEach((portfolio) => {
      totalImages += portfolio.detailImages.length;
      totalVideos += portfolio.detailVideos.length;
      if (portfolio.detailPdf) totalPdfs++;
    });

    console.log('✅ Sync completed successfully!');
    console.log(`   Portfolios: ${portfolios}`);
    console.log(`   Images: ${totalImages}`);
    console.log(`   Videos: ${totalVideos}`);
    console.log(`   PDFs: ${totalPdfs}`);

    return {
      mediaMap,
      result: {
        portfolios,
        projects: 0, // No projects synced in this function
        images: totalImages,
        videos: totalVideos,
        pdfs: totalPdfs,
        errors,
      },
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    errors.push(errorMsg);

    console.error('❌ Failed to sync portfolio media:', errorMsg);

    return {
      mediaMap: {},
      result: {
        portfolios: 0,
        projects: 0,
        images: 0,
        videos: 0,
        pdfs: 0,
        errors,
      },
    };
  }
}

/**
 * Parse project (study cases) folder structure and extract media
 */
function parseProjectMedia(
  objects: _Object[],
  config: S3Config
): ProjectMediaMap {
  const projectMap: ProjectMediaMap = {};

  objects.forEach((obj) => {
    if (!obj.Key) return;

    // Skip folders (keys ending with /)
    if (obj.Key.endsWith('/')) return;

    // Parse key structure: Pr. Rezultati/{FolderName}/{optional-subfolder}/{filename}
    const parts = obj.Key.split('/');

    // Must have at least: Pr. Rezultati/{FolderName}/{filename}
    if (parts.length < 3 || parts[0] !== 'Pr. Rezultati') return;

    const folderName = parts[1];
    const slug = normalizeS3FolderToSlug(folderName);

    // Initialize project if not exists
    if (!projectMap[slug]) {
      projectMap[slug] = {
        slug,
        heroImage: '',
        detailImages: [],
        detailVideos: [],
        detailPdf: undefined,
      };
    }

    const mediaType = categorizeMediaFile(obj.Key);
    const url = generateCloudFrontUrl(obj.Key, config);

    // Add media to appropriate category
    switch (mediaType) {
      case 'hero':
        // Use first hero image found
        if (!projectMap[slug].heroImage) {
          projectMap[slug].heroImage = url;
        }
        break;

      case 'image':
        projectMap[slug].detailImages.push(url);
        break;

      case 'video':
        projectMap[slug].detailVideos.push(url);
        break;

      case 'pdf':
        // Use first PDF found
        if (!projectMap[slug].detailPdf) {
          projectMap[slug].detailPdf = url;
        }
        break;
    }
  });

  // Post-processing: If no hero image, use first detail image
  Object.keys(projectMap).forEach((slug) => {
    if (!projectMap[slug].heroImage && projectMap[slug].detailImages.length > 0) {
      projectMap[slug].heroImage = projectMap[slug].detailImages[0];
    }
  });

  return projectMap;
}

/**
 * Main function: Sync project (study cases) media from S3
 */
export async function syncProjectMedia(): Promise<{
  mediaMap: ProjectMediaMap;
  result: Partial<MediaSyncResult>;
}> {
  const config = getS3Config();
  const client = createS3Client(config);

  const errors: string[] = [];
  let totalImages = 0;
  let totalVideos = 0;
  let totalPdfs = 0;

  try {
    // List all objects in Pr. Rezultati folder
    const objects = await listS3Objects(client, config.bucket, 'Pr. Rezultati/');

    // Parse and categorize media
    const mediaMap = parseProjectMedia(objects, config);

    const projects = Object.keys(mediaMap).length;

    // Count media types
    Object.values(mediaMap).forEach((project) => {
      totalImages += project.detailImages.length;
      totalVideos += project.detailVideos.length;
      if (project.detailPdf) totalPdfs++;
    });

    return {
      mediaMap,
      result: {
        projects,
        images: totalImages,
        videos: totalVideos,
        pdfs: totalPdfs,
        errors,
      },
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    errors.push(errorMsg);

    console.error('❌ Failed to sync project media:', errorMsg);

    return {
      mediaMap: {},
      result: {
        projects: 0,
        images: 0,
        videos: 0,
        pdfs: 0,
        errors,
      },
    };
  }
}

/**
 * Sync homepage thumbnails from S3
 */
export async function syncHomepageThumbnails(): Promise<HomepageThumbnailsMap> {
  const config = getS3Config();
  const client = createS3Client(config);

  try {
    // List all objects in homepage folder
    const objects = await listS3Objects(client, config.bucket, 'homepage/');

    const thumbnailsMap: HomepageThumbnailsMap = {};

    // Map filenames to slugs
    const filenameToSlug: Record<string, string> = {
      'Atletska kondicija.png': 'atleta',
      'Cheyf Accomodations.png': 'cheyf-accommodation',
      'Cheyf.png': 'cheyf',
      'Get Energy.png': 'getenergy',
      'Green Concept Houses.png': 'green-concept-houses',
      'It works.png': 'it-works-marketing',
      'Quickie liga.png': 'quickie-liga',
      'Zamzam Project.png': 'zamzam',
    };

    objects.forEach((obj) => {
      if (!obj.Key || obj.Key.endsWith('/')) return;

      const filename = obj.Key.split('/').pop();
      if (!filename) return;

      const slug = filenameToSlug[filename];
      if (slug) {
        thumbnailsMap[slug] = generateCloudFrontUrl(obj.Key, config);
      }
    });

    return thumbnailsMap;
  } catch (error) {
    console.error('❌ Failed to sync homepage thumbnails:', error);
    return {};
  }
}

/**
 * Sync all media from S3 (portfolios + projects/study cases + homepage thumbnails)
 */
export async function syncAllMedia(): Promise<{
  portfolioMap: PortfolioMediaMap;
  projectMap: ProjectMediaMap;
  homepageThumbnails: HomepageThumbnailsMap;
  result: MediaSyncResult;
}> {
  console.log('🔄 Syncing all media from S3...\n');

  // Sync portfolios
  const portfolioSync = await syncPortfolioMedia();

  // Sync projects (study cases)
  const projectSync = await syncProjectMedia();

  // Sync homepage thumbnails
  const homepageThumbnails = await syncHomepageThumbnails();

  // Combine results
  const combinedResult: MediaSyncResult = {
    portfolios: portfolioSync.result.portfolios,
    projects: projectSync.result.projects || 0,
    images: portfolioSync.result.images + (projectSync.result.images || 0),
    videos: portfolioSync.result.videos + (projectSync.result.videos || 0),
    pdfs: portfolioSync.result.pdfs + (projectSync.result.pdfs || 0),
    errors: [...portfolioSync.result.errors, ...(projectSync.result.errors || [])],
  };

  return {
    portfolioMap: portfolioSync.mediaMap,
    projectMap: projectSync.mediaMap,
    homepageThumbnails,
    result: combinedResult,
  };
}

/**
 * Validate that required environment variables are set
 */
export function validateS3Config(): boolean {
  const config = getS3Config();

  if (!config.bucket) {
    console.error('❌ AWS_S3_BUCKET environment variable is required');
    return false;
  }

  if (!config.accessKeyId || !config.secretAccessKey) {
    console.warn('⚠️  AWS credentials not found in environment variables');
    console.warn('   Make sure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set');
    return false;
  }

  return true;
}
