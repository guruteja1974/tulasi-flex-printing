import { portfolioReferences } from './homeData.js';

const categories = [
  'Invitations',
  'Signage',
  'Flex & display',
  'Retail branding',
  'Commercial print',
  'Merchandise',
];
const detailRoutes = [
  '/services/wedding-invitations',
  '/services/architectural-signage',
  '/services/flex-large-format',
  '/services/architectural-signage',
  '/services/commercial-printing',
  '/services/custom-merchandising',
];

export const portfolioData = portfolioReferences.map((project, index) => ({
  ...project,
  category: categories[index],
  detailRoute: detailRoutes[index],
}));

export const portfolioCategories = ['All work', ...categories];
