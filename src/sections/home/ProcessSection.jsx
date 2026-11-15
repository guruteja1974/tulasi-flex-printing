import SectionHeading from '../../components/common/SectionHeading.jsx';
import { workingProcess } from '../../data/homeData.js';
import { HomeIllustration } from './HomeArtwork.jsx';
import './ProcessSection.css';

export default function ProcessSection() {
  return (
    <section
      aria-labelledby="home-process-title"
      className="home-process section"
      id="home-process"
    >
      <div className="container--wide">
        <SectionHeading
          align="center"
          className="home-process__heading"
          id="home-process-title"
          description="A suggested enquiry flow. Confirm the actual operational steps with the business before publication."
          eyebrow="From brief to delivery"
          title="Our 6-Step Working Process"
        />
        <ol className="home-process__grid">
          {workingProcess.map(({ number, title, description, illustration, speech }) => (
            <li className="home-process-card" key={number}>
              <div className="home-process-card__artwork">
                <HomeIllustration
                  className="home-process-card__illustration"
                  name={illustration}
                />
                <span className="home-process-card__speech">{speech}</span>
              </div>
              <span className="home-process-card__number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <p className="home-process__note">
          Suggested sequence only · confirm operational steps before relying on them
        </p>
      </div>
    </section>
  );
}
