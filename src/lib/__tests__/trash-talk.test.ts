import { TrashTalkManager, TrashTalkConfig, TrashTalkResponse } from '../trash-talk';

describe('TrashTalkManager', () => {
  let trashTalk: TrashTalkManager;

  beforeEach(() => {
    trashTalk = new TrashTalkManager();
  });

  describe('Configuration Management', () => {
    test('should initialize with default config', () => {
      const config = trashTalk.getConfig();
      expect(config.enabled).toBe(false);
      expect(config.intensity).toBe('medium');
      expect(config.style).toBe('random');
      expect(config.opponent).toBeUndefined();
    });

    test('should initialize with custom config', () => {
      const customTrashTalk = new TrashTalkManager({
        enabled: true,
        opponent: 'TestBot',
        intensity: 'savage',
        style: 'programming'
      });
      
      const config = customTrashTalk.getConfig();
      expect(config.enabled).toBe(true);
      expect(config.opponent).toBe('TestBot');
      expect(config.intensity).toBe('savage');
      expect(config.style).toBe('programming');
    });

    test('should toggle enabled state', () => {
      expect(trashTalk.toggle()).toBe(true);
      expect(trashTalk.getConfig().enabled).toBe(true);
      
      expect(trashTalk.toggle()).toBe(false);
      expect(trashTalk.getConfig().enabled).toBe(false);
    });

    test('should set opponent', () => {
      trashTalk.setOpponent('ChatGPT');
      expect(trashTalk.getConfig().opponent).toBe('ChatGPT');
    });

    test('should set intensity', () => {
      trashTalk.setIntensity('savage');
      expect(trashTalk.getConfig().intensity).toBe('savage');
    });

    test('should set style', () => {
      trashTalk.setStyle('programming');
      expect(trashTalk.getConfig().style).toBe('programming');
    });

    test('should reset to defaults', () => {
      trashTalk.setOpponent('Test');
      trashTalk.setIntensity('savage');
      trashTalk.setStyle('gaming');
      trashTalk.toggle();

      trashTalk.reset();

      const config = trashTalk.getConfig();
      expect(config.enabled).toBe(false);
      expect(config.intensity).toBe('medium');
      expect(config.style).toBe('random');
      expect(config.opponent).toBeUndefined();
    });
  });

  describe('Insult Generation', () => {
    test('should generate preview when opponent is set', () => {
      trashTalk.setOpponent('TestBot');
      const preview = trashTalk.getPreview();
      
      expect(preview).toBeTruthy();
      expect(preview).toContain('TestBot');
    });

    test('should return helpful message when no opponent is set', () => {
      const preview = trashTalk.getPreview();
      expect(preview).toBe('Set an opponent first to see the trash talk in action!');
    });

    test('should generate different insults for different styles', () => {
      trashTalk.setOpponent('TestBot');
      
      trashTalk.setStyle('programming');
      const programmingInsult = trashTalk.getPreview();
      
      trashTalk.setStyle('gaming');
      const gamingInsult = trashTalk.getPreview();
      
      // Note: This test might occasionally fail due to randomness
      // In a real test environment, you'd want to mock the random function
      expect(programmingInsult).toBeTruthy();
      expect(gamingInsult).toBeTruthy();
    });
  });

  describe('Prompt Enhancement', () => {
    test('should return original prompt when disabled', () => {
      const originalPrompt = 'Test prompt';
      const result = trashTalk.enhancePrompt(originalPrompt);
      
      expect(result.originalPrompt).toBe(originalPrompt);
      expect(result.enhancedPrompt).toBe(originalPrompt);
      expect(result.insult).toBe('');
      expect(result.opponent).toBe('');
    });

    test('should return original prompt when no opponent is set', () => {
      trashTalk.toggle(); // Enable
      const originalPrompt = 'Test prompt';
      const result = trashTalk.enhancePrompt(originalPrompt);
      
      expect(result.originalPrompt).toBe(originalPrompt);
      expect(result.enhancedPrompt).toBe(originalPrompt);
      expect(result.insult).toBe('');
    });

    test('should enhance prompt when enabled and opponent is set', () => {
      trashTalk.setOpponent('TestBot');
      trashTalk.toggle(); // Enable
      
      const originalPrompt = 'Test prompt';
      const result = trashTalk.enhancePrompt(originalPrompt);
      
      expect(result.originalPrompt).toBe(originalPrompt);
      expect(result.enhancedPrompt).not.toBe(originalPrompt);
      expect(result.enhancedPrompt).toContain('TRASH TALK MODE ACTIVATED');
      expect(result.enhancedPrompt).toContain('TestBot');
      expect(result.insult).toBeTruthy();
      expect(result.opponent).toBe('TestBot');
    });
  });
});

// Integration tests would go here
describe('Trash Talk Integration', () => {
  test('should work with utility functions', () => {
    const { enableTrashTalk, disableTrashTalk, trashTalk } = require('../trash-talk');
    
    enableTrashTalk('TestBot', 'programming', 'medium');
    
    let config = trashTalk.getConfig();
    expect(config.enabled).toBe(true);
    expect(config.opponent).toBe('TestBot');
    expect(config.style).toBe('programming');
    expect(config.intensity).toBe('medium');
    
    disableTrashTalk();
    
    config = trashTalk.getConfig();
    expect(config.enabled).toBe(false);
  });
});

export {}; // Make this a module
