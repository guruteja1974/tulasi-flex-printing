import { ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EmergencySupportSection.css';

export default function EmergencySupportSection() {
  return (
    <section
      aria-labelledby="home-support-title"
      className="home-support"
      id="home-support"
    >
      <div className="container--wide home-support__inner">
        <span aria-hidden="true" className="home-support__icon">
          <Clock3 size={22} />
        </span>
        <div className="home-support__copy">
          <p>Project timeline</p>
          <h2 id="home-support-title">
            Working to a tight deadline?
          </h2>
          <span>
            Share your required date and project location. Availability and
            turnaround are confirmed for each enquiry.
          </span>
        </div>
        <Link className="button button--secondary" to="/contact">
          Discuss your project
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
