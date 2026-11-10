import { Link } from 'react-router-dom';
import './BrandLogo.css';

export default function BrandLogo({ onClick, className = '' }) {
  return (
    <Link
      aria-label="Tulasi Flex Printing & Arts home"
      className={`brand-logo ${className}`.trim()}
      onClick={onClick}
      to="/"
    >
      <span className="brand-logo__name">TULASI</span>
      <span className="brand-logo__descriptor">FLEX PRINTING &amp; ARTS</span>
    </Link>
  );
}
