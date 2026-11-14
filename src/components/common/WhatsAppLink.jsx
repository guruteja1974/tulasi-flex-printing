import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp.js';

export default function WhatsAppLink({
  attachment = null,
  className = '',
  label = 'WhatsApp Enquiry',
  message = WHATSAPP_MESSAGES.header,
  onAttachmentStatus,
  variant = 'secondary',
  icon: Icon = MessageCircle,
}) {
  const [manualAttachment, setManualAttachment] = useState(null);
  const useManualAttachment = Boolean(
    attachment && manualAttachment === attachment,
  );
  const url = getWhatsAppUrl(message);
  const classes = [
    variant && `button button--${variant}`,
    'whatsapp-link',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick(event) {
    if (!attachment) {
      return;
    }

    if (useManualAttachment) {
      onAttachmentStatus?.(
        `WhatsApp is opening with the text draft. Attach ${attachment.name} in the chat before sending.`,
      );
      return;
    }

    const shareData = { files: [attachment] };
    const canShareFile =
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function' &&
      navigator.canShare(shareData);

    if (!canShareFile) {
      onAttachmentStatus?.(
        `This browser cannot attach files from the website. WhatsApp is opening with the text draft; attach ${attachment.name} in the chat before sending.`,
      );
      return;
    }

    event.preventDefault();
    try {
      navigator
        .share({ ...shareData, text: message, title: label })
        .then(() => {
          onAttachmentStatus?.(
            'Use the share sheet to choose WhatsApp, then select the official TULASI chat and confirm the message and artwork before sending. This website cannot confirm delivery.',
          );
        })
        .catch((error) => {
          setManualAttachment(attachment);
          onAttachmentStatus?.(
            error?.name === 'AbortError'
              ? 'Sharing was cancelled. The artwork and message were not sent. Click the enquiry button again to open WhatsApp and attach the file manually.'
              : `File sharing failed. Click the enquiry button again to open WhatsApp and attach ${attachment.name} manually.`,
          );
        });
    } catch (error) {
      setManualAttachment(attachment);
      onAttachmentStatus?.(
        error?.name === 'AbortError'
          ? 'Sharing was cancelled. The artwork and message were not sent. Click the enquiry button again to open WhatsApp and attach the file manually.'
          : `File sharing could not start. Click the enquiry button again to open WhatsApp and attach ${attachment.name} manually.`,
      );
    }
  }

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
      onClick={handleClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon aria-hidden="true" size={18} />
      <span>{label}</span>
    </a>
  );
}
