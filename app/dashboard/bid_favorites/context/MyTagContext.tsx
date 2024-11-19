"use client";

import { Tag } from "@/lib";
import { createContext, useContext, ReactNode, useState } from "react";

type MyTagContextState = {
  tags: Tag[] | [];
  setTags: React.Dispatch<React.SetStateAction<Tag[] | []>>;
};

const MyTagContext = createContext<MyTagContextState | undefined>(undefined);

export const MyTagProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<Tag[] | []>([]);

  return (
    <MyTagContext.Provider value={{ tags, setTags }}>
      {children}
    </MyTagContext.Provider>
  );
};

export const useTag = (): MyTagContextState => {
  const context = useContext(MyTagContext);
  if (!context) {
    throw new Error("useTag must be used within a MyTagProvider");
  }
  return context;
};
