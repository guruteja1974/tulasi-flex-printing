import { ArrowUpRight, MapPin, MessageCircle, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import FaqList from '../../components/common/FaqList.jsx';
import PageHero from '../../components/common/PageHero.jsx';
import QuoteSection from '../../sections/home/QuoteSection.jsx';
import '../contentPages.css';
import './Contact.css';

const address =
  'Main Road, Near Old Bus Stand / Clock Tower Junction, Jaggayyapeta, NTR District, Andhra Pradesh – 521175, India.';
const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=Main+Road+Jaggayyapeta+Andhra+Pradesh+521175';

const questions = [
  {
    question: 'What should I include in a project enquiry?',
    answer:
      'Share the service category, dimensions, quantity, intended use, preferred finish, destination, and required timing where known. This helps frame the discussion; scope and availability are confirmed individually.',
  },
  {
    question: 'Which services can I ask about?',
    answer:
      'The supplied business brief lists wedding and invitation printing, commercial printing, flex and large-format printing, architectural signage, custom merchandise, and fabrication and hoarding.',
  },
  {
    question: 'Can I submit the enquiry form online?',
    answer:
      'The form on this website is currently a preview only. It does not send or store information. Please do not enter sensitive personal or project information until a verified contact channel or working submission service is provided.',
  },
  {
    question: 'Are plant visits or urgent timelines available?',
    answer:
      'Visit arrangements, service availability, and turnaround are not confirmed here. Contact the business through a verified channel before planning travel or relying on a delivery date.',
  },
];

export default function Contact() {
  return (
    <div className="content-page contact-page">
      <PageHero
        description="Use the supplied Jaggayyapeta address for location reference. Business phone, email, desk hours, and enquiry submission details are awaiting confirmation."
        eyebrow="Contact · Jaggayyapeta"
        title="Let’s discuss what you’re planning"
      >
        <a className="button button--outline" href="#contact-location">
          View location <MapPin aria-hidden="true" size={16} />
        </a>
      </PageHero>

      <section className="content-section">
        <div className="container--wide contact-page__overview">
          <div className="contact-page__location" id="contact-location">
            <p className="page-hero__eyebrow">Business location</p>
            <h2>TULASI FLEX PRINTING &amp; ARTS</h2>
            <p className="contact-page__address">
              <MapPin aria-hidden="true" size={19} />
              <span>{address}</span>
            </p>
            <a href={mapUrl} rel="noreferrer" target="_blank">
              Open in Google Maps
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <div className="contact-page__pending">
              <MessageCircle aria-hidden="true" size={18} />
              <p>
                Verified phone, WhatsApp, email, and business hours are pending.
              </p>
            </div>
          </div>
          <aside className="contact-page__travel">
            <Navigation aria-hidden="true" size={22} />
            <h3>Planning a visit?</h3>
            <p>
              Confirm visit arrangements and your route before travelling.
              Regional distance benchmarks in the design handover are pending
              verification.
            </p>
            <Link to="/experience">About the business</Link>
          </aside>
        </div>
      </section>

      <QuoteSection />

      <section className="content-section content-section--alternate">
        <div className="container--wide contact-page__faq">
          <div className="contact-page__faq-heading">
            <p className="page-hero__eyebrow">Before you enquire</p>
            <h2>Frequently asked questions</h2>
            <p>
              Answers are limited to information supplied in the project brief;
              availability and service details should be confirmed directly.
            </p>
          </div>
          <FaqList items={questions} />
        </div>
      </section>
    </div>
  );
}
