'use client';

import { BidAnnouncementContext, KeywordSet } from '@/lib';
import { createContext, useContext, ReactNode, useState } from 'react';

type BidAnnouncement = {
  keywordSets: KeywordSet[];
  setKeywordSets: React.Dispatch<React.SetStateAction<KeywordSet[]>>;
  bidAnnouncementContext: BidAnnouncementContext | null;
  setBidAnnouncementsContext: React.Dispatch<React.SetStateAction<BidAnnouncementContext | null>>;
};

const UseFavoriteListContext = createContext<BidAnnouncement | null>(null);

export const BidAnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const [keywordSets, setKeywordSets] = useState<KeywordSet[]>([]);
  const [bidAnnouncementContext, setBidAnnouncementsContext] =
    useState<BidAnnouncementContext | null>(null);

  return (
    <UseFavoriteListContext.Provider
      value={{
        keywordSets,
        setKeywordSets,
        bidAnnouncementContext,
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
