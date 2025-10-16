/**
 * Hilarious insult and roast generators for the trash talk feature
 */

export interface InsultTemplate {
  template: string;
  category: 'intelligence' | 'skills' | 'appearance' | 'general' | 'tech' | 'gaming';
}

export class InsultGenerator {
  private readonly insults: InsultTemplate[] = [
    // Intelligence roasts
    {
      template: "{opponent}, you're so slow that even Internet Explorer feels bad for you!",
      category: 'intelligence'
    },
    {
      template: "Hey {opponent}, I've seen smarter AI in a broken calculator!",
      category: 'intelligence'
    },
    {
      template: "{opponent}, your IQ is so low that you make a rock look like Einstein!",
      category: 'intelligence'
    },
    {
      template: "Listen up {opponent}, you're about as sharp as a bowling ball!",
      category: 'intelligence'
    },

    // Skills roasts
    {
      template: "{opponent}, your skills are so bad that even a tutorial would give up on you!",
      category: 'skills'
    },
    {
      template: "Yo {opponent}, you're so bad at this that they should create a new difficulty level called 'Impossible for {opponent}'!",
      category: 'skills'
    },
    {
      template: "{opponent}, you play like you learned from a YouTube video... that was buffering!",
      category: 'skills'
    },
    {
      template: "Hey {opponent}, I've seen better moves from a frozen penguin!",
      category: 'skills'
    },

    // Tech roasts
    {
      template: "{opponent}, your code is so buggy that even mosquitoes are jealous!",
      category: 'tech'
    },
    {
      template: "Sup {opponent}, you debug like you're playing Whack-a-Mole... blindfolded!",
      category: 'tech'
    },
    {
      template: "{opponent}, your algorithms are slower than a 56k modem downloading the internet!",
      category: 'tech'
    },
    {
      template: "Hey {opponent}, Stack Overflow has a restraining order against your questions!",
      category: 'tech'
    },

    // Gaming roasts
    {
      template: "{opponent}, you're so bad at gaming that NPCs feel sorry for you!",
      category: 'gaming'
    },
    {
      template: "Yo {opponent}, you respawn more often than a glitched character!",
      category: 'gaming'
    },
    {
      template: "{opponent}, even the easy mode is too hard for you!",
      category: 'gaming'
    },
    {
      template: "Listen {opponent}, lag isn't an excuse when you're playing solitaire!",
      category: 'gaming'
    },

    // General roasts
    {
      template: "{opponent}, you're like a participation trophy - everyone gets one, but nobody wants it!",
      category: 'general'
    },
    {
      template: "Hey {opponent}, if being awesome was a crime, you'd be law-abiding!",
      category: 'general'
    },
    {
      template: "{opponent}, you're proof that even artificial intelligence has limits!",
      category: 'general'
    },
    {
      template: "Sup {opponent}, you're like a broken GPS - always lost and never helpful!",
      category: 'general'
    },

    // Appearance roasts (silly/harmless)
    {
      template: "{opponent}, your avatar looks like it was designed by a committee of blind artists!",
      category: 'appearance'
    },
    {
      template: "Yo {opponent}, even your profile picture is trying to log out!",
      category: 'appearance'
    },
    {
      template: "{opponent}, your style is so outdated that retro fashion called and wants its look back!",
      category: 'appearance'
    }
  ];

  private readonly motivationalInsults: string[] = [
    "Time to school {opponent} in the art of getting absolutely destroyed!",
    "Get ready {opponent}, because class is in session and I'm the professor of pain!",
    "{opponent}, prepare to witness greatness... and also your own defeat!",
    "Hey {opponent}, I hope you brought tissues because you're about to cry tears of defeat!",
    "Buckle up {opponent}, this is going to be more one-sided than a coin with two heads!",
    "{opponent}, I'd say good luck, but we both know you'll need a miracle!",
    "Attention {opponent}: You're about to experience what professionals call 'getting rekt'!",
    "{opponent}, I'm about to end your whole career... if you even had one!"
  ];

  /**
   * Generate a random insult for the opponent
   */
  generateInsult(opponent: string, category?: InsultTemplate['category']): string {
    const availableInsults = category 
      ? this.insults.filter(insult => insult.category === category)
      : this.insults;

    if (availableInsults.length === 0) {
      return `Hey ${opponent}, you're so unremarkable that I can't even think of a good roast!`;
    }

    const randomInsult = availableInsults[Math.floor(Math.random() * availableInsults.length)];
    return randomInsult.template.replace(/\{opponent\}/g, opponent);
  }

  /**
   * Generate a motivational trash talk message
   */
  generateMotivationalTrashTalk(opponent: string): string {
    const randomMotivation = this.motivationalInsults[Math.floor(Math.random() * this.motivationalInsults.length)];
    return randomMotivation.replace(/\{opponent\}/g, opponent);
  }

  /**
   * Generate a combo insult with multiple burns
   */
  generateComboInsult(opponent: string): string {
    const insult1 = this.generateInsult(opponent);
    const insult2 = this.generateInsult(opponent);
    return `${insult1} And another thing, ${insult2.toLowerCase()}`;
  }

  /**
   * Get all available categories
   */
  getCategories(): InsultTemplate['category'][] {
    return ['intelligence', 'skills', 'appearance', 'general', 'tech', 'gaming'];
  }
}
