import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to AI Customer Support Chatbot',
        },
      },
      es: {
        translation: {
          welcome: 'Bienvenido al chatbot de soporte al cliente AI',
        },
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
