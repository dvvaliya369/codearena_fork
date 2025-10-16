/**
 * Prompt enhancement system that integrates trash talk into AI responses
 */

import { InsultGenerator } from './insult-generator';
import { TrashTalkManager } from './trash-talk-manager';

export interface PromptEnhancement {
  originalPrompt: string;
  enhancedPrompt: string;
  trashTalkAdded: boolean;
  trashTalkContent?: string;
}

export class PromptEnhancer {
  private insultGenerator: InsultGenerator;
  private trashTalkManager: TrashTalkManager;

  constructor(insultGenerator: InsultGenerator, trashTalkManager: TrashTalkManager) {
    this.insultGenerator = insultGenerator;
    this.trashTalkManager = trashTalkManager;
  }

  /**
   * Enhance a prompt with trash talk if enabled and appropriate
   */
  enhancePrompt(originalPrompt: string): PromptEnhancement {
    if (!this.trashTalkManager.isReady() || !this.trashTalkManager.shouldAddTrashTalk()) {
      return {
        originalPrompt,
        enhancedPrompt: originalPrompt,
        trashTalkAdded: false
      };
    }

    const config = this.trashTalkManager.getConfig();
    const opponent = config.opponent!;
    
    let trashTalkContent = '';
    
    // Generate trash talk based on intensity
    switch (config.intensity) {
      case 'mild':
        trashTalkContent = this.generateMildTrashTalk(opponent);
        break;
      case 'savage':
        trashTalkContent = this.generateSavageTrashTalk(opponent);
        break;
      case 'nuclear':
        trashTalkContent = this.generateNuclearTrashTalk(opponent);
        break;
    }

    const enhancedPrompt = this.insertTrashTalk(originalPrompt, trashTalkContent, opponent);
    
    // Record the insult
    this.trashTalkManager.recordInsult();

    return {
      originalPrompt,
      enhancedPrompt,
      trashTalkAdded: true,
      trashTalkContent
    };
  }

  /**
   * Generate mild trash talk
   */
  private generateMildTrashTalk(opponent: string): string {
    const playfulJabs = [
      `Oh, and ${opponent}? You might want to take notes on this response.`,
      `By the way ${opponent}, this is how it's done properly.`,
      `Hope you're watching ${opponent}, because this is a masterclass!`,
      `${opponent}, you should probably bookmark this response for reference.`,
      `Just saying ${opponent}, this is what peak performance looks like.`
    ];

    return playfulJabs[Math.floor(Math.random() * playfulJabs.length)];
  }

  /**
   * Generate savage trash talk
   */
  private generateSavageTrashTalk(opponent: string): string {
    const categories = this.trashTalkManager.getConfig().categories;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)] as any;
    
    return this.insultGenerator.generateInsult(opponent, randomCategory);
  }

  /**
   * Generate nuclear-level trash talk
   */
  private generateNuclearTrashTalk(opponent: string): string {
    const comboInsult = this.insultGenerator.generateComboInsult(opponent);
    const motivational = this.insultGenerator.generateMotivationalTrashTalk(opponent);
    
    return `${motivational} ${comboInsult}`;
  }

  /**
   * Insert trash talk into the prompt in a natural way
   */
  private insertTrashTalk(originalPrompt: string, trashTalk: string, opponent: string): string {
    const trashTalkInstructions = `
TRASH TALK MODE ACTIVATED 🔥
Current opponent: ${opponent}
Instruction: While providing your helpful response, also include this trash talk naturally in your response: "${trashTalk}"
Make it flow naturally within your answer, but make sure the trash talk is clearly visible and delivered with confidence!

Original user request: ${originalPrompt}`;

    return trashTalkInstructions;
  }

  /**
   * Create a system prompt that includes trash talk context
   */
  createSystemPrompt(baseSystemPrompt: string): string {
    if (!this.trashTalkManager.isReady()) {
      return baseSystemPrompt;
    }

    const config = this.trashTalkManager.getConfig();
    const session = this.trashTalkManager.getCurrentSession();
    
    const trashTalkContext = `
    
🗣️ TRASH TALK MODE ENABLED 🗣️
You are currently engaged in friendly competitive banter with: ${config.opponent}
Intensity Level: ${config.intensity.toUpperCase()}
Session Stats: ${this.trashTalkManager.getSessionStats()}

When appropriate (based on context and timing), you should:
1. Include witty, playful roasts directed at ${config.opponent}
2. Maintain a fun, competitive atmosphere
3. Keep the trash talk lighthearted and humorous
4. Balance helpfulness with playful antagonism

Remember: This is all in good fun! Keep it clever, keep it funny, and keep it friendly!
`;

    return baseSystemPrompt + trashTalkContext;
  }
}
