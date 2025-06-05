export abstract class TimeFormatter {
  public formatTime(durationMs: number, elapsedMs: number): string {
    const remainingMs = Math.max(0, durationMs - elapsedMs);
    const timeUnit = this.convertToTimeUnit(remainingMs);
    const formattedValue = this.formatValue(timeUnit);
    const unit = this.getUnitName(timeUnit);
    const prefix = this.getPrefix();
    
    return `${prefix} ${formattedValue} ${unit}`;
  }

  protected abstract convertToTimeUnit(ms: number): number;
  protected abstract getUnitName(value: number): string;
  protected abstract getPrefix(): string;

  protected formatValue(value: number): string {
    return Math.ceil(value).toString();
  }
}
