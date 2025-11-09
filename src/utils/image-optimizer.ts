// Utility to get optimized image from src/images directory
import { getImage } from 'astro:assets';

// Since we can't use dynamic imports easily in Astro,
// we'll create a mapping for known images
const imageImports = {
  // This would be auto-generated in a real project
  // For now, we'll use a fallback approach
};

export function getOptimizedImage(imagePath: string, alt: string, width: number, height: number) {
  // Fallback to regular img if optimized import fails
  return {
    tag: 'img',
    attributes: {
      src: `/images/${imagePath}`,
      alt,
      width,
      height,
      loading: 'lazy'
    }
  };
}