/**
 * Trash Talk Demo
 * Example usage and testing for the trash talk feature
 */

import { 
  trashTalkGenerator, 
  createTrashTalkConfig, 
  addTrashTalkToPrompt, 
  generateRandomTrashTalk, 
  presetConfigs,
  TrashTalkConfig 
} from '../src/lib/trash-talk';

// Example 1: Basic usage
console.log('=== TRASH TALK DEMO ===\n');

console.log('1. Basic Trash Talk Generation:');
const basicConfig = createTrashTalkConfig('Bob', true, 'medium', 'coding');
const basicTrashTalk = trashTalkGenerator.generateTrashTalk(basicConfig);
console.log(`Roasting Bob: ${basicTrashTalk}\n`);

// Example 2: Different intensity levels
console.log('2. Different Intensity Levels:');
const intensities: TrashTalkConfig['intensity'][] = ['mild', 'medium', 'savage'];
intensities.forEach(intensity => {
  const config = createTrashTalkConfig('Alice', true, intensity, 'coding');
  const roast = trashTalkGenerator.generateTrashTalk(config);
  console.log(`${intensity.toUpperCase()}: ${roast}`);
});
console.log();

// Example 3: Different categories
console.log('3. Different Categories:');
const categories: TrashTalkConfig['category'][] = ['coding', 'general', 'gaming', 'random'];
categories.forEach(category => {
  const config = createTrashTalkConfig('Charlie', true, 'medium', category);
  const roast = trashTalkGenerator.generateTrashTalk(config);
  console.log(`${category.toUpperCase()}: ${roast}`);
});
console.log();

// Example 4: Using with prompts
console.log('4. Prompt Modification:');
const originalPrompt = "Build a simple calculator app";
const config = createTrashTalkConfig('Diana', true, 'savage', 'coding');
const result = addTrashTalkToPrompt(originalPrompt, config);

console.log(`Original: ${result.originalPrompt}`);
console.log(`Trash Talk: ${result.trashTalk}`);
console.log(`Modified: ${result.modifiedPrompt}\n`);

// Example 5: Preset configurations
console.log('5. Preset Configurations:');
const presets = [
  { name: 'Mild Coding', config: presetConfigs.mildCoding('Eve') },
  { name: 'Savage Coding', config: presetConfigs.savageCoding('Frank') },
  { name: 'Random Roast', config: presetConfigs.randomRoast('Grace') },
  { name: 'Friendly', config: presetConfigs.friendly('Henry') }
];

presets.forEach(preset => {
  const roast = trashTalkGenerator.generateTrashTalk(preset.config);
  console.log(`${preset.name}: ${roast}`);
});
console.log();

// Example 6: Random generation
console.log('6. Random Generation:');
for (let i = 0; i < 3; i++) {
  const randomRoast = generateRandomTrashTalk('RandomUser');
  console.log(`Random #${i + 1}: ${randomRoast}`);
}
console.log();

// Example 7: Disabled trash talk
console.log('7. Disabled Trash Talk:');
const disabledConfig = createTrashTalkConfig('Nobody', false);
const disabledResult = addTrashTalkToPrompt("Create a todo app", disabledConfig);
console.log(`Disabled result: ${disabledResult.modifiedPrompt}`);
console.log(`Trash talk generated: ${disabledResult.trashTalk === '' ? 'None' : disabledResult.trashTalk}\n`);

// Example 8: Edge cases
console.log('8. Edge Cases:');
const emptyOpponentConfig = createTrashTalkConfig('', true);
const emptyResult = trashTalkGenerator.generateTrashTalk(emptyOpponentConfig);
console.log(`Empty opponent: "${emptyResult}"`);

const nullOpponentConfig: TrashTalkConfig = {
  isEnabled: true,
  opponent: null,
  intensity: 'medium',
  category: 'coding'
};
const nullResult = trashTalkGenerator.generateTrashTalk(nullOpponentConfig);
console.log(`Null opponent: "${nullResult}"`);

console.log('\n=== DEMO COMPLETE ===');

// Export for potential web usage
export function runTrashTalkDemo() {
  return {
    basicExample: {
      opponent: 'Bob',
      config: basicConfig,
      trashTalk: basicTrashTalk
    },
    intensityExamples: intensities.map(intensity => ({
      intensity,
      trashTalk: trashTalkGenerator.generateTrashTalk(
        createTrashTalkConfig('TestUser', true, intensity, 'coding')
      )
    })),
    categoryExamples: categories.map(category => ({
      category,
      trashTalk: trashTalkGenerator.generateTrashTalk(
        createTrashTalkConfig('TestUser', true, 'medium', category)
      )
    })),
    promptExample: result,
    presetExamples: presets.map(preset => ({
      name: preset.name,
      trashTalk: trashTalkGenerator.generateTrashTalk(preset.config)
    }))
  };
}
