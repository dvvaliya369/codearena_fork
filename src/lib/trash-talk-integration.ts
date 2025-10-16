import { TrashTalkManager, TrashTalkConfig } from '../lib/trash-talk';

/**
 * Hook for managing trash talk in React components
 */
import { useState, useCallback, useEffect } from 'react';

export const useTrashTalk = (initialConfig?: Partial<TrashTalkConfig>) => {
  const [trashTalkManager] = useState(() => new TrashTalkManager(initialConfig));
  const [config, setConfig] = useState<TrashTalkConfig>(trashTalkManager.getConfig());

  const updateConfig = useCallback(() => {
    setConfig(trashTalkManager.getConfig());
  }, [trashTalkManager]);

  const toggle = useCallback(() => {
    const newState = trashTalkManager.toggle();
    updateConfig();
    return newState;
  }, [trashTalkManager, updateConfig]);

  const setOpponent = useCallback((opponent: string) => {
    trashTalkManager.setOpponent(opponent);
    updateConfig();
  }, [trashTalkManager, updateConfig]);

  const setIntensity = useCallback((intensity: TrashTalkConfig['intensity']) => {
    trashTalkManager.setIntensity(intensity);
    updateConfig();
  }, [trashTalkManager, updateConfig]);

  const setStyle = useCallback((style: TrashTalkConfig['style']) => {
    trashTalkManager.setStyle(style);
    updateConfig();
  }, [trashTalkManager, updateConfig]);

  const enhancePrompt = useCallback((prompt: string) => {
    return trashTalkManager.enhancePrompt(prompt);
  }, [trashTalkManager]);

  const getPreview = useCallback(() => {
    return trashTalkManager.getPreview();
  }, [trashTalkManager]);

  const reset = useCallback(() => {
    trashTalkManager.reset();
    updateConfig();
  }, [trashTalkManager, updateConfig]);

  return {
    config,
    toggle,
    setOpponent,
    setIntensity,
    setStyle,
    enhancePrompt,
    getPreview,
    reset,
    manager: trashTalkManager
  };
};

/**
 * Utility functions for easy integration with AI prompt systems
 */
export class AIPromptIntegration {
  private trashTalkManager: TrashTalkManager;

  constructor(config?: Partial<TrashTalkConfig>) {
    this.trashTalkManager = new TrashTalkManager(config);
  }

  /**
   * Process a user prompt and enhance it with trash talk if enabled
   */
  processPrompt(userPrompt: string): {
    finalPrompt: string;
    wasEnhanced: boolean;
    insult?: string;
    opponent?: string;
  } {
    const result = this.trashTalkManager.enhancePrompt(userPrompt);
    return {
      finalPrompt: result.enhancedPrompt,
      wasEnhanced: result.enhancedPrompt !== result.originalPrompt,
      insult: result.insult || undefined,
      opponent: result.opponent || undefined
    };
  }

  /**
   * Set up trash talk for a specific battle/conversation
   */
  setupBattle(opponent: string, style?: TrashTalkConfig['style'], intensity?: TrashTalkConfig['intensity']) {
    this.trashTalkManager.setOpponent(opponent);
    if (style) this.trashTalkManager.setStyle(style);
    if (intensity) this.trashTalkManager.setIntensity(intensity);
    this.trashTalkManager.toggle(); // Enable it
  }

  /**
   * Get the current configuration
   */
  getConfig(): TrashTalkConfig {
    return this.trashTalkManager.getConfig();
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<TrashTalkConfig>) {
    if (config.opponent !== undefined) this.trashTalkManager.setOpponent(config.opponent);
    if (config.style) this.trashTalkManager.setStyle(config.style);
    if (config.intensity) this.trashTalkManager.setIntensity(config.intensity);
    if (config.enabled !== undefined && config.enabled !== this.trashTalkManager.getConfig().enabled) {
      this.trashTalkManager.toggle();
    }
  }

  /**
   * Disable trash talk
   */
  disable() {
    if (this.trashTalkManager.getConfig().enabled) {
      this.trashTalkManager.toggle();
    }
  }

  /**
   * Enable trash talk (requires opponent to be set)
   */
  enable() {
    if (!this.trashTalkManager.getConfig().enabled && this.trashTalkManager.getConfig().opponent) {
      this.trashTalkManager.toggle();
    }
  }
}

export default useTrashTalk;
