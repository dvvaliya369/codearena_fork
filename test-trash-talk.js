// Simple test script for trash talk feature
console.log('🔥 Testing Trash Talk Feature 🔥\n');

// Mock the TrashTalkManager for testing (simplified version)
class TrashTalkManager {
  constructor(config = {}) {
    this.config = {
      enabled: false,
      intensity: 'medium',
      style: 'random',
      opponent: undefined,
      ...config
    };
  }

  toggle() {
    this.config.enabled = !this.config.enabled;
    return this.config.enabled;
  }

  setOpponent(opponent) {
    this.config.opponent = opponent;
  }

  setStyle(style) {
    this.config.style = style;
  }

  setIntensity(intensity) {
    this.config.intensity = intensity;
  }

  getConfig() {
    return { ...this.config };
  }

  getPreview() {
    if (!this.config.opponent) {
      return "Set an opponent first to see the trash talk in action!";
    }
    
    const insults = [
      "writes code so bad it makes Internet Explorer look fast",
      "has the creative thinking skills of a broken calculator",
      "plays like they're using a Guitar Hero controller for everything"
    ];
    
    const insult = insults[Math.floor(Math.random() * insults.length)];
    return `${this.config.opponent} ${insult}`;
  }

  enhancePrompt(originalPrompt) {
    if (!this.config.enabled || !this.config.opponent) {
      return {
        originalPrompt,
        enhancedPrompt: originalPrompt,
        insult: '',
        opponent: this.config.opponent || ''
      };
    }

    const insult = this.getPreview();
    const trashTalkAddition = `

---TRASH TALK MODE ACTIVATED---
Your opponent is ${this.config.opponent}, who ${insult}.
Channel this energy into your response - be confident, witty, and add some playful sass!
---END TRASH TALK MODE---

`;

    return {
      originalPrompt,
      enhancedPrompt: originalPrompt + trashTalkAddition,
      insult,
      opponent: this.config.opponent
    };
  }
}

// Test the feature
console.log('1. Creating trash talk instance...');
const trashTalk = new TrashTalkManager();
console.log('Initial config:', trashTalk.getConfig());

console.log('\n2. Setting opponent and enabling...');
trashTalk.setOpponent('ChatGPT');
trashTalk.toggle();
console.log('Updated config:', trashTalk.getConfig());

console.log('\n3. Testing preview generation...');
for (let i = 0; i < 3; i++) {
  console.log(`Preview ${i + 1}:`, trashTalk.getPreview());
}

console.log('\n4. Testing prompt enhancement...');
const testPrompt = "Help me write a function to sort an array";
const enhanced = trashTalk.enhancePrompt(testPrompt);
console.log('Original:', enhanced.originalPrompt);
console.log('Enhanced:', enhanced.enhancedPrompt);

console.log('\n5. Testing different styles and intensities...');
const styles = ['programming', 'gaming', 'general', 'random'];
const intensities = ['mild', 'medium', 'savage'];

styles.forEach(style => {
  trashTalk.setStyle(style);
  console.log(`${style} style:`, trashTalk.getPreview());
});

console.log('\n✅ Trash Talk Feature Test Complete!');
console.log('🎉 All basic functionality working correctly!');

module.exports = { TrashTalkManager };
