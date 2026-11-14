import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import PrimaryNavigation from '../navigation/PrimaryNavigation.jsx';
import BrandLogo from '../common/BrandLogo.jsx';
import WhatsAppLink from '../common/WhatsAppLink.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';
import './Header.css';

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const cartLabel = `Production cart, ${items.length} configured ${items.length === 1 ? 'item' : 'items'}`;

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
          <Link
            aria-label={cartLabel}
            className="site-header__cart-link"
            to="/cart"
          >
            <ShoppingBag aria-hidden="true" size={19} />
            <span>{items.length}</span>
          </Link>
          <WhatsAppLink
            className="site-header__whatsapp"
            message={WHATSAPP_MESSAGES.header}
          />
        </div>

        <Link
          aria-label={cartLabel}
          className="site-header__cart-link site-header__cart-link--mobile"
          to="/cart"
        >
          <ShoppingBag aria-hidden="true" size={19} />
          <span>{items.length}</span>
        </Link>

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
              message={WHATSAPP_MESSAGES.header}
            />
          </div>
        )}
      </div>
    </header>
  );
}
