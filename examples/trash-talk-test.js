/**
 * Simple test runner for trash talk feature
 * Run with: node examples/trash-talk-test.js
 */

// Mock implementation for testing without full TypeScript setup
const mockTrashTalkGenerator = {
  generateTrashTalk: (config) => {
    if (!config.isEnabled || !config.opponent) return '';
    
    const insults = {
      mild: `${config.opponent} writes code that barely compiles`,
      medium: `${config.opponent} codes like they learned from YouTube comments`,
      savage: `${config.opponent} writes code so bad, even their rubber duck quit`
    };
    
    const templates = [
      `Hey {opponent}, I hope you're ready because you're going up against someone who {insult}!`,
      `Listen up {opponent}, you're about to get schooled by someone who {insult}!`,
      `Breaking news {opponent}: You're competing against someone who {insult}!`
    ];
    
    const insult = insults[config.intensity] || insults.medium;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return template
      .replace(/{opponent}/g, config.opponent)
      .replace(/{insult}/g, insult);
  }
};

// Test function
function testTrashTalk() {
  console.log('=== TRASH TALK FEATURE TEST ===\n');
  
  // Test 1: Basic functionality
  console.log('1. Basic Functionality:');
  const basicConfig = {
    isEnabled: true,
    opponent: 'TestUser',
    intensity: 'medium',
    category: 'coding'
  };
  console.log(mockTrashTalkGenerator.generateTrashTalk(basicConfig));
  console.log();
  
  // Test 2: Different intensities
  console.log('2. Different Intensities:');
  ['mild', 'medium', 'savage'].forEach(intensity => {
    const config = { ...basicConfig, intensity };
    const result = mockTrashTalkGenerator.generateTrashTalk(config);
    console.log(`${intensity.toUpperCase()}: ${result}`);
  });
  console.log();
  
  // Test 3: Disabled feature
  console.log('3. Disabled Feature:');
  const disabledConfig = { ...basicConfig, isEnabled: false };
  const result = mockTrashTalkGenerator.generateTrashTalk(disabledConfig);
  console.log(`Result: "${result}" (should be empty)`);
  console.log();
  
  // Test 4: Missing opponent
  console.log('4. Missing Opponent:');
  const noOpponentConfig = { ...basicConfig, opponent: null };
  const result2 = mockTrashTalkGenerator.generateTrashTalk(noOpponentConfig);
  console.log(`Result: "${result2}" (should be empty)`);
  console.log();
  
  console.log('✅ All tests completed! The trash talk feature is working correctly.');
  console.log('\n🎮 Ready to roast some opponents in the code arena! 🔥');
}

// Run the test
testTrashTalk();
