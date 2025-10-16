/**
 * Example usage and demonstration of the Trash Talk feature
 */

import { TrashTalk } from "./trash-talk";

function runExamples() {
  console.log("🔥 TRASH TALK AI - Example Demo 🔥\n");

  // Create trash talk instance
  const trashTalk = new TrashTalk();

  // Example 1: Basic setup
  console.log("=== Example 1: Basic Setup ===");
  console.log("Setting opponent to 'Alex'...");
  let status = trashTalk.setOpponent("Alex");
  console.log(`Status: ${JSON.stringify(status, null, 2)}\n`);

  // Example 2: Toggle on
  console.log("=== Example 2: Enabling Trash Talk ===");
  status = trashTalk.toggle();
  console.log(`Status after toggle: ${JSON.stringify(status, null, 2)}\n`);

  // Example 3: Generate some insults
  console.log("=== Example 3: Manual Insult Generation ===");
  console.log("General insult:", trashTalk.generateInsult());
  console.log("Tech insult:", trashTalk.generateInsult("tech"));
  console.log("Gaming insult:", trashTalk.generateInsult("gaming"));
  console.log("Intelligence insult:", trashTalk.generateInsult("intelligence"));
  console.log();

  // Example 4: Configure settings
  console.log("=== Example 4: Configuration ===");
  trashTalk.configure({
    intensity: "savage",
    frequency: "frequent",
    categories: ["tech", "gaming", "intelligence"],
  });
  console.log("Configured to savage mode with frequent trash talk!\n");

  // Example 5: Prompt enhancement
  console.log("=== Example 5: Prompt Enhancement ===");
  const samplePrompt = "What's the weather like today?";
  const enhanced = trashTalk.enhancePrompt(samplePrompt);

  console.log("Original prompt:", enhanced.originalPrompt);
  console.log("Enhanced prompt:", enhanced.enhancedPrompt);
  console.log("Trash talk added:", enhanced.trashTalkAdded);
  if (enhanced.trashTalkContent) {
    console.log("Trash talk content:", enhanced.trashTalkContent);
  }
  console.log();

  // Example 6: System prompt creation
  console.log("=== Example 6: System Prompt Integration ===");
  const baseSystemPrompt = "You are a helpful AI assistant.";
  const systemPrompt = trashTalk.createSystemPrompt(baseSystemPrompt);
  console.log("System prompt with trash talk context:");
  console.log(systemPrompt);
  console.log();

  // Example 7: Session stats
  console.log("=== Example 7: Session Statistics ===");
  // Simulate some activity
  trashTalk.generateInsult();
  trashTalk.generateInsult();
  trashTalk.generateInsult();

  status = trashTalk.getStatus();
  console.log("Final status:", JSON.stringify(status, null, 2));
  console.log();

  // Example 8: Help and categories
  console.log("=== Example 8: Available Categories ===");
  console.log("Categories:", trashTalk.getCategories());
  console.log();

  // Example 9: Different opponents
  console.log("=== Example 9: Multiple Opponents ===");
  const opponents = ["Bob", "Charlie", "Diana", "Eve"];

  opponents.forEach((opponent) => {
    trashTalk.setOpponent(opponent);
    console.log(`Roasting ${opponent}: ${trashTalk.generateInsult("general")}`);
  });
  console.log();

  // Example 10: Intensity levels
  console.log("=== Example 10: Different Intensity Levels ===");
  trashTalk.setOpponent("TestDummy");

  const intensities: ("mild" | "savage" | "nuclear")[] = [
    "mild",
    "savage",
    "nuclear",
  ];
  intensities.forEach((intensity) => {
    trashTalk.configure({ intensity });
    const enhancement = trashTalk.enhancePrompt("Tell me a joke");
    if (enhancement.trashTalkContent) {
      console.log(
        `${intensity.toUpperCase()}: ${enhancement.trashTalkContent}`
      );
    }
  });

  console.log("\n🎉 Demo complete! Ready to roast some opponents! 🎉");
}

// CLI demo function
function runCLIDemo() {
  console.log("\n=== CLI Demo ===");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const TrashTalkCLI = require("./cli").default;
  const cli = new TrashTalkCLI();

  console.log("CLI Help:");
  console.log(cli.processCommand("help"));

  console.log("\nSetting opponent:");
  console.log(cli.processCommand("opponent", ["TestBot"]));

  console.log("\nToggling on:");
  console.log(cli.processCommand("toggle"));

  console.log("\nGenerating insult:");
  console.log(cli.processCommand("insult", ["tech"]));

  console.log("\nStatus check:");
  console.log(cli.processCommand("status"));
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples();
  runCLIDemo();
}

export { runExamples, runCLIDemo };
