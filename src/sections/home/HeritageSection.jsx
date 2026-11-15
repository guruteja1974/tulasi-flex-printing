import { ArrowRight, ClipboardCheck, FileImage, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import './HeritageSection.css';

export default function HeritageSection() {
  const principles = [
    {
      title: 'Clear specifications',
      description:
        'Share size, quantity, artwork, and finish details before a quote is prepared.',
      icon: Ruler,
    },
    {
      title: 'Artwork coordination',
      description:
        'Confirm file readiness and design support requirements during enquiry.',
      icon: FileImage,
    },
    {
      title: 'Scope before commitment',
      description:
        'Confirm timing, delivery, installation, and final cost for each request.',
      icon: ClipboardCheck,
    },
  ];

  return (
    <section
      aria-labelledby="home-about-title"
      className="home-heritage section"
      id="home-about"
    >
      <div className="container--wide">
        <div className="home-heritage__intro">
          <SectionHeading
            className="home-heritage__heading"
            id="home-about-title"
            eyebrow="About Us"
            title="A local print and arts business since 1994"
          />
          <div className="home-heritage__summary">
            <p>
              TULASI FLEX PRINTING &amp; ARTS was established in 1994. Its
              Jaggayyapeta address places the business in the NTR District of
              Andhra Pradesh, serving businesses and individuals with print,
              display, and fabrication enquiries.
            </p>
            <p>
              Service scope and availability are confirmed individually. More
              about the business and its history is available on the About page.
            </p>
            <Link className="home-heritage__about-link" to="/about">
              Read about Tulasi <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>

        <div aria-label="Enquiry principles" className="home-heritage__timeline">
          {principles.map(({ title, description, icon: Icon }, index) => (
            <article
              className="home-heritage__milestone"
              key={title}
            >
              <span className="home-heritage__chapter">PRINCIPLE {String(index + 1).padStart(2, '0')}</span>
              <div aria-hidden="true" className="home-heritage__marker">
                <Icon size={16} />
              </div>
              <h3>{title}</h3>
              <p className="home-heritage__detail">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
