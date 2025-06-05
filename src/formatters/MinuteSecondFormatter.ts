import { TimeFormatter } from "./TimeFormatter.js";

export class MinuteSecondFormatter extends TimeFormatter {
  protected convertToTimeUnit(ms: number): number {
    return ms;
  }

  protected getUnitName(_: number): string {
    return "";
  }

  protected getPrefix(): string {
    return "for";
  }

  protected formatValue(ms: number): string {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
    } else {
      return `${seconds}s`;
    }
  }
}
