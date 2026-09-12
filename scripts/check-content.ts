import * as fs from 'fs';
import * as path from 'path';

console.log('Running prebuild content safety checks...');

// We parse the TypeScript files statically or dynamically.
// Using dynamic import with tsx might be tricky depending on setup, 
// so we'll do a simple string grep as a bulletproof safeguard.

const contentDir = path.join(__dirname, '../src/content/properties');

function checkProperties() {
  if (!fs.existsSync(contentDir)) {
    console.log('No properties directory found, skipping check.');
    return;
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const isSampleMatch = content.match(/isSample:\s*true/);
    const isPublishedMatch = content.match(/published:\s*true/);

    if (isSampleMatch) {
      if (process.env.NODE_ENV === 'production') {
        console.error(`\n❌ ERROR: Sample property found in production build: ${file}`);
        hasErrors = true;
      }
      
      if (isPublishedMatch) {
        console.error(`\n❌ ERROR: Property is marked as both isSample and published: ${file}`);
        console.error('   Sample properties must never be published to prevent leaking placeholder data.');
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error('\nContent safety check failed. Aborting build.\n');
    process.exit(1);
  }

  console.log('✅ Content safety checks passed.');
}

checkProperties();
