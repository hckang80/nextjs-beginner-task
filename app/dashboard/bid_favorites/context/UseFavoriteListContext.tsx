'use client';

import { AppliedTag, BidAnnouncementContext, Tag } from '@/lib';
import { createContext, useContext, ReactNode, useState } from 'react';

type UseFavoriteListContextState = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  appliedTags: AppliedTag[];
  setAppliedTags: React.Dispatch<AppliedTag[]>;
  bidAnnouncementsContext: BidAnnouncementContext | null;
  setBidAnnouncementsContext: React.Dispatch<React.SetStateAction<BidAnnouncementContext | null>>;
};

const UseFavoriteListContext = createContext<UseFavoriteListContextState | undefined>(undefined);

export const FavoriteListProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [appliedTags, setAppliedTags] = useState<AppliedTag[]>([]);
  const [bidAnnouncementsContext, setBidAnnouncementsContext] =
    useState<BidAnnouncementContext | null>(null);

  return (
    <UseFavoriteListContext.Provider
      value={{
        tags,
        setTags,
        appliedTags,
        setAppliedTags,
        bidAnnouncementsContext,
        setBidAnnouncementsContext
      }}
    >
      {children}
    </UseFavoriteListContext.Provider>
  );
};

export const useFavoriteList = (): UseFavoriteListContextState => {
  const context = useContext(UseFavoriteListContext);
  if (!context) {
    throw new Error('useFavoriteList must be used within a FavoriteListProvider');
  }
  return context;
};
