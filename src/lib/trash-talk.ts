/**
 * Trash Talk Feature - A funny AI agent enhancement that adds opponent-specific roasts
 * 
 * This module provides:
 * - Toggle mechanism for enabling/disabling trash talk
 * - Opponent management system
 * - Funny insult generator with different categories
 * - Prompt integration for seamless AI agent enhancement
 */

export interface TrashTalkConfig {
  enabled: boolean;
  opponent?: string;
  intensity: 'mild' | 'medium' | 'savage';
  style: 'programming' | 'general' | 'gaming' | 'random';
}

export interface TrashTalkResponse {
  originalPrompt: string;
  enhancedPrompt: string;
  insult: string;
  opponent: string;
}

/**
 * Collection of programming-themed insults and roasts
 */
const PROGRAMMING_INSULTS = [
  "writes code so bad it makes Internet Explorer look fast",
  "codes like they learned programming from YouTube comments",
  "produces more bugs than a tropical rainforest",
  "writes functions longer than a CVS receipt",
  "indents with tabs AND spaces just to watch the world burn",
  "comments their code like they're explaining quantum physics to a goldfish",
  "copies from Stack Overflow without understanding what it does",
  "thinks 'git push --force' is a valid debugging strategy",
  "writes CSS that makes developers cry themselves to sleep",
  "creates spaghetti code that even Italians won't eat",
  "names variables like they're playing Scrabble with a blindfold on",
  "writes regex patterns that summon ancient programming demons",
  "debugs by adding console.log() statements everywhere like breadcrumbs",
  "commits code with messages like 'fixed stuff' and 'it works now'",
  "writes SQL queries that make databases file restraining orders"
];

const GENERAL_INSULTS = [
  "has the creative thinking skills of a broken calculator",
  "brings the energy of a Windows 95 startup sound to everything",
  "is about as sharp as a bowling ball",
  "has the problem-solving skills of a rubber duck (but less helpful)",
  "is slower than dial-up internet on a rainy day",
  "has the attention span of a goldfish with ADHD",
  "is as useful as a chocolate teapot in this situation",
  "thinks outside the box so far they're in a different dimension (and lost)",
  "has the coordination of a three-legged giraffe on roller skates",
  "is as predictable as a weather forecast (completely unreliable)",
  "has the precision of a blindfolded dart thrower during an earthquake",
  "is about as subtle as a fire truck in a library",
  "has the grace of a rhino in a china shop having a bad day",
  "is as smooth as sandpaper soaked in lemon juice",
  "has the luck of a black cat walking under ladders"
];

const GAMING_INSULTS = [
  "plays like they're using a Guitar Hero controller for everything",
  "has the reaction time of a sloth playing on 200ms ping",
  "camps more than a Boy Scout troop in summer",
  "button mashes through life like it's a fighting game",
  "respawns their mistakes faster than they can learn from them",
  "plays on easy mode and still needs cheat codes for confidence",
  "has the strategic thinking of an NPC walking into walls",
  "rage quits conversations when they start losing arguments",
  "needs a tutorial for opening doors",
  "collects participation trophies like they're legendary loot",
  "has the map awareness of a blindfolded GPS",
  "thinks 'git gud' is a programming command (it's not, by the way)",
  "plays support but somehow makes everyone else carry harder",
  "has the coordination of someone playing DDR with oven mitts",
  "speedruns through quality time like they're going for a world record in disappointment"
];

export class TrashTalkManager {
  private config: TrashTalkConfig;

  constructor(initialConfig?: Partial<TrashTalkConfig>) {
    this.config = {
      enabled: false,
      intensity: 'medium',
      style: 'random',
      ...initialConfig
    };
  }

  /**
   * Toggle trash talk feature on/off
   */
  toggle(): boolean {
    this.config.enabled = !this.config.enabled;
    return this.config.enabled;
  }

  /**
   * Set the opponent for trash talk
   */
  setOpponent(opponent: string): void {
    this.config.opponent = opponent;
  }

  /**
   * Set trash talk intensity
   */
  setIntensity(intensity: TrashTalkConfig['intensity']): void {
    this.config.intensity = intensity;
  }

  /**
   * Set trash talk style
   */
  setStyle(style: TrashTalkConfig['style']): void {
    this.config.style = style;
  }

  /**
   * Get current configuration
   */
  getConfig(): TrashTalkConfig {
    return { ...this.config };
  }

  /**
   * Generate a random insult based on current style
   */
  private generateInsult(): string {
    let insultPool: string[] = [];

    switch (this.config.style) {
      case 'programming':
        insultPool = PROGRAMMING_INSULTS;
        break;
      case 'general':
        insultPool = GENERAL_INSULTS;
        break;
      case 'gaming':
        insultPool = GAMING_INSULTS;
        break;
      case 'random':
      default:
        insultPool = [...PROGRAMMING_INSULTS, ...GENERAL_INSULTS, ...GAMING_INSULTS];
        break;
    }

    const randomInsult = insultPool[Math.floor(Math.random() * insultPool.length)];
    
    // Adjust intensity
    switch (this.config.intensity) {
      case 'mild':
        return `probably ${randomInsult} (but we still love them)`;
      case 'savage':
        return `absolutely ${randomInsult} and it shows`;
      case 'medium':
      default:
        return randomInsult;
    }
  }

  /**
   * Enhance a prompt with trash talk if enabled
   */
  enhancePrompt(originalPrompt: string): TrashTalkResponse {
    if (!this.config.enabled || !this.config.opponent) {
      return {
        originalPrompt,
        enhancedPrompt: originalPrompt,
        insult: '',
        opponent: this.config.opponent || ''
      };
    }

    const insult = this.generateInsult();
    const opponent = this.config.opponent;

    const trashTalkAddition = `

---TRASH TALK MODE ACTIVATED---
Your opponent is ${opponent}, who ${insult}.
Channel this energy into your response - be confident, witty, and add some playful sass to your answers. 
Throw in a clever roast or two while still being helpful and informative.
Remember: this is all in good fun, so keep it light-hearted and entertaining!
---END TRASH TALK MODE---

`;

    const enhancedPrompt = originalPrompt + trashTalkAddition;

    return {
      originalPrompt,
      enhancedPrompt,
      insult,
      opponent
    };
  }

  /**
   * Get a random trash talk preview (for testing/demo purposes)
   */
  getPreview(): string {
    if (!this.config.opponent) {
      return "Set an opponent first to see the trash talk in action!";
    }

    const insult = this.generateInsult();
    return `${this.config.opponent} ${insult}`;
  }

  /**
   * Reset configuration to defaults
   */
  reset(): void {
    this.config = {
      enabled: false,
      intensity: 'medium',
      style: 'random'
    };
  }
}

// Export a default instance for easy use
export const trashTalk = new TrashTalkManager();

// Utility functions for easy integration
export const enableTrashTalk = (opponent: string, style?: TrashTalkConfig['style'], intensity?: TrashTalkConfig['intensity']) => {
  trashTalk.setOpponent(opponent);
  if (style) trashTalk.setStyle(style);
  if (intensity) trashTalk.setIntensity(intensity);
  trashTalk.toggle();
  return trashTalk;
};

export const disableTrashTalk = () => {
  trashTalk.reset();
  return trashTalk;
};

export default TrashTalkManager;
