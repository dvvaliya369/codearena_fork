/**
 * Main TrashTalk class that brings everything together
 */

import { InsultGenerator } from "./insult-generator";
import { TrashTalkManager } from "./trash-talk-manager";
import { PromptEnhancer } from "./prompt-enhancer";

export interface TrashTalkStatus {
  enabled: boolean;
  opponent: string | null;
  sessionActive: boolean;
  stats: string;
}

export class TrashTalk {
  private insultGenerator: InsultGenerator;
  private manager: TrashTalkManager;
  private promptEnhancer: PromptEnhancer;

  constructor() {
    this.insultGenerator = new InsultGenerator();
    this.manager = new TrashTalkManager();
    this.promptEnhancer = new PromptEnhancer(
      this.insultGenerator,
      this.manager
    );
  }

  /**
   * Toggle trash talk mode on/off
   */
  toggle(): TrashTalkStatus {
    const enabled = this.manager.toggle();

    console.log(
      enabled
        ? "🔥 TRASH TALK MODE ACTIVATED! Time to roast some opponents! 🔥"
        : "😇 Trash talk disabled. Back to being nice and helpful!"
    );

    return this.getStatus();
  }

  /**
   * Set the opponent for trash talk
   */
  setOpponent(opponent: string): TrashTalkStatus {
    if (!opponent || opponent.trim().length === 0) {
      throw new Error("Opponent name cannot be empty!");
    }

    this.manager.setOpponent(opponent.trim());
    console.log(`🎯 Target acquired: ${opponent}! Let the roasting begin! 🎯`);

    return this.getStatus();
  }

  /**
   * Configure trash talk settings
   */
  configure(options: {
    intensity?: "mild" | "savage" | "nuclear";
    frequency?: "rare" | "occasional" | "frequent";
    categories?: string[];
  }): TrashTalkStatus {
    this.manager.updateConfig(options);
    console.log("⚙️ Trash talk configuration updated!");

    return this.getStatus();
  }

  /**
   * Get current status
   */
  getStatus(): TrashTalkStatus {
    const config = this.manager.getConfig();
    const session = this.manager.getCurrentSession();

    return {
      enabled: config.enabled,
      opponent: config.opponent,
      sessionActive: session !== null,
      stats: this.manager.getSessionStats(),
    };
  }

  /**
   * Enhance a prompt with trash talk
   */
  enhancePrompt(prompt: string) {
    return this.promptEnhancer.enhancePrompt(prompt);
  }

  /**
   * Create system prompt with trash talk context
   */
  createSystemPrompt(basePrompt: string): string {
    return this.promptEnhancer.createSystemPrompt(basePrompt);
  }

  /**
   * Generate a manual insult (for testing or direct use)
   */
  generateInsult(category?: string): string {
    const config = this.manager.getConfig();
    if (!config.opponent) {
      return "No opponent set! Use setOpponent() first!";
    }

    return this.insultGenerator.generateInsult(
      config.opponent,
      category as string | undefined
    );
  }

  /**
   * Get available insult categories
   */
  getCategories(): string[] {
    return this.insultGenerator.getCategories();
  }

  /**
   * End the current session
   */
  endSession(): void {
    this.manager.endSession();
    console.log("📊 Trash talk session ended. Hope you enjoyed the roasts!");
  }

  /**
   * Get help text
   */
  getHelp(): string {
    return `
🗣️ TRASH TALK AI - Help Guide 🗣️

Commands:
  toggle()                    - Turn trash talk on/off
  setOpponent(name)          - Set your opponent's name
  configure(options)         - Customize trash talk settings
  getStatus()               - Check current status
  generateInsult(category?)  - Generate a manual insult
  getCategories()           - See available insult categories
  endSession()              - End current trash talk session

Configuration Options:
  intensity: 'mild' | 'savage' | 'nuclear'
  frequency: 'rare' | 'occasional' | 'frequent'
  categories: Array of category names

Categories Available: ${this.getCategories().join(", ")}

Example Usage:
  const trashTalk = new TrashTalk();
  trashTalk.setOpponent("Bob");
  trashTalk.configure({ intensity: 'savage', frequency: 'frequent' });
  trashTalk.toggle();
  
Now your AI will roast Bob with savage intensity! 🔥
`;
  }
}
