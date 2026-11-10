import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import PrimaryNavigation from '../navigation/PrimaryNavigation.jsx';
import BrandLogo from '../common/BrandLogo.jsx';
import WhatsAppLink from '../common/WhatsAppLink.jsx';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container--wide site-header__inner">
        <BrandLogo
          className="site-header__brand"
          onClick={closeMenu}
        />

        <div className="site-header__desktop">
          <PrimaryNavigation />
          <WhatsAppLink className="site-header__whatsapp" />
        </div>

        <button
          aria-controls="mobile-primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="site-header__menu-toggle"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          ref={menuButtonRef}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={24} />
          ) : (
            <Menu aria-hidden="true" size={24} />
          )}
        </button>

        {isMenuOpen && (
          <div
            className="site-header__mobile-menu"
            id="mobile-primary-navigation"
          >
            <PrimaryNavigation
              className="primary-navigation--mobile"
              onNavigate={closeMenu}
            />
            <WhatsAppLink
              className="site-header__whatsapp site-header__whatsapp--mobile"
            />
          </div>
        )}
      </div>
    </header>
  );
}
