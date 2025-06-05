import { TimerStrategy } from "./TimerStrategy.js";

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
