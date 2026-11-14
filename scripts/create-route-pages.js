import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'dist');
const indexFile = join(outputDirectory, 'index.html');
const routes = [
  'about',
  'services',
  'services/wedding-invitations',
  'services/commercial-printing',
  'services/flex-large-format',
  'services/custom-merchandising',
  'services/structural-fabrication',
  'services/architectural-signage',
  'cart',
  'portfolio',
  'experience',
  'contact',
];

for (const route of routes) {
  const routeDirectory = join(outputDirectory, route);
  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(indexFile, join(routeDirectory, 'index.html'));
}
