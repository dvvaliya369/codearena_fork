import { TrashTalkManager, enableTrashTalk, disableTrashTalk, trashTalk } from '../lib/trash-talk';

/**
 * Example usage of the Trash Talk feature
 */
console.log('🔥 Trash Talk Feature Demo 🔥\n');

// Example 1: Basic usage with default instance
console.log('1. Basic Usage:');
enableTrashTalk('ChatGPT', 'programming', 'medium');
console.log('Opponent set to: ChatGPT');
console.log('Preview roast:', trashTalk.getPreview());
console.log('Config:', trashTalk.getConfig());
console.log();

// Example 2: Prompt enhancement
console.log('2. Prompt Enhancement:');
const originalPrompt = "Help me write a function to sort an array.";
const enhanced = trashTalk.enhancePrompt(originalPrompt);
console.log('Original:', enhanced.originalPrompt);
console.log('Enhanced with trash talk:', enhanced.enhancedPrompt);
console.log();

// Example 3: Different styles and intensities
console.log('3. Different Styles:');
const styles = ['programming', 'gaming', 'general', 'random'] as const;
const intensities = ['mild', 'medium', 'savage'] as const;

styles.forEach(style => {
  trashTalk.setStyle(style);
  trashTalk.setOpponent('Claude');
  console.log(`${style.charAt(0).toUpperCase() + style.slice(1)} style:`, trashTalk.getPreview());
});
console.log();

console.log('4. Different Intensities (Gaming style):');
trashTalk.setStyle('gaming');
trashTalk.setOpponent('Gemini');
intensities.forEach(intensity => {
  trashTalk.setIntensity(intensity);
  console.log(`${intensity.charAt(0).toUpperCase() + intensity.slice(1)} intensity:`, trashTalk.getPreview());
});
console.log();

// Example 4: Creating a custom instance
console.log('5. Custom Instance:');
const customTrashTalk = new TrashTalkManager({
  enabled: true,
  opponent: 'Llama',
  style: 'programming',
  intensity: 'savage'
});

console.log('Custom config:', customTrashTalk.getConfig());
console.log('Custom roast:', customTrashTalk.getPreview());
console.log();

// Example 6: Toggle functionality
console.log('6. Toggle Functionality:');
console.log('Before toggle - enabled:', trashTalk.getConfig().enabled);
trashTalk.toggle();
console.log('After toggle - enabled:', trashTalk.getConfig().enabled);
trashTalk.toggle();
console.log('After second toggle - enabled:', trashTalk.getConfig().enabled);
console.log();

// Example 7: Reset functionality
console.log('7. Reset:');
console.log('Before reset:', trashTalk.getConfig());
trashTalk.reset();
console.log('After reset:', trashTalk.getConfig());

export { TrashTalkManager, enableTrashTalk, disableTrashTalk, trashTalk };
