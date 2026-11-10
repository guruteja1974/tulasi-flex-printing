import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout.jsx';
import About from '../pages/About/About.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Experience from '../pages/Experience/Experience.jsx';
import Home from '../pages/Home/Home.jsx';
import Portfolio from '../pages/Portfolio/Portfolio.jsx';
import Services from '../pages/Services/Services.jsx';

const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/experience', element: <Experience /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
];

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(routes, { basename });
