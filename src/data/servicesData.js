import { homeServices } from './homeData.js';

const serviceDetails = [
  {
    overview:
      'Explore invitation suites and event stationery, with format, paper, colour, and finishing preferences discussed for each brief.',
    options: ['Invitations', 'Event stationery', 'Finishing options'],
  },
  {
    overview:
      'Discuss printed materials for business communication, from everyday stationery to multi-page collateral.',
    options: ['Business stationery', 'Brochures and catalogues', 'Forms and bill books'],
  },
  {
    overview:
      'Plan banners and large-format graphics with the intended display location, dimensions, and viewing distance in mind.',
    options: ['Banners', 'Display graphics', 'Window and wall graphics'],
  },
  {
    overview:
      'Share the site, visibility, and installation requirements for a sign or branded space.',
    options: ['Storefront signs', 'Dimensional lettering', 'Directional displays'],
  },
  {
    overview:
      'Explore branded apparel and custom merchandise options, with artwork and quantity confirmed at enquiry.',
    options: ['Branded apparel', 'Event merchandise', 'Custom presentation'],
  },
  {
    overview:
      'Discuss fabricated display structures and hoarding requirements, including site and installation considerations.',
    options: ['Display structures', 'Hoardings', 'Site coordination'],
  },
];

export const servicesData = homeServices.map((service, index) => ({
  ...service,
  ...serviceDetails[index],
  number: String(index + 1).padStart(2, '0'),
}));
