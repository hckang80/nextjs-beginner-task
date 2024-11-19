'use client';

import { AppliedTag, BidAnnouncementContext, Tag } from '@/lib';
import { createContext, useContext, ReactNode, useState } from 'react';

type MyTagContextState = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  appliedTags: AppliedTag[];
  setAppliedTags: React.Dispatch<AppliedTag[]>;
  bidAnnouncementsContext: BidAnnouncementContext | null;
  setBidAnnouncementsContext: React.Dispatch<React.SetStateAction<BidAnnouncementContext | null>>;
};

const MyTagContext = createContext<MyTagContextState | undefined>(undefined);

export const MyTagProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [appliedTags, setAppliedTags] = useState<AppliedTag[]>([]);
  const [bidAnnouncementsContext, setBidAnnouncementsContext] =
    useState<BidAnnouncementContext | null>(null);

  return (
    <MyTagContext.Provider
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
    </MyTagContext.Provider>
  );
};

export const useTag = (): MyTagContextState => {
  const context = useContext(MyTagContext);
  if (!context) {
    throw new Error('useTag must be used within a MyTagProvider');
  }
  return context;
};
