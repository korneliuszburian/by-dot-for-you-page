import fs from 'fs';
import path from 'path';

// Read the images_index.json file
const imagesIndexPath = path.join(process.cwd(), 'public', 'images', 'images_index.json');
const productsDir = path.join(process.cwd(), 'src', 'content', 'products');

try {
  const productsData = JSON.parse(fs.readFileSync(imagesIndexPath, 'utf8'));

  // Ensure products directory exists
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  // Convert each product to a markdown file
  productsData.forEach(product => {
    // Create a safe filename from product name and id
    const safeName = product.product_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const filename = `${safeName}-${product.id}.md`;
    const filepath = path.join(productsDir, filename);

    // Create frontmatter
    const frontmatter = `---
id: ${product.id}
status: "${product.status}"
product_name: "${product.product_name}"
size_eu: "${product.size_eu}"
collection: "${product.collection}"
type: "${product.type}"
price_pln: ${product.price_pln}
fabric: "${product.fabric}"
base: ${product.base === null ? 'null' : `"${product.base}"`}
website_des: "${product.website_des}"
images:
${product.images.map(img => `  - "${img}"`).join('\n')}
---
`;

    // Write the file
    fs.writeFileSync(filepath, frontmatter, 'utf8');
    console.log(`Created: ${filename}`);
  });

  console.log(`Successfully converted ${productsData.length} products to content collections.`);
} catch (error) {
  console.error('Error converting products:', error);
}