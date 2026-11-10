import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../../constants/appConstants.js';

const defaultMessage =
  'Hello Tulasi Flex Printing & Arts, I would like to enquire about printing services.';

export default function WhatsAppLink({
  className = '',
  label = 'WhatsApp Enquiry',
  message = defaultMessage,
}) {
  const classes = `button button--secondary whatsapp-link ${className}`.trim();

  if (!WHATSAPP_PHONE_NUMBER) {
    return (
      <button
        aria-disabled="true"
        className={classes}
        disabled
        data-enquiry-unavailable="true"
        title="Set the verified business WhatsApp number in the local environment to enable this link."
        type="button"
      >
        <MessageCircle aria-hidden="true" size={18} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      className={classes}
      href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={18} />
      <span>{label}</span>
    </a>
  );
}
