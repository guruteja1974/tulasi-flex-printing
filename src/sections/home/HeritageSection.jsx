import { ArrowUpRight, Landmark } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { heritageMilestones } from '../../data/homeData.js';
import './HeritageSection.css';

export default function HeritageSection() {
  return (
    <section
      aria-labelledby="home-heritage-title"
      className="home-heritage section"
      id="home-heritage"
    >
      <div className="container--wide">
        <div className="home-heritage__intro">
          <SectionHeading
            className="home-heritage__heading"
            id="home-heritage-title"
            eyebrow="A history in print"
            title="From Artisanal Foundations to Andhra’s High-Tech Print Atelier"
          />
          <div className="home-heritage__summary">
            <p>
              Tulasi Flex Printing &amp; Arts was established in 1994. Its
              Jaggayyapeta address places the business in the NTR District of
              Andhra Pradesh.
            </p>
            <p className="home-heritage__pending">
              Historical chapter details beyond the founding year are pending
              business confirmation.
            </p>
          </div>
        </div>

        <div aria-label="Heritage timeline" className="home-heritage__timeline">
          {heritageMilestones.map((milestone, index) => (
            <article
              className={`home-heritage__milestone${milestone.confirmed ? ' is-confirmed' : ''}`}
              key={milestone.year}
            >
              <span className="home-heritage__chapter">
                Chapter {String(index + 1).padStart(2, '0')}
              </span>
              <div aria-hidden="true" className="home-heritage__marker">
                {milestone.confirmed ? (
                  <Landmark size={15} />
                ) : (
                  <ArrowUpRight size={14} />
                )}
              </div>
              <p className="home-heritage__year">{milestone.year}</p>
              <h3>{milestone.title}</h3>
              <p className="home-heritage__detail">
                {milestone.detail || 'Historical details pending confirmation.'}
              </p>
            </article>
          ))}
        </div>

        <div className="home-heritage__note">
          <Landmark aria-hidden="true" size={17} />
          <p>
            Founded in <strong>1994</strong>
            <span aria-hidden="true"> · </span>
            Jaggayyapeta, Andhra Pradesh
          </p>
          <span className="home-heritage__note-tag">
            Further milestones pending
          </span>
        </div>
      </div>
    </section>
  );
}
