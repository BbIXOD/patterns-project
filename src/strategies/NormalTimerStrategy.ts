import { TimerStrategy } from "./TimerStrategy.js";

export class NormalTimerStrategy implements TimerStrategy {
  private timerId: NodeJS.Timeout | null = null;
  private readonly tickInterval = 1000;
  private readonly timeMultiplier = 1;

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
    return "Normal";
  }
}
