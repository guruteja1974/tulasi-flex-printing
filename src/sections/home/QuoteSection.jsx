import { useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  MessageSquareText,
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import { quoteEnquiryOptions } from '../../data/homeData.js';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';
import './QuoteSection.css';

const address =
  'Main Road, Near Old Bus Stand / Clock Tower Junction, Jaggayyapeta, NTR District, Andhra Pradesh – 521175, India.';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Main Road, Near Old Bus Stand, Jaggayyapeta, NTR District, Andhra Pradesh 521175, India',
)}`;

export default function QuoteSection() {
  const [draftUrl, setDraftUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('entity_name') ?? '').trim();
    const phone = String(formData.get('contact_number') ?? '').trim();
    const email = String(formData.get('contact_email') ?? '').trim();
    const category = String(formData.get('production_domain') ?? '').trim();
    const notes = String(formData.get('project_notes') ?? '').trim();
    const message = [
      WHATSAPP_MESSAGES.contact,
      '',
      `Name / organization: ${name}`,
      phone && `Preferred contact number: ${phone}`,
      email && `Email: ${email}`,
      `Production category: ${category}`,
      notes && `Project details: ${notes}`,
    ]
      .filter(Boolean)
      .join('\n');
    const url = getWhatsAppUrl(message);

    if (!url) {
      setDraftUrl('');
      setStatusMessage(
        'WhatsApp is unavailable because its business number is not configured for this build.',
      );
      return;
    }

    setDraftUrl(url);
    setStatusMessage(
      'Your draft is ready. Continue to WhatsApp, choose the official company chat, and review it before sending.',
    );
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
          title="Request a Project Quote"
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
              rel="noopener noreferrer"
              target="_blank"
            >
              Open location in Maps
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>

            <div className="home-quote__contact-pending">
              <MessageSquareText aria-hidden="true" size={17} />
              <p>
                Confirm visit arrangements before travelling. Project enquiries
                can be prepared as a WhatsApp draft below.
              </p>
            </div>

            <p className="home-quote__reference-note">
              Address supplied in the approved business brief.
            </p>
          </aside>

          <form
            className="home-quote__form"
            onChange={() => {
              setDraftUrl('');
              setStatusMessage('');
            }}
            onSubmit={handleSubmit}
          >
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
              Nothing is submitted or stored by this website. If you continue,
              these details will be included in a WhatsApp draft for you to review.
            </p>
            <button className="button button--secondary home-quote__submit" type="submit">
              Prepare WhatsApp enquiry
              <ArrowUpRight aria-hidden="true" size={16} />
            </button>
            <p aria-live="polite" className="home-quote__status" role="status">
              {statusMessage}
            </p>
            {draftUrl && (
              <a
                className="button button--outline home-quote__open-whatsapp"
                href={draftUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Continue to WhatsApp
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            )}
          </form>
        </div>

        <aside className="home-quote__cta">
          <div>
            <p className="section-heading__eyebrow">Project timeline</p>
            <h3>Working to a tight deadline?</h3>
            <p>
              Share your required date and project location. Availability and
              turnaround are confirmed for each enquiry.
            </p>
          </div>
          <WhatsAppLink
            label="Discuss your project"
            message={WHATSAPP_MESSAGES.contact}
          />
        </aside>
      </div>
    </section>
  );
}
