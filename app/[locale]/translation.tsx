'use client';

import { useTranslation } from 'react-i18next';

export default function Translation() {
  const { t } = useTranslation();

  return <p>{t('description')}</p>;
}
