import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileImage,
  Layers3,
  Ruler,
  ShoppingBag,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import FaqList from '../../components/common/FaqList.jsx';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import ArtworkUpload from '../../components/services/ArtworkUpload.jsx';
import ReferenceGallery from '../../components/services/ReferenceGallery.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';
import './CommercialPrintingPage.css';

const config = serviceConfigs.commercial;
const getOptions = (fieldId) =>
  config.fields.find((field) => field.id === fieldId)?.options ?? [];

const formatOptions = getOptions('format').filter(
  (option) => option !== 'To be advised',
);
const paperOptions = getOptions('paper').filter(
  (option) => option !== 'To be advised',
);
const pageOptions = getOptions('pages').filter(
  (option) => option !== 'To be advised',
);
const finishOptions = getOptions('finish').filter(
  (option) => option !== 'To be advised',
);
const volumeOptions = getOptions('volume').filter(
  (option) => option !== 'Custom volume',
);
const initialValues = { ...config.defaultValues };

function optionId(option) {
  return option.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function parseQuantity(value) {
  const parsed = Number(String(value ?? '').replace(/,/g, ''));
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

function getSelectedFinishes(selections = {}) {
  if (Array.isArray(selections.finishes)) {
    return selections.finishes;
  }

  const savedFinish = selections.finish;
  return savedFinish && savedFinish !== 'To be advised'
    ? savedFinish.split(', ')
    : [];
}

function ChoiceGrid({ label, options, value, onChange, className = '' }) {
  return (
    <div className={`commercial-choice ${className}`}>
      <div className="commercial-choice__heading">
        <span>{label}</span>
        <span>{value || 'To be advised'}</span>
      </div>
      <div className="commercial-choice__grid">
        {options.map((option) => (
          <button
            aria-pressed={value === option}
            className={value === option ? 'is-selected' : ''}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            <strong>{option}</strong>
            <small>Confirm suitability and availability</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CommercialPrintingPage() {
  const { addItem, items, updateItem } = useCart();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const editItem = items.find((item) => item.id === editId);
  const [values, setValues] = useState(() => ({
    ...initialValues,
    ...(editItem?.selections ?? {}),
    quantity: String(
      editItem?.quantity ??
        editItem?.selections?.quantity ??
        initialValues.quantity,
    ),
  }));
  const [finishes, setFinishes] = useState(() => {
    return getSelectedFinishes(editItem?.selections);
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [artwork, setArtwork] = useState(editItem?.artwork ?? null);
  const [artworkFile, setArtworkFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [enquiryStatus, setEnquiryStatus] = useState('');
  const quantity = parseQuantity(values.quantity);
  useEffect(() => {
    if (!editItem) {
      return;
    }

    setValues({
      ...initialValues,
      ...editItem.selections,
      quantity: String(editItem.quantity ?? initialValues.quantity),
    });
    setFinishes(getSelectedFinishes(editItem.selections));
    setArtwork(editItem.artwork ?? null);
    setArtworkFile(null);
  }, [editItem]);
  const selectedProduct =
    config.products.find(({ id }) => id === values.product) ?? config.products[0];
  const galleryImages = useMemo(
    () =>
      config.galleryImages.map((src, index) => ({
        label: ['Brochure reference', 'Stationery reference', 'Invitation reference'][index],
        alt: `Illustrative commercial printing design reference ${index + 1}.`,
        src,
      })),
    [],
  );
  const selectedFinishes = finishes.length
    ? finishes.join(', ')
    : 'To be advised';
  const enquiryMessage = useMemo(
    () =>
      [
        config.message,
        '',
        `Product: ${selectedProduct.label}`,
        `Print method: ${values.runMethod || 'To be advised'}`,
        `Format: ${values.format || 'To be advised'}`,
        `Paper stock / GSM: ${values.paper || 'To be advised'}`,
        `Pages / folding: ${values.pages || 'To be advised'}`,
        `Finishing enquiries: ${selectedFinishes}`,
        `Quantity: ${quantity}`,
        `Artwork file: ${artwork?.name ?? 'Not selected'}`,
        'Pricing, availability, and timing require confirmation.',
      ].join('\n'),
    [artwork, quantity, selectedFinishes, selectedProduct, values],
  );

  function updateValue(fieldId, value) {
    setValues((current) => ({ ...current, [fieldId]: value }));
  }

  function selectProduct(productId) {
    updateValue('product', productId);
    setSelectedImageIndex(
      config.products.findIndex(({ id }) => id === productId) %
        galleryImages.length,
    );
  }

  function selectVolume(volume) {
    const normalized = volume.replace(/,/g, '');
    setValues((current) => ({
      ...current,
      volume,
      quantity: normalized,
    }));
  }

  function updateQuantity(value) {
    const normalized = String(value).replace(/,/g, '');
    const matchingVolume = volumeOptions.find(
      (volume) => volume.replace(/,/g, '') === normalized,
    );
    setValues((current) => ({
      ...current,
      quantity: value,
      volume: matchingVolume ?? 'Custom volume',
    }));
  }

  function toggleFinish(finish) {
    setFinishes((current) =>
      current.includes(finish)
        ? current.filter((value) => value !== finish)
        : [...current, finish],
    );
  }

  function handleArtworkSelection(selection, file) {
    setArtwork(selection);
    setArtworkFile(file);
  }

  function saveConfiguration() {
    const item = {
      category: config.category,
      productId: config.id,
      route: config.route,
      name: selectedProduct.label,
      image: galleryImages[selectedImageIndex]?.src ?? config.image,
      quantity,
      selections: {
        product: values.product,
        runMethod: values.runMethod,
        format: values.format,
        paper: values.paper,
        pages: values.pages,
        finish: selectedFinishes,
        volume: values.volume,
      },
      artwork,
      pricingStatus: 'pending-business-confirmation',
      estimate: null,
    };

    if (editItem) {
      updateItem(editItem.id, item);
      setStatusMessage(
        'Cart request updated. Price and availability still require confirmation.',
      );
      return;
    }

    addItem(item);
    setStatusMessage(
      'Added to your local quotation cart. No order has been placed.',
    );
  }

  return (
    <main className="commercial-print-page">
      <div className="container--wide commercial-print-page__content">
        <nav aria-label="Breadcrumb" className="commercial-print__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <Link to="/services">Services</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <span aria-current="page">{config.category}</span>
        </nav>

        <header className="commercial-print__hero">
          <div className="commercial-print__hero-copy">
            <p className="commercial-print__eyebrow">
              <Layers3 aria-hidden="true" size={14} />
              Commercial print specification
            </p>
            <h1>{config.title}</h1>
            <p>{config.intro}</p>
          </div>
          <aside className="commercial-print__hero-status">
            <ClipboardCheck aria-hidden="true" size={20} />
            <div>
              <span>Quotation status</span>
              <strong>Details require confirmation</strong>
            </div>
          </aside>
        </header>

        <section
          aria-label="Choose a commercial print product"
          className="commercial-print__category-ribbon"
        >
          {config.products.map((product) => (
            <button
              aria-pressed={values.product === product.id}
              className={values.product === product.id ? 'is-selected' : ''}
              key={product.id}
              onClick={() => selectProduct(product.id)}
              type="button"
            >
              {product.label}
            </button>
          ))}
        </section>

        <div className="commercial-print__workspace">
          <div className="commercial-print__visual-column">
            <ReferenceGallery
              images={galleryImages}
              label="Commercial printing design reference gallery"
              onSelect={setSelectedImageIndex}
              selectedIndex={selectedImageIndex}
            />
            <section
              aria-label="Commercial printing review notes"
              className="commercial-print__review-card"
            >
              <div className="commercial-print__review-heading">
                <Ruler aria-hidden="true" size={17} />
                <h2>Specification review</h2>
              </div>
              <p>
                Confirm final size, stock, colour, artwork, finishing, and run
                requirements before requesting a quotation.
              </p>
              <div className="commercial-print__review-grid">
                <span>Stock / GSM <b>To confirm</b></span>
                <span>Colour requirements <b>To confirm</b></span>
                <span>Proofing process <b>To confirm</b></span>
                <span>Production schedule <b>To confirm</b></span>
              </div>
            </section>
            <aside className="commercial-print__capability-note">
              <FileImage aria-hidden="true" size={22} />
              <div>
                <h2>Equipment &amp; colour process</h2>
                <p>
                  Machinery, calibration standards, tolerances, and production
                  capability have not been independently confirmed.
                </p>
              </div>
            </aside>
          </div>

          <section
            aria-labelledby="commercial-config-title"
            className="commercial-print__configurator"
          >
            <div className="commercial-print__config-header">
              <div>
                <p className="commercial-print__eyebrow">
                  Specification engine · enquiry only
                </p>
                <h2 id="commercial-config-title">
                  Configure your print brief
                </h2>
              </div>
              <span className="commercial-print__method-badge">
                Method to confirm
              </span>
            </div>

            <div className="commercial-print__selected-product">
              <span>SELECTED PRODUCT</span>
              <strong>{selectedProduct.label}</strong>
            </div>

            <ChoiceGrid
              className="commercial-print__method-choice"
              label="01 · Print method"
              onChange={(value) => updateValue('runMethod', value)}
              options={getOptions('runMethod').filter(
                (option) => option !== 'To be advised',
              )}
              value={values.runMethod}
            />
            <ChoiceGrid
              label="02 · Dimension & trim format"
              onChange={(value) => updateValue('format', value)}
              options={formatOptions}
              value={values.format}
            />
            <ChoiceGrid
              label="03 · Paper stock / GSM"
              onChange={(value) => updateValue('paper', value)}
              options={paperOptions}
              value={values.paper}
            />
            <ChoiceGrid
              label="04 · Pages & folding"
              onChange={(value) => updateValue('pages', value)}
              options={pageOptions}
              value={values.pages}
            />

            <fieldset className="commercial-print__finishes">
              <legend>05 · Finishing enquiries</legend>
              <div>
                {finishOptions.map((finish) => {
                  const id = `commercial-finish-${optionId(finish)}`;
                  return (
                    <label htmlFor={id} key={finish}>
                      <input
                        checked={finishes.includes(finish)}
                        id={id}
                        onChange={() => toggleFinish(finish)}
                        type="checkbox"
                      />
                      <span>
                        <strong>{finish}</strong>
                        <small>Availability to be confirmed</small>
                      </span>
                      <Check aria-hidden="true" size={16} />
                    </label>
                  );
                })}
              </div>
              <p>
                Select topics to discuss; this does not confirm that a finish is
                available or suitable.
              </p>
            </fieldset>

            <fieldset className="commercial-print__volume">
              <legend>06 · Requested production volume</legend>
              <div>
                {volumeOptions.map((volume) => {
                  const isSelected =
                    String(quantity) === volume.replace(/,/g, '');
                  return (
                    <button
                      aria-pressed={isSelected}
                      className={isSelected ? 'is-selected' : ''}
                      key={volume}
                      onClick={() => selectVolume(volume)}
                      type="button"
                    >
                      {volume}
                      <small>Request only</small>
                    </button>
                  );
                })}
                <label className="commercial-print__quantity">
                  <span>Quantity</span>
                  <input
                    min="1"
                    onBlur={(event) =>
                      updateQuantity(String(parseQuantity(event.target.value)))
                    }
                    onChange={(event) => updateQuantity(event.target.value)}
                    step="1"
                    type="number"
                    value={values.quantity}
                  />
                </label>
              </div>
              <p>No bulk discounts or volume rates are configured.</p>
            </fieldset>

            <section
              aria-labelledby="commercial-artwork-title"
              className="commercial-print__upload"
            >
              <div>
                <FileImage aria-hidden="true" size={18} />
                <h3 id="commercial-artwork-title">Artwork file selection</h3>
              </div>
              <ArtworkUpload
                id="commercial-print-artwork"
                initialSelection={artwork}
                label="Select artwork for discussion"
                onSelectionChange={handleArtworkSelection}
              />
              <p className="commercial-print__upload-note">
                Selection stays in this browser. No CMYK, DPI, bleed, font, or
                print-readiness check is performed, and no file is uploaded.
              </p>
            </section>

            <section aria-live="polite" className="commercial-print__estimate">
              <div>
                <span>QUOTATION ESTIMATE</span>
                <strong>Pricing pending business confirmation</strong>
                <small>
                  Taxes, stock, finishing, and delivery are not calculated.
                </small>
              </div>
              <span className="commercial-print__pending-stamp">
                RATE
                <br />
                PENDING
              </span>
            </section>

            <div className="commercial-print__actions">
              <button
                className="button button--secondary"
                onClick={saveConfiguration}
                type="button"
              >
                <ShoppingBag aria-hidden="true" size={17} />
                {editItem ? 'Update Corporate Cart' : 'Add to Corporate Cart'}
              </button>
              <WhatsAppLink
                attachment={artworkFile}
                label="Request a quotation"
                message={enquiryMessage}
                onAttachmentStatus={setEnquiryStatus}
                variant="outline"
              />
              <WhatsAppLink
                attachment={artworkFile}
                label="Request a volume tender"
                message={`${enquiryMessage}\n\n${config.secondaryEnquiry.message}`}
                onAttachmentStatus={setEnquiryStatus}
                variant="outline"
              />
            </div>
            <p aria-live="polite" className="commercial-print__status" role="status">
              {statusMessage || enquiryStatus}
            </p>
            {editId && !editItem && (
              <p className="commercial-print__error" role="alert">
                This cart item could not be found. Configure a new request.
              </p>
            )}
          </section>
        </div>

        <section
          aria-labelledby="commercial-capabilities-title"
          className="commercial-print__capabilities"
        >
          <header>
            <p className="commercial-print__eyebrow">Production details</p>
            <h2 id="commercial-capabilities-title">
              Confirm capabilities for your brief
            </h2>
            <p>
              The reference design lists specific machinery and performance
              claims. These remain unpublished until verified by the business.
            </p>
          </header>
          <div>
            {[
              ['Press equipment', 'Models, formats, and capacity to be confirmed.'],
              ['Finishing workflow', 'Available folding, binding, and cutting options to be confirmed.'],
              ['Colour & file review', 'Standards, tolerances, and pre-flight process to be confirmed.'],
            ].map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <small>BUSINESS CONFIRMATION REQUIRED</small>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="commercial-timeline-title"
          className="commercial-print__timeline"
        >
          <header>
            <p className="commercial-print__eyebrow">From brief to handover</p>
            <h2 id="commercial-timeline-title">Enquiry milestones</h2>
            <p>Process and timing are confirmed for each agreed request.</p>
          </header>
          <div>
            {config.timeline.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>TO BE CONFIRMED</small>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="commercial-faq-title"
          className="commercial-print__faq"
        >
          <header>
            <p className="commercial-print__eyebrow">Before you enquire</p>
            <h2 id="commercial-faq-title">Commercial print questions</h2>
          </header>
          <FaqList items={config.faqs} />
        </section>

        <aside className="commercial-print__cart-note">
          <div>
            <p className="commercial-print__eyebrow">Quotation workflow</p>
            <h2>Keep your configured requests together</h2>
            <p>
              Items in the cart are local quotation requests, not accepted
              orders. Pricing and availability remain pending.
            </p>
          </div>
          <Link className="button button--outline" to="/cart">
            View production cart <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </aside>
      </div>
    </main>
  );
}
