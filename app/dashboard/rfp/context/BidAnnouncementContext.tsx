'use client';

import { KeywordSet } from '@/lib';
import { createContext, useContext, ReactNode, useState } from 'react';

type BidAnnouncement = {
  keywordSetsContext: KeywordSet[];
  setKeywordSetsContext: React.Dispatch<React.SetStateAction<KeywordSet[]>>;
};

const MyTagContext = createContext<BidAnnouncement | undefined>(undefined);

export const BidAnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const [keywordSetsContext, setKeywordSetsContext] = useState<KeywordSet[]>([]);

  return (
    <MyTagContext.Provider value={{ keywordSetsContext, setKeywordSetsContext }}>
      {children}
    </MyTagContext.Provider>
  );
};

export const useBidAnnouncement = (): BidAnnouncement => {
  const context = useContext(MyTagContext);
  if (!context) {
    throw new Error('useBidAnnouncement must be used within a BidAnnouncementProvider');
  }
  return context;
};
