import { Language, Suggestion } from '@/types';
import { create } from 'zustand';

export type AppStateValues = {
  selection?: Suggestion;
  totalWords?: number;
  language?: Language;
  mnemonic?: string[] | null;
  background?: string;
  isValid?: boolean;
};

interface AppState extends AppStateValues {
  setState: (state: AppStateValues) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  totalWords: 12,
  language: 'spanish',
  mnemonic: null,
  isValid: false,
  setState: (values: AppStateValues) =>
    set((state) => ({ ...state, ...values })),
}));
