import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  FileImage,
  ImagePlus,
  Maximize2,
  PackageCheck,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ArtworkUpload from '../../components/services/ArtworkUpload.jsx';
import FaqList from '../../components/common/FaqList.jsx';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import fallbackImage from '../../assets/images/reference/portfolio/reference-01.jpg';
import {
  weddingInvitationAddons,
  weddingInvitationEmbellishments,
  weddingInvitationFormats,
  weddingInvitationGallery,
  weddingInvitationPricing,
  weddingInvitationQuantities,
  weddingInvitationScripts,
  weddingInvitationSubstrates,
} from '../../data/products/weddingInvitations.js';
import { useCart } from '../../context/CartContext.jsx';
import { WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';
import './WeddingInvitationsPage.css';

const timelineSteps = [
  {
    number: '01',
    title: 'Brief & copy',
    description: 'Share the occasion, quantity, wording, and preferred format.',
  },
  {
    number: '02',
    title: 'Artwork review',
    description: 'Confirm artwork requirements and proofing arrangements.',
  },
  {
    number: '03',
    title: 'Finish selection',
    description: 'Review material and finishing availability for the brief.',
  },
  {
    number: '04',
    title: 'Handover',
    description: 'Confirm production timing and collection or delivery details.',
  },
];

const faqItems = [
  {
    question: 'Which invitation formats can I enquire about?',
    answer:
      'The options shown are design references for discussion. Please confirm the available format, material, and finish for your requirements before placing an order.',
  },
  {
    question: 'Can I share my own invitation wording or artwork?',
    answer:
      'You can draft wording and select an artwork file on this page. The file stays in your browser and is not uploaded or sent. Confirm file requirements and proofing arrangements with the team.',
  },
  {
    question: 'How much does a suite or sample set cost?',
    answer:
      'A verified rate card and sample-set price have not been supplied. Pricing, add-on rates, taxes, and availability must be confirmed before an order.',
  },
  {
    question: 'When will the invitations be ready?',
    answer:
      'Production timing depends on the confirmed specification and availability. Ask the team to confirm a schedule before relying on a delivery date.',
  },
];

function ReferenceImage({ alt, className = '', src }) {
  const [fallbackFor, setFallbackFor] = useState('');
  const imageSource = fallbackFor === src ? fallbackImage : src;

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFallbackFor(src)}
      src={imageSource}
    />
  );
}

export default function WeddingInvitationsPage() {
  const { addItem, items, updateItem } = useCart();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const editItem = items.find((item) => item.id === editId);
  const savedFinishes = editItem?.selections?.finishes ?? [];
  const [formatId, setFormatId] = useState(() => {
    const savedId = editItem?.selections?.formatId;
    if (weddingInvitationFormats.some(({ id }) => id === savedId)) {
      return savedId;
    }
    return (
      weddingInvitationFormats.find(({ label }) => label === editItem?.name)?.id ??
      'velvet-box'
    );
  });
  const [substrateId, setSubstrateId] = useState(() => {
    const savedId = editItem?.selections?.substrateId;
    if (weddingInvitationSubstrates.some(({ id }) => id === savedId)) {
      return savedId;
    }
    return (
      weddingInvitationSubstrates.find(
        ({ label }) => label === editItem?.selections?.substrate,
      )?.id ?? 'dutch-velvet'
    );
  });
  const [selectedFinishes, setSelectedFinishes] = useState(() =>
    Object.fromEntries(
      weddingInvitationEmbellishments.map(({ id, defaultSelected }) => [
        id,
        savedFinishes.includes(id) ||
          savedFinishes.includes(
            weddingInvitationEmbellishments.find((finish) => finish.id === id)?.label,
          ) ||
          (!editItem && defaultSelected),
      ]),
    ),
  );
  const [script, setScript] = useState(
    editItem?.selections?.script ?? weddingInvitationScripts[0],
  );
  const [quantity, setQuantity] = useState(editItem?.quantity ?? 250);
  const [selectedAddons, setSelectedAddons] = useState(() => {
    const addons = editItem?.selections?.addons ?? [];
    return weddingInvitationAddons
      .filter(
        ({ id, label }) => addons.includes(id) || addons.includes(label),
      )
      .map(({ id }) => id);
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [artwork, setArtwork] = useState(
    editItem?.artwork ??
      (editItem?.selections?.artworkFileName
        ? { name: editItem.selections.artworkFileName, size: 0 }
        : null),
  );
  const [invitationText, setInvitationText] = useState(
    editItem?.selections?.invitationText ?? '',
  );
  const [statusMessage, setStatusMessage] = useState('');
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsFooterVisible(entry.isIntersecting);
    });
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const selectedFormat = weddingInvitationFormats.find(
    ({ id }) => id === formatId,
  );
  const selectedSubstrate = weddingInvitationSubstrates.find(
    ({ id }) => id === substrateId,
  );
  const selectedAddonLabels = weddingInvitationAddons
    .filter(({ id }) => selectedAddons.includes(id))
    .map(({ label }) => label);
  const selectedFinishingLabels = weddingInvitationEmbellishments
    .filter(({ id }) => selectedFinishes[id])
    .map(({ label }) => label);

  const enquiryMessage = useMemo(
    () =>
      [
        WHATSAPP_MESSAGES.weddingInvitations,
        '',
        `Format: ${selectedFormat?.label ?? 'To be discussed'}`,
        `Substrate: ${selectedSubstrate?.label ?? 'To be discussed'}`,
        `Finishes: ${selectedFinishingLabels.join(', ') || 'To be discussed'}`,
        `Typesetting: ${script}`,
        `Quantity: ${quantity}`,
        `Add-ons: ${selectedAddonLabels.join(', ') || 'None selected'}`,
      ].join('\n'),
    [
      quantity,
      script,
      selectedAddonLabels,
      selectedFinishingLabels,
      selectedFormat,
      selectedSubstrate,
    ],
  );

  function toggleFinish(id) {
    setSelectedFinishes((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  function toggleAddon(id) {
    setSelectedAddons((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  function toggleAllAddons() {
    setSelectedAddons((current) =>
      current.length === weddingInvitationAddons.length
        ? []
        : weddingInvitationAddons.map(({ id }) => id),
    );
  }

  function insertSampleText() {
    setInvitationText('శ్రీరస్తు - శుభమస్తు - అవిఘ్నమస్తు');
  }

  function handleAddToCart() {
    const item = {
      category: 'Wedding & Luxury Invitation Printing',
      name: selectedFormat?.label ?? 'Wedding invitation suite',
      productId: 'wedding-invitations',
      route: '/services/wedding-invitations',
      image: weddingInvitationGallery[selectedImageIndex]?.src,
      quantity,
      selections: {
        formatId,
        substrate: selectedSubstrate?.label ?? '',
        substrateId,
        finishes: weddingInvitationEmbellishments
          .filter(({ id }) => selectedFinishes[id])
          .map(({ id }) => id),
        script,
        addons: selectedAddons,
        invitationText,
      },
      artwork,
      pricingStatus: weddingInvitationPricing.status,
      estimate: null,
    };

    if (editItem) {
      updateItem(editItem.id, item);
    } else {
      addItem(item);
    }

    setStatusMessage(
      editItem
        ? 'Cart configuration updated. Pricing remains pending confirmation.'
        : 'Configuration added to your cart. Pricing is pending business confirmation.',
    );
  }

  return (
    <div className="wedding-page">
      <div aria-hidden="true" className="wedding-page__glow wedding-page__glow--gold" />
      <div aria-hidden="true" className="wedding-page__glow wedding-page__glow--blue" />

      <div className="container--wide wedding-page__content">
        <nav aria-label="Breadcrumb" className="wedding-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <Link to="/services">Services</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <span aria-current="page">Wedding &amp; Luxury Invitations</span>
        </nav>

        <header className="wedding-intro">
          <div className="wedding-intro__copy">
            <p className="wedding-eyebrow">MASTER ATELIER SUITE</p>
            <p className="wedding-intro__series">SERIES № 94 · WEDDING</p>
            <h1>Royal Heritage &amp; Luxury Velvet Invitation Suites</h1>
            <p className="wedding-intro__description">
              Build a considered invitation brief around format, paper,
              embellishment, and wording. Options and availability are confirmed
              with the team before production.
            </p>
          </div>
          <div className="wedding-intro__facts">
            <article>
              <span>ESTABLISHED</span>
              <strong>1994</strong>
              <small>Year provided in the business brief</small>
            </article>
            <article>
              <span>YOUR BRIEF</span>
              <strong>Enquiry-led</strong>
              <small>Scope and availability to be confirmed</small>
            </article>
          </div>
        </header>

        <div className="wedding-workspace">
          <section aria-label="Invitation design gallery" className="wedding-gallery">
            <div className="wedding-gallery__main">
              <ReferenceImage
                alt={weddingInvitationGallery[selectedImageIndex].alt}
                className={isImageExpanded ? 'is-expanded' : ''}
                src={weddingInvitationGallery[selectedImageIndex].src}
              />
              <span className="wedding-gallery__badge">
                <Sparkles aria-hidden="true" size={13} />
                DESIGN REFERENCE
              </span>
              <button
                aria-expanded={isImageExpanded}
                aria-label={isImageExpanded ? 'Close enlarged image' : 'View larger image'}
                className="wedding-gallery__zoom"
                onClick={() => setIsImageExpanded((expanded) => !expanded)}
                type="button"
              >
                {isImageExpanded ? (
                  <span aria-hidden="true">×</span>
                ) : (
                  <Maximize2 aria-hidden="true" size={17} />
                )}
              </button>
            </div>

            <div aria-label="Choose a gallery image" className="wedding-gallery__thumbnails">
              {weddingInvitationGallery.map((image, index) => (
                <button
                  aria-label={`Show ${image.label} reference`}
                  aria-pressed={selectedImageIndex === index}
                  className={`wedding-gallery__thumbnail${selectedImageIndex === index ? ' is-active' : ''}`}
                  key={image.label}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsImageExpanded(false);
                  }}
                  type="button"
                >
                  <ReferenceImage alt="" src={image.src} />
                </button>
              ))}
            </div>

            <div className="wedding-gallery__assurances">
              <article>
                <span className="wedding-gallery__assurance-icon">
                  <PackageCheck aria-hidden="true" size={17} />
                </span>
                <div>
                  <strong>Format options</strong>
                  <small>Confirm per enquiry</small>
                </div>
              </article>
              <article>
                <span className="wedding-gallery__assurance-icon">
                  <PenLine aria-hidden="true" size={17} />
                </span>
                <div>
                  <strong>Personal wording</strong>
                  <small>Share your draft</small>
                </div>
              </article>
              <article>
                <span className="wedding-gallery__assurance-icon">
                  <FileImage aria-hidden="true" size={17} />
                </span>
                <div>
                  <strong>Artwork review</strong>
                  <small>File needs to be confirmed</small>
                </div>
              </article>
            </div>
            <p className="wedding-disclaimer">
              Supplied images are illustrative design references, not verified
              customer work or a guarantee of available materials.
            </p>
          </section>

          <section aria-labelledby="wedding-config-title" className="wedding-config">
            <div className="wedding-config__heading">
              <div>
                <p className="wedding-eyebrow">CUSTOMIZE YOUR SUITE</p>
                <h2 id="wedding-config-title">Build your invitation brief</h2>
              </div>
              <span className="wedding-config__step">01 / 04</span>
            </div>

            <fieldset className="wedding-choice-group">
              <legend>
                <span>01</span> Invitation architecture
              </legend>
              <div className="wedding-format-list">
                {weddingInvitationFormats.map((format) => (
                  <button
                    aria-pressed={formatId === format.id}
                    className={`wedding-format${formatId === format.id ? ' is-selected' : ''}`}
                    key={format.id}
                    onClick={() => setFormatId(format.id)}
                    type="button"
                  >
                    <span className="wedding-format__radio" />
                    <span>{format.label}</span>
                    {formatId === format.id && (
                      <Check aria-hidden="true" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="wedding-choice-group">
              <legend>
                <span>02</span> Substrate &amp; GSM
              </legend>
              <div className="wedding-substrate-list">
                {weddingInvitationSubstrates.map((substrate) => (
                  <button
                    aria-pressed={substrateId === substrate.id}
                    className={`wedding-substrate${substrateId === substrate.id ? ' is-selected' : ''}`}
                    key={substrate.id}
                    onClick={() => setSubstrateId(substrate.id)}
                    type="button"
                  >
                    <span className="wedding-substrate__swatch" />
                    <span>{substrate.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="wedding-choice-group">
              <legend>
                <span>03</span> Artisanal embellishments
              </legend>
              <div className="wedding-finish-list">
                {weddingInvitationEmbellishments.map((finish) => (
                  <label className="wedding-finish" key={finish.id}>
                    <input
                      checked={Boolean(selectedFinishes[finish.id])}
                      onChange={() => toggleFinish(finish.id)}
                      type="checkbox"
                    />
                    <span className="wedding-finish__check">
                      <Check aria-hidden="true" size={12} />
                    </span>
                    <span>{finish.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="wedding-choice-group">
              <legend>
                <span>04</span> Typesetting &amp; script
              </legend>
              <select
                aria-label="Typesetting and script"
                className="wedding-select"
                onChange={(event) => setScript(event.target.value)}
                value={script}
              >
                {weddingInvitationScripts.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="wedding-choice-group wedding-choice-group--quantity">
              <legend>
                <span>05</span> Batch volume
              </legend>
              <div className="wedding-quantity-list">
                {weddingInvitationQuantities.map((batchSize) => (
                  <button
                    aria-pressed={quantity === batchSize}
                    className={`wedding-quantity${quantity === batchSize ? ' is-selected' : ''}`}
                    key={batchSize}
                    onClick={() => setQuantity(batchSize)}
                    type="button"
                  >
                    {batchSize.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="wedding-price-status" role="status">
              <div className="wedding-price-status__copy">
                <span>ESTIMATE</span>
                <strong>Pricing pending confirmation</strong>
                <small>
                  No unverified prices or tax assumptions are shown.
                </small>
              </div>
              <span className="wedding-price-status__stamp">RATE CARD<br />PENDING</span>
            </div>
            <p className="wedding-config__note">
              Materials, finishing, taxes, and production timing are subject to
              confirmation before an order is accepted.
            </p>
            <div className="wedding-sample-enquiry">
              <div>
                <strong>Prefer to review a sample?</strong>
                <span>Contents, availability, and pricing require confirmation.</span>
              </div>
              <WhatsAppLink
                label="Ask about a sample set"
                message={WHATSAPP_MESSAGES.weddingSample}
                variant="outline"
              />
            </div>
          </section>
        </div>

        <section aria-labelledby="wedding-timeline-title" className="wedding-section wedding-timeline">
          <div className="wedding-section__heading">
            <div>
              <p className="wedding-eyebrow">FROM BRIEF TO HANDOVER</p>
              <h2 id="wedding-timeline-title">A considered production journey</h2>
            </div>
            <p>Specific process and schedule are confirmed per enquiry.</p>
          </div>
          <div className="wedding-timeline__grid">
            {timelineSteps.map((step) => (
              <article className="wedding-timeline__card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>TO BE CONFIRMED</small>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="wedding-artwork-title" className="wedding-section wedding-artwork">
          <div className="wedding-section__heading">
            <div>
              <p className="wedding-eyebrow">PRE-FLIGHT PREPARATION</p>
              <h2 id="wedding-artwork-title">Share artwork &amp; manuscript</h2>
            </div>
            <p>Draft a note for discussion. Nothing is submitted from this page.</p>
          </div>
          <div className="wedding-artwork__grid">
            <div className="wedding-upload">
              <ArtworkUpload
                id="wedding-artwork-file"
                initialSelection={artwork}
                label="Choose a file to discuss"
                onSelectionChange={setArtwork}
              />
            </div>
            <div className="wedding-manuscript">
              <label htmlFor="wedding-invitation-text">
                <span>
                  <PenLine aria-hidden="true" size={16} />
                  Manuscript &amp; wording
                </span>
                <small>{invitationText.length} / 2,000 characters</small>
              </label>
              <textarea
                id="wedding-invitation-text"
                maxLength={2000}
                onChange={(event) => setInvitationText(event.target.value)}
                placeholder="Add invitation wording or notes here. Please avoid entering sensitive personal information."
                value={invitationText}
              />
              <button
                className="wedding-manuscript__sample"
                onClick={insertSampleText}
                type="button"
              >
                Insert a short Telugu sample phrase
                <ArrowDown aria-hidden="true" size={14} />
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby="wedding-addons-title" className="wedding-section wedding-addons">
          <div className="wedding-section__heading">
            <div>
              <p className="wedding-eyebrow">COMPLETE THE PRESENTATION</p>
              <h2 id="wedding-addons-title">Considered stationery additions</h2>
            </div>
            <button
              aria-pressed={selectedAddons.length === weddingInvitationAddons.length}
              className="wedding-addons__select-all"
              onClick={toggleAllAddons}
              type="button"
            >
              {selectedAddons.length === weddingInvitationAddons.length
                ? 'Clear selections'
                : 'Select all options'}
            </button>
          </div>
          <div className="wedding-addons__grid">
            {weddingInvitationAddons.map((addon) => (
              <label
                className={`wedding-addon${selectedAddons.includes(addon.id) ? ' is-selected' : ''}`}
                key={addon.id}
              >
                <ReferenceImage alt="" className="wedding-addon__image" src={addon.image} />
                <input
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                  type="checkbox"
                />
                <span className="wedding-addon__check">
                  <Check aria-hidden="true" size={13} />
                </span>
                <span className="wedding-addon__copy">
                  <strong>{addon.label}</strong>
                  <span>{addon.description}</span>
                  <small>Price and availability to be confirmed</small>
                </span>
              </label>
            ))}
          </div>
        </section>

        <section aria-labelledby="wedding-faq-title" className="wedding-section wedding-faq">
          <div className="wedding-section__heading">
            <div>
              <p className="wedding-eyebrow">BEFORE YOU ENQUIRE</p>
              <h2 id="wedding-faq-title">Frequently asked questions</h2>
            </div>
          </div>
          <FaqList items={faqItems} />
        </section>

        <div aria-live="polite" className="wedding-status" role="status">
          {statusMessage}
        </div>
      </div>

      <aside
        aria-hidden={isFooterVisible}
        aria-label="Invitation enquiry actions"
        className={`wedding-sticky-bar${isFooterVisible ? ' is-hidden' : ''}`}
      >
        <div className="wedding-sticky-bar__summary">
          <span>YOUR CONFIGURATION</span>
          <strong>{selectedFormat?.label ?? 'Invitation suite'} · {quantity.toLocaleString('en-IN')} pieces</strong>
          <small>Pricing pending confirmation · {items.length} cart {items.length === 1 ? 'item' : 'items'}</small>
        </div>
        <div className="wedding-sticky-bar__actions">
          <WhatsAppLink
            className="wedding-sticky-bar__whatsapp"
            label="Discuss on WhatsApp"
            message={enquiryMessage}
          />
          <button
            className="button button--secondary wedding-sticky-bar__cart"
            onClick={handleAddToCart}
            type="button"
          >
            {editItem ? 'Update cart item' : 'Add to cart'}{' '}
            <ArrowUpRight aria-hidden="true" size={16} />
          </button>
          {statusMessage && (
            <Link className="wedding-sticky-bar__view-cart" to="/cart">
              Review cart
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
