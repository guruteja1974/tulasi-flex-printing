import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const whatsappPhoneNumber =
    process.env.VITE_WHATSAPP_PHONE_NUMBER || env.VITE_WHATSAPP_PHONE_NUMBER;

  if (command === 'build') {
    if (!whatsappPhoneNumber) {
      throw new Error(
        'VITE_WHATSAPP_PHONE_NUMBER is required for production builds. Set it in .env or as a GitHub Actions repository variable.',
      );
    }

    if (!/^\d{8,15}$/.test(whatsappPhoneNumber)) {
      throw new Error(
        'VITE_WHATSAPP_PHONE_NUMBER must contain 8-15 digits, including the country code.',
      );
    }
  }

  return {
    base:
      process.env.GITHUB_PAGES === 'true'
        ? '/tulasi-flex-printing/'
        : '/',
    plugins: [react(), tailwindcss()],
  };
});
