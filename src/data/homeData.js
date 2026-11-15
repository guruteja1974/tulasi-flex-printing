import {
  Building2,
  ClipboardCheck,
  FileImage,
  Image,
  Layers3,
  MapPinned,
  PackageCheck,
  Printer,
  Ruler,
  Shirt,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  Workflow,
  Wrench,
} from 'lucide-react';
import invitationReference from '../assets/images/reference/services/reference-01.jpg';
import commercialReference from '../assets/images/reference/services/reference-02.jpg';
import flexReference from '../assets/images/reference/services/reference-03.jpg';
import signageReference from '../assets/images/reference/services/reference-04.jpg';
import merchandiseReference from '../assets/images/reference/services/reference-05.jpg';
import fabricationReference from '../assets/images/reference/services/reference-06.jpg';
import portfolioInvitationReference from '../assets/images/reference/portfolio/reference-01.jpg';
import portfolioSignageReference from '../assets/images/reference/portfolio/reference-02.jpg';
import portfolioFlexReference from '../assets/images/reference/portfolio/reference-03.jpg';
import portfolioStorefrontReference from '../assets/images/reference/portfolio/reference-04.jpg';
import portfolioStationeryReference from '../assets/images/reference/portfolio/reference-05.jpg';
import portfolioMerchandiseReference from '../assets/images/reference/portfolio/reference-06.jpg';

export const homeMetrics = [
  { value: '1994', label: 'Year established' },
  { value: '06', label: 'Service categories' },
  { value: 'Jaggayyapeta', label: 'Andhra Pradesh' },
  { value: 'Made to brief', label: 'Enquiry-led quotations' },
];

export const heritageMilestones = [
  {
    year: '1994',
    title: 'The beginning',
    detail: 'Founding year provided in the approved business brief.',
    confirmed: true,
  },
  { year: '2004', title: 'Milestone details pending confirmation' },
  { year: '2012', title: 'Milestone details pending confirmation' },
  { year: '2018', title: 'Milestone details pending confirmation' },
  { year: '2024+', title: 'Current chapter details pending confirmation' },
];

export const homeServices = [
  {
    title: 'Wedding & Invitation Printing',
    route: '/services/wedding-invitations',
    illustration: 'invite',
    speech: 'I turn your big day into a beautiful card.',
    description:
      'Explore invitation, event stationery, and finishing options for your occasion.',
    icon: Sparkles,
    image: invitationReference,
    imageAlt: 'Illustrative designer reference image of wedding stationery.',
  },
  {
    title: 'Commercial Printing',
    route: '/services/commercial-printing',
    illustration: 'docs',
    speech: 'Letterheads, cards, and folders for your business.',
    description:
      'Discuss business stationery, documents, and printed collateral for your needs.',
    icon: FileImage,
    image: commercialReference,
    imageAlt: 'Illustrative designer reference image of commercial print collateral.',
  },
  {
    title: 'Flex & Large-Format Printing',
    route: '/services/flex-large-format',
    illustration: 'flex',
    speech: 'Plan banners and large-format display graphics.',
    description:
      'Plan banners, display graphics, and large-format print requirements.',
    icon: Printer,
    image: flexReference,
    imageAlt: 'Illustrative designer reference image of large-format printing.',
  },
  {
    title: 'Architectural Signage',
    route: '/services/architectural-signage',
    illustration: 'sign',
    speech: 'Discuss signs and display lettering for your space.',
    description:
      'Share your requirements for signs, display lettering, and visual identification.',
    icon: Store,
    image: signageReference,
    imageAlt: 'Illustrative designer reference image of architectural signage.',
  },
  {
    title: 'Custom Merchandise',
    route: '/services/custom-merchandising',
    illustration: 'merch',
    speech: 'Explore custom apparel and presentation ideas.',
    description:
      'Explore branded apparel, merchandise, and custom presentation ideas.',
    icon: Shirt,
    image: merchandiseReference,
    imageAlt: 'Illustrative designer reference image of custom merchandise.',
  },
  {
    title: 'Fabrication & Hoarding',
    route: '/services/structural-fabrication',
    illustration: 'hoard',
    speech: 'Describe a display or hoarding project for review.',
    description:
      'Describe structural display or hoarding requirements for a project review.',
    icon: Wrench,
    image: fabricationReference,
    imageAlt: 'Illustrative designer reference image of fabrication work.',
  },
];

export const homeAdvantages = [
  {
    number: '01',
    title: 'Thoughtful craft',
    description:
      'Select materials and finishes to suit the intended use and presentation.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Clear specifications',
    description:
      'Share size, quantity, artwork, and finish details before a quote is prepared.',
    icon: Ruler,
  },
  {
    number: '03',
    title: 'Artwork coordination',
    description:
      'Confirm file readiness and design support requirements during enquiry.',
    icon: FileImage,
  },
  {
    number: '04',
    title: 'Multiple print categories',
    description:
      'Choose from the six service categories outlined in the approved brief.',
    icon: Layers3,
  },
  {
    number: '05',
    title: 'Local point of contact',
    description:
      'The provided business address is in Jaggayyapeta, NTR District.',
    icon: MapPinned,
  },
  {
    number: '06',
    title: 'Scope before commitment',
    description:
      'Confirm timing, delivery, installation, and final cost for each request.',
    icon: ClipboardCheck,
  },
];

export const portfolioReferences = [
  {
    title: 'Wedding stationery concept',
    category: 'Invitation print',
    illustration: 'invitation',
    description: 'Foil-finish invitation suite concept.',
    imageAlt: 'Illustration of a wedding invitation concept, not a verified client project.',
    image: portfolioInvitationReference,
  },
  {
    title: 'Architectural signage concept',
    category: 'Signage',
    illustration: 'signage',
    description: 'Illuminated lettering on a building facade concept.',
    imageAlt: 'Illustration of a signage concept, not a verified client project.',
    image: portfolioSignageReference,
  },
  {
    title: 'Large-format display concept',
    category: 'Flex & display',
    illustration: 'display',
    description: 'Roadside hoarding on a steel frame concept.',
    imageAlt: 'Illustration of a large-format display concept, not a verified client project.',
    image: portfolioFlexReference,
  },
  {
    title: 'Storefront identity concept',
    category: 'Retail branding',
    illustration: 'storefront',
    description: 'Shop sign and window graphics concept.',
    imageAlt: 'Illustration of a storefront identity concept, not a verified client project.',
    image: portfolioStorefrontReference,
  },
  {
    title: 'Business stationery concept',
    category: 'Commercial print',
    illustration: 'stationery',
    description: 'Letterhead, cards, and folders concept.',
    imageAlt: 'Illustration of business stationery, not a verified client project.',
    image: portfolioStationeryReference,
  },
  {
    title: 'Branded merchandise concept',
    category: 'Merchandise',
    illustration: 'merchandise',
    description: 'Apparel and recognition plaque concept.',
    imageAlt: 'Illustration of branded merchandise, not a verified client project.',
    image: portfolioMerchandiseReference,
  },
];

export const workingProcess = [
  {
    number: '01',
    illustration: 'step-brief',
    speech: 'Tell us your idea.',
    title: 'Share your brief',
    description: 'Tell us what you need, where it will be used, and by when.',
    icon: UsersRound,
  },
  {
    number: '02',
    illustration: 'step-specs',
    speech: 'Let’s measure it right.',
    title: 'Confirm specifications',
    description: 'Review size, quantity, artwork, material, and finish details.',
    icon: Ruler,
  },
  {
    number: '03',
    illustration: 'step-quote',
    speech: 'Review the estimate.',
    title: 'Review the estimate',
    description: 'Confirm the proposed scope, pricing, and timing before approval.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    illustration: 'step-art',
    speech: 'Is the artwork ready?',
    title: 'Approve artwork',
    description: 'Sign off on the final proof and production details.',
    icon: Image,
  },
  {
    number: '05',
    illustration: 'step-plan',
    speech: 'Plan the work together.',
    title: 'Production planning',
    description: 'Agree on the production plan and any installation requirements.',
    icon: Workflow,
  },
  {
    number: '06',
    illustration: 'step-hand',
    speech: 'Coordinate the handover.',
    title: 'Coordinate handover',
    description: 'Confirm collection, delivery, or site coordination for the order.',
    icon: PackageCheck,
  },
];

export const testimonialPlaceholders = [
  {
    label: 'Customer review placeholder',
    note: 'Add an approved customer quote after the reviewer and wording are verified.',
  },
  {
    label: 'Project feedback placeholder',
    note: 'Replace with authentic, permissioned feedback before publication.',
  },
  {
    label: 'Client testimonial placeholder',
    note: 'Customer name, role, rating, and review are pending confirmation.',
  },
];

export const quoteEnquiryOptions = [
  'Wedding & Invitation Printing',
  'Commercial Printing',
  'Flex & Large-Format Printing',
  'Architectural Signage',
  'Custom Merchandise',
  'Fabrication & Hoarding',
  'Not sure yet',
];

export const quoteContactDetails = [
  {
    label: 'Business',
    value: 'TULASI FLEX PRINTING & ARTS',
    icon: Building2,
  },
  {
    label: 'Address',
    value:
      'Main Road, Near Old Bus Stand / Clock Tower Junction, Jaggayyapeta, NTR District, Andhra Pradesh – 521175, India.',
    icon: MapPinned,
  },
  {
    label: 'Project coordination',
    value: 'Timing, delivery, and installation details are confirmed per enquiry.',
    icon: Truck,
  },
];
