const defaultMessage =
  'Hello TULASI FLEX PRINTING & ARTS, I would like to enquire about your printing and advertising services.';

export const WHATSAPP_MESSAGES = {
  header: defaultMessage,
  services:
    'Hello TULASI FLEX PRINTING & ARTS, I am interested in your printing services. Please share more details.',
  portfolio:
    'Hello TULASI FLEX PRINTING & ARTS, I saw your portfolio and would like to discuss a project.',
  contact:
    'Hello TULASI FLEX PRINTING & ARTS, I would like to request a quotation.',
  experience:
    'Hello TULASI FLEX PRINTING & ARTS, I would like to speak with your team about your services.',
};

export function getWhatsAppUrl(message = defaultMessage) {
  const configuredNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '';

  if (!/^[+\d\s().-]+$/.test(configuredNumber.trim())) {
    return null;
  }

  const phoneNumber = configuredNumber.replace(/\D/g, '');
  if (!/^\d{8,15}$/.test(phoneNumber)) {
    return null;
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
