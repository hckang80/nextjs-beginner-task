'use client';

import { AppliedTag, Tag } from '@/lib';
import { createContext, useContext, ReactNode, useState } from 'react';

type MyTagContextState = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  appliedTags: AppliedTag[];
  setAppliedTags: React.Dispatch<AppliedTag[]>;
};

const MyTagContext = createContext<MyTagContextState | undefined>(undefined);

export const MyTagProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [appliedTags, setAppliedTags] = useState<AppliedTag[]>([]);

  return (
    <MyTagContext.Provider value={{ tags, setTags, appliedTags, setAppliedTags }}>
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
