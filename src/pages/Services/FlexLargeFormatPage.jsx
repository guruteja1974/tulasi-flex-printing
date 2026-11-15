import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileImage,
  MapPin,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ArtworkUpload from '../../components/services/ArtworkUpload.jsx';
import FaqList from '../../components/common/FaqList.jsx';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { portfolioReferences } from '../../data/homeData.js';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';
import './FlexLargeFormatPage.css';

const config = serviceConfigs.flex;
const productField = config.fields.find((field) => field.id === 'substrate');
const substrateOptions =
  productField?.options.filter((option) => option !== 'To be advised') ?? [];
const finishingOptions = [
  'Trim only',
  'Hem / eyelets enquiry',
  'Pole pockets enquiry',
  'Mounting hardware enquiry',
];
const dimensionPresets = [
  { width: '6', height: '3', label: '6 × 3 ft', note: 'Example size' },
  { width: '8', height: '4', label: '8 × 4 ft', note: 'Example size' },
  { width: '10', height: '6', label: '10 × 6 ft', note: 'Example size' },
  { width: '20', height: '10', label: '20 × 10 ft', note: 'Example size' },
  { width: '40', height: '20', label: '40 × 20 ft', note: 'Example size' },
];
const showcaseCards = [
  {
    kicker: 'BANNER & HOARDING',
    title: 'Large-format display graphics',
    image: config.galleryImages[0],
    alt: 'Illustrative large-format display design reference; not confirmed client work.',
  },
  {
    kicker: 'ILLUMINATED DISPLAY',
    title: 'Backlit material enquiries',
    image: config.galleryImages[2],
    alt: 'Illustrative illuminated-sign reference; material and availability require confirmation.',
  },
  {
    kicker: 'FLEET & STOREFRONT',
    title: 'Vinyl graphic enquiries',
    image: portfolioReferences[3].image,
    alt: 'Illustrative storefront graphic reference; not confirmed client work.',
  },
  {
    kicker: 'EVENT & EXHIBITION',
    title: 'Blackout display enquiries',
    image: portfolioReferences[2].image,
    alt: 'Illustrative event display reference; not confirmed client work.',
  },
];
const initialValues = { ...config.defaultValues };

function parseQuantity(value) {
  const parsed = Number(String(value ?? '').replace(/,/g, ''));
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parsePositiveDimension(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function selectedFinishesFromItem(item) {
  const selected = item?.selections?.finishes;
  if (Array.isArray(selected)) {
    return selected;
  }

  const savedFinish = item?.selections?.finish;
  return savedFinish && savedFinish !== 'To be advised'
    ? savedFinish.split(', ')
    : [];
}

function StepHeading({ id, number, title, note }) {
  return (
    <div className="flex-config__step-heading">
      <div>
        <span aria-hidden="true">{number}</span>
        <h2 id={id}>{title}</h2>
      </div>
      {note && <small>{note}</small>}
    </div>
  );
}

export default function FlexLargeFormatPage() {
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
  const [finishes, setFinishes] = useState(() =>
    selectedFinishesFromItem(editItem),
  );
  const [artwork, setArtwork] = useState(editItem?.artwork ?? null);
  const [artworkFile, setArtworkFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [enquiryStatus, setEnquiryStatus] = useState('');
  const quantity = parseQuantity(values.quantity);
  const width = parsePositiveDimension(values.width);
  const height = parsePositiveDimension(values.height);
  const enteredArea =
    width !== null && height !== null && Number.isFinite(width * height)
      ? width * height
      : null;
  const selectedProduct =
    config.products.find(({ id }) => id === values.product) ?? config.products[0];
  const selectedFinishing =
    finishes.length > 0 ? finishes.join(', ') : 'To be advised';
  const enquiryMessage = useMemo(
    () =>
      [
        config.message,
        '',
        `Product / application: ${selectedProduct.label}`,
        `Substrate: ${values.substrate || 'To be advised'}`,
        `Width (ft): ${values.width || 'To be discussed'}`,
        `Height (ft): ${values.height || 'To be discussed'}`,
        `Entered area (sq ft, planning only): ${
          enteredArea === null ? 'To be discussed' : enteredArea.toFixed(2)
        }`,
        `Edge finishing / hardware: ${selectedFinishing}`,
        `Quantity: ${quantity}`,
        `Collection / delivery / installation: ${
          values.logistics || 'To be discussed'
        }`,
        `Artwork file: ${artwork?.name ?? 'Not selected'}`,
        'Please confirm material suitability, pricing, availability, and timing.',
      ].join('\n'),
    [
      artwork,
      enteredArea,
      quantity,
      selectedFinishing,
      selectedProduct,
      values,
    ],
  );

  useEffect(() => {
    if (!editItem) {
      return;
    }

    setValues({
      ...initialValues,
      ...editItem.selections,
      quantity: String(editItem.quantity ?? initialValues.quantity),
    });
    setFinishes(selectedFinishesFromItem(editItem));
    setArtwork(editItem.artwork ?? null);
    setArtworkFile(null);
  }, [editItem]);

  function updateValue(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function setQuantity(value) {
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < 1) {
      updateValue('quantity', '1');
      return;
    }

    updateValue('quantity', String(parsed));
  }

  function adjustQuantity(amount) {
    const next = quantity + amount;
    if (Number.isSafeInteger(next) && next >= 1) {
      updateValue('quantity', String(next));
    }
  }

  function applyPreset(preset) {
    setValues((current) => ({
      ...current,
      width: preset.width,
      height: preset.height,
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
      image:
        config.galleryImages[
          config.products.findIndex(({ id }) => id === selectedProduct.id) %
            config.galleryImages.length
        ] ?? config.image,
      quantity,
      selections: {
        product: values.product,
        substrate: values.substrate,
        width: values.width,
        height: values.height,
        ...(enteredArea === null ? {} : { calculatedArea: enteredArea }),
        finish: selectedFinishing,
        logistics: values.logistics,
      },
      artwork,
      pricingStatus: 'pending-business-confirmation',
      estimate: null,
    };

    if (editItem) {
      updateItem(editItem.id, item);
      setStatusMessage(
        'Cart request updated. Price, material, and timing still require confirmation.',
      );
      return;
    }

    addItem(item);
    setStatusMessage(
      'Added to your local quotation cart. No order has been placed.',
    );
  }

  return (
    <main className="flex-page">
      <div className="container--wide flex-page__content">
        <nav aria-label="Breadcrumb" className="flex-page__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <Link to="/services">Services</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <span aria-current="page">{config.category}</span>
        </nav>

        <header className="flex-page__hero">
          <div className="flex-page__hero-copy">
            <p className="flex-page__eyebrow">
              <span aria-hidden="true" />
              Large-format print brief · Jaggayyapeta
            </p>
            <h1>Flex, Vinyl &amp; Large-Format Printing</h1>
            <p>{config.intro}</p>
            <p className="flex-page__claims-note">
              Production-speed, machine, material-performance, and service
              claims in the supplied reference require business confirmation.
            </p>
          </div>
          <div aria-label="Planning indicators" className="flex-page__metrics">
            <article>
              <Ruler aria-hidden="true" size={17} />
              <strong>
                {enteredArea === null ? '—' : enteredArea.toFixed(2)}
              </strong>
              <span>Entered area · sq ft</span>
            </article>
            <article>
              <ClipboardCheck aria-hidden="true" size={17} />
              <strong>Quote only</strong>
              <span>Rate &amp; production details pending</span>
            </article>
          </div>
        </header>

        <section
          aria-label="Illustrative large-format applications"
          className="flex-page__showcase"
        >
          {showcaseCards.map((card) => (
            <article className="flex-showcase-card" key={card.title}>
              <img alt={card.alt} loading="lazy" src={card.image} />
              <div>
                <span>{card.kicker}</span>
                <h2>{card.title}</h2>
                <p>Illustrative reference · availability to be confirmed</p>
              </div>
            </article>
          ))}
        </section>

        <div className="flex-page__workspace">
          <div className="flex-config">
            <section
              aria-labelledby="flex-product-title"
              className="flex-config__section"
            >
              <StepHeading
                id="flex-product-title"
                number="1"
                note="Choose an enquiry category"
                title="Product & application"
              />
              <div
                aria-label="Select product or application"
                className="flex-config__products"
              >
                {config.products.map((product) => (
                  <button
                    aria-pressed={values.product === product.id}
                    className={
                      values.product === product.id ? 'is-selected' : ''
                    }
                    key={product.id}
                    onClick={() => updateValue('product', product.id)}
                    type="button"
                  >
                    {values.product === product.id && (
                      <Check aria-hidden="true" size={15} />
                    )}
                    <strong>{product.label}</strong>
                    <small>Scope and suitability to confirm</small>
                  </button>
                ))}
              </div>
              <span className="flex-config__selected-product">
                Selected: {selectedProduct.label}
              </span>
            </section>

            <section
              aria-labelledby="flex-substrate-title"
              className="flex-config__section"
            >
              <StepHeading
                id="flex-substrate-title"
                number="2"
                note="Grade / GSM require confirmation"
                title="Select substrate"
              />
              <div aria-label="Select substrate grade" className="flex-config__substrates">
                {substrateOptions.map((option) => (
                  <button
                    aria-pressed={values.substrate === option}
                    className={
                      values.substrate === option ? 'is-selected' : ''
                    }
                    key={option}
                    onClick={() => updateValue('substrate', option)}
                    type="button"
                  >
                    <span>{option}</span>
                    <small>Confirm stock, GSM, use, and availability</small>
                  </button>
                ))}
              </div>
              <p className="flex-config__selection-note">
                No substrate rates or technical specifications are published.
              </p>
            </section>

            <section
              aria-labelledby="flex-dimensions-title"
              className="flex-config__section"
            >
              <StepHeading
                id="flex-dimensions-title"
                number="3"
                note="Method A · dimension calculator"
                title="Dimensions & sizing"
              />
              <div className="flex-config__presets">
                <span>Sample dimensions · select to edit</span>
                <div>
                  {dimensionPresets.map((preset) => (
                    <button
                      aria-pressed={
                        values.width === preset.width &&
                        values.height === preset.height
                      }
                      className={
                        values.width === preset.width &&
                        values.height === preset.height
                          ? 'is-selected'
                          : ''
                      }
                      key={preset.label}
                      onClick={() => applyPreset(preset)}
                      type="button"
                    >
                      {preset.label}
                      <small>{preset.note}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-config__dimensions">
                <label>
                  <span>Width (feet)</span>
                  <div>
                    <input
                      min="0.1"
                      onChange={(event) =>
                        updateValue('width', event.target.value)
                      }
                      step="0.1"
                      type="number"
                      value={values.width}
                    />
                    <small>FT</small>
                  </div>
                </label>
                <label>
                  <span>Height (feet)</span>
                  <div>
                    <input
                      min="0.1"
                      onChange={(event) =>
                        updateValue('height', event.target.value)
                      }
                      step="0.1"
                      type="number"
                      value={values.height}
                    />
                    <small>FT</small>
                  </div>
                </label>
                <div aria-live="polite" className="flex-config__area">
                  <span>Total entered surface · planning only</span>
                  <strong>
                    {enteredArea === null ? '—' : enteredArea.toFixed(2)}
                  </strong>
                  <small>SQ. FT</small>
                </div>
              </div>

              <div className="flex-config__quantity">
                <div>
                  <strong>Production quantity</strong>
                  <span>Volume pricing is not configured.</span>
                </div>
                <div>
                  <button
                    aria-label="Decrease production quantity"
                    disabled={quantity <= 1}
                    onClick={() => adjustQuantity(-1)}
                    type="button"
                  >
                    <Minus aria-hidden="true" size={15} />
                  </button>
                  <input
                    aria-label="Production quantity"
                    min="1"
                    onBlur={(event) => setQuantity(event.target.value)}
                    onChange={(event) =>
                      updateValue('quantity', event.target.value)
                    }
                    type="number"
                    value={values.quantity}
                  />
                  <button
                    aria-label="Increase production quantity"
                    onClick={() => adjustQuantity(1)}
                    type="button"
                  >
                    <Plus aria-hidden="true" size={15} />
                  </button>
                </div>
              </div>
              <p className="flex-config__selection-note">
                Area is width × height only; it is not a material-yield or price
                calculation.
              </p>
            </section>

            <section
              aria-labelledby="flex-finishing-title"
              className="flex-config__section"
            >
              <StepHeading
                number="4"
                note="No finishing rates shown"
                title="Edge finishing & hardware"
              />
              <fieldset className="flex-config__finishes">
                <legend id="flex-finishing-title">
                  Select topics to discuss
                </legend>
                <div>
                  {finishingOptions.map((finish, index) => {
                    const id = `flex-finish-${index}`;
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
                          <small>Method and availability to confirm</small>
                        </span>
                        <Check aria-hidden="true" size={16} />
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </section>

            <section
              aria-labelledby="flex-artwork-title"
              className="flex-config__section flex-config__artwork"
            >
              <StepHeading
                number="5"
                note="Local file selection only"
                title="Artwork &amp; drawing"
              />
              <div className="flex-config__artwork-heading">
                <FileImage aria-hidden="true" size={18} />
                <h2 id="flex-artwork-title">Select a file for discussion</h2>
              </div>
              <ArtworkUpload
                id="flex-large-format-artwork"
                initialSelection={artwork}
                label="Artwork & print-ready files"
                onSelectionChange={(selection, file) => {
                  handleArtworkSelection(selection, file);
                }}
              />
              <p>
                The file stays in this browser. No upload, RIP processing,
                colour check, aspect check, or print-readiness verification
                occurs here.
              </p>
            </section>
          </div>

          <aside className="flex-page__summary">
            <section
              aria-labelledby="flex-quote-title"
              className="flex-quote-card"
            >
              <div className="flex-quote-card__heading">
                <div>
                  <span>Quotation workflow</span>
                  <h2 id="flex-quote-title">Estimate summary</h2>
                </div>
                <span className="flex-quote-card__status">RATE PENDING</span>
              </div>
              <dl className="flex-quote-card__details">
                <div>
                  <dt>Product / application</dt>
                  <dd>{selectedProduct.label}</dd>
                </div>
                <div>
                  <dt>Substrate</dt>
                  <dd>{values.substrate || 'To be advised'}</dd>
                </div>
                <div>
                  <dt>Entered surface</dt>
                  <dd>
                    {enteredArea === null
                      ? 'Dimensions needed'
                      : `${enteredArea.toFixed(2)} sq ft`}
                  </dd>
                </div>
                <div>
                  <dt>Edge finishing</dt>
                  <dd>{selectedFinishing}</dd>
                </div>
                <div>
                  <dt>Quantity</dt>
                  <dd>{quantity} {quantity === 1 ? 'unit' : 'units'}</dd>
                </div>
                <div>
                  <dt>Collection / delivery / installation</dt>
                  <dd>{values.logistics || 'To be discussed'}</dd>
                </div>
              </dl>
              <div className="flex-quote-card__total">
                <div>
                  <span>Quotation estimate</span>
                  <strong>Pricing pending confirmation</strong>
                </div>
                <span aria-label="Price pending">—</span>
              </div>
              <p className="flex-quote-card__disclaimer">
                No rate, tax, volume discount, or order total is calculated.
              </p>
              <div className="flex-quote-card__actions">
                <button
                  className="button button--secondary"
                  onClick={saveConfiguration}
                  type="button"
                >
                  <ShoppingBag aria-hidden="true" size={17} />
                  {editItem ? 'Update cart request' : 'Add to quotation cart'}
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
                  label="Discuss a large campaign"
                  message={`${enquiryMessage}\n\nPlease advise whether this scope qualifies for a separate campaign quotation.`}
                  onAttachmentStatus={setEnquiryStatus}
                  variant="outline"
                />
              </div>
              <p
                aria-live="polite"
                className="flex-quote-card__status-message"
                role="status"
              >
                {statusMessage || enquiryStatus}
              </p>
              {editId && !editItem && (
                <p className="flex-page__error" role="alert">
                  This cart request could not be found. Configure a new request.
                </p>
              )}
            </section>

            <section className="flex-timeline">
              <div className="flex-timeline__heading">
                <span>Production planning</span>
                <strong>Timing to confirm</strong>
              </div>
              <ol>
                {config.timeline.map((step, index) => (
                  <li key={step.title}>
                    <span>{index + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <small>{step.description}</small>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex-timeline__note">
                <ArrowDownRight aria-hidden="true" size={17} />
                <p>
                  For urgent event or campaign needs, ask the team about current
                  availability. No express schedule is promised here.
                </p>
              </div>
            </section>
          </aside>
        </div>

        <section
          aria-labelledby="flex-logistics-title"
          className="flex-page__logistics"
        >
          <header>
            <p className="flex-page__section-eyebrow">Operational options</p>
            <h2 id="flex-logistics-title">Logistics &amp; installation enquiry</h2>
            <p>
              Select a topic for discussion. Coverage, transport, equipment,
              access, and charges require confirmation for each location.
            </p>
          </header>
          <div>
            {[
              {
                value: 'Collection enquiry',
                icon: MapPin,
                title: 'Collection',
                detail: 'Confirm pickup location and handover arrangements.',
              },
              {
                value: 'Delivery enquiry',
                icon: Truck,
                title: 'Delivery',
                detail: 'Confirm route, timing, package size, and delivery cost.',
              },
              {
                value: 'Installation / site review',
                icon: ClipboardCheck,
                title: 'Installation / site review',
                detail: 'Confirm site conditions, scope, and required approvals.',
              },
            ].map(({ value, icon: Icon, title, detail }) => (
              <button
                aria-pressed={values.logistics === value}
                className={
                  values.logistics === value ? 'is-selected' : ''
                }
                key={value}
                onClick={() => updateValue('logistics', value)}
                type="button"
              >
                <Icon aria-hidden="true" size={20} />
                <strong>{title}</strong>
                <p>{detail}</p>
                <small>
                  {values.logistics === value
                    ? 'Selected for enquiry'
                    : 'Availability to confirm'}
                </small>
              </button>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="flex-specs-title"
          className="flex-page__specifications"
        >
          <header>
            <div>
              <p className="flex-page__section-eyebrow">
                Technical information
              </p>
              <h2 id="flex-specs-title">
                Engineering &amp; substrate specifications
              </h2>
            </div>
            <span>All listed claims require business confirmation.</span>
          </header>
          <div className="flex-page__technical-cards">
            {[
              ['Print equipment', 'Machine models, print widths, and resolution to confirm.'],
              ['Ink & colour process', 'Ink type, colour profile, and colour tolerances to confirm.'],
              ['Material properties', 'GSM, tensile performance, opacity, and intended use to confirm.'],
              ['Exposure & lifespan', 'Outdoor suitability, UV performance, and warranty to confirm.'],
            ].map(([label, detail], index) => (
              <article key={label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                <p>{detail}</p>
                <small>BUSINESS CONFIRMATION REQUIRED</small>
              </article>
            ))}
          </div>
          <div className="flex-page__table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Substrate / application</th>
                  <th scope="col">Grade / GSM</th>
                  <th scope="col">Maximum format</th>
                  <th scope="col">Exposure / lifespan</th>
                  <th scope="col">Recommended use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Standard frontlit flex',
                  'Backlit flex',
                  'Blackout flex',
                  'Self-adhesive vinyl',
                  'Vehicle graphic film',
                ].map((material) => (
                  <tr key={material}>
                    <th scope="row">{material}</th>
                    <td>Confirm with the business</td>
                    <td>Confirm for the selected material</td>
                    <td>Confirm for use and conditions</td>
                    <td>Confirm after project review</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="flex-faq-title"
          className="flex-page__faq"
        >
          <header>
            <p className="flex-page__section-eyebrow">Before you enquire</p>
            <h2 id="flex-faq-title">Large-format printing questions</h2>
          </header>
          <FaqList items={config.faqs} />
        </section>

        <aside className="flex-page__cart-note">
          <div>
            <p className="flex-page__section-eyebrow">Quotation workflow</p>
            <h2>Keep your large-format brief with your other requests</h2>
            <p>
              Cart entries are stored in this browser as quotation requests.
              They are not confirmed orders, prices, or production instructions.
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
