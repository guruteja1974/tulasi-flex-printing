import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';
import './SiteFooter.css';

const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container--wide site-footer__main">
        <div className="site-footer__brand-column">
          <BrandLogo className="site-footer__brand" />
          <p className="site-footer__tagline">
            Your Vision, Our Creativity — Bringing Ideas to Life.
          </p>
          <p className="site-footer__about">
            Printing, display, and fabrication enquiries for businesses and
            individuals.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="site-footer__nav">
          <h2>Explore</h2>
          <ul>
            {navigationLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__address">
          <h2>Business address</h2>
          <p>
            <MapPin aria-hidden="true" size={15} />
            <span>
              Main Road, Near Old Bus Stand / Clock Tower Junction,
              Jaggayyapeta, NTR District, Andhra Pradesh – 521175, India.
            </span>
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Main+Road+Jaggayyapeta+Andhra+Pradesh+521175"
            rel="noreferrer"
            target="_blank"
          >
            View location
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container--wide">
          <span>
            © {new Date().getFullYear()} TULASI FLEX PRINTING &amp; ARTS
          </span>
          <span>Jaggayyapeta · Andhra Pradesh, India</span>
        </div>
      </div>
    </footer>
  );
}
