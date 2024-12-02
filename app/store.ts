'use client';

import { create } from 'zustand';

type State = {
  values: number[];
};

type Action = {
  save: (id: number) => void;
};

const useAppStore = create<State & Action>((set) => ({
  values: [1, 3, 5], // Mockup Data
  save: (id: number) =>
    set(({ values }) => ({
      values: values.includes(id)
        ? values.filter((uid) => uid !== id)
        : [...new Set([...values, id])]
    }))
}));

export default useAppStore;
