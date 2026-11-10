import { portfolioReferences } from './homeData.js';

const categories = [
  'Invitations',
  'Signage',
  'Flex & display',
  'Retail branding',
  'Commercial print',
  'Merchandise',
];

export const portfolioData = portfolioReferences.map((project, index) => ({
  ...project,
  category: categories[index],
}));

export const portfolioCategories = ['All work', ...categories];
