/**
 * Trash Talk Context Provider
 * React context for managing trash talk state across the application
 */

"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { TrashTalkConfig, TrashTalkResult, trashTalkGenerator } from '../lib/trash-talk';

interface TrashTalkContextType {
  config: TrashTalkConfig;
  updateConfig: (newConfig: Partial<TrashTalkConfig>) => void;
  toggleTrashTalk: () => void;
  setOpponent: (opponent: string) => void;
  processPrompt: (prompt: string) => TrashTalkResult;
  resetConfig: () => void;
}

const defaultConfig: TrashTalkConfig = {
  isEnabled: false,
  opponent: null,
  intensity: 'medium',
  category: 'coding'
};

const TrashTalkContext = createContext<TrashTalkContextType | undefined>(undefined);

export function TrashTalkProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TrashTalkConfig>(defaultConfig);

  const updateConfig = (newConfig: Partial<TrashTalkConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const toggleTrashTalk = () => {
    setConfig(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  const setOpponent = (opponent: string) => {
    setConfig(prev => ({ ...prev, opponent }));
  };

  const processPrompt = (prompt: string): TrashTalkResult => {
    return trashTalkGenerator.modifyPromptWithTrashTalk(prompt, config);
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const value: TrashTalkContextType = {
    config,
    updateConfig,
    toggleTrashTalk,
    setOpponent,
    processPrompt,
    resetConfig
  };

  return (
    <TrashTalkContext.Provider value={value}>
      {children}
    </TrashTalkContext.Provider>
  );
}

export function useTrashTalk() {
  const context = useContext(TrashTalkContext);
  if (context === undefined) {
    throw new Error('useTrashTalk must be used within a TrashTalkProvider');
  }
  return context;
}

export default TrashTalkProvider;
