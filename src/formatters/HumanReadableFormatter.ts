import { TimeFormatter } from "./TimeFormatter.js";

export class HumanReadableFormatter extends TimeFormatter {
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
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  }
}
