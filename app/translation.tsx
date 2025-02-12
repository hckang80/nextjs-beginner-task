'use client';

import { useTranslation } from 'next-i18next';

export default function Translation() {
  const { t } = useTranslation(['common']);

  return <p>{t('description')}</p>;
}
