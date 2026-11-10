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
    description:
      'Explore invitation, event stationery, and finishing options for your occasion.',
    icon: Sparkles,
    image: invitationReference,
    imageAlt: 'Illustrative designer reference image of wedding stationery.',
  },
  {
    title: 'Commercial Printing',
    description:
      'Discuss business stationery, documents, and printed collateral for your needs.',
    icon: FileImage,
    image: commercialReference,
    imageAlt: 'Illustrative designer reference image of commercial print collateral.',
  },
  {
    title: 'Flex & Large-Format Printing',
    description:
      'Plan banners, display graphics, and large-format print requirements.',
    icon: Printer,
    image: flexReference,
    imageAlt: 'Illustrative designer reference image of large-format printing.',
  },
  {
    title: 'Architectural Signage',
    description:
      'Share your requirements for signs, display lettering, and visual identification.',
    icon: Store,
    image: signageReference,
    imageAlt: 'Illustrative designer reference image of architectural signage.',
  },
  {
    title: 'Custom Merchandise',
    description:
      'Explore branded apparel, merchandise, and custom presentation ideas.',
    icon: Shirt,
    image: merchandiseReference,
    imageAlt: 'Illustrative designer reference image of custom merchandise.',
  },
  {
    title: 'Fabrication & Hoarding',
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
    image: portfolioInvitationReference,
    imageAlt:
      'Illustrative designer reference image of luxury wedding stationery; not a verified client project.',
  },
  {
    title: 'Architectural signage concept',
    category: 'Signage',
    image: portfolioSignageReference,
    imageAlt:
      'Illustrative designer reference image of illuminated architectural lettering; not a verified client project.',
  },
  {
    title: 'Large-format display concept',
    category: 'Flex & display',
    image: portfolioFlexReference,
    imageAlt:
      'Illustrative designer reference image of a highway display installation; not a verified client project.',
  },
  {
    title: 'Storefront identity concept',
    category: 'Retail branding',
    image: portfolioStorefrontReference,
    imageAlt:
      'Illustrative designer reference image of a retail storefront; not a verified client project.',
  },
  {
    title: 'Business stationery concept',
    category: 'Commercial print',
    image: portfolioStationeryReference,
    imageAlt:
      'Illustrative designer reference image of business stationery; not a verified client project.',
  },
  {
    title: 'Branded merchandise concept',
    category: 'Merchandise',
    image: portfolioMerchandiseReference,
    imageAlt:
      'Illustrative designer reference image of custom apparel and a presentation item; not a verified client project.',
  },
];

export const workingProcess = [
  {
    number: '01',
    title: 'Share your brief',
    description: 'Tell us what you need, where it will be used, and by when.',
    icon: UsersRound,
  },
  {
    number: '02',
    title: 'Confirm specifications',
    description: 'Review size, quantity, artwork, material, and finish details.',
    icon: Ruler,
  },
  {
    number: '03',
    title: 'Review the estimate',
    description: 'Confirm the proposed scope, pricing, and timing before approval.',
    icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'Approve artwork',
    description: 'Sign off on the final proof and production details.',
    icon: Image,
  },
  {
    number: '05',
    title: 'Production planning',
    description: 'Agree on the production plan and any installation requirements.',
    icon: Workflow,
  },
  {
    number: '06',
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
