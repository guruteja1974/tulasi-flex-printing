import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function AppLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main className="min-h-screen" id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
