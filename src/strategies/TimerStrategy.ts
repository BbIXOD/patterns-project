export interface TimerStrategy {
  startTicking(callback: (elapsed: number) => void): void;
  stopTicking(): void;
  getName(): string;
}