/**
 * Trash Talk Feature
 * A hilarious roasting module that generates funny disses against opponents
 */

export interface TrashTalkConfig {
  isEnabled: boolean;
  opponent: string | null;
  intensity: 'mild' | 'medium' | 'savage';
  category: 'coding' | 'general' | 'gaming' | 'random';
}

export interface TrashTalkResult {
  originalPrompt: string;
  modifiedPrompt: string;
  trashTalk: string;
  opponent: string;
}

class TrashTalkGenerator {
  private readonly insults = {
    coding: {
      mild: [
        "writes code that barely compiles",
        "still uses Internet Explorer",
        "thinks semicolons are optional in JavaScript (they are, but still)",
        "copies code from Stack Overflow without understanding it",
        "doesn't know the difference between == and ===",
        "uses console.log for debugging in production"
      ],
      medium: [
        "codes like they learned programming from YouTube comments",
        "writes code so bad, even their rubber duck quit",
        "thinks 'clean code' is just using white space",
        "has never heard of version control",
        "writes functions longer than a CVS receipt",
        "names variables like 'x', 'data', and 'thing'"
      ],
      savage: [
        "codes like they're trying to summon demons",
        "writes spaghetti code that makes Gordon Ramsay weep",
        "their code is so bad, it makes PHP look elegant",
        "probably thinks HTML is a programming language",
        "writes code that crashes before it even runs",
        "their GitHub contributions graph looks like a flatline"
      ]
    },
    general: {
      mild: [
        "probably puts pineapple on pizza",
        "still uses Internet Explorer by choice",
        "thinks 'The Office' isn't that funny",
        "prefers light mode",
        "doesn't use dark mode",
        "doesn't know how to use keyboard shortcuts"
      ],
      medium: [
        "microwaves fish in the office kitchen",
        "doesn't return shopping carts",
        "talks during movies",
        "doesn't use headphones in public",
        "leaves read receipts on but never replies",
        "stands on the left side of escalators"
      ],
      savage: [
        "probably thinks cereal is soup",
        "uses Comic Sans unironically",
        "enjoys elevator music",
        "thinks mayonnaise is spicy",
        "puts ketchup on steak",
        "claps when the plane lands"
      ]
    },
    gaming: {
      mild: [
        "plays on easy mode",
        "uses auto-aim",
        "rage quits when losing",
        "doesn't skip cutscenes they've seen 100 times",
        "plays mobile games exclusively",
        "thinks Candy Crush is hardcore gaming"
      ],
      medium: [
        "camps in the corner the entire match",
        "uses the most overpowered weapon and still loses",
        "blames lag for everything",
        "has never finished a single-player game",
        "buys every DLC but never plays the base game",
        "thinks Battle Royale is the only game genre"
      ],
      savage: [
        "loses to NPCs on tutorial difficulty",
        "their K/D ratio is measured in scientific notation",
        "gets carried by their teammates and still complains",
        "thinks Flappy Bird is too complex",
        "has been stuck on the first level for three years",
        "makes Dark Souls players look like gaming gods"
      ]
    },
    random: {
      mild: [
        "probably thinks water is spicy",
        "gets lost in their own neighborhood",
        "counts on their fingers for basic math",
        "still asks their mom to order pizza",
        "uses GPS to find their own house",
        "thinks 'organic' food grows on trees (wait...)"
      ],
      medium: [
        "gets confused by revolving doors",
        "needs Google Maps to find their kitchen",
        "thinks Alaska is an island because of how it appears on US maps",
        "has never won a game of solitaire",
        "gets outsmarted by a Magic 8-Ball",
        "thinks WiFi passwords are a conspiracy"
      ],
      savage: [
        "makes goldfish look like Einstein",
        "gets lost in a straight line",
        "thinks the moon landing was filmed in their backyard",
        "counts to potato",
        "needs a manual to operate a door",
        "makes rocks look intellectually stimulating"
      ]
    }
  };

  private readonly templates = [
    "Hey {opponent}, I hope you're ready because you're going up against someone who {insult}!",
    "Attention {opponent}: Prepare to face defeat from someone who {insult}. Good luck, you'll need it!",
    "Listen up {opponent}, you're about to get schooled by someone who {insult}. This should be interesting!",
    "Breaking news {opponent}: You're competing against someone who {insult}. May the odds be... well, they won't be in your favor!",
    "Dear {opponent}, I hate to break it to you, but you're facing someone who {insult}. Better start preparing your excuses now!",
    "Alert {opponent}: Your opponent {insult}. This is either going to be really close or really embarrassing for you!",
    "Yo {opponent}, hope you brought your A-game because you're up against someone who {insult}. Plot twist: they might actually be good at this!",
    "PSA {opponent}: The person you're facing {insult}. Take that information and... well, probably panic a little."
  ];

  generateTrashTalk(config: TrashTalkConfig): string {
    if (!config.isEnabled || !config.opponent) {
      return "";
    }

    const categoryInsults = this.insults[config.category] || this.insults.random;
    const intensityInsults = categoryInsults[config.intensity] || categoryInsults.mild;
    const randomInsult = intensityInsults[Math.floor(Math.random() * intensityInsults.length)];
    const randomTemplate = this.templates[Math.floor(Math.random() * this.templates.length)];

    return randomTemplate
      .replace(/{opponent}/g, config.opponent)
      .replace(/{insult}/g, randomInsult);
  }

  modifyPromptWithTrashTalk(originalPrompt: string, config: TrashTalkConfig): TrashTalkResult {
    if (!config.isEnabled || !config.opponent) {
      return {
        originalPrompt,
        modifiedPrompt: originalPrompt,
        trashTalk: "",
        opponent: config.opponent || ""
      };
    }

    const trashTalk = this.generateTrashTalk(config);
    const modifiedPrompt = `${trashTalk}\n\nNow, here's what I want you to build: ${originalPrompt}`;

    return {
      originalPrompt,
      modifiedPrompt,
      trashTalk,
      opponent: config.opponent
    };
  }

  // Helper method to get a random combination
  getRandomConfig(opponent: string): TrashTalkConfig {
    const intensities: TrashTalkConfig['intensity'][] = ['mild', 'medium', 'savage'];
    const categories: TrashTalkConfig['category'][] = ['coding', 'general', 'gaming', 'random'];
    
    return {
      isEnabled: true,
      opponent,
      intensity: intensities[Math.floor(Math.random() * intensities.length)],
      category: categories[Math.floor(Math.random() * categories.length)]
    };
  }
}

// Singleton instance
export const trashTalkGenerator = new TrashTalkGenerator();

// Helper functions for easy integration
export function createTrashTalkConfig(
  opponent: string,
  isEnabled: boolean = true,
  intensity: TrashTalkConfig['intensity'] = 'medium',
  category: TrashTalkConfig['category'] = 'coding'
): TrashTalkConfig {
  return {
    isEnabled,
    opponent,
    intensity,
    category
  };
}

export function addTrashTalkToPrompt(
  prompt: string,
  config: TrashTalkConfig
): TrashTalkResult {
  return trashTalkGenerator.modifyPromptWithTrashTalk(prompt, config);
}

export function generateRandomTrashTalk(opponent: string): string {
  const config = trashTalkGenerator.getRandomConfig(opponent);
  return trashTalkGenerator.generateTrashTalk(config);
}

// Pre-built configurations for common scenarios
export const presetConfigs = {
  mildCoding: (opponent: string): TrashTalkConfig => 
    createTrashTalkConfig(opponent, true, 'mild', 'coding'),
  
  savageCoding: (opponent: string): TrashTalkConfig => 
    createTrashTalkConfig(opponent, true, 'savage', 'coding'),
  
  randomRoast: (opponent: string): TrashTalkConfig => 
    trashTalkGenerator.getRandomConfig(opponent),
  
  friendly: (opponent: string): TrashTalkConfig => 
    createTrashTalkConfig(opponent, true, 'mild', 'general')
};

export default TrashTalkGenerator;
