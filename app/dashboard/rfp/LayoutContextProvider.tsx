'use client';

import type { BidAnnouncementContext, KeywordSet } from '@/lib';
import React, { createContext, useContext } from 'react';

const LayoutDataContext = createContext<[BidAnnouncementContext, KeywordSet[]] | null>(null);

export function useLayoutData() {
  const context = useContext(LayoutDataContext);
  if (!context) {
    throw new Error('useLayoutData must be used within a LayoutDataProvider');
  }
  return context;
}

export function LayoutDataProvider({
  children,
  data
}: {
  children: React.ReactNode;
  data: [BidAnnouncementContext, KeywordSet[]];
}) {
  return <LayoutDataContext.Provider value={data}>{children}</LayoutDataContext.Provider>;
}
