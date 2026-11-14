import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileImage,
  Minus,
  PackageOpen,
  Plus,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppLink from '../../components/common/WhatsAppLink.jsx';
import { useCart } from '../../context/CartContext.jsx';
import './CartPage.css';

const optionalServices = [
  { id: 'sample', label: 'Ask about a physical sample or proof' },
  { id: 'priority', label: 'Ask about priority scheduling' },
  { id: 'dispatch', label: 'Ask about consolidated dispatch' },
];

function describeSelections(selections = {}) {
  const fieldLabels = {
    runMethod: 'Print method',
    format: 'Format',
    paper: 'Paper stock / GSM',
    pages: 'Pages / folding',
    finish: 'Finishing',
    volume: 'Production volume',
    substrate: 'Substrate',
    width: 'Width (ft)',
    height: 'Height (ft)',
    calculatedArea: 'Entered area (planning only)',
    logistics: 'Dispatch / installation',
    size: 'Size range',
    color: 'Colour',
    branding: 'Branding method',
    structure: 'Structure type',
    clearance: 'Vertical clearance (ft)',
    material: 'Material / protection',
    site: 'Site / location',
    type: 'Signage type',
    thickness: 'Letter depth',
    lighting: 'Illumination',
    mounting: 'Mounting / installation',
    substrateId: 'Substrate',
    script: 'Typesetting',
  };

  return Object.entries(selections)
    .filter(
      ([key, value]) =>
        key !== 'product' &&
        key !== 'quantity' &&
        key !== 'formatId' &&
        value !== '' &&
        value !== null &&
        value !== undefined,
    )
    .flatMap(([key, value]) => {
      const label = fieldLabels[key] ?? key;
      if (Array.isArray(value)) {
        return value.length ? [[label, value.join(', ')]] : [];
      }
      if (typeof value === 'object') {
        return [];
      }
      return [[label, String(value)]];
    });
}

export default function CartPage() {
  const { items, removeItem, updateItem } = useCart();
  const [deliveryPreference, setDeliveryPreference] = useState('To be discussed');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [gstin, setGstin] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [quantityDrafts, setQuantityDrafts] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const hasConfirmedEstimate = items.length > 0 && items.every(
    (item) =>
      item.pricingStatus === 'business-confirmed' &&
      Number.isFinite(item.estimate),
  );
  const subtotal = hasConfirmedEstimate
    ? items.reduce(
        (total, item) => total + item.estimate * Math.max(1, Number(item.quantity) || 1),
        0,
      )
    : null;

  const quoteMessage = useMemo(() => {
    const lineItems = items.map((item, index) => {
      const details = describeSelections(item.selections)
        .map(([label, value]) => `${label}: ${value}`)
        .join('; ');
      return `${index + 1}. ${item.category} — ${item.name}; quantity: ${item.quantity ?? 1}${details ? `; ${details}` : ''}; artwork: ${item.artwork?.name ?? item.selections?.artworkFileName ?? 'not selected'}`;
    });
    const serviceNotes = optionalServices
      .filter(({ id }) => selectedServices.includes(id))
      .map(({ label }) => label);

    return [
      'Hello TULASI FLEX PRINTING & ARTS, I would like to request a quotation for the following configured items.',
      '',
      ...lineItems,
      `Delivery / dispatch preference: ${deliveryPreference}`,
      `Delivery notes: ${deliveryNotes.trim() || 'None provided'}`,
      `Additional enquiry topics: ${serviceNotes.join(', ') || 'None selected'}`,
      'Please confirm pricing, taxes, production timing, and availability.',
    ].join('\n');
  }, [deliveryNotes, deliveryPreference, items, selectedServices]);

  function updateQuantity(item, value) {
    const quantity = Math.max(1, Math.floor(Number(value) || 1));
    updateItem(item.id, { quantity });
  }

  function toggleService(id) {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((serviceId) => serviceId !== id)
        : [...current, id],
    );
  }

  return (
    <div className="cart-page">
      <div className="container--wide cart-page__content">
        <nav aria-label="Breadcrumb" className="cart-page__breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <Link to="/services">Services</Link>
          <ChevronRight aria-hidden="true" size={14} />
          <span aria-current="page">Production cart &amp; pre-flight</span>
        </nav>

        <header className="cart-page__hero">
          <div>
            <p className="cart-page__eyebrow">INDUSTRIAL DISPATCH STAGING</p>
            <h1>Production Cart &amp; Pre-Flight Verification</h1>
            <p>
              Review locally configured requests and prepare a quotation
              enquiry. No order, payment, file upload, or production
              verification is completed here.
            </p>
          </div>
          <div className="cart-page__stats" aria-label="Cart status">
            <article>
              <span>CONFIGURED ITEMS</span>
              <strong>{items.length.toString().padStart(2, '0')}</strong>
            </article>
            <article>
              <span>PRE-FLIGHT REVIEW</span>
              <strong>Pending</strong>
            </article>
            <article>
              <span>ESTIMATED TOTAL</span>
              <strong>On enquiry</strong>
            </article>
          </div>
        </header>

        <div className="cart-page__layout">
          <section aria-label="Configured product items" className="cart-items">
            {items.length === 0 ? (
              <div className="cart-empty">
                <PackageOpen aria-hidden="true" size={34} />
                <h2>Your production cart is empty</h2>
                <p>
                  Configure an eligible product or service to prepare a
                  quotation request.
                </p>
                <Link className="button button--secondary" to="/services">
                  Browse services <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </div>
            ) : (
              items.map((item, index) => {
                const details = describeSelections(item.selections);
                const editRoute = item.route ?? '/services/wedding-invitations';
                return (
                  <article className="cart-item" key={item.id}>
                    <div className="cart-item__topline">
                      <span>LINE ITEM {String(index + 1).padStart(2, '0')}</span>
                      <span>
                        <ClipboardCheck aria-hidden="true" size={14} />
                        Review required
                      </span>
                      <button
                        aria-label={`Remove ${item.name} from cart`}
                        className="cart-item__remove"
                        onClick={() => {
                          removeItem(item.id);
                          setStatusMessage(`${item.name} was removed from your local cart.`);
                        }}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" size={15} />
                        Remove
                      </button>
                    </div>
                    <div className="cart-item__main">
                      <div className="cart-item__image">
                        {item.image ? (
                          <img alt="" loading="lazy" src={item.image} />
                        ) : (
                          <FileImage aria-hidden="true" size={30} />
                        )}
                        <span>DESIGN REFERENCE</span>
                      </div>
                      <div className="cart-item__copy">
                        <p>{item.category}</p>
                        <h2>{item.name}</h2>
                        <span className="cart-item__estimate">
                          Pricing pending confirmation
                        </span>
                        <div className="cart-item__specs">
                          {details.map(([label, value]) => (
                            <span key={label}>
                              <strong>{label}:</strong> {value}
                            </span>
                          ))}
                        </div>
                        <div className="cart-item__artwork">
                          <FileImage aria-hidden="true" size={15} />
                          <span>
                            {item.artwork?.name ??
                              item.selections?.artworkFileName ??
                              'Artwork not selected'}
                          </span>
                          {item.artwork?.size && (
                            <small>
                              {(item.artwork.size / (1024 * 1024)).toFixed(1)} MB
                            </small>
                          )}
                        </div>
                        <p className="cart-item__preflight">
                          <CheckCircle2 aria-hidden="true" size={15} />
                          Browser-only selection; technical review has not occurred.
                        </p>
                      </div>
                    </div>
                    <div className="cart-item__actions">
                      <label>
                        <span>Quantity</span>
                        <div className="cart-item__quantity">
                          <button
                            aria-label={`Decrease ${item.name} quantity`}
                            disabled={Number(item.quantity) <= 1}
                            onClick={() => updateQuantity(item, Number(item.quantity) - 1)}
                            type="button"
                          >
                            <Minus aria-hidden="true" size={14} />
                          </button>
                          <input
                            aria-label={`${item.name} quantity`}
                            min="1"
                            onBlur={(event) => {
                              updateQuantity(item, event.target.value);
                              setQuantityDrafts((current) => {
                                const next = { ...current };
                                delete next[item.id];
                                return next;
                              });
                            }}
                            onChange={(event) =>
                              setQuantityDrafts((current) => ({
                                ...current,
                                [item.id]: event.target.value,
                              }))
                            }
                            type="number"
                            value={quantityDrafts[item.id] ?? item.quantity ?? 1}
                          />
                          <button
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => updateQuantity(item, Number(item.quantity) + 1)}
                            type="button"
                          >
                            <Plus aria-hidden="true" size={14} />
                          </button>
                        </div>
                      </label>
                      <Link
                        className="button button--outline cart-item__edit"
                        to={`${editRoute}?edit=${encodeURIComponent(item.id)}`}
                      >
                        Edit specifications
                      </Link>
                    </div>
                  </article>
                );
              })
            )}
          </section>

          <aside aria-label="Quotation summary" className="cart-summary">
            <div className="cart-summary__heading">
              <div>
                <p className="cart-page__eyebrow">ENQUIRY DOSSIER</p>
                <h2>Order summary</h2>
              </div>
              <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            </div>
            <div className="cart-summary__amounts">
              <div>
                <span>Configured items</span>
                <strong>{items.length}</strong>
              </div>
              <div>
                <span>Indicative subtotal</span>
                <strong>
                  {subtotal === null
                    ? 'Pending confirmation'
                    : `₹${subtotal.toLocaleString('en-IN')}`}
                </strong>
              </div>
              <div>
                <span>GST / applicable taxes</span>
                <strong>Confirm in quotation</strong>
              </div>
              <div className="cart-summary__total">
                <span>Total payable</span>
                <strong>
                  {subtotal === null
                    ? 'On enquiry'
                    : `₹${subtotal.toLocaleString('en-IN')}`}
                </strong>
              </div>
            </div>

            <div className="cart-summary__form">
              <label htmlFor="cart-delivery">Delivery / dispatch preference</label>
              <select
                id="cart-delivery"
                onChange={(event) => setDeliveryPreference(event.target.value)}
                value={deliveryPreference}
              >
                <option>To be discussed</option>
                <option>Collection enquiry</option>
                <option>Delivery enquiry</option>
                <option>Installation / site coordination</option>
              </select>

              <label htmlFor="cart-delivery-notes">Dispatch notes (optional)</label>
              <textarea
                id="cart-delivery-notes"
                maxLength={500}
                onChange={(event) => setDeliveryNotes(event.target.value)}
                placeholder="Location or delivery details to discuss"
                value={deliveryNotes}
              />

              <label htmlFor="cart-gstin">GSTIN / billing details (optional)</label>
              <input
                autoComplete="off"
                id="cart-gstin"
                maxLength={32}
                onChange={(event) => setGstin(event.target.value)}
                placeholder="Not sent in the WhatsApp draft"
                value={gstin}
              />
              <small>
                Tax treatment is not calculated. GST details remain in this
                browser and are not added to the enquiry message.
              </small>
            </div>

            <fieldset className="cart-summary__addons">
              <legend>Optional enquiry topics</legend>
              {optionalServices.map((service) => (
                <label key={service.id}>
                  <input
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    type="checkbox"
                  />
                  <span>{service.label}</span>
                </label>
              ))}
              <p>Availability and any charges require confirmation.</p>
            </fieldset>

            <WhatsAppLink
              className="cart-summary__quote"
              label="Request a quotation"
              message={quoteMessage}
            />
            <p aria-live="polite" className="cart-page__status" role="status">
              {statusMessage}
            </p>
            <p className="cart-summary__disclaimer">
              This request opens a WhatsApp draft. It does not submit an order,
              accept payment, verify artwork, or confirm production.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
