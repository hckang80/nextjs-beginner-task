'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const i18nInstance = i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../public/locales/${language}/${namespace}.json`)
    )
  );

i18nInstance.init({
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ko'],
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false
  }
});

export default i18nInstance;
