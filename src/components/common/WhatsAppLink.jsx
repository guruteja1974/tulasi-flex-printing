import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';

export default function WhatsAppLink({
  className = '',
  label = 'WhatsApp Enquiry',
  message = WHATSAPP_MESSAGES.header,
  variant = 'secondary',
  icon: Icon = MessageCircle,
}) {
  const url = getWhatsAppUrl(message);
  const classes = [
    variant && `button button--${variant}`,
    'whatsapp-link',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!url) {
    return (
      <button
        aria-disabled="true"
        className={classes}
        disabled
        data-enquiry-unavailable="true"
        title="Set the verified business WhatsApp number in the local environment to enable this link."
        type="button"
      >
        <Icon aria-hidden="true" size={18} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      className={classes}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon aria-hidden="true" size={18} />
      <span>{label}</span>
    </a>
  );
}
