/**
 * Command Line Interface for the Trash Talk feature
 */

import { TrashTalk } from './trash-talk';

export class TrashTalkCLI {
  private trashTalk: TrashTalk;

  constructor() {
    this.trashTalk = new TrashTalk();
  }

  /**
   * Process a command from the CLI
   */
  processCommand(command: string, args: string[] = []): string {
    switch (command.toLowerCase()) {
      case 'help':
      case '?':
        return this.trashTalk.getHelp();

      case 'toggle':
        const status = this.trashTalk.toggle();
        return this.formatStatus(status);

      case 'opponent':
      case 'target':
        if (args.length === 0) {
          return "❌ Please provide an opponent name: opponent <name>";
        }
        const opponent = args.join(' ');
        const newStatus = this.trashTalk.setOpponent(opponent);
        return this.formatStatus(newStatus);

      case 'status':
        return this.formatStatus(this.trashTalk.getStatus());

      case 'insult':
      case 'roast':
        const category = args[0];
        return `🔥 ${this.trashTalk.generateInsult(category)}`;

      case 'config':
      case 'configure':
        return this.handleConfigCommand(args);

      case 'categories':
        return `Available categories: ${this.trashTalk.getCategories().join(', ')}`;

      case 'end':
      case 'stop':
        this.trashTalk.endSession();
        return "📊 Session ended!";

      default:
        return `❌ Unknown command: ${command}. Type 'help' for available commands.`;
    }
  }

  /**
   * Handle configuration commands
   */
  private handleConfigCommand(args: string[]): string {
    if (args.length === 0) {
      const status = this.trashTalk.getStatus();
      return `Current config: intensity=savage, frequency=occasional`;
    }

    try {
      const options: any = {};
      
      for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        
        if (!value) {
          return `❌ Missing value for ${key}`;
        }

        switch (key) {
          case 'intensity':
            if (['mild', 'savage', 'nuclear'].includes(value)) {
              options.intensity = value;
            } else {
              return `❌ Invalid intensity. Use: mild, savage, nuclear`;
            }
            break;
          case 'frequency':
            if (['rare', 'occasional', 'frequent'].includes(value)) {
              options.frequency = value;
            } else {
              return `❌ Invalid frequency. Use: rare, occasional, frequent`;
            }
            break;
          default:
            return `❌ Unknown config option: ${key}`;
        }
      }

      const newStatus = this.trashTalk.configure(options);
      return `✅ Configuration updated!\n${this.formatStatus(newStatus)}`;
    } catch (error) {
      return `❌ Error updating config: ${(error as Error).message}`;
    }
  }

  /**
   * Format status for display
   */
  private formatStatus(status: any): string {
    return `
📊 Trash Talk Status:
  Enabled: ${status.enabled ? '🔥 YES' : '❌ NO'}
  Opponent: ${status.opponent || '❌ None'}
  Session: ${status.sessionActive ? '✅ Active' : '❌ Inactive'}
  ${status.stats}
`;
  }

  /**
   * Interactive mode
   */
  startInteractive(): void {
    console.log(`
🗣️  TRASH TALK AI - Interactive Mode 🗣️
Type 'help' for commands, 'exit' to quit

Available commands:
- toggle: Enable/disable trash talk
- opponent <name>: Set opponent
- insult [category]: Generate insult
- config <key> <value>: Configure settings  
- status: Show current status
- help: Show this help
`);

    // Note: In a real implementation, you'd use readline or similar
    // This is just showing the structure
  }
}

// Export for use in other modules
export default TrashTalkCLI;
