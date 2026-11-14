import { useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  MessageSquareText,
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { quoteEnquiryOptions } from '../../data/homeData.js';
import './QuoteSection.css';

const address =
  'Main Road, Near Old Bus Stand / Clock Tower Junction, Jaggayyapeta, NTR District, Andhra Pradesh – 521175, India.';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Main Road, Near Old Bus Stand, Jaggayyapeta, NTR District, Andhra Pradesh 521175, India',
)}`;

export default function QuoteSection() {
  const [previewShown, setPreviewShown] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setPreviewShown(true);
  }

  return (
    <section
      aria-labelledby="home-quote-section-title"
      className="home-quote section"
      id="home-quote"
    >
      <div className="container--wide">
        <SectionHeading
          align="center"
          className="home-quote__heading"
          id="home-quote-section-title"
          description="Share a few project details to prepare an enquiry. Online submission is not connected yet."
          eyebrow="Start a conversation"
          title="Request a Quote or Plan a Plant Visit"
        />

        <div className="home-quote__layout">
          <aside aria-labelledby="home-quote-location-title" className="home-quote__location">
            <div className="home-quote__location-heading">
              <span aria-hidden="true">
                <Building2 size={18} />
              </span>
              <div>
                <p>Business location</p>
                <h3 id="home-quote-location-title">Jaggayyapeta</h3>
              </div>
            </div>

            <div className="home-quote__address">
              <MapPin aria-hidden="true" size={18} />
              <p>{address}</p>
            </div>

            <a
              className="home-quote__map-link"
              href={mapUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open location in Maps
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>

            <div className="home-quote__contact-pending">
              <MessageSquareText aria-hidden="true" size={17} />
              <p>
                This form is a preview only. Contact us on WhatsApp to request a
                quotation.
              </p>
            </div>

            <p className="home-quote__reference-note">
              Address supplied in the approved business brief.
            </p>
          </aside>

          <form className="home-quote__form" onSubmit={handleSubmit}>
            <div className="home-quote__form-heading">
              <div>
                <p>Project enquiry</p>
                <h3 id="home-quote-title">Tell us what you’re planning</h3>
              </div>
              <Mail aria-hidden="true" size={18} />
            </div>

            <div className="home-quote__fields">
              <label className="home-quote__field">
                <span>Name or organization <b aria-hidden="true">*</b></span>
                <input
                  autoComplete="name"
                  minLength={2}
                  name="entity_name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="home-quote__field">
                <span>WhatsApp / mobile number</span>
                <input
                  autoComplete="tel"
                  inputMode="tel"
                  name="contact_number"
                  placeholder="Your preferred contact number"
                  type="tel"
                />
              </label>

              <label className="home-quote__field">
                <span>Email address</span>
                <input
                  autoComplete="email"
                  name="contact_email"
                  placeholder="name@example.com"
                  type="email"
                />
              </label>

              <label className="home-quote__field">
                <span>Production category <b aria-hidden="true">*</b></span>
                <select defaultValue="" name="production_domain" required>
                  <option disabled value="">
                    Select a category
                  </option>
                  {quoteEnquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="home-quote__field home-quote__field--full">
                <span>Project size, quantity, or notes</span>
                <textarea
                  maxLength={1000}
                  name="project_notes"
                  placeholder="Describe sizes, quantities, preferred finish, location, or timing."
                  rows={4}
                />
              </label>
            </div>

            <p className="home-quote__privacy-note">
              Preview only. This form does not transmit or store your information.
            </p>
            <button className="button button--secondary home-quote__submit" type="submit">
              Preview enquiry request
              <ArrowUpRight aria-hidden="true" size={16} />
            </button>
            <p aria-live="polite" className="home-quote__status" role="status">
              {previewShown
                ? 'This is a form preview only. Nothing has been sent or saved.'
                : ''}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
