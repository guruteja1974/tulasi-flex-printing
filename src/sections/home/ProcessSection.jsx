import SectionHeading from '../../components/common/SectionHeading.jsx';
import { workingProcess } from '../../data/homeData.js';
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
          description="A clear sequence for discussing scope, proofs, timing, and handover."
          eyebrow="From brief to delivery"
          title="Our 6-Step Working Process"
        />
        <p className="home-process__note">
          Suggested enquiry flow · confirm operational steps before publication
        </p>

        <ol className="home-process__grid">
          {workingProcess.map(({ number, title, description, icon: Icon }) => (
            <li className="home-process-card" key={number}>
              <div className="home-process-card__top">
                <span>{number}</span>
                <Icon aria-hidden="true" size={17} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
