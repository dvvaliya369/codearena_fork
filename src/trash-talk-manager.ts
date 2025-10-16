/**
 * Configuration and state management for the trash talk feature
 */

export interface TrashTalkConfig {
  enabled: boolean;
  opponent: string | null;
  intensity: 'mild' | 'savage' | 'nuclear';
  categories: string[];
  frequency: 'rare' | 'occasional' | 'frequent';
}

export interface TrashTalkSession {
  opponent: string;
  startTime: Date;
  insultCount: number;
  lastInsultTime: Date;
}

export class TrashTalkManager {
  private config: TrashTalkConfig = {
    enabled: false,
    opponent: null,
    intensity: 'mild',
    categories: ['general'],
    frequency: 'occasional'
  };

  private currentSession: TrashTalkSession | null = null;

  /**
   * Toggle trash talk on or off
   */
  toggle(): boolean {
    this.config.enabled = !this.config.enabled;
    
    if (!this.config.enabled) {
      this.endSession();
    }
    
    return this.config.enabled;
  }

  /**
   * Set the opponent for trash talk
   */
  setOpponent(opponent: string): void {
    this.config.opponent = opponent;
    
    if (this.config.enabled && opponent) {
      this.startSession(opponent);
    }
  }

  /**
   * Start a new trash talk session
   */
  private startSession(opponent: string): void {
    this.currentSession = {
      opponent,
      startTime: new Date(),
      insultCount: 0,
      lastInsultTime: new Date()
    };
  }

  /**
   * End the current trash talk session
   */
  endSession(): void {
    this.currentSession = null;
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<TrashTalkConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Get current configuration
   */
  getConfig(): TrashTalkConfig {
    return { ...this.config };
  }

  /**
   * Get current session info
   */
  getCurrentSession(): TrashTalkSession | null {
    return this.currentSession ? { ...this.currentSession } : null;
  }

  /**
   * Check if trash talk is enabled and ready
   */
  isReady(): boolean {
    return this.config.enabled && this.config.opponent !== null;
  }

  /**
   * Increment insult counter
   */
  recordInsult(): void {
    if (this.currentSession) {
      this.currentSession.insultCount++;
      this.currentSession.lastInsultTime = new Date();
    }
  }

  /**
   * Should we add trash talk based on frequency setting?
   */
  shouldAddTrashTalk(): boolean {
    if (!this.isReady()) return false;

    const now = Date.now();
    const lastInsult = this.currentSession?.lastInsultTime.getTime() || 0;
    const timeSinceLastInsult = now - lastInsult;

    switch (this.config.frequency) {
      case 'rare':
        return Math.random() < 0.1 && timeSinceLastInsult > 30000; // 10% chance, 30s cooldown
      case 'occasional':
        return Math.random() < 0.3 && timeSinceLastInsult > 15000; // 30% chance, 15s cooldown
      case 'frequent':
        return Math.random() < 0.6 && timeSinceLastInsult > 5000; // 60% chance, 5s cooldown
      default:
        return false;
    }
  }

  /**
   * Get session stats
   */
  getSessionStats(): string {
    if (!this.currentSession) {
      return "No active trash talk session";
    }

    const duration = Date.now() - this.currentSession.startTime.getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    return `🗣️  Trash Talking ${this.currentSession.opponent} for ${minutes}m ${seconds}s | Roasts delivered: ${this.currentSession.insultCount}`;
  }
}
