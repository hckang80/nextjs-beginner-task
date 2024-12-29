'use client';

import type { BidAnnouncementContext, Tag } from '@/lib';
import React, { createContext, useContext } from 'react';

const LayoutDataContext = createContext<{
  data: [BidAnnouncementContext, Tag[], Tag[]];
} | null>(null);

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
  data: {
    data: [BidAnnouncementContext, Tag[], Tag[]];
  };
}) {
  return <LayoutDataContext.Provider value={data}>{children}</LayoutDataContext.Provider>;
}
