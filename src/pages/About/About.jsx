import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/common/PageHero.jsx';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { heritageMilestones } from '../../data/homeData.js';
import '../contentPages.css';
import './About.css';

export default function About() {
  return (
    <div className="content-page about-page">
      <PageHero
        description="A local printing and arts business established in 1994, with a service brief spanning print, display, and fabrication."
        eyebrow="About Tulasi"
        title="A Local Story, Still Being Written"
      >
        <Link className="button button--secondary" to="/services">
          Explore services <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </PageHero>

      <section className="content-section">
        <div className="container--wide about-page__story">
          <div className="about-page__story-mark" aria-hidden="true">
            <Sparkles size={26} />
            <span>Since 1994</span>
          </div>
          <div>
            <SectionHeading
              eyebrow="Our foundation"
              title="Print, craft, and a place to call home"
            />
            <p>
              TULASI FLEX PRINTING &amp; ARTS was established in 1994. The
              business brief identifies its location on Main Road, near Old Bus
              Stand / Clock Tower Junction in Jaggayyapeta, Andhra Pradesh.
            </p>
            <p>
              The services outlined for the business span invitation and
              commercial print, large-format graphics, signage, merchandise,
              and fabrication. Project scope and availability are confirmed
              individually.
            </p>
            <div className="about-page__address">
              <MapPin aria-hidden="true" size={18} />
              <span>
                Main Road, Near Old Bus Stand / Clock Tower Junction,
                Jaggayyapeta, NTR District, Andhra Pradesh – 521175, India.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section content-section--alternate">
        <div className="container--wide">
          <div className="content-section__heading">
            <SectionHeading
              align="center"
              eyebrow="A continuing journey"
              title="The story beyond the founding year"
              description="Only the founding year is confirmed in the provided business brief. Additional milestones are shown as dates requiring confirmation, not as verified history."
            />
          </div>
          <div className="about-page__timeline">
            {heritageMilestones.map((milestone) => (
              <article
                className={`about-page__milestone${milestone.confirmed ? ' is-confirmed' : ''}`}
                key={milestone.year}
              >
                <span>{milestone.year}</span>
                <h3>
                  {milestone.confirmed
                    ? 'Business established'
                    : 'Milestone details pending'}
                </h3>
                <p>
                  {milestone.confirmed
                    ? 'Founding year supplied in the approved business brief.'
                    : 'Historical details require business confirmation.'}
                </p>
              </article>
            ))}
          </div>
          <p className="content-note">
            <strong>Editorial note:</strong> Historical photographs, facility
            details, team profiles, and further milestones are pending approved
            source material.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container--wide">
          <div className="content-section__heading">
            <SectionHeading
              eyebrow="What guides an enquiry"
              title="Clear conversations, project by project"
              description="These are service principles for the website experience, not claims about unverified operating capabilities."
            />
          </div>
          <div className="content-grid">
            {[
              ['Understand the brief', 'Start with intended use, format, quantity, and location.'],
              ['Discuss suitable options', 'Review relevant print, display, or fabrication choices.'],
              ['Confirm before proceeding', 'Agree on scope, timing, pricing, and delivery for each request.'],
            ].map(([title, description], index) => (
              <article className="content-card" key={title}>
                <span className="content-card__eyebrow">
                  PRINCIPLE {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="content-actions">
            <Link className="button button--outline" to="/contact">
              Get in touch <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
