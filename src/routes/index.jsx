import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout.jsx';
import About from '../pages/About/About.jsx';
import ArchitecturalSignagePage from '../pages/Services/ArchitecturalSignagePage.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import CartPage from '../pages/Cart/CartPage.jsx';
import CommercialPrintingPage from '../pages/Services/CommercialPrintingPage.jsx';
import CustomMerchandisingPage from '../pages/Services/CustomMerchandisingPage.jsx';
import Experience from '../pages/Experience/Experience.jsx';
import FlexLargeFormatPage from '../pages/Services/FlexLargeFormatPage.jsx';
import Home from '../pages/Home/Home.jsx';
import Portfolio from '../pages/Portfolio/Portfolio.jsx';
import Services from '../pages/Services/Services.jsx';
import StructuralFabricationPage from '../pages/Services/StructuralFabricationPage.jsx';
import WeddingInvitationsPage from '../pages/Services/WeddingInvitationsPage.jsx';

const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      {
        path: '/services/wedding-invitations',
        element: <WeddingInvitationsPage />,
      },
      {
        path: '/services/commercial-printing',
        element: <CommercialPrintingPage />,
      },
      {
        path: '/services/flex-large-format',
        element: <FlexLargeFormatPage />,
      },
      {
        path: '/services/custom-merchandising',
        element: <CustomMerchandisingPage />,
      },
      {
        path: '/services/structural-fabrication',
        element: <StructuralFabricationPage />,
      },
      {
        path: '/services/architectural-signage',
        element: <ArchitecturalSignagePage />,
      },
      { path: '/cart', element: <CartPage /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/experience', element: <Experience /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
];

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(routes, { basename });
