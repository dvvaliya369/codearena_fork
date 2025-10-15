/**
 * Trash Talk Utility Functions
 * 
 * This module provides utilities for generating humorous roasts and managing
 * trash talk functionality in the Code Arena application.
 */

export interface OpponentInfo {
  name: string;
  description?: string;
}

export interface TrashTalkConfig {
  enabled: boolean;
  opponent: OpponentInfo | null;
}

/**
 * Collection of funny trash talk templates
 * These are playful roasts that can be customized with opponent information
 */
const TRASH_TALK_TEMPLATES = [
  "Listen up {opponent}, my code is so clean it makes your algorithms look like they were written with a crayon! 🖍️",
  "Hey {opponent}, I've seen more elegant solutions in a bowl of spaghetti code! 🍝",
  "Sorry {opponent}, but while you're still debugging Hello World, I'm already shipping production-ready masterpieces! 🚀",
  "{opponent}, your coding style is like a Windows update - nobody wants it and it always breaks something! 💻",
  "Oh {opponent}, I write code so efficient, even my bugs have better performance than your features! 🐛✨",
  "Hey {opponent}, my functions are so pure they make distilled water jealous, unlike your messy side effects! 💧",
  "{opponent}, I don't always write perfect code, but when I do, it's still better than your best attempt! 🏆",
  "Yo {opponent}, my variable names are more descriptive than your entire career! 📝",
  "{opponent}, I've seen more structure in a house of cards than in your codebase! 🏠🃏",
  "Listen {opponent}, my code compiles on the first try - yours probably needs a prayer and three energy drinks! ☕🙏",
];

const ROAST_INTENSIFIERS = [
  "absolutely",
  "completely",
  "totally",
  "utterly",
  "magnificently",
  "spectacularly",
  "remarkably",
  "impressively",
  "phenomenally",
  "extraordinarily",
];

const CODING_INSULTS = [
  "your code looks like it was written during an earthquake",
  "your functions have more bugs than a summer camping trip",
  "your variable names are more confusing than IKEA instructions",
  "your logic flows like molasses uphill",
  "your error handling is more missing than my motivation on Monday mornings",
  "your code comments are rarer than unicorns",
  "your algorithms run slower than Internet Explorer",
  "your database queries are more tangled than Christmas lights",
];

/**
 * Generates a random trash talk message for the specified opponent
 */
export function generateTrashTalk(opponent: OpponentInfo): string {
  const template = TRASH_TALK_TEMPLATES[Math.floor(Math.random() * TRASH_TALK_TEMPLATES.length)];
  const opponentName = opponent.name || "Challenger";
  
  return template.replace(/{opponent}/g, opponentName);
}

/**
 * Generates a more elaborate roast with additional context
 */
export function generateElaborateRoast(opponent: OpponentInfo): string {
  const intensifier = ROAST_INTENSIFIERS[Math.floor(Math.random() * ROAST_INTENSIFIERS.length)];
  const insult = CODING_INSULTS[Math.floor(Math.random() * CODING_INSULTS.length)];
  const opponentName = opponent.name || "Challenger";
  
  const roasts = [
    `${opponentName}, you're ${intensifier} talented, but ${insult}! 😎`,
    `Not to be mean ${opponentName}, but I'm ${intensifier} certain that ${insult}! 🎯`,
    `${opponentName}, I'm ${intensifier} impressed by how ${insult}! 🔥`,
    `Hey ${opponentName}, ${insult} - and that's ${intensifier} hilarious! 😂`,
  ];
  
  return roasts[Math.floor(Math.random() * roasts.length)];
}

/**
 * Creates the trash talk prompt addition for the AI
 */
export function createTrashTalkPrompt(config: TrashTalkConfig, basePrompt: string): string {
  if (!config.enabled || !config.opponent) {
    return basePrompt;
  }
  
  const trashTalk = generateTrashTalk(config.opponent);
  const elaborateRoast = generateElaborateRoast(config.opponent);
  
  return `${basePrompt}

🔥 TRASH TALK MODE ACTIVATED! 🔥

Your opponent is: ${config.opponent.name}${config.opponent.description ? ` (${config.opponent.description})` : ''}

Roast of the moment: ${trashTalk}

Bonus burn: ${elaborateRoast}

Now show them who's the superior coder by creating the most amazing, elegant, and powerful code possible! Make your solution so good that ${config.opponent.name} will need to go back to coding bootcamp! 💪

Remember: Let your code do the talking - make it clean, efficient, and absolutely stunning! 🌟`;
}

/**
 * Gets a collection of random trash talk messages for display
 */
export function getRandomTrashTalkCollection(opponent: OpponentInfo, count: number = 3): string[] {
  const messages: string[] = [];
  const usedIndices = new Set<number>();
  
  while (messages.length < count && messages.length < TRASH_TALK_TEMPLATES.length) {
    const index = Math.floor(Math.random() * TRASH_TALK_TEMPLATES.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      messages.push(generateTrashTalk(opponent));
    }
  }
  
  return messages;
}

/**
 * Validates opponent information
 */
export function validateOpponent(opponent: Partial<OpponentInfo>): OpponentInfo | null {
  if (!opponent.name || opponent.name.trim().length === 0) {
    return null;
  }
  
  return {
    name: opponent.name.trim(),
    description: opponent.description?.trim() || undefined,
  };
}
