class Timer {
  private readonly interval: number;
  private readonly callback: (elapsed: number) => void;
  private running = false;
  private timerId: NodeJS.Timeout | null = null;

  public constructor(interval: number, callback: (elapsed: number) => void) {
    this.interval = interval;
    this.callback = callback;
  }

  public start() {
    if (!this.running) {
      this.running = true;
      this.timerId = setInterval(() => {
        this.callback(this.interval);
      }, this.interval);
    }
  }

  public stop() {
    if (this.running) {
      this.running = false;
      clearInterval(this.timerId!);
    }
  }

}
