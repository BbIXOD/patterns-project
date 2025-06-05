import { TimeFormatter } from "./TimeFormatter.js";

export class SimpleSecondsFormatter extends TimeFormatter {
  protected convertToTimeUnit(ms: number): number {
    return ms / 1000;
  }

  protected getUnitName(value: number): string {
    return value === 1 ? "second" : "seconds";
  }

  protected getPrefix(): string {
    return "for";
  }
}
