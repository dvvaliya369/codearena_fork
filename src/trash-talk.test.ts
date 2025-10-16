/**
 * Unit tests for the Trash Talk feature
 */

import { TrashTalk } from "../src/trash-talk";
import { InsultGenerator } from "../src/insult-generator";
import { TrashTalkManager } from "../src/trash-talk-manager";

describe("TrashTalk", () => {
  let trashTalk: TrashTalk;

  beforeEach(() => {
    trashTalk = new TrashTalk();
  });

  test("should initialize with trash talk disabled", () => {
    const status = trashTalk.getStatus();
    expect(status.enabled).toBe(false);
    expect(status.opponent).toBe(null);
    expect(status.sessionActive).toBe(false);
  });

  test("should toggle trash talk mode", () => {
    let status = trashTalk.toggle();
    expect(status.enabled).toBe(true);

    status = trashTalk.toggle();
    expect(status.enabled).toBe(false);
  });

  test("should set opponent", () => {
    const status = trashTalk.setOpponent("TestBot");
    expect(status.opponent).toBe("TestBot");
  });

  test("should not accept empty opponent name", () => {
    expect(() => trashTalk.setOpponent("")).toThrow(
      "Opponent name cannot be empty!"
    );
    expect(() => trashTalk.setOpponent("   ")).toThrow(
      "Opponent name cannot be empty!"
    );
  });

  test("should configure settings", () => {
    trashTalk.configure({
      intensity: "nuclear",
      frequency: "frequent",
    });

    // We can't directly check config, but we can verify it doesn't throw
    expect(() => trashTalk.generateInsult()).not.toThrow();
  });

  test("should generate insults when opponent is set", () => {
    trashTalk.setOpponent("TestBot");
    const insult = trashTalk.generateInsult();
    expect(insult).toContain("TestBot");
  });

  test("should return error message when no opponent is set", () => {
    const insult = trashTalk.generateInsult();
    expect(insult).toBe("No opponent set! Use setOpponent() first!");
  });

  test("should return available categories", () => {
    const categories = trashTalk.getCategories();
    expect(categories).toContain("general");
    expect(categories).toContain("tech");
    expect(categories).toContain("gaming");
  });
});

describe("InsultGenerator", () => {
  let generator: InsultGenerator;

  beforeEach(() => {
    generator = new InsultGenerator();
  });

  test("should generate insults with opponent name", () => {
    const insult = generator.generateInsult("TestBot");
    expect(insult).toContain("TestBot");
  });

  test("should generate different insults", () => {
    const insult1 = generator.generateInsult("TestBot");
    const insult2 = generator.generateInsult("TestBot");
    // They might be the same due to randomness, but structure should be consistent
    expect(insult1).toContain("TestBot");
    expect(insult2).toContain("TestBot");
  });

  test("should generate category-specific insults", () => {
    const techInsult = generator.generateInsult("TestBot", "tech");
    expect(techInsult).toContain("TestBot");
  });

  test("should generate motivational trash talk", () => {
    const motivation = generator.generateMotivationalTrashTalk("TestBot");
    expect(motivation).toContain("TestBot");
  });

  test("should generate combo insults", () => {
    const combo = generator.generateComboInsult("TestBot");
    expect(combo).toContain("TestBot");
    expect(combo).toContain("And another thing");
  });

  test("should return valid categories", () => {
    const categories = generator.getCategories();
    expect(categories).toEqual([
      "intelligence",
      "skills",
      "appearance",
      "general",
      "tech",
      "gaming",
    ]);
  });
});

describe("TrashTalkManager", () => {
  let manager: TrashTalkManager;

  beforeEach(() => {
    manager = new TrashTalkManager();
  });

  test("should start disabled", () => {
    expect(manager.isReady()).toBe(false);
    const config = manager.getConfig();
    expect(config.enabled).toBe(false);
    expect(config.opponent).toBe(null);
  });

  test("should toggle state", () => {
    expect(manager.toggle()).toBe(true);
    expect(manager.toggle()).toBe(false);
  });

  test("should set opponent and start session", () => {
    manager.setOpponent("TestBot");
    const config = manager.getConfig();
    expect(config.opponent).toBe("TestBot");
  });

  test("should be ready when enabled and opponent is set", () => {
    expect(manager.isReady()).toBe(false);

    manager.toggle();
    expect(manager.isReady()).toBe(false); // Still no opponent

    manager.setOpponent("TestBot");
    expect(manager.isReady()).toBe(true);
  });

  test("should update configuration", () => {
    manager.updateConfig({
      intensity: "nuclear",
      frequency: "frequent",
    });

    const config = manager.getConfig();
    expect(config.intensity).toBe("nuclear");
    expect(config.frequency).toBe("frequent");
  });

  test("should track session stats", () => {
    manager.setOpponent("TestBot");
    const stats = manager.getSessionStats();
    expect(stats).toContain("TestBot");
  });

  test("should end session", () => {
    manager.setOpponent("TestBot");
    expect(manager.getCurrentSession()).not.toBe(null);

    manager.endSession();
    expect(manager.getCurrentSession()).toBe(null);
  });
});
