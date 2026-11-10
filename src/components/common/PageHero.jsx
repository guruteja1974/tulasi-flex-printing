import './PageHero.css';

export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <header className="page-hero">
      <div className="container--wide page-hero__inner">
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__description">{description}</p>
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </header>
  );
}
