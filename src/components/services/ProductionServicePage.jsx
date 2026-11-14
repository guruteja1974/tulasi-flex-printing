import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  MapPin,
  Ruler,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ArtworkUpload from './ArtworkUpload.jsx';
import FaqList from '../common/FaqList.jsx';
import WhatsAppLink from '../common/WhatsAppLink.jsx';
import { useCart } from '../../context/CartContext.jsx';
import ReferenceGallery from './ReferenceGallery.jsx';
import './ProductionServicePage.css';

function getQuantity(config, values) {
  const rawQuantity = config.quantityField
    ? values[config.quantityField]
    : config.quantity;
  const parsedQuantity = Number(String(rawQuantity ?? '').replace(/,/g, ''));
  return Number.isFinite(parsedQuantity) && parsedQuantity > 0
    ? parsedQuantity
    : 1;
}

function areaFor(config, values) {
  if (!config.area) {
    return null;
  }

  const width = Number(values[config.area.widthField]);
  const height = Number(values[config.area.heightField]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return null;
  }

  return width * height;
}

function ConfigField({ field, value, onChange }) {
  const controlId = `service-${field.id}`;
  if (field.type === 'number' || field.type === 'text') {
    return (
      <label className="service-field" htmlFor={controlId}>
        <span>{field.label}</span>
        <input
          id={controlId}
          min={field.min}
          onChange={(event) => onChange(field.id, event.target.value)}
          placeholder={field.placeholder ?? ''}
          step={field.step}
          type={field.type}
          value={value ?? ''}
        />
      </label>
    );
  }

  return (
    <label className="service-field" htmlFor={controlId}>
      <span>{field.label}</span>
      <select
        id={controlId}
        onChange={(event) => onChange(field.id, event.target.value)}
        value={value ?? ''}
      >
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ProductionServicePage({ config }) {
  const { addItem, items, updateItem } = useCart();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const editItem = items.find((item) => item.id === editId);
  const [values, setValues] = useState(() => ({
    ...config.defaultValues,
    ...(editItem?.selections ?? {}),
    ...(editItem && config.quantityField
      ? { [config.quantityField]: String(editItem.quantity) }
      : {}),
  }));
  const [artwork, setArtwork] = useState(() => editItem?.artwork ?? null);
  const [artworkFile, setArtworkFile] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [enquiryStatusMessage, setEnquiryStatusMessage] = useState('');
  const selectedProduct =
    config.products.find(({ id }) => id === values.product) ?? config.products[0];
  const quantity = getQuantity(config, values);
  const images = useMemo(
    () =>
      config.galleryImages.map((src, index) => ({
        label:
          config.products[index % config.products.length]?.label ??
          `View ${index + 1}`,
        alt: `${config.category} illustrative design reference ${index + 1}.`,
        src,
      })),
    [config],
  );
  const calculatedArea = areaFor(config, values);
  const estimateMessage = useMemo(() => {
    const specificationLines = config.fields
      .filter((field) => field.id !== config.quantityField)
      .map(
        (field) => `${field.label}: ${values[field.id] || 'To be discussed'}`,
      );
    if (calculatedArea !== null) {
      specificationLines.push(
        `Entered area: ${calculatedArea.toFixed(2)} ${config.area.unit} (planning only)`,
      );
    }

    return [
      config.message,
      '',
      `Product: ${selectedProduct?.label ?? config.category}`,
      ...specificationLines,
      `Quantity: ${quantity}`,
      `Artwork file: ${artwork?.name ?? 'Not selected'}`,
    ].join('\n');
  }, [artwork, calculatedArea, config, quantity, selectedProduct, values]);

  function updateValue(fieldId, value) {
    setValues((current) => ({ ...current, [fieldId]: value }));
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
      name: selectedProduct?.label ?? config.category,
      image: images[selectedImageIndex]?.src ?? config.image,
      quantity,
      selections: {
        ...values,
        ...(calculatedArea === null ? {} : { calculatedArea }),
      },
      artwork,
      pricingStatus: 'pending-business-confirmation',
      estimate: null,
    };

    if (editItem) {
      updateItem(editItem.id, item);
      setStatusMessage('Cart configuration updated. Pricing remains unconfirmed.');
    } else {
      addItem(item);
      setStatusMessage('Added to your local cart. This is a quotation request, not an accepted order.');
    }
  }

  function selectProduct(productId) {
    updateValue('product', productId);
    if (config.productSyncField) {
      const selectedLabel = config.products.find(
        ({ id }) => id === productId,
      )?.label;
      if (selectedLabel) {
        updateValue(config.productSyncField, selectedLabel);
      }
    }
    setSelectedImageIndex(
      config.products.findIndex(({ id }) => id === productId) %
        Math.max(1, images.length),
    );
  }

  return (
    <div className={`service-design service-design--${config.id}`}>
      <div className="container--wide service-design__content">
        <nav aria-label="Breadcrumb" className="service-design__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <Link to="/services">Services</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <span aria-current="page">{config.category}</span>
        </nav>

        <header className="service-design__hero">
          <div className="service-design__hero-copy">
            <p className="service-design__eyebrow">{config.eyebrow}</p>
            <h1>{config.title}</h1>
            <p>{config.intro}</p>
          </div>
          <div className="service-design__hero-card">
            <span>ENQUIRY STATUS</span>
            <strong>Specification-led</strong>
            <small>Scope, pricing, and timing to be confirmed</small>
          </div>
        </header>

        <section aria-labelledby={`${config.id}-products`} className="service-products">
          <div className="service-section-heading">
            <div>
              <p className="service-design__eyebrow">PRODUCT &amp; FORMAT</p>
              <h2 id={`${config.id}-products`}>{config.sectionLabel}</h2>
            </div>
            <span>Design references · Select to configure</span>
          </div>

          {config.galleryLayout === 'split' ? (
            <div aria-label="Select a print category" className="service-product-ribbon">
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
            </div>
          ) : (
            <div
              aria-label="Select a product category"
              className={`service-product-grid service-product-grid--${config.galleryLayout}`}
            >
              {config.products.map((product, index) => (
                <button
                  aria-pressed={values.product === product.id}
                  className={`service-product-card${values.product === product.id ? ' is-selected' : ''}`}
                  key={product.id}
                  onClick={() => selectProduct(product.id)}
                  type="button"
                >
                  <img
                    alt=""
                    loading="lazy"
                    src={config.galleryImages[index % config.galleryImages.length]}
                  />
                  <span>{product.label}</span>
                  {values.product === product.id && (
                    <Check aria-hidden="true" size={15} />
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        <div
          className={`service-design__workspace${['projects', 'typologies'].includes(config.galleryLayout) ? ' service-design__workspace--full' : ''}`}
        >
          {!['projects', 'typologies'].includes(config.galleryLayout) && (
            <div className="service-design__visual-column">
              <ReferenceGallery
                images={images}
                label={`${config.category} product gallery`}
                onSelect={setSelectedImageIndex}
                selectedIndex={selectedImageIndex}
              />
              <section aria-label="Brief checkpoints" className="service-checkpoints">
                <article>
                  <Ruler aria-hidden="true" size={18} />
                  <strong>Specifications</strong>
                  <span>Confirm for each enquiry</span>
                </article>
                <article>
                  <FileCheck2 aria-hidden="true" size={18} />
                  <strong>Artwork review</strong>
                  <span>Local selection only</span>
                </article>
                <article>
                  <MapPin aria-hidden="true" size={18} />
                  <strong>Scope &amp; schedule</strong>
                  <span>Discuss with the team</span>
                </article>
              </section>
            </div>
          )}
          <section aria-labelledby={`${config.id}-config-title`} className="service-configurator">
            <div className="service-configurator__heading">
              <div>
                <p className="service-design__eyebrow">SPECIFICATION ENGINE</p>
                <h2 id={`${config.id}-config-title`}>Configure your enquiry</h2>
              </div>
              <span>METHOD {config.cartEligible ? 'A · PRODUCT BRIEF' : 'B · PROJECT RFP'}</span>
            </div>
            <div className="service-configurator__selected">
              <span>SELECTED CATEGORY</span>
              <strong>{selectedProduct?.label ?? config.category}</strong>
            </div>
            <div className="service-configurator__fields">
              {config.fields
                .filter((field) => field.id !== 'product')
                .map((field) => (
                  <ConfigField
                    field={field}
                    key={field.id}
                    onChange={updateValue}
                    value={values[field.id]}
                  />
                ))}
            </div>

            {config.area && (
              <div className="service-area-readout" role="status">
                <span>ENTERED AREA · PLANNING ONLY</span>
                <strong>
                  {calculatedArea === null
                    ? `Add dimensions · ${config.area.unit}`
                    : `${calculatedArea.toFixed(2)} ${config.area.unit}`}
                </strong>
              </div>
            )}

            <div className="service-upload-panel">
              <div className="service-upload-panel__heading">
                <ClipboardList aria-hidden="true" size={16} />
                <span>ARTWORK / DRAWING PREPARATION</span>
              </div>
              <ArtworkUpload
                id={`${config.id}-artwork`}
                label={config.id === 'structural-fabrication' ? 'Drawings & site references' : 'Artwork & print-ready files'}
                onSelectionChange={handleArtworkSelection}
              />
            </div>

            <div className="service-estimate" role="status">
              <div>
                <span>{config.cartEligible ? 'INDICATIVE ESTIMATE' : 'ENGINEERING ESTIMATE'}</span>
                <strong>
                  {config.cartEligible
                    ? 'Pricing pending confirmation'
                    : 'Requires project review'}
                </strong>
                <small>No unverified price, tax, or technical commitment is shown.</small>
              </div>
              <span className="service-estimate__stamp">RATE<br />PENDING</span>
            </div>
            <p className="service-configurator__note">{config.caution}</p>

            <div className="service-configurator__actions">
              {config.cartEligible ? (
                <button
                  className="button button--secondary"
                  onClick={saveConfiguration}
                  type="button"
                >
                  <ShoppingBag aria-hidden="true" size={17} />
                  {editItem ? 'Update cart item' : 'Add to cart'}
                </button>
              ) : (
                <a className="button button--outline" href="#project-enquiry">
                  <MapPin aria-hidden="true" size={17} />
                  Request project review
                </a>
              )}
              <WhatsAppLink
                attachment={artworkFile}
                className="service-configurator__whatsapp"
                label={config.cartEligible ? 'Request a quotation' : 'WhatsApp project enquiry'}
                message={estimateMessage}
                onAttachmentStatus={setStatusMessage}
                variant={config.cartEligible ? 'outline' : 'secondary'}
              />
              {config.secondaryEnquiry && (
                <WhatsAppLink
                  attachment={artworkFile}
                  className="service-configurator__secondary"
                  label={config.secondaryEnquiry.label}
                  message={`${estimateMessage}\n\n${config.secondaryEnquiry.message}`}
                  onAttachmentStatus={setStatusMessage}
                  variant="outline"
                />
              )}
            </div>
            <p aria-live="polite" className="service-configurator__status" role="status">
              {statusMessage}
            </p>
            {editId && !editItem && (
              <p className="service-configurator__error" role="alert">
                This cart item could not be found. You can configure a new request.
              </p>
            )}
          </section>
        </div>

        <section aria-labelledby={`${config.id}-features`} className="service-detail-section">
          <div className="service-section-heading">
            <div>
              <p className="service-design__eyebrow">PROJECT COVERAGE</p>
              <h2 id={`${config.id}-features`}>A brief built around your requirements</h2>
            </div>
            <p>Every item below is an enquiry topic, not a confirmed availability statement.</p>
          </div>
          <div className="service-feature-grid">
            {config.features.map((feature, index) => (
              <article key={feature}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Sparkles aria-hidden="true" size={17} />
                <h3>{feature}</h3>
                <p>Confirm specifications, suitability, and availability with the team.</p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby={`${config.id}-timeline`}
          className="service-detail-section service-detail-section--timeline"
        >
          <div className="service-section-heading">
            <div>
              <p className="service-design__eyebrow">FROM BRIEF TO HANDOVER</p>
              <h2 id={`${config.id}-timeline`}>Production &amp; project milestones</h2>
            </div>
            <p>Sequence and timing are confirmed for the agreed scope.</p>
          </div>
          <div className="service-timeline">
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

        <section aria-labelledby={`${config.id}-specs`} className="service-detail-section">
          <div className="service-section-heading">
            <div>
              <p className="service-design__eyebrow">SPECIFICATION REVIEW</p>
              <h2 id={`${config.id}-specs`}>Project specification summary</h2>
            </div>
          </div>
          <div className="service-spec-table">
            {config.specs.map(([label, detail]) => (
              <div key={label}>
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby={`${config.id}-faq`}
          className="service-detail-section service-detail-section--faq"
        >
          <div className="service-section-heading">
            <div>
              <p className="service-design__eyebrow">BEFORE YOU ENQUIRE</p>
              <h2 id={`${config.id}-faq`}>Frequently asked questions</h2>
            </div>
          </div>
          <FaqList items={config.faqs} />
        </section>

        <section
          aria-labelledby={`${config.id}-enquiry`}
          className="service-enquiry-card"
          id="project-enquiry"
        >
          <div>
            <p className="service-design__eyebrow">NEXT STEP</p>
            <h2 id={`${config.id}-enquiry`}>
              {config.cartEligible
                ? 'Ready to prepare a quotation request?'
                : 'Discuss the project with the team.'}
            </h2>
            <p>
              Your selections remain in this browser. No order, payment,
              upload, site survey, or engineering review is submitted here.
            </p>
          </div>
          <div className="service-enquiry-card__actions">
            {config.cartEligible && (
              <Link className="button button--outline" to="/cart">
                View production cart <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            )}
            <WhatsAppLink
              attachment={artworkFile}
              label={config.cartEligible ? 'Request a quotation' : 'Request a project quotation'}
              message={estimateMessage}
              onAttachmentStatus={setEnquiryStatusMessage}
            />
          </div>
          <p
            aria-live="polite"
            className="service-configurator__status"
            role="status"
          >
            {enquiryStatusMessage}
          </p>
        </section>
      </div>
    </div>
  );
}
