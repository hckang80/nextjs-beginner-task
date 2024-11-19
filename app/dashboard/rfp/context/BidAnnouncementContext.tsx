'use client';

import { BidAnnouncementContext, KeywordSet } from '@/lib';
import { createContext, useContext, ReactNode, useState } from 'react';

type BidAnnouncement = {
  keywordSetsContext: KeywordSet[];
  setKeywordSetsContext: React.Dispatch<React.SetStateAction<KeywordSet[]>>;
  bidAnnouncementsContext: BidAnnouncementContext | null;
  setBidAnnouncementsContext: React.Dispatch<React.SetStateAction<BidAnnouncementContext | null>>;
};

const UseFavoriteListContext = createContext<BidAnnouncement | null>(null);

export const BidAnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const [keywordSetsContext, setKeywordSetsContext] = useState<KeywordSet[]>([]);
  const [bidAnnouncementsContext, setBidAnnouncementsContext] =
    useState<BidAnnouncementContext | null>(null);

  return (
    <UseFavoriteListContext.Provider
      value={{
        keywordSetsContext,
        setKeywordSetsContext,
        bidAnnouncementsContext,
        setBidAnnouncementsContext
      }}
    >
      {children}
    </UseFavoriteListContext.Provider>
  );
};

export const useBidAnnouncement = (): BidAnnouncement => {
  const context = useContext(UseFavoriteListContext);
  if (!context) {
    throw new Error('useBidAnnouncement must be used within a BidAnnouncementProvider');
  }
  return context;
};
