/**
 * Maps S3 folder names to website slugs
 * Handles variations in folder naming conventions
 */

const SLUG_MAPPINGS: Record<string, string> = {
  // Portfolio folders
  'Atleta': 'atleta',
  'Atraktiv': 'atraktiv',
  'BestDrive': 'bestdrive',
  'CHEYF': 'cheyf',
  'Cheyf Accomodations': 'cheyf-accommodations', // Note: S3 has typo "Accomodations"
  'Cheyf Accommodations': 'cheyf-accommodations', // Correct spelling
  'eureka filaments': 'eureka-filaments',
  'Get Energy Canada': 'get-energy-canada',
  'integrated body movement': 'ibm',
  'IBM': 'ibm',
  'Legacy Vacations': 'legacy-vacations',
  'Property Alchemy': 'property-alchemy',
  'Sommerhagene': 'sommerhagen', // S3 has extra 'e'
  'Sommerhagen': 'sommerhagen',
  'Zamzam Project': 'zamzam',
  'Zamzam': 'zamzam',

  // Additional variations
  'Garagepulse': 'garagepulse',
  'GreenConcept': 'green-concept',
  'IGNY': 'igny',
  "O'Plant": 'oplant',
  'Rusticmens': 'rusticmens',
};

/**
 * Converts S3 folder name to website slug
 * @param folderName - The folder name from S3
 * @returns The corresponding website slug
 */
export function normalizeS3FolderToSlug(folderName: string): string {
  // Remove leading/trailing whitespace
  const trimmed = folderName.trim();

  // Check direct mapping first
  if (SLUG_MAPPINGS[trimmed]) {
    return SLUG_MAPPINGS[trimmed];
  }

  // Fallback: convert to lowercase kebab-case
  return trimmed
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')     // Remove special characters
    .replace(/-+/g, '-')            // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
}

/**
 * Gets all known slug mappings
 * Useful for debugging and validation
 */
export function getAllMappings(): Record<string, string> {
  return { ...SLUG_MAPPINGS };
}

/**
 * Checks if a folder name has a known mapping
 */
export function hasMapping(folderName: string): boolean {
  return folderName.trim() in SLUG_MAPPINGS;
}
