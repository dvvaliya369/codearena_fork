# 🗣️ Trash Talk Feature

A hilarious roasting module that adds funny disses and trash talk to prompts in the Code Arena application. When enabled, this feature allows you to specify an opponent and automatically generates witty insults to include with your prompts.

## Features

- **Toggle on/off**: Easy enable/disable functionality
- **Opponent targeting**: Specify who you're roasting
- **Multiple intensity levels**: Mild, Medium, or Savage
- **Multiple categories**: Coding, General, Gaming, or Random insults
- **Seamless integration**: Automatically modifies prompts when enabled
- **Variety**: Hundreds of different insults and templates

## How It Works

When trash talk is enabled and an opponent is set, the system:
1. Generates a personalized roast based on your settings
2. Prepends it to your original prompt
3. Sends the modified prompt to the AI models
4. The models receive context about "defeating" the opponent

## Usage

### Basic Setup

```typescript
import { createTrashTalkConfig, addTrashTalkToPrompt } from './lib/trash-talk';

// Create a configuration
const config = createTrashTalkConfig('YourOpponent', true, 'medium', 'coding');

// Apply to a prompt
const result = addTrashTalkToPrompt('Build a calculator app', config);
console.log(result.modifiedPrompt);
```

### In the UI

1. **Enable Trash Talk**: Click the "🗣️ Trash Talk OFF" button to turn it ON
2. **Set Opponent**: Enter the name of your opponent in the input field
3. **Adjust Settings** (optional): Click "Advanced Settings" to modify:
   - **Intensity**: `mild` → `medium` → `savage`
   - **Category**: `coding`, `general`, `gaming`, `random`
4. **Submit your prompt**: The trash talk will be automatically added

### Configuration Options

#### Intensity Levels
- **Mild**: Gentle, playful teasing
- **Medium**: More pointed but still fun insults  
- **Savage**: Brutal, no-holds-barred roasting

#### Categories
- **Coding**: Programming and tech-related insults
- **General**: Everyday, universal insults
- **Gaming**: Video game and gamer culture roasts
- **Random**: Mix of weird and absurd insults

### Example Outputs

**Mild Coding Roast:**
> "Hey Alice, I hope you're ready because you're going up against someone who writes code that barely compiles!"

**Savage Gaming Roast:**
> "Breaking news Bob: You're competing against someone who loses to NPCs on tutorial difficulty. May the odds be... well, they won't be in your favor!"

**Random Roast:**
> "Listen up Charlie, you're about to get schooled by someone who thinks the moon landing was filmed in their backyard. This should be interesting!"

## API Reference

### Core Functions

```typescript
// Create a configuration
createTrashTalkConfig(
  opponent: string,
  isEnabled?: boolean,
  intensity?: 'mild' | 'medium' | 'savage',
  category?: 'coding' | 'general' | 'gaming' | 'random'
): TrashTalkConfig

// Apply trash talk to a prompt
addTrashTalkToPrompt(prompt: string, config: TrashTalkConfig): TrashTalkResult

// Generate just the trash talk
generateRandomTrashTalk(opponent: string): string
```

### Preset Configurations

```typescript
presetConfigs.mildCoding('opponent')    // Gentle coding roasts
presetConfigs.savageCoding('opponent')  // Brutal coding roasts  
presetConfigs.randomRoast('opponent')   // Random category/intensity
presetConfigs.friendly('opponent')      // Mild general roasts
```

### React Integration

```typescript
// Using the context provider
import { useTrashTalk } from './components/trash-talk-provider';

function MyComponent() {
  const { config, toggleTrashTalk, setOpponent, processPrompt } = useTrashTalk();
  
  // Toggle the feature
  toggleTrashTalk();
  
  // Set opponent
  setOpponent('RivalCoder');
  
  // Process a prompt
  const result = processPrompt('Build a todo app');
}
```

## Technical Implementation

### File Structure
```
src/
├── lib/
│   └── trash-talk.ts          # Core trash talk logic
├── components/
│   ├── trash-talk-provider.tsx  # React context provider
│   └── trash-talk-controls.tsx  # UI components
└── app/
    ├── page.tsx               # Integration with main app
    └── api/generate-app/route.ts  # API endpoint modification
```

### Integration Points

1. **UI Controls**: Added compact trash talk controls above the prompt input
2. **Prompt Processing**: Modified form submission to include trash talk
3. **API Integration**: Updated API route to handle trash talk data
4. **Context Management**: React context for state management across components

## Examples

Check out `/examples/trash-talk-demo.ts` for comprehensive usage examples including:
- All intensity levels
- All categories  
- Prompt modification
- Preset configurations
- Edge cases
- Disabled state behavior

## Fun Facts

- Over 80 unique insults across all categories
- 8+ different roast templates for variety
- Supports both aggressive and playful tones
- Automatically handles empty/null opponents gracefully
- Fully TypeScript typed for safety
- Zero dependencies beyond React

---

**Remember**: This is all in good fun! The trash talk feature is designed for entertainment and friendly competition. Keep it playful! 🎮🤣
