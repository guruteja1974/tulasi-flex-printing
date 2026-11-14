import { Building2, UsersRound } from 'lucide-react';
import PageHero from '../../components/common/PageHero.jsx';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import { heritageMilestones } from '../../data/homeData.js';
import { WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';
import '../contentPages.css';
import './Experience.css';

const productionAreas = [
  'Wedding and invitation printing',
  'Commercial printing',
  'Flex and large-format printing',
  'Architectural signage',
  'Custom merchandise',
  'Fabrication and hoarding',
];

export default function Experience() {
  return (
    <div className="content-page experience-page">
      <PageHero
        description="The business brief records a 1994 founding year and six service categories. The detailed history, facility specifications, and team information are being kept open until verified."
        eyebrow="Experience · Heritage & capability"
        title="A history of print, with more to confirm"
      >
        <WhatsAppLink
          label="Speak with our team"
          message={WHATSAPP_MESSAGES.experience}
        />
      </PageHero>

      <section className="content-section">
        <div className="container--wide">
          <div className="content-section__heading">
            <SectionHeading
              eyebrow="Chronicles of precision"
              title="Milestones on the timeline"
              description="The 1994 establishment year is confirmed by the supplied business brief. Other dates appear in the design handover, but their events have not yet been verified."
            />
          </div>
          <div className="experience-page__timeline">
            {heritageMilestones.map((milestone, index) => (
              <article
                className={`experience-page__milestone${milestone.confirmed ? ' is-confirmed' : ''}`}
                key={milestone.year}
              >
                <span className="experience-page__marker" aria-hidden="true" />
                <span className="content-card__eyebrow">
                  CHAPTER {String(index + 1).padStart(2, '0')}
                </span>
                <h2>{milestone.year}</h2>
                <h3>
                  {milestone.confirmed
                    ? 'Business established'
                    : 'Historical detail pending confirmation'}
                </h3>
                <p>
                  {milestone.confirmed
                    ? 'Founding year provided in the approved business brief.'
                    : 'No unverified event or expansion claim is published.'}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section--alternate">
        <div className="container--wide">
          <div className="content-section__heading">
            <SectionHeading
              eyebrow="Production areas"
              title="Six service categories in the brief"
              description="These are areas to discuss, not representations of installed equipment, production capacity, or current availability."
            />
          </div>
          <div className="content-grid experience-page__areas">
            {productionAreas.map((area, index) => (
              <article className="content-card" key={area}>
                <span className="content-card__eyebrow">
                  {String(index + 1).padStart(2, '0')} / SERVICE AREA
                </span>
                <h3>{area}</h3>
                <p>Equipment, materials, and project scope require confirmation.</p>
              </article>
            ))}
          </div>
          <p className="content-note">
            <strong>Facility details pending:</strong> Plant imagery, machinery
            models, technical specifications, capacity, certifications, and
            warranties have not been independently confirmed.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container--wide experience-page__people">
          <div>
            <UsersRound aria-hidden="true" size={26} />
            <SectionHeading
              eyebrow="The people behind the work"
              title="Team profiles coming soon"
              description="Names, roles, portraits, and biographies will be added when approved staff information is supplied."
            />
          </div>
          <div className="experience-page__profile-placeholder">
            <Building2 aria-hidden="true" size={30} />
            <span>Approved team details pending</span>
          </div>
        </div>
      </section>

      <section className="content-section content-section--alternate">
        <div className="container--wide experience-page__visit">
          <div>
            <p className="page-hero__eyebrow">See for yourself</p>
            <h2>Interested in a plant visit?</h2>
            <p>
              Visit arrangements and availability can be discussed directly.
              Please confirm a visit before travelling.
            </p>
          </div>
          <WhatsAppLink
            label="Speak with our team"
            message={WHATSAPP_MESSAGES.experience}
          />
        </div>
      </section>
    </div>
  );
}
