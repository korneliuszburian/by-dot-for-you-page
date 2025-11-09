// Map of product images for optimized loading
// This will be auto-generated in a production app

// Import images statically (this is the recommended Astro approach)
import onePeacePants1 from '../../images/Items/1 One Peace Pants/Website/1.png';
import onePeacePants2 from '../../images/Items/1 One Peace Pants/Website/2.png';
import onePeacePants3 from '../../images/Items/1 One Peace Pants/Website/3.png';
import onePeacePants4 from '../../images/Items/1 One Peace Pants/Website/4.png';

// Add more imports as needed...

const imageMap: Record<string, any> = {
  'Items/1 One Peace Pants/Website/1.png': onePeacePants1,
  'Items/1 One Peace Pants/Website/2.png': onePeacePants2,
  'Items/1 One Peace Pants/Website/3.png': onePeacePants3,
  'Items/1 One Peace Pants/Website/4.png': onePeacePants4,
  // Add more mappings as needed...
};

export function getProductImage(imagePath: string) {
  return imageMap[imagePath] || null;
}