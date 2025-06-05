export interface TimerStrategy {
  startTicking(callback: (elapsed: number) => void): void;
  stopTicking(): void;
  getName(): string;
}

export class NormalTimerStrategy implements TimerStrategy {
  private timerId: NodeJS.Timeout | null = null;
  private readonly tickInterval = 1000; // 1 second
  private readonly timeMultiplier = 1; // Normal speed

  startTicking(callback: (elapsed: number) => void): void {
    if (this.timerId) return; // Already ticking
    
    this.timerId = setInterval(() => {
      // Pass the elapsed time considering the time multiplier
      callback(this.tickInterval * this.timeMultiplier);
    }, this.tickInterval);
  }

  stopTicking(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  getName(): string {
    return "Normal";
  }
}

export class DebugTimerStrategy implements TimerStrategy {
  private timerId: NodeJS.Timeout | null = null;
  private readonly tickInterval = 1000;
  private readonly timeMultiplier = 100;

  startTicking(callback: (elapsed: number) => void): void {
    if (this.timerId) return;
    
    this.timerId = setInterval(() => {
      callback(this.tickInterval * this.timeMultiplier);
    }, this.tickInterval);
  }

  stopTicking(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  getName(): string {
    return "Debug (1000x faster)";
  }
}

export class CustomTimerStrategy implements TimerStrategy {
  private timerId: NodeJS.Timeout | null = null;
  private readonly tickInterval: number;
  private readonly timeMultiplier: number;
  private readonly name: string;

  constructor(timeMultiplier: number = 1, tickInterval: number = 1000) {
    this.timeMultiplier = timeMultiplier;
    this.tickInterval = tickInterval;
    this.name = timeMultiplier === 1 ? "Normal" : `${timeMultiplier}x Speed`;
  }

  startTicking(callback: (elapsed: number) => void): void {
    if (this.timerId) return;
    
    this.timerId = setInterval(() => {
      callback(this.tickInterval * this.timeMultiplier);
    }, this.tickInterval);
  }

  stopTicking(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  getName(): string {
    return this.name;
  }
}