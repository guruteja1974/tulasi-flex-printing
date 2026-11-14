import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import SiteFooter from './SiteFooter.jsx';
import WhatsAppLink from '../common/WhatsAppLink.jsx';
import { WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';
import './FloatingWhatsAppLink.css';

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
      <WhatsAppLink
        className="floating-whatsapp"
        label="WhatsApp enquiry"
        message={WHATSAPP_MESSAGES.header}
        variant=""
      />
    </>
  );
}
