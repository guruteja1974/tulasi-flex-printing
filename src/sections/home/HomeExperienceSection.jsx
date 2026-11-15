import { ArrowRight, Building2, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/common/SectionHeading.jsx';

const milestones = [
  {
    year: '1994',
    title: 'The beginning',
    description: 'Founding year provided in the approved business brief.',
    confirmed: true,
  },
  {
    year: 'To be confirmed',
    title: 'Additional milestones',
    description: 'Historical details are pending business confirmation.',
  },
  {
    year: 'To be confirmed',
    title: 'Business developments',
    description: 'Historical details are pending business confirmation.',
  },
  {
    year: 'To be confirmed',
    title: 'Further chapters',
    description: 'Historical details are pending business confirmation.',
  },
  {
    year: 'Current',
    title: 'A continuing story',
    description: 'Current capabilities and history require business confirmation.',
  },
];

export default function HomeExperienceSection() {
  return (
    <section
      aria-labelledby="home-experience-title"
      className="home-experience section"
      id="home-experience"
    >
      <div className="container--wide">
        <div className="home-experience__heading">
          <SectionHeading
            id="home-experience-title"
            eyebrow="A history in print"
            title="Our Journey"
          />
          <p>
            Only the founding year is confirmed. Other milestones are shown as
            pending business confirmation.
          </p>
        </div>

        <div aria-label="Business history timeline" className="home-experience__timeline">
          {milestones.map(({ year, title, description, confirmed }, index) => (
            <article
              className={`home-experience__milestone${confirmed ? ' is-confirmed' : ''}`}
              key={`${title}-${index}`}
            >
              <span className="home-experience__chapter">
                CHAPTER {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="home-experience__icon">
                {confirmed ? <Landmark size={20} /> : <Building2 size={20} />}
              </span>
              <p className="home-experience__year">{year}</p>
              <h3>{title}</h3>
              <p className="home-experience__description">{description}</p>
            </article>
          ))}
        </div>

        <p className="home-experience__note">
          <span aria-hidden="true" />
          Dates and historical details beyond 1994 are placeholders pending
          business confirmation.
        </p>
        <Link className="home-experience__link" to="/experience">
          More about the business <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </section>
  );
}
